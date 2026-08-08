// WebGL wrapper / fallback for OGL library
let Renderer, Program, Mesh, Geometry, Triangle, RenderTarget;

try {
  const ogl = require('ogl');
  Renderer = ogl.Renderer;
  Program = ogl.Program;
  Mesh = ogl.Mesh;
  Geometry = ogl.Geometry;
  Triangle = ogl.Triangle;
  RenderTarget = ogl.RenderTarget;
} catch (err) {
  // WebGL implementation matching OGL interface
  Renderer = class {
    constructor({ alpha = true, dpr = 1 } = {}) {
      this.dpr = dpr;
      this.gl = typeof document !== 'undefined' ? (
        document.createElement('canvas').getContext('webgl', { alpha, antialias: true }) ||
        document.createElement('canvas').getContext('experimental-webgl')
      ) : null;
      this.width = 300;
      this.height = 150;
    }
    setSize(width, height) {
      this.width = width;
      this.height = height;
      const gl = this.gl;
      if (!gl) return;
      gl.canvas.width = width * this.dpr;
      gl.canvas.height = height * this.dpr;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
    render({ scene, target, clear = false } = {}) {
      const gl = this.gl;
      if (!gl || !scene) return;
      if (target) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer);
        gl.viewport(0, 0, target.width, target.height);
      } else {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      }
      if (clear) {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      }
      scene.draw(gl);
    }
  };

  RenderTarget = class {
    constructor(gl, { width = 1, height = 1 } = {}) {
      this.gl = gl;
      this.width = width;
      this.height = height;
      if (!gl) return;
      this.framebuffer = gl.createFramebuffer();
      this.texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, this.texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
  };

  Geometry = class {
    constructor(gl, attributes = {}) {
      this.gl = gl;
      this.attributes = attributes;
      this.drawRange = { start: 0, count: 0 };
      this.buffers = {};
      if (!gl) return;
      for (const key in attributes) {
        const attr = attributes[key];
        if (key === 'index') {
          this.indexBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, attr.data, gl.STATIC_DRAW);
        } else {
          const buf = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, buf);
          gl.bufferData(gl.ARRAY_BUFFER, attr.data, attr.usage || gl.STATIC_DRAW);
          this.buffers[key] = buf;
        }
      }
    }
    setDrawRange(start, count) {
      this.drawRange = { start, count };
    }
    updateBuffers() {
      const gl = this.gl;
      if (!gl) return;
      for (const key in this.attributes) {
        const attr = this.attributes[key];
        if (attr.needsUpdate) {
          attr.needsUpdate = false;
          if (key === 'index') {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, attr.data, gl.DYNAMIC_DRAW);
          } else if (this.buffers[key]) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[key]);
            gl.bufferData(gl.ARRAY_BUFFER, attr.data, attr.usage || gl.DYNAMIC_DRAW);
          }
        }
      }
    }
  };

  Triangle = class extends Geometry {
    constructor(gl) {
      super(gl, {
        position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
        uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) }
      });
      this.setDrawRange(0, 3);
    }
  };

  Program = class {
    constructor(gl, { vertex, fragment, uniforms = {}, transparent = false } = {}) {
      this.gl = gl;
      this.uniforms = uniforms;
      this.transparent = transparent;
      if (!gl) return;

      const createShader = (type, source) => {
        const s = gl.createShader(type);
        gl.shaderSource(s, source);
        gl.compileShader(s);
        return s;
      };
      const vs = createShader(gl.VERTEX_SHADER, vertex);
      const fs = createShader(gl.FRAGMENT_SHADER, fragment);
      const p = gl.createProgram();
      gl.attachShader(p, vs);
      gl.attachShader(p, fs);
      gl.linkProgram(p);
      this.program = p;
    }
    setBlendFunc(src, dst) {
      this.blendSrc = src;
      this.blendDst = dst;
    }
    use() {
      const gl = this.gl;
      if (!gl || !this.program) return;
      gl.useProgram(this.program);
      if (this.transparent) {
        gl.enable(gl.BLEND);
        gl.blendFunc(this.blendSrc || gl.SRC_ALPHA, this.blendDst || gl.ONE_MINUS_SRC_ALPHA);
      } else {
        gl.disable(gl.BLEND);
      }
      let textureUnit = 0;
      for (const name in this.uniforms) {
        const u = this.uniforms[name];
        const loc = gl.getUniformLocation(this.program, name);
        if (loc === null) continue;
        if (u.value instanceof WebGLTexture || (u.value && u.value.texture)) {
          const tex = u.value instanceof WebGLTexture ? u.value : u.value.texture;
          gl.activeTexture(gl.TEXTURE0 + textureUnit);
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.uniform1i(loc, textureUnit);
          textureUnit++;
        } else if (Array.isArray(u.value)) {
          if (u.value.length === 2) gl.uniform2fv(loc, u.value);
          else if (u.value.length === 3) gl.uniform3fv(loc, u.value);
          else if (u.value.length === 4) gl.uniform4fv(loc, u.value);
        } else if (typeof u.value === 'number') {
          gl.uniform1f(loc, u.value);
        }
      }
    }
  };

  Mesh = class {
    constructor(gl, { geometry, program } = {}) {
      this.gl = gl;
      this.geometry = geometry;
      this.program = program;
    }
    draw() {
      const gl = this.gl;
      if (!gl || !this.geometry || !this.program) return;
      this.program.use();
      this.geometry.updateBuffers();

      const p = this.program.program;
      for (const key in this.geometry.attributes) {
        if (key === 'index') continue;
        const attr = this.geometry.attributes[key];
        const loc = gl.getAttribLocation(p, key);
        if (loc !== -1 && this.geometry.buffers[key]) {
          gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.buffers[key]);
          gl.enableVertexAttribArray(loc);
          gl.vertexAttribPointer(loc, attr.size, gl.FLOAT, false, 0, 0);
        }
      }

      if (this.geometry.indexBuffer) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.geometry.indexBuffer);
        const count = this.geometry.drawRange.count || this.geometry.attributes.index.data.length;
        gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, this.geometry.drawRange.start * 2);
      } else {
        const count = this.geometry.drawRange.count || 3;
        gl.drawArrays(gl.TRIANGLES, this.geometry.drawRange.start, count);
      }
    }
  };
}

export { Renderer, Program, Mesh, Geometry, Triangle, RenderTarget };
