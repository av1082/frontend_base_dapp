import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-scroll';
import Faq from "react-faq-component";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import CountDownTimer from './components/Countdown'
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import { create } from "ipfs-http-client";

import logo from "./styles/Billie.gif"
import banner from "./styles/Banner.png"
import Anna from "./styles/Anna.jpg"
import Kleidi from "./styles/Kleidi.jpg"
import Gilmo from "./styles/Gilmo.png"
import Untai from "./styles/Untai.png"
import ImageSlider from "./components/ImageSlider";
import {SliderData} from "./components/SliderData"


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
          content: "Members who are whitelisted can participate in the pre-sale on October 30th.",
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
  fontFamily: "Copperplate",
  rowContentTextSize: "20px",
  rowTitleColor: "white",
  rowTitleTextSize: "30px",
  rowContentColor: 'white',
  arrowColor: "#00e600",
  rowContentPaddingTop: "10px",
  rowContentPaddingBottom: "20px",
};

const faqConfig = {
  animate: true,
  arrowIcon: "+",
  tabFocus: true
};

const deadline = '2021-10-31';

function getTimeRemaining(endtime){
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor( (total/1000) % 60 );
  const minutes = Math.floor( (total/1000/60) % 60 );
  const hours = Math.floor( (total/(1000*60*60)) % 24 );
  const days = Math.floor( total/(1000*60*60*24) );

  return {
    total,
    days,
    hours,
    minutes,
    seconds
  };
}

