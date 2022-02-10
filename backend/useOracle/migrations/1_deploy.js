require('dotenv').config();
const GetTokenPrice = artifacts.require('GetTokenPrice');
const WETH = '0xc778417E063141139Fce010982780140Aa0cD5Ab';

module.exports = async function(deployer) {
  try {
    await deployer.deploy(
      GetTokenPrice,
      '0x4ebd90800801be4d65ab73620611e4552E2B9e77' /* Replace your factory address at here */,
      WETH
    );
  } catch (err) {
    console.log(err);
  }
};
