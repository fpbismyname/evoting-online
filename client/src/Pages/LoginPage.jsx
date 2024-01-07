import React from "react";
import Web3 from "web3";
import { useState, useEffect } from "react";
import ContractBuilder from "../contracts/EVoting.json";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [accounts, setAccounts] = useState();
  const [contract, setContract] = useState(null);
  const [admin, setAdmin] = useState();
  const Goto = useNavigate();

  //Run checkContract and account
  useEffect(() => {
    loadContract();
  }, []);

  //Load constract for the first time
  const loadContract = async () => {
    const web3 = new Web3(window.ethereum);
    //get Contract Builder
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = await ContractBuilder.networks[networkId];
    const instance = new web3.eth.Contract(
      ContractBuilder.abi,
      deployedNetwork && deployedNetwork.address
    );
    setContract(instance);
  };

  //Load Account and contract
  const loadMetamaskAccount = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        //getAccount
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccounts(account);

        //Contract Getter
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

        //Check admin privillage
        if (privillageChecker === true || admin === true) {
          Goto("/managevote");
        } else if (privillageChecker === false  || admin === false) {
          Goto("/vote");
        } 
      } catch (err) {
        window.alert(err);
      }
    } else {
      window.alert("Please install Metamask Fisrt to use this Website !");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-blue-300 h-auto w-1/2 py-6 flex flex-col justify-center items-center rounded-xl">
          <h1 className="text-white text-3xl mx-10 font-bold flex justify-center">
            E-Voting
          </h1>
        </div>
        <div className="bg-blue-300 h-auto w-1/2 rounded-xl flex flex-col py-6 justify-center items-center mt-5">
          <h1 className="text-white font-bold text-3xl">Login</h1>
          <p className="text-white m-5">
            Welcome to Evoting Blockchain website
          </p>
          <button
            onClick={loadMetamaskAccount}
            className="text-white font-bold hover:bg-blue-700 p-3 mt-5-1 bg-blue-500 w-auto rounded-lg h-auto"
          >
            Login using Metamask
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
