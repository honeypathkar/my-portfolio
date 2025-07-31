import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "../components/Container";
import SkeletonCard from "../components/SkeletonCard";
import ReactPaginate from "react-paginate";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function Work() {
  const [works, setWorks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 6;

  const myDataApi = process.env.REACT_APP_DATA_API;
  const access_token = process.env.REACT_APP_ACCESS_TOKEN;

  useEffect(() => {
    const fetchWorks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${myDataApi}?page=${currentPage + 1}&limit=${itemsPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        const { works, totalPages } = response.data;
        setWorks(works);
        setTotalPages(totalPages);
      } catch (err) {
        console.error("Error fetching works:", err);
        setError("Failed to fetch data. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, [currentPage, myDataApi, access_token]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  if (error) {
    return (
      <div className="my-40 text-white text-center">
        <h2 className="text-3xl font-bold">Featured Projects</h2>
        <div className="w-20 h-1 bg-purple-600 mt-3 mx-auto"></div>
        <div className="mt-20 text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="mt-28">
      <div className="container my-4">
        <div className="flex flex-col items-center text-center mb-5 text-white">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <div className="w-20 h-1 bg-purple-600 mt-3"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {loading
            ? Array(itemsPerPage)
                .fill(null)
                .map((_, index) => <SkeletonCard key={index} />)
            : works.map((element) => (
                <Container
                  key={element._id}
                  name={element.name}
                  imageUrl={element.imageUrl}
                  url={element.url}
                  description={element.description}
                  tools={element.tools}
                  source={element.source}
                />
              ))}
        </div>

        {!loading && totalPages > 1 && (
          <div className="pagination-controls mt-4 flex justify-center space-x-4 mb-12">
            <ReactPaginate
              previousLabel={<ChevronLeftIcon />}
              nextLabel={<ChevronRightIcon />}
              breakLabel={"..."}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              forcePage={currentPage}
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
        )}
      </div>
    </div>
  );
}
