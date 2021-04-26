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
              <i className="fal fa-home-alt fa-lg fa-fw"></i>
              <div className="navbar-bottom-item-text">{t("common:homepage")}</div>
            </div>
          </a>
        </Link>
        
        <Link href="/search">
          <a className={`navbar-bottom-items ${(router.pathname === "/search" ? "active" : "")}`}>
            <div className="navbar-bottom-item-wrapper">
              <i className="fal fa-search fa-lg fa-fw"></i>
              <div className="navbar-bottom-item-text">{t("common:search")}</div>
            </div>
          </a>
        </Link>
        
        <Link href="/menu">
          <a className={`navbar-bottom-items ${(router.pathname === "/menu" ? "active" : "")}`}>
            <div className="navbar-bottom-item-wrapper">
              <i className="fal fa-bars fa-lg fa-fw"></i>
              <div className="navbar-bottom-item-text">{t("common:menu")}</div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default NavbarBottom;