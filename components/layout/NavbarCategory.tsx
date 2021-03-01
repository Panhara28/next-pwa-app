import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { Graph } from '../../generated/graph';

const QUERY_CATEGORY = gql`
  query CategoryList($pagination: PaginationInput!, $published: Boolean) {
    categoryList(pagination: $pagination, published: $published) {
      data {
        id, name {
          kh
        }
      }
      
      page {
        total, current, size
      }
    }
  }
`;

const NavbarCategory: React.FunctionComponent = () => {
  let category_nodes: ReactNode | ReactNode[];
  const { data, loading, error} = useQuery<Graph.Query>(QUERY_CATEGORY, {
    variables: {
      pagination: { page: 1, size: 100},
      published: true
    }
  });
  
  if(data && data.categoryList) {
    category_nodes = renderCategory(data.categoryList);
  }

  return (
    <div className="navbar-category">
      <div className="navbar-category-measure">
        {category_nodes}
      </div>
    </div>
  );
}

const renderCategory = (data: Graph.CategoryList) => {
  const categoreis: Graph.Category[] = data.data;
  const category_nodes: ReactNode[] = categoreis.map((category, inx) => {
    return (
      <Link key={inx} href={`/category/${category.id}`}>
        <a className="navbar-category-items">{category.name.kh}</a>
      </Link>
    );
  });

  return category_nodes;
}

export default NavbarCategory;