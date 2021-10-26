import React from "react";

import { Pagination } from "antd";

export const Pager = (({ catalog, goPage }) => {
   if(catalog.count <= catalog.limit) { return null; }
   return <span><Pagination style={{ width: "100%" }}
      size="small"
      defaultPageSize={catalog.limit}
      current={Math.floor(catalog.skip / catalog.limit) + 1}
      defaultCurrent={Math.floor(catalog.skip / catalog.limit) + 1}
      total={catalog.count}
      onChange={goPage}
   /></span>
}) as React.FC<{ catalog; goPage; }>;

export default Pager;