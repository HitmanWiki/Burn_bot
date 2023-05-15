/* 
    Enable burn bot by adding the project object here.
    We add all subscribed projects to this file for now. Will be migrated to the database when the right time comes.
*/
const projects = {
  "0xE2aF516F83beb76E15cFFdCeC00f7115C850F69b": {
    name: "MrBurns",
    ticker: "$Burns",
    telegram: "https://t.me/ape1333",
    contract: "0xE2aF516F83beb76E15cFFdCeC00f7115C850F69b",
    //  media: 
    //    "media/background.jpg",
    chatId: -1001911319414,
    buyLink:
      "https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x6de72ee8fa95d36ab1dc9952f17e4359c01a9372b&use=v2&chain=mainnet"
  },
  "0x6de72ee8fa95d36ab1dc9952f17e4359c01a9372": {
    name: "PEPEBURN",
    ticker: "$PEPE",
    telegram: "https://t.me/ape1333",
    contract: "0x6de72ee8fa95d36ab1dc9952f17e4359c01a9372",
    //  media: 
    //    "media/background.jpg",
    chatId: -1001911319414,
    buyLink:
      "https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x6de72ee8fa95d36ab1dc9952f17e4359c01a9372b&use=v2&chain=mainnet"
  }
};

module.exports = {
  projects
};
  