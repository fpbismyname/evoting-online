import React, { useEffect, useState } from "react";
import Web3 from "web3";
import ContractBuilder from "../contracts/EVoting.json";
import IconVote from "../vite.svg";
import { useNavigate } from "react-router-dom";



const nonAdminPage = () => {
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState();
  const [voteMaterial, setVoteMaterial] = useState([]);
  const [totalVoteMaterial, setTotalVoteMaterial] = useState(0);
  const [admin, setAdmin] = useState();
  const Goto = useNavigate();


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
        
        //Check Privillage Account
        const privillageChecker = await instance.methods
          .isAdmin()
          .call({ from: account[0] });
        setAdmin(privillageChecker);
        //Checker
        if (privillageChecker == true || admin == true) { 
          Goto("/evoting-online/managevote");
        } else if (privillageChecker == false  || admin == false) {
          Goto("/evoting-online/vote");
        } 

        //Get total Voting
        const totalVoting = await instance.methods
          .totalVotingMaterials()
          .call({ from: account[0] });
        setTotalVoteMaterial(totalVoting);

        //Get Vote Material Value
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
  
  //debug
  console.log(voteMaterial)
  console.log(totalVoteMaterial)
  // console.log(contract);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-auto">
        <div className="bg-blue-300 h-auto w-1/2 py-6 flex flex-row justify-between items-start rounded-xl">
          <h1 className="text-white drop-shadow-myShadow text-3xl mx-10 font-bold flex">
            Voters
          </h1>
          <h1 className="text-red-200 hover:text-red-500 transition cursor-pointer drop-shadow-myShadow text-3xl mx-10 font-bold flex">
            Logout
          </h1>
        </div>
        <div className="font-bold w-96 h-auto text-gray-800 justify-center items-start rounded-b-xl flex flex-col gap-4 list-none m-5">
            {voteMaterial
              .filter((txt) => txt.title !== "")
              .map((vote) => {
                for (let i = 0; i < voteMaterial.length; i++) {
                  console.log(vote[0])
                  return (
                    <li key={vote[0]}>
                      <a className="flex p-7 w-96 rounded-xl bg-blue-200 break-words h-auto gap-7">
                        <img src={IconVote} />
                        <div className="flex flex-col text-left w-96">
                          <h1 className="flex">{vote.title}</h1>
                          <p className="flex text-xs">{vote.desc}</p>
                          <a className="flex my-5 justify-between items-center">
                            Total Vote : {parseInt(vote.vote)}
                            <a className="text-white font-bold hover:bg-blue-700 p-3 bg-blue-500 rounded-lg cursor-pointer transition">Vote</a>
                          </a>
                        </div>
                      </a>
                    </li>
                  );
                }
              })}
          </div>
      </div>
    </>
  );
};

export default nonAdminPage;
