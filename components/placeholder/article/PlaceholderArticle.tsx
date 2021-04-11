import React, { ReactNode } from 'react';
import ArticleLayout from './../../layout/article/ArticleLayout';
import ArticleLayoutDetail from './../../layout/article/ArticleLayoutDetail';
import ArticleLayoutSide from './../../layout/article/ArticleLayoutSide';

const PalceholderArticle: React.FunctionComponent = () => {
  return (
    <ArticleLayout>
      <ArticleLayoutDetail>
        <div className="grid-article-title">
          <div className="ph-item" style={{ margin: 0 }}>
            <div className="ph-col-12">
              <div className="ph-row">
                <div className="ph-col-12 big"/>
                <div className="ph-col-8 big"/>
                <div className="ph-col-4 empty"/>
              </div>
            </div>
          </div>
        </div>

        <div className="grid-article-thumbnail">
          <div className="ph-item">
            <div className="ph-picture"></div>
          </div>
        </div>

        <div className="grid-article-summary">
          <div className="ph-item">
            <div className="ph-col-12">
              <div className="ph-row">
                <div className="ph-col-12 big"/>
                <div className="ph-col-6 big"/>
                <div className="ph-col-6 empty"/>
                <div className="ph-col-12"/>
                <div className="ph-col-12"/>
                <div className="ph-col-12"/>
              </div>
            </div>
          </div>
        </div>
      </ArticleLayoutDetail>

      <ArticleLayoutSide>
        <div className="ph-item d-none-tablet">
          <div className="ph-col-4">
            <div className="ph-avatar"/>
          </div>

          <div className="ph-col-8">
            <div className="ph-row">
              <div className="ph-col-12 empty"/>
              <div className="ph-col-8 big"/>
              <div className="ph-col-4 empty"/>
            </div>
          </div>

          <div className="ph-col-12">
            <div className="ph-row">
              <div className="ph-col-12 big"/>
            </div>
          </div>

          <div className="ph-col-4">
            <div className="ph-picture small"></div>
          </div>

          <div className="ph-col-8">
            <div className="ph-row">
              <div className="ph-col-12"/>
              <div className="ph-col-12"/>
              <div className="ph-col-12"/>
            </div>
          </div>
        </div>
      </ArticleLayoutSide>
    </ArticleLayout>
  );
}

export default PalceholderArticle;