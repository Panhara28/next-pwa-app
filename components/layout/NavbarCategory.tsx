import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import { Graph } from '../../generated/graph';
import { graphQuery } from '../../generated/graphQuery';

const NavbarCategory: React.FunctionComponent = () => {
  const router = useRouter();
  const { slug } = router.query;
  
  let categoryNodes: ReactNode | ReactNode[];
  const { data, loading, error } = useQuery<Graph.Query>(graphQuery.QUERY_CATEGORY, {
    variables: {
      pagination: { page: 1, size: 100},
      parentId: process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID ? Number(process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID) : undefined,
      published: true,
      display: true,
      exceptCategories: JSON.parse(process.env.NEXT_PUBLIC_CATEGORY_EXCEPT_IDS)
    }
  });
  
  if(data && data.categoryList) {
    categoryNodes = renderCategory(data.categoryList, slug as string);
  }

  return (
    <div className="navbar-category">
      <div className="navbar-category-measure">
        {categoryNodes}
      </div>
    </div>
  );
}

const renderCategory = (data: Graph.CategoryList, slug: string) => {
  const categoreis: Graph.Category[] = data.data;
  const categoryNodes: ReactNode[] = categoreis.map((category, inx) => {
    return (
      <Link key={inx} href={`/category/${category.alias}`}>
        <a className={"navbar-category-items" + (category.alias === slug ? " active" : "")}>{category.name.kh}</a>
      </Link>
    );
  });

  return categoryNodes;
}

export default NavbarCategory;