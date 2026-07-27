import Link from "next/link";
import Socials from "../components/Socials";

const Header = () => {
  return (
    <header className="absolute z-30 w-full items-center px-16 xl:px-0 xl:h-[90px]">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-y-6 py-8">
          {/* logo */}
          <Link href="/" className="flex items-center gap-x-3 group relative select-none">
            {/* Custom Logo Icon */}
            <div className="w-[42px] h-[42px] flex items-center justify-center relative transition-transform duration-300 group-hover:scale-110">
              <img
                src="/logo-icon.png"
                alt="Logo"
                width={42}
                height={42}
                className="object-contain transition-all duration-300 filter drop-shadow(0 0 2px rgba(255,255,255,0.15)) group-hover:drop-shadow-[0_0_8px_rgba(var(--accent-color-rgb),0.85)]"
              />
            </div>

            {/* Logo Text */}
            <span className="text-[28px] font-semibold tracking-wider text-white group-hover:text-accent transition-all duration-300 ml-1">
              rakibul <span className="font-light text-white">islam</span><span className="text-accent font-bold">.</span>
            </span>
          </Link>

          {/* socials & resume */}
          <div className="flex items-center gap-x-6">
            <Socials />
            <a
              href="https://drive.google.com/file/d/1olcWNQp22NElbP174Q-iPFBIpHwQNNpr/view?usp=drive_link"
              target="_blank"
              rel="noreferrer noopener"
              className="continue-application"
            >
              <div>
                <div className="pencil"></div>
                <div className="folder">
                  <div className="top">
                    <svg viewBox="0 0 24 27">
                      <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                    </svg>
                  </div>
                  <div className="paper"></div>
                </div>
              </div>
              Resume
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
