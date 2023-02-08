import { React } from "react";
import "./App.css";
import { createClient } from "urql";
import { useState } from "react";

const APIURL = "https://polygon-mainnet.graph-eu.p2pify.com/a78b767f36d075a88d6493c5c947ed4d/PolygonPunks2";


const graphQLClient = createClient({
  url: APIURL,
});



function App() {
  


  //const  [query, newQuery] = useState("No query input yet");
  const [punks, newPunks] = useState("No query input yet");
  const [punkTransfers, newPunkTransfers] = useState(0);

  const punkQuery = `
  {
    punks(where: {id: "${punks}"}) {
      id
      originalOwner
      currentOwner
      blockNumber
      transactionHash
    }
  }
  `
  
  const transferQuery = `
  {
  punkTransfers(where: {tokenId: "${punkTransfers}"} orderBy:blockNumber, orderDirection:asc) {
    id
    tokenId
    oldOwner
    newOwner
    blockNumber
    transactionHash
    }
  }
  `

  // const queryChanged=(event)=>{
  //   newQuery(event.target.value);
  // }

  const PunksChanged=(event)=>{
    newPunks(event.target.value);
  }

  const PunkTransfersChanged=(event)=>{
    newPunkTransfers(event.target.value);
  }

 
  // async function fetchData() {
  //   const response = await graphQLClient.query(query).toPromise();
  //   console.log("response:", response);
  // }

  async function fetchPunks() {
    const response = await graphQLClient.query(punkQuery).toPromise();
    console.log("response:", response);

  }async function fetchPunkTransfers() {
    const response = await graphQLClient.query(transferQuery).toPromise();
    console.log("response:", response);
  }
  return (
    <div className="App">
      {/* <input type="text" placeholder='Enter GraphQL query here' onChange={queryChanged} className="textField" />
      <button className="button" onClick={fetchData}>Submit</button> */}
    
      <input type="text" placeholder='Enter tokenID here' onChange={PunksChanged} className="textField" />
      <button className="button" onClick={fetchPunks}>Fetch Punks</button>
      
      <input type="text" placeholder='Enter tokenID here' onChange={PunkTransfersChanged} className="textField" />
      <button className="button" onClick={fetchPunkTransfers}>Fetch Punk Transfers</button>
    </div>
  );
}

export default App;