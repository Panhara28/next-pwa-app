import Container from "../components/layout/Container";
import Measure from "../components/layout/Measure";
import SEO from "../components/utilities/SEO";
import useTranslation from 'next-translate/useTranslation';

const Custom404 = (props: React.PropsWithChildren<{}>) => {
  const { t } = useTranslation();

  return(
    <Container>
      <SEO 
        title={`404 | ${t("error:description.404")}`}
        image={`${process.env.ASSET_URL}/404.png`}
      />

      <Measure>
        <div className="error-warpper">
          <h1>
            <i className="fal fa-frown fa-2x"></i>
            <br/><br/>
            {`404 | ${t("error:description.404")}`}
          </h1>
        </div>
      </Measure>
    </Container>
  );
}

export default Custom404;