import React from "react";

const nonAdminPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-blue-300 h-auto w-1/2 p-32 flex flex-row justify-center items-center rounded-xl">
          <h1 className="text-white drop-shadow-myShadow text-3xl mx-10 font-bold flex">
            Halaman tidak ditemukan
          </h1>
        </div>
      </div>
    </>
  );
};

export default nonAdminPage;
