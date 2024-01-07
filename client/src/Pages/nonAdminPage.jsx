import React, { useEffect, useState } from "react";

const nonAdminPage = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  
  useEffect(()=>{
    console.log(isEmpty)
  },[]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-blue-300 h-auto w-1/2 py-6 flex flex-col justify-center items-center rounded-xl">
          <h1 className="text-white text-3xl mx-10 font-bold flex justify-center">
            Voter
          </h1>
        </div>
        <div className="bg-blue-300 h-auto w-1/2 rounded-xl flex flex-col py-6 justify-center items-center mt-5">
          <p>{isEmpty}</p>
        </div>
      </div>
    </>
  );
};

export default nonAdminPage;
