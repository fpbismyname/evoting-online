import React, { useEffect, useState } from "react";
import Web3 from "web3";
import ContractBuilder from "../contracts/EVoting.json";

const nonAdminPage = () => {
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState();
  const [voteMaterial, setVoteMaterial] = useState();

  // debug
  useEffect(() => {
    loadContract();
  }, []);

  const loadContract = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccounts(account);

        //get Contract Builder
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = await ContractBuilder.networks[networkId];
        const instance = new web3.eth.Contract(
          ContractBuilder.abi,
          deployedNetwork && deployedNetwork.address
        );
        setContract(instance);

        //Get total Voting
        const totalVoting = await instance.methods
          .totalVotingMaterials()
          .call({ from: account[0] });

        const voteMaterialArray = [];

        for (let i = 0; i <= parseInt(totalVoting); i++) {
          const data = await instance.methods
            .votingMaterials(i)
            .call({ from: account[0] });
          voteMaterialArray.push(data)
        }
        setVoteMaterial(voteMaterialArray)
      } catch (err) {
        window.alert(err);
      }
    } else {
      window.alert("Please install metamask first to use this website !!!");
    }
  };
  
  console.log(voteMaterial)
  console.log(contract);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-blue-300 h-auto w-1/2 py-6 flex flex-row justify-between items-start rounded-xl">
          <h1 className="text-white drop-shadow-myShadow text-3xl mx-10 font-bold flex">
            Voters
          </h1>
          <h1 className="text-red-200 hover:text-red-500 transition cursor-pointer drop-shadow-myShadow text-3xl mx-10 font-bold flex">
            Logout
          </h1>
        </div>
        <div className="bg-blue-300 h-auto w-1/2 rounded-xl flex flex-col py-6 justify-center items-center mt-5"></div>
      </div>
    </>
  );
};

export default nonAdminPage;
