require('dotenv').config();
const UniswapV2Router02 = artifacts.require('UniswapV2Router02');
const { WETH } = require('../constant');

module.exports = async function(deployer) {
  try {
    await deployer.deploy(
      UniswapV2Router02,
      '0x4ebd90800801be4d65ab73620611e4552E2B9e77' /* Replace your factory address at here */,
      WETH,
      {
        gas: 8000000,
        from: process.env.OPERATOR_ADDRESS,
      }
    );
  } catch (err) {
    console.log(err);
  }
};
