import React, { useState } from "react";
import Container from "../Container";
import { work } from "../utils/data";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function Work() {
  const [currentPage, setCurrentPage] = useState(0);
  const [page, setPage] = useState(1);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(work.length / itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    setPage(page - 1);
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
    setPage(page + 1);
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
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="px-4 py-2 text-white rounded disabled:opacity-50 bg-[#6FB3B8]"
          >
            <ArrowBackIosIcon />
          </button>
          <span className="p-[10px] text-xl">
            {page} / {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 text-white rounded disabled:opacity-50 bg-[#6FB3B8]"
          >
            <ArrowForwardIosIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
