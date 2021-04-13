import React, { Fragment, useEffect, useReducer, useState } from 'react';
//import classnames from 'classnames';
//import * as FormData from 'form-data';
import fetch from "node-fetch";
import { ethers } from "ethers";
import HeaderMinterStats from "../../components/Headers/HeaderMinterStats";
import config from '../../lib/config';

import * as contractRoot from '../../lib/contracts.json';

declare global {
  interface Window {
      ethereum:any;
  }
}

declare var window: any;

const formReducer = (state:any, event:any) => {
  return {
    ...state,
    [event.target.name]: event.target.value
  }
}

export default function CardMinter() {
  const [formCreateData, setFormCreateData] = useReducer(formReducer, {});
  const [formBalanceData, setFormBalanceData] = useReducer(formReducer, {});
  const [formMintData, setFormMintData] = useReducer(formReducer, {});
  const [formMetaData, setFormMetaData] = useReducer(formReducer, {});
  
  //const [activeTab, setActiveTab] = useState('');
  const [web3Provider, setWeb3Provider] = useState(null);
  const [metamaskProvider, setMetamaskProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [readOnlyContract, setReadOnlyContract] = useState(null);
  const [refreshingContract, setRefreshingContract] = useState(false);
  const [contractOwner, setContractOwner] = useState(null);
  const [contractUri, setContractUri] = useState(null);

  const [logText, setLogText] = useState(null);
  const [receiptLink, setReceiptLink] = useState(null);

  const [inProgress, setInProgress] = useState(false);

  /*const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }*/

  const initializeProvider = () => {

    // display contractRoot
    console.log(contractRoot);

    // initialize provider depending on network
      Object.keys(contractRoot).map(network => {
        let networkName = contractRoot[network].name;
        
        switch (networkName) {
          case "rinkeby":
            let rinkebyProvider: any = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/" + config.infuraKey);
            let metamaskProvider: any = new ethers.providers.Web3Provider(window.ethereum);
            setWeb3Provider(rinkebyProvider);
            setMetamaskProvider(metamaskProvider);
            setRefreshingContract(true);
          break;
        }
        })
  }

  const refreshContract = async () => {

    let contractAddress, contractAbi, erc1155, metamaskContract;

    Object.keys(contractRoot.contracts).map(contractName => {
      contractAddress = contractRoot.contracts[contractName].address;
      contractAbi = contractRoot.contracts[contractName].abi;
    })


    await window.ethereum.enable()
    erc1155 = new ethers.Contract(contractAddress, contractAbi, web3Provider);
    metamaskContract = new ethers.Contract(contractAddress, contractAbi, metamaskProvider.getSigner());
    
    metamaskContract.on("TransferSingle", (sender, from, to, id, amount, eventInfo) => {
      setLogText("Token id " + id + " created.");
      setReceiptLink("https://rinkeby.etherscan.io/tx/" + eventInfo.transactionHash);
      console.log(receiptLink)
    });

    setReadOnlyContract(erc1155);
    setContract(metamaskContract);

    let contractOwner = await erc1155.owner();
    setContractOwner(contractOwner);

    let contractUri = await erc1155.contractURI();
    setContractUri(contractUri);

    setRefreshingContract(false);
  
  }

  useEffect(() => {
      //setActiveTab(contractRoot.name);

      // on first call, initialize web3Provider
      if (web3Provider === null)
        initializeProvider();
      
      if (refreshingContract)
      {
        refreshContract();
      }
    }, [refreshingContract]);

  const handleCreateToken = async (event) =>
  {
    event.preventDefault(); 
    setInProgress(true);
    const form = event.target;
    console.log(form)
    const data = Object.entries(formCreateData);//new FormData(form);
    
    let parsedData:any = {};
    for (const [name,value] of data) {
      parsedData[name] = value;
    }
    console.log('data', parsedData)

    setLogText("Creating " + parsedData["initialSupply"] + " tokens for address " + parsedData["ownerAddress"] + "...");
    setReceiptLink(null);

    let result: any;

    try {
    result = await contract.create(
          parsedData["ownerAddress"], 
          parsedData["initialSupply"],
          "", []);
    } catch (e) {
      result = e;
    }

    try {
    setLogText(result.message.toString());
    } catch (e) {}
    setInProgress(false);

  }

  const handleMintToken = async (event) => {
    event.preventDefault(); 
    setInProgress(true);
    const form = event.target;
    const data = Object.entries(formMintData);
    let parsedData:any = {};
    for (const [name,value] of data) {
      parsedData[name] = value;
    }

    setLogText("Minting " + parsedData["quantity"] + 
               " of token id " + parsedData["token"] +
               " for address " + parsedData["ownerMintAddress"] + "...");
    setReceiptLink(null);

    let result;

    try {
    result = await contract.mint(
          parsedData["ownerMintAddress"], 
          parsedData["token"],
          parsedData["quantity"],
          []);
    } catch (e) {
      result = e;
    }

    try {
    setLogText(result.message.toString());
    } catch (e) {}
    setInProgress(false);
               
  }

const handleCheckBalance = async (event) => {
  event.preventDefault(); 
  //setInProgress(true);
  const form = event.target;
  const data = Object.entries(formBalanceData);//new FormData(form);
  let parsedData:any = {};
  for (const [name,value] of data) {
    parsedData[name] = value;
  }
 

  setLogText("Checking balance of token id " + parsedData["tokenToCheck"] +
             " for address " + parsedData["userAddress"] + "...");
  setReceiptLink(null);

  try {

    let result = await readOnlyContract.balanceOf(parsedData["userAddress"], parsedData["tokenToCheck"]);

    setLogText("Balance of token id " + parsedData["tokenToCheck"] +
    " for address " + parsedData["userAddress"] + ": " + result);

  } catch (e) {}

  setInProgress(false);
}

const handleGetMetadata = async (event) => {
  event.preventDefault(); 
  setInProgress(true);
  const form = event.target;
  const data = Object.entries(formMetaData);//new FormData(form);
  let parsedData:any = {};
  for (const [name,value] of data) {
    parsedData[name] = value;
  }

  setLogText("Getting metadata of token id " + parsedData["metadata"] + "...");
  setReceiptLink(null);

  try {

    let result = await readOnlyContract.uri(parsedData["metadata"]);
    let metadata = await (await fetch(result)).json();

    setLogText("uri: " + result + "\n" + "metadata: " + JSON.stringify(metadata, null, "\t"));

  } catch (e) {}

  setInProgress(false);
}

let _contract: string[];
Object.keys(contractRoot.contracts).map(contract => {
    _contract = [contract,contractRoot.contracts[contract].address];
})

  return (
    <Fragment>
    <HeaderMinterStats contract={_contract ? _contract : "Loading..."} ownercontract={contractOwner ? contractOwner : "Loading..."} pinata={contractUri ? contractUri : "Loading..."} />
    <div className="px-4 md:px-10 mx-auto w-full -m-24">
    <div className="flex flex-wrap">

    <div className="w-full xl:w-4/12 lg:w-6/12 px-4">
      
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
    <form onSubmit={handleCreateToken}>
    <div className="rounded-t bg-white mb-0 px-6 py-6">
    <div className="text-center flex justify-between">
    <h6 className="text-indigo-500 text-xl font-bold">Create Token</h6>
    <button
        className={`${inProgress ? 'bg-indigo-100 text-blueGray-100' : 'bg-indigo-500'} active:bg-indigo-300 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150`}
        disabled={inProgress}
        type="submit"
    >
        Create Token
    </button>
    </div>
    </div>
    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

    <h6 className="text-blueGray-400 text-xs mt-3 mb-6 font-bold uppercase">
        Contract Owner: {contractOwner ? contractOwner : "Loading..."}
    </h6>
    <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
        <div className="relative w-full mb-3">
            <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="ownerAddressId"
            >
            Owner Address
            </label>
            <input
            type="text"
            name="ownerAddress"
            id="ownerAddressId"
            onChange={setFormCreateData}
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="0x..."
            />
        </div>
        </div>
        <div className="w-full lg:w-12/12 px-4">
        <div className="relative w-full mb-3">
            <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="initialSupplyId"
            >
            Initial Supply
            </label>
            <input
            type="number"
            name="initialSupply"
            id="initialSupplyId"
            onChange={setFormCreateData}
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            defaultValue="1"
            />
        </div>
      
        </div>

        {/*
        Object.keys(contractRoot.contracts).map(contract => (
        <Fragment key={contract}>
        <h5>Contract Name: {contract}</h5>
        <h6>Address: {contractRoot.contracts[contract].address}</h6>
        <h6>Owner: {contractOwner ? contractOwner : "Loading..."}</h6>
        <h6>URI: {contractUri ? contractUri : "Loading..."}</h6>
        </Fragment>
        ))
        */}
        </div>
        
        </div>
        </form>

        </div>
        
        </div>

    <div className="w-full xl:w-4/12 lg:w-12/12 px-4">
    <form onSubmit={handleMintToken}>
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
    <div className="rounded-t bg-white mb-0 px-6 py-6">
    <div className="text-center flex justify-between">
    <h6 className="text-blueGray-700 text-xl font-bold">Mint Token</h6>
    
    <button
        className={`${inProgress ? 'bg-red-100 text-blueGray-100' : 'bg-red-500'} active:bg-red-300 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150`}
        disabled={inProgress}
        type="submit"
    >
        Mint Token
    </button>
    </div>
    </div>
    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
    
    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
       Mint your NFT
    </h6>
    <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
        <div className="relative w-full mb-3">
            <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="ownerMintAddressId"
            >
            Owner Address
            </label>
            <input
            type="text"
            name="ownerMintAddress"
            id="ownerMintAddressId"
            onChange={setFormMintData}
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="0x..."
            />
        </div>
        </div>
        <div className="w-full lg:w-6/12 px-4">
        <div className="relative w-full mb-3">
            <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="tokenId"
            >
            Token Id
            </label>
            <input
            type="number"
            name="token"
            id="tokenId"
            onChange={setFormMintData}
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            defaultValue="0"
            />
        </div>
        </div>
        <div className="w-full lg:w-6/12 px-4">
        <div className="relative w-full mb-3">
            <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="quantityId"
            >
            Quantity
            </label>
            <input
            type="number"
            name="quantity"
            id="quantityId"
            onChange={setFormMintData}
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            defaultValue="1"
            />
        </div>
        </div>  


        </div>
   
        </div>
        
        </div>
        </form>

        </div>


    <div className="w-full xl:w-4/12 lg:w-12/12 px-4">
    <form onSubmit={handleCheckBalance}>
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
    <div className="rounded-t bg-white mb-0 px-6 py-6">
    <div className="text-center flex justify-between">
    <h6 className="text-blueGray-700 text-xl font-bold">Check Balance</h6>
    
    <button
        className={`${inProgress ? 'bg-green-100 text-blueGray-100' : 'bg-green-500'} active:bg-green-300 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150`}
        disabled={inProgress}
        type="submit"
    >
        Check Balance
    </button>
    </div>
    </div>
    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
    
    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
        Check user address account balance
    </h6>
    <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
        <div className="relative w-full mb-3">
            <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="userAddressId"
            >
            User Address
            </label>
            <input
            type="text"
            name="userAddress"
            id="userAddressId"
            onChange={setFormBalanceData}
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="0x..."
            />
        </div>
        </div>
        <div className="w-full lg:w-12/12 px-4">
        <div className="relative w-full mb-3">
            <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="tokenToCheckId"
            >
            Token Id
            </label>
            <input
            type="number"
            name="tokenToCheck"
            id="tokenToCheckId"
            onChange={setFormBalanceData}
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            defaultValue="0"
            />
        </div>

        </div>        

        </div>
   
        </div>
        
        </div>
        </form>

        </div>

        <div className="flex-auto px-4 py-3 pt-0">
        <textarea className="text-xs" style={{width: "100%", height: "179px", backgroundColor: "#000000", color: "#ffffff" }} defaultValue={logText} />
        </div>


    <div className="w-full xl:w-12/12 lg:w-12/12 px-4">
    <form onSubmit={handleGetMetadata}>
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">

    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
    
    <h6 className="text-indigo-600 text-md mt-1 mb-6 font-bold uppercase">
        Get token metadata information
    </h6>
    <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
        <div className="relative w-full mb-3">
            <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="metadataId"
            >
            Token Id
            </label>
            <input
            type="number"
            name="metadata"
            id="metadataId"
            onChange={setFormMetaData}
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            defaultValue="0"
            />
        </div>

        </div>        

        <button
        className={`${inProgress ? 'bg-indigo-100 text-blueGray-100' : 'bg-indigo-500'} active:bg-indigo-300 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150`}
        disabled={inProgress}
        type="submit"
        >
            Get Metadata
        </button>

        </div>
   
        </div>
        
        </div>
        </form>

        </div>



      </div>
      </div>
    </Fragment>
  )
}