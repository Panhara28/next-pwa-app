import Container from "../components/layout/Container";
import Measure from "../components/layout/Measure";
import SEO from "../components/utilities/SEO";
import useTranslation from 'next-translate/useTranslation';

const Search = (props: React.PropsWithChildren<{}>) => {
  const { t } = useTranslation();

  return(
    <Container>
      <SEO
        title="Search"
        pathname="/search"
        canonical="/search"
      />

      <Measure>
        <h2>{t("common:search")}</h2>
      </Measure>
    </Container>
  );
}

export default Search;