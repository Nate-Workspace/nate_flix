import React from "react";

const LoadingState = () => {
  return (
    <div className="h-full min-h-80 w-44 overflow-hidden flex flex-col gap-4 flex-none transition-all duration-300 ease-in bg-[#100f14] rounded-lg hover:scale-105 hover:cursor-pointer">
      <div className="flex-1 h-[65%] flex items-center justify-center">
        <div className="animate-spin rounded-full w-1/4 h-1/4 border-b-2 border-white"></div>
      </div>
      <div className="h-[26%] flex flex-col gap-2 px-[3%]">
        <div className="text-sm font-light max-h-12 leading-4 overflow-hidden text-ellipsis line-clamp-2 hover:overflow-y-auto hover:text-ellipsis scrollbar-none">
          Loading
        </div>
        <div className="flex justify-between text-xs">
          <div className="text-gray-400">Loading</div>
          <div className="text-yellow-400">Loading</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
