const ethers = require("ethers");
const IBurnsABI = require("../abi/IBurns.json");
const subscribedProjects = require("../projects").projects;
const { calcDollarAmount } = require("../utils");
const { fakeWallet } = require("../constants");

const DEAD_WALLET = "0x000000000000000000000000000000000000dEaD";
const Burns_CONTRACT = "0xE2aF516F83beb76E15cFFdCeC00f7115C850F69b";

const sendJSONresponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

const getTokens = (req, res) => {
  const supportedTokens = [];
  for (let [contract, token] of Object.entries(subscribedProjects)) {
    supportedTokens.push({
      name: token.name,
      ticker: token.ticker,
      telegram: token.telegram,
      contract: contract,
      buyLink: token.buyLink
    });
  }

  sendJSONresponse(res, 200, supportedTokens);
};

const getToken = async (req, res) => {
  const { token } = req.params;

  if (token !== Burns_CONTRACT) {
    sendJSONresponse(res, 400, { message: "Token not supported!" });
  }

  // Get burn data for token
  const tokenContract = new ethers.Contract(token, IBurnsABI, fakeWallet);
  const deadBalance = await tokenContract.balanceOf(DEAD_WALLET);
  const totalSupply = await tokenContract.totalSupply();
  const percentageDead = ((deadBalance / totalSupply) * 100).toFixed(2);
  const totalDollarsBurned = await calcDollarAmount(token, totalSupply);

  const selectedToken = subscribedProjects[token.toLowerCase()] || {};

  const payload = {
    name: selectedToken.name,
    ticker: selectedToken.ticker,
    telegram: selectedToken.telegram,
    contract: selectedToken.contract,
    buyLink: selectedToken.buyLink,
    burn: {
      percentage: percentageDead,
      amountInUSD: Math.trunc(ethers.utils.formatUnits(totalDollarsBurned, 6))
    }
  };

  sendJSONresponse(res, 200, payload);
};

module.exports = { getTokens, getToken };
