import Container from "../components/layout/Container";
import Measure from "../components/layout/Measure";
import SEO from "../components/utilities/SEO";
import useTranslation from 'next-translate/useTranslation';
import { useRef, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import LazyLoading from './../components/utilities/LazyLoading';
import ArticleListNext from './../components/article/ArticleListNext';
import PalceholderArticleList from './../components/placeholder/article/PlaceholderArticleList';

const Search = (props: React.PropsWithChildren<{}>) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>();
  const router = useRouter();
  const { topic } = router.query;
  const [ nextPages, setNextPages ] = useState<number[]>([1]);
  const [ loading, setLoading ] = useState<boolean>(true);
  const placeholder:ReactNode = loading ? <PalceholderArticleList/> : null;
  const lazyLoadArticleList: ReactNode = topic ? 
    <div className="search-result">
      {
        nextPages.map((page, inx) => {
          return (
            <LazyLoading key={inx}>
              <ArticleListNext
                page={page}
                topic={topic as string}
                onCompleted={(articles, nextPage) => { 
                  if(articles.length > 0) {
                    setNextPages([...nextPages, nextPage]); 
                  } else {
                    setLoading(false);
                  }
                }}
              />
            </LazyLoading>
          );
        })
      }

      {placeholder}
    </div> : null;

  const validate = () => {
    return inputRef.current.reportValidity();
  }

  const search = () => {
    if(validate()) {
      router.push(`/search?topic=${inputRef.current.value.trim()}`, undefined, { shallow: true });
      setLoading(true);
    }
  }

  return(
    <Container>
      <SEO title="Search" pathname="/search"/>

      <Measure>
        <h2>{t("common:search")}</h2>

        <div className="search-grid">
          <div className="search-input">
            <input 
              ref={inputRef}
              defaultValue={topic}
              placeholder={t("common:topic")}
              autoComplete="off" 
              minLength={5} 
              required
              onKeyDown={(e) => {
                if(e.key === "Enter") search();
              }}
            />

            <button onClick={search}><i className="fal fa-search fa-lg"></i></button>
          </div>

          {lazyLoadArticleList}
        </div>
      </Measure>
    </Container>
  );
}

export default Search;