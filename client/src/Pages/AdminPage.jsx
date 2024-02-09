import React, { useEffect, useRef, useState } from "react";
import Web3 from "web3";
import ContractBuilder from "../contracts/EVoting.json";
import IconVote from "../vite.svg";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [accounts, setAccounts] = useState();
  const [contract, setContract] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [messageTitle, setMessageTitle] = useState("");
  const [messageDesc, setMessageDesc] = useState("");
  const [voteSelected, setVoteSelected] = useState(null);
  const [voteMaterial, setVoteMaterial] = useState([]);
  const [totalVoteMaterial, setTotalVoteMaterial] = useState(0);
  const [admin, setAdmin] = useState();
  const Goto = useNavigate();

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
        setTotalVoteMaterial(parseInt(totalVoting));

        //Check Privillage Account
        const privillageChecker = await instance.methods
          .isAdmin()
          .call({ from: account[0] });
        setAdmin(privillageChecker);
        //Checker
        if (privillageChecker == true || admin == true) {
          Goto("/evoting-online/managevote");
        } else if (privillageChecker == false || admin == false) {
          Goto("/evoting-online/vote");
        }

        //Get Vote Material Value
        const voteMaterialArray = [];
        for (let i = 0; i <= parseInt(totalVoting); i++) {
          const data = await instance.methods
            .votingMaterials(i)
            .call({ from: account[0] });
          voteMaterialArray.push(data);
        }
        setVoteMaterial(voteMaterialArray);
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

  //debug
  console.log(voteMaterial);
  console.log(totalVoteMaterial);

  //Create the vote
  const createVote = async () => {
    try {
      const akun = new Web3(window.ethereum);
      const gasPrice = 10000000000;
      const gasLimit = null;

      await contract.methods
        .createVotingMaterial(title.toString(), description.toString())
        .send({
          from: accounts[0],
          gas: gasLimit,
          gasPrice: gasPrice,
          maxPriorityFeePerGas: null,
          maxFeePerGas: null,
        })
        .then(() => {
          window.alert("Voting Material Created !");
          loadContract();
        });
    } catch (err) {
      window.alert(err);
    }
  };

  //debug
  return (
    <>
      <div className="flex flex-col items-center justify-center h-auto">
        <div className="bg-blue-300 h-auto w-auto pr-6 flex flex-row justify-between items-center rounded-xl">
          <h1 className="bg-gray-800 p-8 rounded-l-xl mr-80 text-white drop-shadow-myShadow text-3xl font-bold flex">
            Admin
          </h1>
          <h1 className="text-white hover:text-red-500 transition cursor-pointer drop-shadow-myShadow text-3xl font-bold flex">
            Logout
          </h1>
        </div>
        {/* <div className="bg-blue-300 h-auto w-auto my-4 flex flex-col justify-center items-center rounded-xl">
          <h1 className="text-white text-xl font-bold block w-auto h-auto bg-opacity-50 bg-gray-800 px-32 py-2 rounded-t-xl">
            Option
          </h1>
          <div className="flex flex-row my-4">
            <h1 className="text-green-200 cursor-pointer hover:bg-green-200 hover:text-gray-700 p-2 rounded-lg hover:drop-shadow-none drop-shadow-myShadow text-l mx-10 font-bold flex">
              Create
            </h1>
            <h1 className="text-red-200 cursor-pointer hover:bg-red-200 hover:text-gray-700 p-2 rounded-lg hover:drop-shadow-none drop-shadow-myShadow text-l mx-10 font-bold flex">
              Delete
            </h1>
          </div>
        </div> */}
        {/* Create Voting Material */}
        <div className="flex flex-row gap-5">
          <div className="bg-blue-300 h-auto w-auto rounded-xl flex flex-col justify-center items-center mt-4">
            <h1 className="text-white text-xl font-bold block w-auto h-auto bg-opacity-50 bg-gray-800 px-10 py-2 rounded-t-xl">
              Create Voting Material
            </h1>
            {/* Create Voting Material */}
            <section className="flex flex-col w-auto m-5 gap-3">
              <div className="flex flex-col items-center justify-center gap-2">
                {/* <label className="text-white text-l font-bold mx-4 drop-shadow-myShadow">
                Title
              </label> */}
                <input
                  className="text-sm rounded-md drop-shadow-myShadow text-gray-800 font-bold p-2 outline-none focus:bg-gray-500 focus:text-white"
                  type="text"
                  maxLength="50"
                  onChange={handleChangeTitle}
                  spellCheck="false"
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
                  spellCheck="false"
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
          <div className="bg-blue-300 h-auto w-auto rounded-xl flex flex-col justify-start items-center mt-4">
            <h1 className="text-white text-xl font-bold block w-auto h-auto bg-opacity-50 bg-gray-800 px-10 py-2 rounded-t-xl">
              Delete Voting Material
            </h1>
            {/* Create Voting Material */}
            <section className="flex flex-col w-auto m-5 gap-3">
              <div className="flex flex-col items-center justify-center gap-2">
                {/* <label className="text-white text-l font-bold mx-4 drop-shadow-myShadow">
                Title
              </label> */}
                <input
                  className="text-sm rounded-md drop-shadow-myShadow text-gray-800 font-bold p-2 outline-none focus:bg-gray-500 focus:text-white"
                  type=""
                  maxLength="50"
                  onChange={handleChangeTitle}
                  spellCheck="false"
                  placeholder="Title"
                ></input>
                <p className="font-bold p-2 rounded-xl">{messageTitle}</p>
              </div>
              
            </section>
          </div>
        </div>
        {/* Preview Voting */}
        <div className="bg-blue-300 h-auto w-auto rounded-xl flex flex-col mt-5">
          <h1 className="text-white text-xl font-bold block w-auto h-auto bg-opacity-50 bg-gray-800 p-2 rounded-t-xl">
            Preview Voting Material
          </h1>
          {/* Voting Card */}
          <div className="font-bold w-96 h-auto text-gray-800 justify-center items-start rounded-b-xl flex flex-col gap-4 list-none m-5">
            {voteMaterial
              .filter((txt) => txt.title !== "")
              .map((vote) => {
                for (let i = 0; i < voteMaterial.length; i++) {
                  console.log("Values :" + vote[0]);
                  return (
                    <li key={vote[0]}>
                      <a className="flex p-7 w-96 rounded-xl bg-blue-200 break-words h-auto gap-7">
                        <img src={IconVote} />
                        <div className="flex flex-col text-left w-96">
                          <h1 className="flex">{vote.title}</h1>
                          <p className="flex text-xs">{vote.desc}</p>
                          <p className="flex my-5 justify-between items-center">
                            Total Vote : {parseInt(vote.vote)}
                            <a className="text-white font-bold hover:bg-blue-700 p-3 bg-blue-500 rounded-lg cursor-pointer">
                              Vote
                            </a>
                          </p>
                        </div>
                      </a>
                    </li>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
