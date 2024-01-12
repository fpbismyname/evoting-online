import React, { useEffect, useState } from "react";
import Web3 from "web3";
import ContractBuilder from "../contracts/EVoting.json";

const AdminPage = () => {
  const [accounts, setAccounts] = useState();
  const [contract, setContract] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [messageTitle, setMessageTitle] = useState("");
  const [messageDesc, setMessageDesc] = useState("");

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
      } catch (err) {
        window.alert(err);
      }
    } else {
      window.alert("Please install metamask first to use this website !!!");
    }
  };

  //submit Vote
  const submitVote = () => {
    if (title === "") {
      // alert("Title dan Description is Empty !")
      setMessageTitle("Title is Empty !");
    }
    if (description === "") {
      setMessageDesc("Description is Empty !");
    }
    if (title !== "" && description !== "") {
      createVote();
    }
  };

  //handle title empty
  const handleChangeTitle = (event) => {
    event.preventDefault();
    setTitle(event.target.value);

    if (event.target.value.trim().length > 0) {
      setMessageTitle("");
    } else {
      setMessageTitle("Title is Empty !");
    }
  };

  //handle desc empty
  const handleChangeDesc = (event) => {
    event.preventDefault();

    setDescription(event.target.value);

    if (event.target.value.trim().length > 0) {
      setMessageDesc("");
    } else {
      setMessageDesc("Description is Empty !");
    }
  };

  // console.log(contract);

  //Create the vote
  const createVote = async () => {
    try {
      const akun = new Web3(window.ethereum);
      const gasPrice = await akun.eth.getGasPrice();
      const gasLimit = null;

      await contract.methods
        .createVotingMaterial(title, description)
        .send({ from: accounts[0], gas: gasLimit, gasPrice: gasPrice })
        .then(() => window.alert("Voting Material Created !"));
    } catch (err) {
      window.alert(err);
    }
  };

  //debug
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-blue-300 h-auto w-auto py-6 flex flex-row justify-between items-start rounded-xl">
          <h1 className="text-white drop-shadow-myShadow text-3xl mx-10 font-bold flex">
            Admin
          </h1>
          <h1 className="text-red-200 hover:text-red-500 transition cursor-pointer drop-shadow-myShadow text-3xl mx-10 font-bold flex">
            Logout
          </h1>
        </div>
        <div className="bg-blue-300 h-auto w-auto rounded-xl flex flex-col py-6 justify-center items-center mt-5">
          <h1 className="text-white text-xl font-bold block w-auto h-auto bg-opacity-50 bg-gray-800 p-2 rounded-xl">
            Create Voting Material
          </h1>
          {/* Create Voting Material */}
          <section className="m-10 flex flex-col gap-3">
            <div className="flex flex-col items-center justify-center gap-2">
              {/* <label className="text-white text-l font-bold mx-4 drop-shadow-myShadow">
                Title
              </label> */}
              <input
                className="text-sm rounded-md drop-shadow-myShadow text-gray-800 font-bold p-2 outline-none focus:bg-gray-500 focus:text-white"
                type="text"
                maxLength="50"
                onChange={handleChangeTitle}
                placeholder="Title"
              ></input>
              <p className="font-bold p-2 rounded-xl">{messageTitle}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              {/* <label className="text-white text-l font-bold mx-4 drop-shadow-myShadow">
                Description
              </label> */}
              <textarea
                className="overflow-clip focus:overflow-auto text-sm rounded-md w-auto text-gray-800 drop-shadow-myShadow font-bold p-2 outline-none focus:bg-gray-500 focus:text-white resize-y max-h-40 min-h-40"
                type="text"
                onChange={handleChangeDesc}
                maxLength="250"
                placeholder="Description"
              ></textarea>
              <p className="font-bold p-2 rounded-xl">{messageDesc}</p>
            </div>
            <input
              type="submit"
              value="Submit"
              onClick={submitVote}
              className="text-white font-bold hover:bg-blue-700 p-3 bg-blue-500 rounded-lg m-auto"
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
