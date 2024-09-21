import React, { useState } from "react";
import Container from "../Container";
import { work } from "../utils/data";
import ReactPaginate from "react-paginate";

export default function Work() {
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(work.length / itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = work.slice(offset, offset + itemsPerPage);

  return (
    <div className="mt-28">
      <div className="container my-4">
        <div className="row box-container">
          {currentPageData.map((element) => {
            return (
              <div className="col-md-6" key={element.url}>
                <Container
                  name={element.name}
                  imageUrl={element.imageUrl}
                  url={element.url}
                  description={element.description}
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
            activeClassName={"bg-[#6FB3B8] text-white rounded"}
            pageClassName={
              "px-4 py-2 text-black border border-black rounded cursor-pointer hover:bg-[#6FB3B8] hover:text-white transition-all"
            }
            previousClassName={
              "px-4 py-2 text-white bg-[#6FB3B8] rounded border border-black disabled:opacity-50 cursor-pointer"
            }
            nextClassName={
              "px-4 py-2 text-white bg-[#6FB3B8] border border-black rounded disabled:opacity-50 cursor-pointer"
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
