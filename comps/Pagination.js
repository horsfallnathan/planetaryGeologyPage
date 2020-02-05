import React, { useState } from "react";

export const Pagination = ({ postsPerPage, totalPosts, changePage, activePage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav role='pagination'>
      {pageNumbers.map((numb, i) => {
        return <button onClick={() => changePage(numb)} key={`pagination-${i}`} status={activePage === numb ? 'active' : 'inactive'} className="bx--btn bx--btn--primary bx--btn--sm">{numb}</button>
      })}
    </nav>
  );
};
