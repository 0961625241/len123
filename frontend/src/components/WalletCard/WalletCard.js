import { useEffect, useState } from "react";
import Web3 from "web3";
import { Factory } from "./../../abi/abi_uniswapFactory";
import { Router } from "./../../abi/abi_uniswapRouter";
const WalletCard = () => {
    const web3 = new Web3(Web3.givenProvider);
    const [account, setAccount] = useState();
    const [balance, setBalance] = useState();
    const [allPair,setAllPair] = useState('');
    const [getPair,setGetPair] = useState('');
    const [getPairFor,setGetPairFor] = useState('');
    useEffect(() => {
        (async () => {
            const acc = (await web3.eth.getAccounts()) && (await web3.eth.requestAccounts());
            const bal = await web3.eth.getBalance(acc[0]);
            setAccount(acc[0]);
            setBalance(web3.utils.fromWei(bal, 'ether'));
        })();
    }, [])


    const buttonSendEther=()=>{
       web3.eth.sendTransaction(
            {
                from:document.getElementById("fromEther").value,
            to:document.getElementById("toEther").value,
            value: web3.utils.toWei(document.getElementById("valueEther").value, "ether")
                }, function(err, transactionHash) {
          if (!err)
            console.log(transactionHash + " success"); 
        });
    }
   
    const onFactory=async ()=>{
        const factory = new web3.eth.Contract(Factory.abi, Factory.address);
        let allPairs = await factory.methods.allPairs(2).call();
        setAllPair(allPairs)
    }
    const btnCreatePair=async()=>{
        const factory = new web3.eth.Contract(Factory.abi, Factory.address);
        let createPairx = await factory.methods.createPair(document.getElementById("tokenDX").value,document.getElementById("tokenWETH").value).send({from:account})
        // console.log(createPairx)
        
        console.log(createPairx)
    }
    const getPairx=async()=>{
        const factory = new web3.eth.Contract(Factory.abi, Factory.address);
        let getPairx = await factory.methods.getPair(document.getElementById("getDX").value,document.getElementById("getWETH").value).call();
        console.log(getPairx)
        setGetPair(getPairx)
    }

    const getPairForx=async()=>{
        const router = new web3.eth.Contract(Router.abi, Router.address);
        let getPairForx = await router.methods.getPairFor(document.getElementById("getForDX").value,document.getElementById("getForWETH").value).call();
        console.log(getPairForx)
        setGetPairFor(getPairForx)
    }
    
    return (
    <div>
        <div className="account">
            <p>account :</p><p>{account}</p>
            <p>balance :</p><p>{balance}</p>
        </div>
        <div className="sendEther">
            <p>Send Ether</p>
            <label>From</label>
            <input id="fromEther" ></input>
            <label>To</label>
            <input id="toEther"></input>
            <label>Value</label>
            <input id="valueEther"></input>
            <button onClick={buttonSendEther} className="buttonSendEther">Send Ether</button>
        </div>
        <div className="factory" >
            <button onClick={onFactory} className="btnFactory">Factory</button>
            <div>{allPair}</div>
        </div>
        <div className="createPair">
            <p>createPair</p>
            <label>address DX</label>
            <input id="tokenDX" ></input>
            <label>address WETH</label>
            <input id="tokenWETH"></input>
            <button className="btnCreatePair" onClick={btnCreatePair}>Create Pair</button>
        </div>
        <div className="getPair">
            <p>Get Pair</p>
            <label>address DX</label>
            <input id="getDX" ></input>
            <label>address WETH</label>
            <input id="getWETH"></input>
         
             <button onClick={getPairx} className="btnFactory">Get Pair</button>
            <p>{getPair}</p>
        </div>
        <div className="getPairFor">
            <p>Get Pair For</p>
            <label>address DX</label>
            <input id="getForDX" ></input>
            <label>address WETH</label>
            <input id="getForWETH"></input>
         
             <button onClick={getPairForx} className="btnFactory">Get Pair For</button>
            <p>{getPairFor}</p>
        </div>
    </div>)

}

export default WalletCard;
