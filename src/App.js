import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import * as V from 'victory';
import { VictoryPie, VictoryLabel } from 'victory';
import { Link } from 'react-scroll';
import Faq from "react-faq-component";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";

import * as s from "./styles/globalStyles";
import logo from "./styles/Billie.gif"
import billieIcon from "./styles/BillieLogo.png"
import billieTitle from "./styles/BillieTitle.png"
import Anna from "./styles/Anna.png"
import Kleidi from "./styles/Kleidi.png"
import Gilmo from "./styles/Gilmo.png"
import Untai from "./styles/Untai.png"
import banner from "./styles/Banner.png"
import Roadmap from "./styles/Roadmap.png"
import About from "./styles/About.png"
import Team from "./styles/Team.png"
import Title from "./styles/Title.png"
import Rarities from "./styles/Rarities.png"
import FAQ from "./styles/FAQ.png"
import styled from "styled-components";
import { create } from "ipfs-http-client";


const faqData = {
  rows: [
      {
          title: "What Are NFTs?",
          content: `At a very high level, Non-fungible tokens / NFTs are items, such as artwork, that have been stored in the blockchain network. Once stored, these items cannot be changed or replaced. Hence, once created, the item lives in the network forever.`,
      },
      {
          title: "What is Minting?",
          content:
              "Minting is the process of creating a digital artwork to make it part of the blockchain. Our devs have coded the smart contract which allows anyone with a MetaMask account to mint the NFT straight from our website.",
      },
      {
          title: "How many Billie NFTs in total can be minted?",
          content: `10,000`,
      },
      {
          title: "When will pre-sale happen?",
          content: "Members who are whitelisted can participate in the pre-sale on October 15.",
      },
      {
          title: "What is the price of one mint?",
          content: "0.08 ETH + gas (get on the whitelist to save $$ on gas)",
      },
      {
          title: "How many can I mint?",
          content: "Pre-sale 2 maximum, public sale 10 maximum",
      },
  ],
};

const faqStyles = {
  bgColor: "transparent",
  fontFamily: "Marker felt",
  rowContentTextSize: "20px",
  rowTitleColor: "white",
  rowTitleTextSize: "30px",
  rowContentColor: 'white',
  arrowColor: "orange",
  rowContentPaddingTop: "10px",
  rowContentPaddingBottom: "10px",
};

