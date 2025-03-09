import React from "react";
import "../App.css";

export default function SkeletonCard() {
  return (
    <div className="bg-gray-800/50 rounded-xl border-[1px] border-purple-600/30 overflow-hidden">
      {/* Image Section */}
      <div className="w-full h-[14rem] bg-gray-700 shimmer"></div>

      {/* Content Section */}
      <div className="p-4">
        <div className="h-6 w-3/4 bg-gray-700 shimmer rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-700 shimmer rounded mb-3"></div>
        <div className="h-4 w-5/6 bg-gray-700 shimmer rounded mb-3"></div>

        {/* Tools Skeleton */}
        <div className="flex flex-wrap gap-2 mb-3">
          {Array(3)
            .fill("")
            .map((_, index) => (
              <div
                key={index}
                className="h-6 w-16 bg-gray-700 shimmer rounded-full"
              ></div>
            ))}
        </div>

        {/* Action Links Skeleton */}
        <div className="flex gap-3">
          <div className="h-5 w-16 bg-gray-700 shimmer rounded"></div>
          <div className="h-5 w-16 bg-gray-700 shimmer rounded"></div>
        </div>
      </div>
    </div>
  );
}
