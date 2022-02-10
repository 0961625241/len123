import React from 'react';
import { useEffect, useState } from 'react';
import {Token}  from './../../abi/abi_swapExactETHForTokens.js'
import { Router } from "./../../abi/abi_uniswapRouter";
import {Pair} from './../../abi/abi_uniswapPair';
import Web3 from 'web3'
const SwapExactETHForTokens = () => {
    const [account, setAccount] = useState();
    const [ethBalance, setEthBalance] = useState();
    const [token, setToken] = useState();
    const [tokenBalance, setTokenBalance] = useState();
    const [ethSwap, setEthSwap] = useState();
    const [loading, setLoading] = useState(true);
   
    useEffect(async () => {
        await loadWeb3()
        await loadBlockchainData()
    }, [])

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    const loadBlockchainData = async () => {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts[0])
        const ethBalance = await web3.eth.getBalance(accounts[0])
        setEthBalance(ethBalance)

        const token = new web3.eth.Contract(Token.abi, Token.address)
        setToken(token)
        
        let tokenBalance = await token.methods.balanceOf(accounts[0]).call()
        setTokenBalance(tokenBalance.toString())

        const ethSwap = new web3.eth.Contract(Router.abi, Router.address)
        // console.log(ethSwap)
        setEthSwap(ethSwap)

        setLoading(false)
    }


     const buyTokens =async () => {
        const web3 = window.web3
        console.log(ethSwap)
        // this.setState({ loading: true })
      const getPairFor = await ethSwap.methods.getPairFor('0xc4AEdBCF39597798D43B3C2F9489F8EBdDb54Fb3','0xc778417E063141139Fce010982780140Aa0cD5Ab').call()
      console.log(getPairFor)
      let pairInstance =await new web3.eth.Contract(Pair.abi, getPairFor);
      let reserves = await pairInstance.methods.getReserves().call();
      console.log(reserves)
      let reserveETH;
      let reserveDAI;
      if ('0xc778417E063141139Fce010982780140Aa0cD5Ab' < '0xc4AEdBCF39597798D43B3C2F9489F8EBdDb54Fb3') {
        reserveETH = reserves[0];
        reserveDAI = reserves[1];
      } else {
        reserveETH = reserves[1];
        reserveDAI = reserves[0];
      }
      let daiAmountMin = await ethSwap.methods.getAmountOut(
        (0.1 * 10 ** 18).toString(),
        reserveETH,
        reserveDAI
      ).call();
      let receipt = await ethSwap.methods.swapExactETHForTokens(
        daiAmountMin,
        ['0xc778417E063141139Fce010982780140Aa0cD5Ab', '0xc4AEdBCF39597798D43B3C2F9489F8EBdDb54Fb3'],
        '0x09Ef1D2728fdAdFc3c78E65d8b154aB423d02D2C',
        '2000000000',
      ).send({ value: (0.1 * 10 ** 18).toString(), from: account })
      console.log(receipt)
      console.log("daiAmountMin:",Number(daiAmountMin / 10 ** 18).toString())
      console.log("reserveETH:",Number(reserveETH / 10 ** 18).toString())
      console.log("reserveDAI:",Number(reserveDAI / 10 ** 18).toString())
        // ethSwap.methods.SwapExactETHForTokens().send({ value: document.getElementById("amountEthUniswap").value, from: account }).on('transactionHash', (hash) => {
        //   this.setState({ loading: false })
        // })
      }

      const swapExactTokensForETH=async()=>{
        
        token.methods.approve(ethSwap._address, (100 * 10 ** 18).toString()).send({ from: account }).on('transactionHash', (hash) => {
          console.log(hash)
          ethSwap.methods.swapExactTokensForETH(
            (100 * 10 ** 18).toString(),
            (0* 10 ** 18).toString(),
            ['0xc4AEdBCF39597798D43B3C2F9489F8EBdDb54Fb3','0xc778417E063141139Fce010982780140Aa0cD5Ab'],
            '0x09Ef1D2728fdAdFc3c78E65d8b154aB423d02D2C',
            '2000000000',
          ).send({ from: account }).on('transactionHash', (hash) => {
            console.log(hash)
          })
        })
      }
    return <div>
        <p>SwapExactETHForTokens from  uniswap</p>
        
            <label>ETH:</label>
            <input id="amountEthUniswap"></input>
            <br></br>
            <label>DAPP:</label>
            <input></input>
            <br></br>
            <button type='button' className='btn ' onClick={buyTokens}>Swap</button>
            <br></br>
            <button type='button' className='btn ' onClick={swapExactTokensForETH}>swapExactTokensForETH</button>
     
    </div>;
};

export default SwapExactETHForTokens;