import Container from "../components/layout/Container";
import Measure from "../components/layout/Measure";
import SEO from "../components/utilities/SEO";
import useTranslation from 'next-translate/useTranslation';
import Link from "next/link";
import LocaleFlag from "../components/utilities/LocaleFlag";

const Menu = (props: React.PropsWithChildren<{}>) => {
  const { t } = useTranslation();

  return(
    <Container>
      <SEO title="Menu" pathname="/menu"/>

      <Measure>
        <h2>{t("common:menu")}</h2>

        <div className="menu">
          <LocaleFlag locales={["km"]}>
            <a target="_blank" rel="noopener" href="https://editor.khmerload.com/contributor/registration" className="menu-items">{t("menu:register-as-a-part-time-writer")}</a>
          </LocaleFlag>
          
          <Link href="/privacy-policy">
            <a className="menu-items">{t("menu:privacy-policy")}</a>
          </Link>

          <div className="menu-copyright">
            {t("menu:copyright")} <i className="fal fa-copyright fa-lg"></i> Mediaload
          </div>
        </div>
      </Measure>
    </Container>
  );
}

export default Menu;