import Link from "next/link";
import Socials from "../components/Socials";

const Header = () => {
  return (
    <header className="absolute z-30 w-full items-center px-16 xl:px-0 xl:h-[90px]">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-y-6 py-8">
          {/* logo */}
          <Link href="/" className="flex items-center gap-x-3 group relative select-none">
            <div className="w-[48px] h-[48px] flex items-center justify-center overflow-visible relative">
              <img
                src="/logo-icon.svg"
                alt="Rakibul Islam Portfolio Logo"
                className="w-full h-full object-contain transition-all duration-500 ease-out group-hover:rotate-[360deg] group-hover:scale-110 filter drop-shadow-[0_0_8px_rgba(0,110,182,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(0,110,182,0.8)]"
              />
            </div>

            {/* Logo Text */}
            <span className="text-[20px] md:text-[24px] font-semibold tracking-wider text-white transition-all duration-300 ml-1">
              Rakibul <span className="font-light text-white/90">Islam</span>
              <span className="text-accent font-light mx-2">|</span>
              <span className="text-accent font-light group-hover:text-white transition-colors duration-300">portfolio</span>
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