const faqConfig = {
  animate: true,
  arrowIcon: "+",
  tabFocus: true
};

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("")
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
      <s.Header flex={1}>
        <s.TextSubTitle><img src={billieTitle} alt="Icon" style={{width: 300, height: 75, marginTop: 48}}/>
        </s.TextSubTitle>
          <s.Container fd={"row"} style={{maxWidth: "100%"}}>
          <Link to="about" spy={true} smooth={true}>
          <s.HeaderButton>About</s.HeaderButton>
          </Link>

          <Link to="rarities" spy={true} smooth={true}>
          <s.HeaderButton>Rarities</s.HeaderButton>
          </Link>

          <Link to="roadmap" spy={true} smooth={true}>
          <s.HeaderButton>Roadmap</s.HeaderButton>
          </Link>

          <Link to="faq" spy={true} smooth={true}>
          <s.HeaderButton>FAQ </s.HeaderButton>
          </Link>

          <Link to="team" spy={true} smooth={true}>
          <s.HeaderButton>Team</s.HeaderButton>
          </Link>
        </s.Container>

        </s.Header>

        <s.Container flex={1} ai={"center"} jc={"center"} style={{marginTop: 80, backgroundImage: `url("https://cdn.wallpapersafari.com/82/47/psdSje.jpg")`}}>
          <s.TextTitle style={{ textAlign: "center", alignSelf: "center", marginTop: 100 }}>
          <img src={Title} alt="About" style={{maxWidth: "100%", maxHeight: "100%"}}/>
          </s.TextTitle>
          <s.SpacerXSmall />
          <s.TextDescription style={{ textAlign: "center" }}>
            {feedback}
          </s.TextDescription>
          <s.SpacerSmall />
          {/* <s.MintButton
          disabled={claimingNFT ? 1 : 0}
            onClick={(e) => {
              e.preventDefault();
              claimNFTs(1)
            }}
          >
            {claimingNFT ? "BUSY MINTING" : "MINT 1 BILLIE" }
          </s.MintButton>
          <s.SpacerSmall />
          <s.MintButton
          disabled={claimingNFT ? 1 : 0}
            onClick={(e) => {
              e.preventDefault();
              claimNFTs(5)
            }}
          >
            {claimingNFT ? "BUSY MINTING" : "MINT 5 BILLIES" }
          </s.MintButton>
          <s.SpacerSmall />
          <s.MintButton
          disabled={claimingNFT ? 1 : 0}
            onClick={(e) => {
              e.preventDefault();
              claimNFTs(10)
            }}
          >
            {claimingNFT ? "BUSY MINTING" : "MINT 10 BILLIES" }
          </s.MintButton> */}
          <s.SpacerSmall/>
          <s.SpacerSmall />
          <s.ConnectButton
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
            }}
            style={{maxWidth: "100%", maxHeight: "100%"}}
          >
            <s.TextSubTitle>CONNECT</s.TextSubTitle>
          </s.ConnectButton>
          <s.SpacerSmall />

          {blockchain.errorMsg !== "" ? (
            <s.TextDescription>{blockchain.errorMsg}</s.TextDescription>
          ) : null}
          <img src={banner} alt="Banner" style={{maxWidth: "100%"}}/>
        </s.Container>

        <s.ContainerThree id="about" flex={1} ai={"center"} jc={"space-between"} style={{ padding: 100, backgroundColor: "#360368" }}>

        <s.TextSubTitle style={{alignSelf: "center"}}>
          <img src={About} alt="About" style={{maxWidth: "100%"}}/>
        </s.TextSubTitle>
        <s.Container fd={"row"} jc={"space-between"}>
          <s.TextDescription><img src={logo} alt="Logo" style={{borderRadius: 20, marginRight: 100, width: 300, height: 300}}/>
          </s.TextDescription>
          <s.TextDescription>In late 2021, the Billie Universes began to unravel.  A wormhole tore open the fabric of space and time and ripped the Billies from their home and sent them to the Metaverse.  Humans of Earth have finally discovered the secrets of the Metaverse and can not access it through the blockchain. 10,000 Billies lie dormant in this plane waiting for the Humans of Earth.  Will you be the hero to release a Billie from the Metaverse?
          </s.TextDescription>
        </s.Container>
        </s.ContainerThree>

        <s.ContainerTwo id="rarities" ai={"center"} style={{ padding: 100 }}>
          <s.TextTitle style={{alignSelf: "center"}}>
            <img src={Rarities} alt="Rarities" style={{maxWidth: "100%"}}/>
            </s.TextTitle>
          <svg width={600} height={600}>
          <VictoryLabel
            textAnchor="middle"
            style={{ fontFamily: "Marker felt", fontSize: 20, fill: "white" }}
            x={300} y={300}
            text="RARITIES"
          />
          <VictoryPie
            data={[
              { x: "Visible", y: 6000 },
              { x: "Hidden", y: 3000 },
              { x: "Rare", y: 800 },
              { x: "Mythic", y: 100 },
            ]}
            colorScale={["tomato", "orange", "gold", "green", "navy" ]}
            animate={{
              duration: 2000
            }}
            style={{ labels: { fontFamily: "Marker felt", fontSize: 20, fill: "white"}}}
            labels={({ datum }) => `${datum.x}`}
            padding={100}
            innerRadius={100}
            labelRadius={220}
            height={600} width={600}
          />
          </svg>
            <s.SpacerSmall/>
        </s.ContainerTwo>

        <s.Container id="roadmap" flex={1} ai={"center"} jc={"center"} style={{ padding: 100, backgroundColor: "#360368" }}>
            <s.TextTitle style={{alignSelf: "center"}}>
              <img src={Roadmap} alt="Roadmap" style={{maxWidth: "100%"}}/>
              </s.TextTitle>
            <s.SpacerMedium />

        <s.Container jc={"flex-end"}>
        <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
            <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
            <s.CheckMark />
            <s.SpacerSmall/>
            <s.TextSubTitle style={{backgroundColor: "#1f1f2e", padding: 20, borderRadius: 10, boxShadow: 20}}>
              10%
            </s.TextSubTitle>
            </s.Container>

            <s.SpacerSmall/>
            <s.TextDescription>1 ether will be given out in rewards and we will be airdropping 10 Billies, only to our whitelisted members.
            </s.TextDescription>
        </s.Container>
            <s.SpacerSmall/>
        <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>

        <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
            <s.CheckMark />
            <s.SpacerSmall/>
            <s.TextSubTitle style={{backgroundColor: "#1f1f2e", padding: 20, borderRadius: 10, boxShadow: 20}}>
              20%
            </s.TextSubTitle>
            </s.Container>
            <s.SpacerSmall/>
            <s.TextDescription>We will be airdropping 20 Billies randomly, available to all members.
            </s.TextDescription>
        </s.Container>
            <s.SpacerSmall/>
        <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>


            <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
            <s.Unchecked/>
            <s.SpacerSmall/>
            <s.TextSubTitle style={{backgroundColor: "#1f1f2e", padding: 20, borderRadius: 10, boxShadow: 20}}>
              30%
            </s.TextSubTitle>
            </s.Container>
            <s.SpacerSmall/>
            <s.TextDescription>30 winners, $15,000 total to be raffled to the community.
            </s.TextDescription>
        </s.Container>

        <s.SpacerSmall/>
        <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>


            <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
            <s.Unchecked/>
            <s.SpacerSmall/>
            <s.TextSubTitle style={{backgroundColor: "#1f1f2e", padding: 20, borderRadius: 10, boxShadow: 20}}>
              40%
            </s.TextSubTitle>
            <s.SpacerSmall/>
            </s.Container>

            <s.TextDescription>4 ether will be spent to sweep the floor and increase the floor price! All Billies will be given back to the community.
            </s.TextDescription>
        </s.Container>


        <s.SpacerSmall/>
        <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
          <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
            <s.Unchecked/>
            <s.SpacerSmall/>
            <s.TextSubTitle style={{backgroundColor: "#1f1f2e", padding: 20, borderRadius: 10, boxShadow: 20}}>
              50%
            </s.TextSubTitle>
            <s.SpacerSmall/>
          </s.Container>
            <s.TextDescription>$50,000 donated to a mental health charity. The charity will be picked by our community.
            </s.TextDescription>
        </s.Container>

        <s.SpacerSmall/>
        <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
          <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
            <s.Unchecked/>
            <s.SpacerSmall/>
            <s.TextSubTitle style={{backgroundColor: "#1f1f2e", padding: 20, borderRadius: 10, boxShadow: 20}}>
              60%
            </s.TextSubTitle>
            <s.SpacerSmall/>
          </s.Container>
            <s.TextDescription>600 free merchandise of your favorite Billie NFT! Merchandise type will be voted by community.
            </s.TextDescription>
        </s.Container>

        <s.SpacerSmall/>
        <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
          <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
            <s.Unchecked/>
            <s.SpacerSmall/>
            <s.TextSubTitle style={{backgroundColor: "#1f1f2e", padding: 20, borderRadius: 10, boxShadow: 20}}>
              70%
            </s.TextSubTitle>
            <s.SpacerSmall/>
          </s.Container>
            <s.TextDescription>7 Billie holders will have the chance to design their own Billie! Each one of these NFTs will be given rare attributes.
            </s.TextDescription>
        </s.Container>

        <s.SpacerSmall/>
        <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
          <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
            <s.Unchecked/>
            <s.SpacerSmall/>
            <s.TextSubTitle style={{backgroundColor: "#1f1f2e", padding: 20, borderRadius: 10, boxShadow: 20}}>
              80%
            </s.TextSubTitle>
            <s.SpacerSmall/>
          </s.Container>
            <s.TextDescription>8 Billie holders will be given concert tickets to the Happier Than Ever, The World Tour.
            </s.TextDescription>
        </s.Container>

        <s.SpacerSmall/>
        <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
          <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
            <s.Unchecked/>
            <s.SpacerSmall/>
            <s.TextSubTitle style={{backgroundColor: "#1f1f2e", padding: 20, borderRadius: 10, boxShadow: 20}}>
              90%
            </s.TextSubTitle>
            <s.SpacerSmall/>
          </s.Container>
            <s.TextDescription>9 ether will be spent to sweep the floor and increase the floor price! All Billies will be given back to the community.
            </s.TextDescription>
        </s.Container>

        <s.SpacerSmall/>
        <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
          <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
            <s.Unchecked/>
            <s.SpacerSmall/>
            <s.TextSubTitle style={{backgroundColor: "#1f1f2e", padding: 20, borderRadius: 10, boxShadow: 20}}>
              100%
            </s.TextSubTitle>
            <s.SpacerSmall/>
          </s.Container>
            <s.TextDescription>50% of ALL royalty proceeds be either distributed to current Billie holders OR be used to SWEEP the floor price.  Voted by the ccommunity! Which will you choose?
            </s.TextDescription>
        </s.Container>

        <s.SpacerSmall/>
        <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
          <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
            <s.Unchecked/>
            <s.SpacerSmall/>
            <s.TextSubTitle style={{backgroundColor: "#1f1f2e", padding: 20, borderRadius: 10, boxShadow: 20}}>
            <s.RocketIcon/>
            </s.TextSubTitle>
            <s.SpacerSmall/>
          </s.Container>
            <s.TextDescription>In addition to sharing in the royalties, holders will also be rewarded with Billie Coins. We will partner up with developers to create a liquidity pool and generate passive income!
            </s.TextDescription>
        </s.Container>
        </s.Container>
        </s.Container>

        <s.ContainerFour id="faq" flex={1} fd={"column"} ai={"center"} jc={"center"} style={{ padding: 100, marginRight: 150}}>
          <s.TextTitle>
            <img src={FAQ} alt="FAQ" style={{maxWidth: "100%"}}/>
          </s.TextTitle>
          <s.SpacerSmall/>

          <Faq
          data={faqData}
          styles={faqStyles}
          config={faqConfig}
          />

          <s.SpacerSmall/>
        </s.ContainerFour>

        <s.ContainerThree id="team" flex={1} fd={"column"} ai={"center"} jc={"center"} style={{ padding: 100, marginRight: 150, backgroundColor: "#1f1f2e" }}>
          <s.TextTitle style={{alignSelf: "center"}}>
            <img src={Team} alt="About" style={{maxWidth: "100%"}}/>
          </s.TextTitle>
          <s.SpacerSmall />

          <s.Billies ai={"center"} style={{flexWrap: "wrap"}}>

            <s.TextDescription>
              <img src={Kleidi} alt="Logo" style={ {borderRadius: 150, border: "2px solid black", boxShadow: "3px 3px black", width: 300, height: 300}}/>
            <s.SpacerXSmall/>
              <s.TextDescription style={{textAlign: "center", color: "black", backgroundColor: "#ff9999", padding: 10, borderRadius: 10, border: "2px solid black", boxShadow: "2px 2px black"}}>Kleidi
              <p>Director of Operations</p>
              </s.TextDescription>
              <s.SocialsButton href="https://www.linkedin.com/in/kleidimico/">
              <s.LinkedIn/>
              </s.SocialsButton>
            </s.TextDescription>

            <s.TextDescription><img src={Untai} alt="Logo" style={ {borderRadius: 150, border: "2px solid black", boxShadow: "3px 3px black", width: 300, height: 300}}/>
            <s.SpacerXSmall/>
              <s.TextDescription alignSelf={"center"} style={{textAlign: "center", color: "black", backgroundColor: "#e6ffb3", padding: 10, borderRadius: 10, border: "2px solid black", boxShadow: "2px 2px black"}}>Untai
              <p>Illustrator</p>
              </s.TextDescription>
              <s.SocialsButton href="https://www.untaikisah.com/">
                <s.Portfolio />
              </s.SocialsButton>
            </s.TextDescription>

            <s.TextDescription><img src={Gilmo} alt="Logo" style={ {borderRadius: 150, border: "2px solid black", boxShadow: "3px 3px black", width: 300, height: 300}}/>
            <s.SpacerXSmall/>
              <s.TextDescription alignSelf={"center"} style={{textAlign: "center", color: "black", backgroundColor: "#ff99ff", padding: 10, borderRadius: 10, border: "2px solid black", boxShadow: "2px 2px black"}}>Pacomang
              <p>Illustrator</p>
              </s.TextDescription>
              <s.SocialsButton href="https://www.instagram.com/papacocomama/">
              <s.Ig/>
              </s.SocialsButton>
            </s.TextDescription>

            <s.TextDescription><img src={Anna} alt="Logo" style={ {borderRadius: 150, border: "2px solid black", boxShadow: "3px 3px black", width: 300, height: 300}}/>
            <s.SpacerXSmall/>
              <s.TextDescription alignSelf={"center"} style={{textAlign: "center", color: "black", backgroundColor: "#ffff99", padding: 10, borderRadius: 10, border: "2px solid black", boxShadow: "2px 2px black"}}>Anya
              <p>Developer</p>
              </s.TextDescription>
              <s.SocialsButton href="https://github.com/av1082">
              <s.Git/>
              </s.SocialsButton>
            </s.TextDescription>

          </s.Billies>
        </s.ContainerThree>

        <s.Container id="footer" flex={1} ai={"flex-start"}style={{ padding: 30, backgroundColor: "#360368" }}>
        <s.TextDescription>© 2021 The Billies</s.TextDescription>
        </s.Container>
        <s.SocialsButton href="https://twitter.com/NFTBillies">
        <s.TwitterIcon />
        </s.SocialsButton>
        <s.SocialsButton href="https://discord.gg/ZCY7P55q">
        <s.Discord />
        </s.SocialsButton>
    </s.Screen>
  );
}

export default App;
