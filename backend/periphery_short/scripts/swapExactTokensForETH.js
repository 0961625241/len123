
module.exports = async () => {
    try {
      const { SWAP_EXACT_ETH_FOR_TOKENS, WETH, DEADLINE } = require('../constant');
      const UniswapV2Router02 = artifacts.require('UniswapV2Router02');
      const UniswapV2Pair = artifacts.require('IUniswapV2Pair');
      const ERC20 = artifacts.require('ERC20');
      let tokenAddress = '0xc4AEdBCF39597798D43B3C2F9489F8EBdDb54Fb3';
      console.log(tokenAddress)
      let daiInstance = await ERC20.at(tokenAddress);
      const uniswapV2Router02Instance = await UniswapV2Router02.deployed();
      await daiInstance.approve('0x558ebF0B5e699Ff8B10d92CB8af5be3739bE8F58', (100 * 10 ** 18).toString()).then(async (result)=>{
        console.log(result)
        let deadline = DEADLINE;
       
        let receipt = await uniswapV2Router02Instance.swapExactTokensForETH(
          (100 * 10 ** 18).toString(),
          (0* 10 ** 18).toString(),
          [tokenAddress,WETH],
          process.env.OPERATOR_ADDRESS,
          deadline,
        );
     console.log(receipt);
      });
     
      

      // let deadline = DEADLINE;
  
      // const uniswapV2Router02Instance = await UniswapV2Router02.deployed();
      // let pairAddress = await uniswapV2Router02Instance.getPairFor(tokenAddress, WETH);
      // let pairInstance = await UniswapV2Pair.at(pairAddress);
  
      // let reserves = await pairInstance.getReserves();
      // let reserveETH;
      // let reserveDAI;
  
      // if (WETH < SWAP_EXACT_ETH_FOR_TOKENS[process.argv[6]].address) {
      //   reserveETH = reserves[0];
      //   reserveDAI = reserves[1];
      // } else {
      //   reserveETH = reserves[1];
      //   reserveDAI = reserves[0];
      // }
  
      // let daiAmountMin = await uniswapV2Router02Instance.getAmountIn(
      //   (100 * 10 ** 18).toString(),
      //   reserveETH,
      //   reserveDAI
      // );
    
      
      // console.log("daiAmountMin",Number(daiAmountMin.toString()))
      //   console.log("reserveETH",Number(reserveETH.toString()));
      //   console.log("reserveDAI",Number(reserveDAI.toString()))
  //     let receipt = await uniswapV2Router02Instance.swapExactTokensForETH(
  //       (500 * 10 ** 18).toString(),
  //       (0* 10 ** 18).toString(),
  //       [tokenAddress,WETH],
  //       process.env.OPERATOR_ADDRESS,
  //       deadline,
  //     );
  //  console.log(receipt);
      process.exit(0);
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  };
  