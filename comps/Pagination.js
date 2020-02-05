import React from "react";

export const Pagination = ({ postsPerPage, totalPosts }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      {pageNumbers.map(number => {
        return (
          <nav>
            <ul>
              <li className="page">
                <a href="!#">{number}</a>
              </li>
            </ul>
          </nav>
        );
      })}
    </div>
  );
};
