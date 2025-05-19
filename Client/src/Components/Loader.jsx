import React from "react";

const Loader = () => {
  return (
    <div className="flex h-screen bg-gray-900 justify-center items-center">
      <div className="my-14 w-16 h-16 border-4 border-gray-800 border-t-yellow-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
