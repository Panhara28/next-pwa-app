import Link from "next/link";
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

const NavbarBottom = (props: React.PropsWithChildren<{}>) => {
  const router = useRouter();
  const { t } = useTranslation();

  return(
    <div className="navbar-bottom">
      <div className="navbar-bottom-measure">
        <Link href="/">
          <a className={`navbar-bottom-items ${(router.pathname === "/" ? "active" : "")}`}>
            <div className="navbar-bottom-item-wrapper">
              <i className="fal fa-house fa-xl fa-fw"></i>
            </div>
          </a>
        </Link>
        
        <Link href="/search">
          <a className={`navbar-bottom-items ${(router.pathname === "/search" ? "active" : "")}`}>
            <div className="navbar-bottom-item-wrapper">
              <i className="fal fa-magnifying-glass fa-xl fa-fw"></i>
            </div>
          </a>
        </Link>
        
        <Link href="/menu">
          <a className={`navbar-bottom-items ${(router.pathname === "/menu" ? "active" : "")}`}>
            <div className="navbar-bottom-item-wrapper">
              <i className="fal fa-bars fa-xl fa-fw"></i>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default NavbarBottom;