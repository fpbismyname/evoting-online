import React from "react";


const AdminPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold m-10">AdminPage</h1>
      <div className="bg-white rounded-md flex">
        <div className="bg-black w-40 h-60">
          <h1 className="text-black font-bold text-2xl">title</h1>
          <p className="text-black font-bold text-sm">Description</p>
        </div>
        <div className="bg-black w-40 h-60">
          <h1 className="text-black font-bold text-2xl">title</h1>
          <p className="text-black font-bold text-sm">Description</p>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
