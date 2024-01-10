import React, { useEffect } from "react";

const AdminPage = () => {

  useEffect(()=>{
  },[])

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-blue-300 h-auto w-1/2 py-6 flex flex-row justify-between items-start rounded-xl">
          <h1 className="text-white drop-shadow-myShadow text-3xl mx-10 font-bold flex">
            Admin
          </h1>
          <h1 className="text-red-200 hover:text-red-500 transition cursor-pointer drop-shadow-myShadow text-3xl mx-10 font-bold flex">
            Logout
          </h1>
        </div>
        <div className="bg-blue-300 h-auto w-1/2 rounded-xl flex flex-col py-6 justify-center items-center mt-5">
        </div>
      </div>
    </>
  );
};

export default AdminPage;
