import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Graph } from '../../generated/graph';
import { graphQuery } from '../../generated/graphQuery';

const NavbarCategory = (props: React.PropsWithChildren<{}>) => {
  const router = useRouter();
  const { categorySlug } = router.query;
  
  let categoryElms: JSX.Element[];
  const { data } = useQuery<Graph.Query>(graphQuery.QUERY_CATEGORY_LIST, {
    variables: {
      pagination: { page: 1, size: 100},
      parentId: process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID ? Number(process.env.NEXT_PUBLIC_CATEGORY_PARENT_ID) : undefined,
      published: true,
      display: true,
      exceptCategories: process.env.NEXT_PUBLIC_CATEGORY_EXCEPT_IDS ? JSON.parse(process.env.NEXT_PUBLIC_CATEGORY_EXCEPT_IDS) : undefined
    }
  });
  
  if(data && data.categoryList) {
    categoryElms = renderCategory(data.categoryList, categorySlug as string);
  }

  return (
    <div className="navbar-category">
      <div className="navbar-category-measure">
        {categoryElms}
      </div>
    </div>
  );
}

const renderCategory = (data: Graph.CategoryList, categorySlug: string) => {
  const categoreis = data.data;
  const categoryElms = categoreis.map((category, inx) => {
    return (
      <Link key={inx} href={`/category/${category.alias}`}>
        <a className={"navbar-category-items" + (category.alias === categorySlug ? " active" : "")}>{category.name.kh}</a>
      </Link>
    );
  });

  return categoryElms;
}

export default NavbarCategory;