const evotingContract = artifacts.require("EVoting");

module.exports = function(deployer) {
  deployer.deploy(evotingContract);
    // .then((deployedInstance) => {
    //   console.log("Contract Address : ", deployedInstance);
    // });
};