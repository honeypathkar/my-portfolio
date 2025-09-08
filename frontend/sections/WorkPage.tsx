"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { gsap } from "gsap";
import ProjectModal from "../components/ProjectModal";

type Work = {
  _id: string;
  name: string;
  imageUrl: string;
  url: string;
  description: string;
  tools: string[];
  source?: string;
};

function SkeletonCard() {
  return (
    <div className="bg-gray-800/50 rounded-xl border-[1px] border-purple-600/30 overflow-hidden max-w-sm w-full">
      <div className="w-full h-[14rem] bg-gray-700 shimmer"></div>
      <div className="p-4">
        <div className="h-6 w-3/4 bg-gray-700 shimmer rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-700 shimmer rounded mb-3"></div>
        <div className="h-4 w-5/6 bg-gray-700 shimmer rounded mb-3"></div>
        <div className="flex flex-wrap gap-2 mb-3">
          {Array(3)
            .fill("")
            .map((_, index) => (
              <div key={index} className="h-6 w-16 bg-gray-700 shimmer rounded-full"></div>
            ))}
        </div>
        <div className="flex gap-3">
          <div className="h-5 w-16 bg-gray-700 shimmer rounded"></div>
          <div className="h-5 w-16 bg-gray-700 shimmer rounded"></div>
        </div>
      </div>
    </div>
  );
}

function Container({ name, imageUrl, url, description, tools, source }: Work) {
  return (
    <div className="bg-gray-800/50 rounded-xl border border-purple-600/30 overflow-hidden hover:border-purple-500/60 transition-colors max-w-sm w-full flex flex-col">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
      <div className="p-5 text-white flex flex-col flex-1">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-gray-300 mt-2 line-clamp-3 flex-1">{description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {tools?.map((t, i) => (
            <span key={i} className="text-xs bg-purple-600/30 text-purple-200 px-2 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-3 mt-4 items-center">
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-white border border-purple-600 px-3 py-1 rounded-full">Live</a>
          {source && (
            <a href={source} target="_blank" rel="noopener noreferrer" className="text-sm text-white border border-purple-600 px-3 py-1 rounded-full">Source</a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WorkPage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<Work | null>(null);

  const itemsPerPage = 6;

  const myDataApi = process.env.NEXT_PUBLIC_DATA_API as string | undefined;
  const access_token = process.env.NEXT_PUBLIC_ACCESS_TOKEN as string | undefined;

  useEffect(() => {
    const fetchWorks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${myDataApi}?page=${currentPage + 1}&limit=${itemsPerPage}`,
          { headers: access_token ? { Authorization: `Bearer ${access_token}` } : {} }
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
    if (myDataApi) fetchWorks();
  }, [currentPage, myDataApi, access_token]);

  // animate on data load/page change
  useEffect(() => {
    if (!gridRef.current || loading) return;
    const cards = Array.from(gridRef.current.children);
    gsap.fromTo(cards, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "power2.out" });
  }, [works, loading]);

  const handlePageClick = (data: { selected: number }) => setCurrentPage(data.selected);

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
    <>
      <div className="mt-28">
        <div className="my-4 max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-5 text-white">
          <h2 className="text-4xl sm:text-5xl font-bold">Featured Projects</h2>
          <div className="w-20 h-1 bg-purple-600 mt-3"></div>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center place-items-center">
          {loading
            ? Array(itemsPerPage)
                .fill(null)
                .map((_, index) => <SkeletonCard key={index} />)
            : works.map((element) => (
                <div key={element._id} onClick={() => setActive(element)} className="cursor-pointer">
                  <Container {...element} />
                </div>
              ))}
        </div>
        {!loading && totalPages > 1 && (
          <div className="pagination-controls mt-4 flex justify-center space-x-4 mb-12">
            <ReactPaginate
              previousLabel={<span className="px-2">‹</span>}
              nextLabel={<span className="px-2">›</span>}
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
      <ProjectModal open={!!active} onClose={() => setActive(null)} work={active} />
    </>
  );
}

// Animate cards when works change
// Note: keep effect at bottom to avoid re-ordering hooks
export function useAnimateGrid(ref: React.RefObject<HTMLDivElement>, deps: any[]) {
  useEffect(() => {
    if (!ref.current) return;
    const cards = Array.from(ref.current.children);
    gsap.fromTo(
      cards,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "power2.out" }
    );
  }, deps);
}



