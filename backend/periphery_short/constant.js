const TOKENS = {
  daap: {
    address: '0xc4AEdBCF39597798D43B3C2F9489F8EBdDb54Fb3',
    amountDesired: (100 * 10 ** 18).toString(),
    amountMin: (50 * 10 ** 18).toString(),
    amountETHMin: (0.1 * 10 ** 18).toString(),
  },
};




const SWAP_EXACT_ETH_FOR_TOKENS = {
  daap: {
    address: '0xc4AEdBCF39597798D43B3C2F9489F8EBdDb54Fb3',
    amountETH: (0.1 * 10 ** 18).toString(),
  },
};

const WETH = '0xc778417E063141139Fce010982780140Aa0cD5Ab';
// const DX = '0xe34DB7dc1a6B207F2E7C67e931567e091528f96a';
const DEADLINE = '2000000000';

module.exports = { TOKENS, WETH , DEADLINE, SWAP_EXACT_ETH_FOR_TOKENS };
