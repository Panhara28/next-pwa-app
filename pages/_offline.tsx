import Container from "../components/layout/Container";
import Measure from "../components/layout/Measure";
import SEO from "../components/utilities/SEO";
import useTranslation from 'next-translate/useTranslation';

const Offline = (props: React.PropsWithChildren<{}>) => {
  const { t } = useTranslation();

  return(
    <Container>
      <SEO title={`Offline | ${t("error:description.offline")}`}/>

      <Measure>
        <div className="error-warpper">
          <h1>
            <i className="fal fa-wifi-slash fa-2x"></i>
            <br/><br/>
            {`Offline | ${t("error:description.offline")}`}
          </h1>
        </div>
      </Measure>
    </Container>
  );
}

export default Offline;