function App() {

  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("")
  const [claimingNFT, setClaimingNFT] = useState(false)

  const daysHoursMinSecs = {days: getTimeRemaining(deadline).days, hours: getTimeRemaining(deadline).hours, minutes: getTimeRemaining(deadline).minutes, seconds: getTimeRemaining(deadline).seconds}

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
    <div class="body">
      <div class="header">
          {/* <div>
            <div class="subtitle">
              <span style={{color: "gray"}}>CRYPTO</span><span style={{color: "#00e600"}}>BILLIES</span>
            </div>
          </div> */}

          <div style={{display: "flex", flexDirection: "row", alignSelf: "flex-end", justifyContent: "space-between", flexWrap: "reverse"}}>
            <div>
              <Link to="about" spy={true} smooth={true}>
              <s.HeaderButton>About</s.HeaderButton>
              </Link>
            </div>

            {/* <Link to="rarities" spy={true} smooth={true}>
            <s.HeaderButton>Rarities</s.HeaderButton>
            </Link> */}
            <div>
              <Link to="roadmap" spy={true} smooth={true}>
              <s.HeaderButton>Roadmap</s.HeaderButton>
              </Link>
            </div>
            <div>
              <Link to="faq" spy={true} smooth={true}>
              <s.HeaderButton>FAQ </s.HeaderButton>
              </Link>
            </div>
            <div>
              <Link to="team" spy={true} smooth={true}>
              <s.HeaderButton>Team</s.HeaderButton>
              </Link>
            </div>
          </div>
        </div>


        <s.Container flex={1} ai={"flex-start"} jc={"flex-start"} style={{borderBottom: "0.5em solid #00e600"}}>
        <div style={{marginTop: 60, marginLeft: "5%"}}>
            <div class="subtitle">
              <span style={{color: "gray"}}>CRYPTO</span><span style={{color: "#00e600"}}>BILLIES</span>
            </div>
        </div>
        <s.SpacerMedium/>

        <div style={{paddingLeft: "5%", paddingRight: 60, paddingTop: 20}}>
          <div class="title">ten thousand billies living in the metaverse</div>
          <s.SpacerSmall/>
          <s.SpacerSmall/>
          <s.SpacerSmall/>
          <div style={{display: "flex", flexDirection: "column", alignSelf: "center"}}>
          <div class="soon">coming soon...</div>
          <s.SpacerSmall/>
          <div style={{alignSelf: "center"}}>
          <CountDownTimer daysHoursMinSecs={daysHoursMinSecs}/>
            </div>
          <s.SpacerXSmall />
          <div>
          <s.TextDescription>
            {feedback}
          </s.TextDescription>
          </div>
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
          <div style={{alignSelf: "center"}}>
          <s.ConnectButton
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
            }}
          >
            <div class="subtitle" style={{color: "white"}}>CONNECT</div>
          </s.ConnectButton>
          </div>
          </div>
          <s.SpacerSmall />

          {blockchain.errorMsg !== "" ? (
            <s.TextDescription>{blockchain.errorMsg}</s.TextDescription>
          ) : null}

          </div>
          <img src={banner} alt="Banner" style={{maxWidth: "100%"}}/>
        </s.Container>

      <div id="about" class="about">


        <div class="subtitle" style={{marginBottom: 80}}>METAVERSE</div>
          <div>
            <img src={logo} alt="Logo" style={{border: "2px solid #00e600", borderRadius: 30, width: "300px", height: "300px", alignSelf: "center", marginBottom: 40}}/>
          </div>
          <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
          <div class="description" style={{marginBottom: 30}}>In late 2021, the Billie Universe began to unravel.  A wormhole tore open the fabric of space and time, ripped the Billies from their home and sent them to the Metaverse. The Humans of Earth have finally discovered the secrets of the Metaverse and can now access them through the blockchain. 10,000 Billies lie dormant in this plane waiting to be released. Will you be the hero to free a Billie from the Metaverse?
          </div>

          <div class="description">
            Every Billie minted is created algorythmically through the ERC-721 token. No two Billies are the same. Once minted, each Billie will live on the blockchain indefinitely and cannot be altered.
          </div>
          </div>

        </div>

      <s.ContainerTwo id="rarities" ai={"center"} style={{backgroundColor: "transparent", paddingLeft: 20, paddingRight: 20, borderBottom: "0.2em solid #00e600", borderTop: "0.2em solid #00e600" }}>
          <div class="subtitle" style={{alignSelf: "center", color: "white", fontSize: "20px"}}>
            {/* <img src={Rarities} alt="Rarities" style={{maxWidth: "100%", marginTop: 40}}/> */}
            rarities coming soon!
          </div>
          {/* <ImageSlider slides={SliderData} />
          <s.SpacerSmall/> */}
        </s.ContainerTwo>



      <div id="roadmap" class="roadmap">
            <div class="subtitle">ROADMAP</div>
            <s.SpacerMedium />


        <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
            <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>

            <s.SpacerSmall/>
            <div class="subtitle" style={{backgroundColor: "transparent", color: "white", marginRight: 35}}>
            [10%]
            </div>
            <s.SpacerSmall/>
            </s.Container>
            <div class="description">1 ether will be given out in rewards and we will be airdropping 10 Billies, only to our whitelisted members.
            </div>
        </s.Container>
            <s.SpacerSmall/>
        <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>

        <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>

            <s.SpacerSmall/>
            <div class="subtitle" style={{backgroundColor: "transparent", color: "white", marginRight: 35}}>
            [20%]
            </div>
            <s.SpacerSmall/>
            </s.Container>
            <div class="description">We will be airdropping 20 Billies randomly, available to all members.
            </div>
        </s.Container>
            <s.SpacerSmall/>
        <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>


            <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>

            <s.SpacerSmall/>
            <div class="subtitle" style={{backgroundColor: "transparent", color: "white", marginRight: 35}}>
            [30%]
            </div>
            <s.SpacerSmall/>
            </s.Container>

            <div class="description">30 winners, $15,000 total to be raffled to the community.
            </div>
        </s.Container>

        <s.SpacerSmall/>
        <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>


            <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>

            <s.SpacerSmall/>
            <div class="subtitle" style={{backgroundColor: "transparent", color: "white", marginRight: 35}}>
            [40%]
            </div>
            <s.SpacerSmall/>
            </s.Container>

            <div class="description">4 ether will be spent to sweep the floor and increase the floor price! All Billies will be given back to the community.
            </div>
        </s.Container>

        <s.SpacerSmall/>
        <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
          <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>

            <s.SpacerSmall/>
            <div class="subtitle" style={{backgroundColor: "transparent", color: "white", marginRight: 35}}>
            [50%]
            </div>
            <s.SpacerSmall/>
          </s.Container>
            <div class="description">$50,000 donated to a mental health charity. The charity will be picked by our community.
            </div>
        </s.Container>

        <s.SpacerSmall/>
        <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
          <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>

            <s.SpacerSmall/>
            <div class="subtitle" style={{backgroundColor: "transparent", color: "white", marginRight: 35}}>
            [60%]
            </div>
            <s.SpacerSmall/>
          </s.Container>
            <div class="description">600 free merchandise of your favorite Billie NFT! Merchandise type will be voted by community.
            </div>
        </s.Container>

        <s.SpacerSmall/>
        <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
          <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>

            <s.SpacerSmall/>
            <div class="subtitle" style={{backgroundColor: "transparent", color: "white", marginRight: 35}}>
            [70%]
            </div>
            <s.SpacerSmall/>
          </s.Container>
            <div class="description">7 Billie holders will have the chance to design their own Billie! Each one of these NFTs will be given rare attributes.
            </div>
        </s.Container>

        <s.SpacerSmall/>
        <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
          <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>

            <s.SpacerSmall/>
            <div class="subtitle" style={{backgroundColor: "transparent", color: "white", marginRight: 35}}>
            [80%]
            </div>
            <s.SpacerSmall/>
          </s.Container>
            <div class="description">8 Billie holders will be given concert tickets to the Happier Than Ever, The World Tour.
            </div>
        </s.Container>

        <s.SpacerSmall/>
        <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
          <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>

            <s.SpacerSmall/>
            <div class="subtitle" style={{backgroundColor: "transparent", color: "white", paddingRight: 35}}>
            [90%]
            </div>
            <s.SpacerSmall/>
          </s.Container>
            <div class="description">9 ether will be spent to sweep the floor and increase the floor price! All Billies will be given back to the community.
            </div>
        </s.Container>

        <s.SpacerSmall/>
        <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
          <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>

            <s.SpacerSmall/>
            <div class="subtitle" style={{backgroundColor: "transparent", color: "white", paddingRight: 10}}>
              [100%]
            </div>
            <s.SpacerSmall/>
          </s.Container>
            <div class="description">50% of ALL royalty proceeds be either distributed to current Billie holders OR be used to SWEEP the floor price.  Voted by the ccommunity! Which will you choose?
            </div>
        </s.Container>

        <s.SpacerSmall/>
        {/* <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>
          <s.Container fd={"row"} ai={"center"} jc={"flex-start"}>

            <s.SpacerSmall/>
            <div class="beyond" style={{backgroundColor: "transparent", paddingRight: 25}}>
            [beyond]
            </div>

            <s.SpacerSmall/>
          </s.Container>
            <div class="description">In addition to sharing in the royalties, holders will also be rewarded with Billie Coins. We will partner up with developers to create a liquidity pool and generate passive income!
            </div>
        </s.Container> */}

      </div>
      <div id="faq" class="faq">
          <div class="subtitle">
            FAQ IT UP!
          </div>
          <s.SpacerMedium />
          <s.Container >
          <Faq
          data={faqData}
          styles={faqStyles}
          config={faqConfig}
          />
          </s.Container>

          <s.SpacerSmall/>
        </div>

      <div id="team" class="team">
          <div class="subtitle">
            TEAM
          </div>
          <s.SpacerMedium />

          <s.Billies ai={"center"} style={{flexWrap: "wrap", padding: 10}}>

            <s.TextDescription>
              <img src={Kleidi} alt="Logo" style={ {borderRadius: 50, border: "3px solid #00e600", width: 250, height: 250}}/>
            <s.SpacerXSmall/>
              <s.TextDescription style={{color: "white", backgroundColor: "transparent", padding: 10}}>KLEIDI
              <p style={{fontSize: 25}}>Project Lead</p>
              </s.TextDescription>
              <s.SocialsButton href="https://www.linkedin.com/in/kleidimico/" target="_blank">
              <s.LinkedIn/>
              </s.SocialsButton>
            </s.TextDescription>

            <s.TextDescription>
            <img src={Untai} alt="Logo" style={{borderRadius: 50, border: "3px solid #00e600", width: 250, height: 250}}/>
            <s.SpacerXSmall/>
              <s.TextDescription alignSelf={"center"} style={{color: "white", padding: 10 }}>UNTAI
              <p style={{fontSize: 25}}>Illustrator</p>
              </s.TextDescription>
              <s.SocialsButton href="https://www.untaikisah.com/" target="_blank">
                <s.Portfolio />
              </s.SocialsButton>
            </s.TextDescription>

            <s.TextDescription>
            <img src={Gilmo} alt="Logo" style={{borderRadius: 50, border: "3px solid #00e600", width: 250, height: 250}}/>
            <s.SpacerXSmall/>
              <s.TextDescription alignSelf={"center"} style={{color: "white", padding: 10 }}>PACOMANG
              <p style={{fontSize: 25}}>Illustrator</p>
              </s.TextDescription>
              <s.SocialsButton href="https://www.instagram.com/papacocomama/" target="_blank">
              <s.Ig/>
              </s.SocialsButton>
            </s.TextDescription>

            <s.TextDescription>
            <img src={Anna} alt="Logo" style={{borderRadius: 50, border: "3px solid #00e600", width: 250, height: 250}}/>
            <s.SpacerXSmall/>
              <s.TextDescription alignSelf={"center"} style={{color: "white", padding: 10 }}>ANYA
              <p style={{fontSize: 25}}>Developer</p>
              </s.TextDescription>
              <s.SocialsButton href="https://github.com/av1082" target="_blank">
              <s.Git/>
              </s.SocialsButton>
            </s.TextDescription>

          </s.Billies>
        </div>

      <s.Container id="footer" flex={1} ai={"flex-start"} style={{ padding: 30}}>
        <div class="description">© 2021 CryptoBillies</div>
      </s.Container>

        <s.SocialsButton href="https://twitter.com/NFTBillies" target="_blank">
        <s.TwitterIcon />
        </s.SocialsButton>

        <s.SocialsButton href="https://www.instagram.com/cryptobillies/" target="_blank">
        <s.Ig style={{position: "fixed", right: "120px", bottom: "15px"}}/>
        </s.SocialsButton>

        <s.SocialsButton href="https://discord.gg/ZCY7P55q" target="_blank">
        <s.Discord />
        </s.SocialsButton>
    </div>
  );
}

export default App;
