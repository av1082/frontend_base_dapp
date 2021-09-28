import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import logo from "./styles/Billie.gif"
import styled from "styled-components";
import { create } from "ipfs-http-client";

export const StyledButton = styled.button`
  padding: 8px;
  border-radius: 10;
  fill: rebeccapurple
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("Maybe it's your lucky day ;)")
  const [claimingNFT, setClaimingNFT] = useState(false)

  const claimNFTs = (_amount) => {
    setClaimingNFT(true);
    blockchain.smartContract.methods.mint(blockchain.account, _amount).send({
      from: blockchain.account,
      value: blockchain.web3.utils.toWei((0.05 * _amount).toString(), "ether")
    }).once("error", (err)=> {
      console.log(err)
      setFeedback("Something went wrong :/ Try again!")
      setClaimingNFT(false)
    }).then((receipt) => {
      setFeedback("Successfully Minted!");
      setClaimingNFT(false);
    })
  };

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.smartContract, dispatch]);

  return (
    <s.Screen>
      {blockchain.account === "" || blockchain.smartContract === null ? (
        <s.Container flex={1} ai={"center"} jc={"center"}>
          <s.TextTitle>Connect to the Blockchain</s.TextTitle>
          <s.SpacerSmall />
          <StyledButton
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
            }}
          >
            CONNECT
          </StyledButton>
          <s.SpacerSmall />
          {blockchain.errorMsg !== "" ? (
            <s.TextDescription>{blockchain.errorMsg}</s.TextDescription>
          ) : null}
        </s.Container>
      ) : (
        <s.Container flex={1}>
        <s.Container flex={1} ai={"center"} jc={"center"} style={{ padding: 24, backgroundImage: `url("https://nerdist.com/wp-content/uploads/2020/07/56FDA052-95A8-496F-A3B0-A76E98BDB863.png")` }}>
          <s.TextTitle style={{ textAlign: "center", marginTop: 100 }}>
            Grab one of the NFTs
          </s.TextTitle>
          <s.SpacerXSmall />
          <s.TextDescription style={{ textAlign: "center" }}>
            {feedback}
          </s.TextDescription>
          <s.SpacerSmall />
          <StyledButton
          disabled={claimingNFT ? 1 : 0}
            onClick={(e) => {
              e.preventDefault();
              claimNFTs(1)
            }}
          >
            {claimingNFT ? "BUSY MINTING" : "MINT 1 BILLIE NFT" }
          </StyledButton>
          <s.SpacerSmall />
          <StyledButton
          disabled={claimingNFT ? 1 : 0}
            onClick={(e) => {
              e.preventDefault();
              claimNFTs(5)
            }}
          >
            {claimingNFT ? "BUSY MINTING" : "MINT 5 BILLIE NFTs" }
          </StyledButton>
          <s.SpacerSmall />
        </s.Container>
        <s.Container flex={1} ai={"center"} jc={"center"} style={{ padding: 24, backgroundColor: "#ffa64d" }}>
          <s.TextTitle>THE BILLIES</s.TextTitle>

          <s.Billies>
          <img src={logo} alt="Loading"/> </s.Billies>
          <s.TextSubTitle>Rarities</s.TextSubTitle>
        </s.Container>
        </s.Container>
      )}
    </s.Screen>
  );
}

export default App;
