import React, { useState } from "react";
import Container from "../Container";
import { work } from "../utils/data";
import ReactPaginate from "react-paginate";

export default function Work() {
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 6; // Display 3 projects per page
  const totalPages = Math.ceil(work.length / itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = work.slice(offset, offset + itemsPerPage);

  return (
    <div className="mt-28">
      <div className="container my-4">
        <div className="flex flex-col items-center text-center mb-5 text-white">
          <h2 className="text-3xl font-bold text-center">Featured Projects</h2>
          <div className="w-20 h-1 bg-purple-600 mt-3"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {" "}
          {currentPageData.map((element) => {
            return (
              <div
                className="col-span-1" // Ensures each item takes up one column
                key={element.url}
              >
                <Container
                  name={element.name}
                  imageUrl={element.imageUrl}
                  url={element.url}
                  description={element.description}
                  tools={element.tools}
                  source={element.source}
                />
              </div>
            );
          })}
        </div>

        <div className="pagination-controls mt-4 flex justify-center space-x-4 mb-12">
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"flex space-x-4"}
            activeClassName={"bg-purple-600 text-white rounded"}
            pageClassName={
              "px-4 py-2 text-white border-[1px] border-purple-800 rounded cursor-pointer hover:bg-purple-600 hover:text-white transition-all"
            }
            previousClassName={
              "px-4 py-2 text-white bg-purple-600 rounded border-[1px] border-purple-800 disabled:opacity-50 cursor-pointer"
            }
            nextClassName={
              "px-4 py-2 text-white bg-purple-600 border-[1px] border-purple-800 rounded disabled:opacity-50 cursor-pointer"
            }
            disabledClassName={"opacity-50 cursor-not-allowed"}
            pageLinkClassName={"w-full h-full text-center"}
            previousLinkClassName={"w-full h-full text-center"}
            nextLinkClassName={"w-full h-full text-center"}
            breakClassName={"px-4 py-2 border rounded cursor-pointer"}
          />
        </div>
      </div>
    </div>
  );
}
