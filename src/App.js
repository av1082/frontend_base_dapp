import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import * as V from 'victory';
import { VictoryPie, VictoryLabel } from 'victory';
import { Link } from 'react-scroll';
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import logo from "./styles/Billie.gif"
import billieIcon from "./styles/BillieLogo.png"
import Anna from "./styles/Anna.png"
import Kleidi from "./styles/Kleidi.png"
import Gilmo from "./styles/Gilmo.png"
import Untai from "./styles/Untai.png"
import banner from "./styles/Banner.png"
import styled from "styled-components";
import { create } from "ipfs-http-client";


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
      {/* {blockchain.account === "" || blockchain.smartContract === null ? (
        <s.Container flex={1} ai={"center"} jc={"center"}>
          <s.TextTitle>Connect to the Blockchain</s.TextTitle>
          <s.SpacerSmall />
          <s.StyledButton
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
            }}
          >
            CONNECT
          </s.StyledButton>
          <s.SpacerSmall />
          {blockchain.errorMsg !== "" ? (
            <s.TextDescription>{blockchain.errorMsg}</s.TextDescription>
          ) : null}
        </s.Container>
      ) : ( */}

      <s.Container flex={1}>
        <s.Header>
        <s.TextSubTitle><img src={billieIcon} alt="Icon" style={{width: 300, height: 300, marginTop: 160}}/>
        </s.TextSubTitle>
          <s.TextSubTitle>
          <s.HeaderButton>
          <Link  to="about" spy={true} smooth={true}>
            About
          </Link>
          </s.HeaderButton>
          <s.HeaderButton>
          <Link to="rarities" spy={true} smooth={true}>
            Rarities
          </Link>
          </s.HeaderButton>
          <s.HeaderButton>
          <Link to="roadmap" spy={true} smooth={true}>
            Roadmap
          </Link>
          </s.HeaderButton>
          <s.HeaderButton>
          <Link to="faq" spy={true} smooth={true}>
            FAQ
          </Link>
          </s.HeaderButton>
          <s.HeaderButton>
          <Link to="team" spy={true} smooth={true}>
            Team
          </Link>
          </s.HeaderButton>
          </s.TextSubTitle>
        </s.Header>

        <s.Container flex={1} ai={"center"} jc={"center"} style={{marginTop: 80,  backgroundImage: `url("https://cdn.wallpapersafari.com/82/47/psdSje.jpg")` }}>
          <s.TextTitle style={{ textAlign: "center", alignSelf: "center", marginTop: 100 }}>
            Release a Billie!
          </s.TextTitle>
          <s.SpacerXSmall />
          <s.TextDescription style={{ textAlign: "center" }}>
            {feedback}
          </s.TextDescription>
          <s.SpacerSmall />
          <s.MintButton
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
          </s.MintButton>
          <s.SpacerSmall/>
          <s.SpacerSmall />
          <s.ConnectButton
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
            }}
          >
            <s.TextSubTitle>CONNECT</s.TextSubTitle>
          </s.ConnectButton>
          <s.SpacerSmall />

          {blockchain.errorMsg !== "" ? (
            <s.TextDescription>{blockchain.errorMsg}</s.TextDescription>
          ) : null}
          <img src={banner} alt="Banner"/>
        </s.Container>


        <s.ContainerThree id="about" flex={1} ai={"center"} jc={"center"} style={{ padding: 100, backgroundColor: "#360368" }}>
          <s.TextTitle>THE BILLIES</s.TextTitle>
          <s.SpacerMedium />
          <s.Billies jc={"space-around"}>
            <s.TextSubTitle><img src={logo} alt="Logo" style={ {borderRadius: 60, width: 350, height: 350, marginRight: 200}}/></s.TextSubTitle>
            <s.SpacerMedium/>
          <s.Billies fd={"column"}>
          <s.TextSubTitle style={{alignSelf: "center"}}>How it all began...</s.TextSubTitle>
          <s.SpacerSmall />
          <s.TextDescription style={{alignSelf: "center"}}>In late 2021, the Billie Universes began to unravel.  A wormhole tore open the fabric of space and time and ripped the Billies from their home and sent them to the Metaverse.  Humans of Earth have finally discovered the secrets of the Metaverse and can not access it through the blockchain. 10,000 Billies lie dormant in this plane waiting for the Humans of Earth.  Will you be the hero to release a Billie from the Metaverse?</s.TextDescription>
          </s.Billies>
          </s.Billies>
        </s.ContainerThree>

        <s.ContainerTwo id="rarities" ai={"center"} style={{ padding: 100 }}>
          <s.TextTitle style={{alignSelf: "flex-end"}}>RARITIES</s.TextTitle>
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
            <s.SpacerMedium/>
          {/* <s.Billies fd={"column"}>
          <s.TextSubTitle style={{alignSelf: "center"}}>Who are we?</s.TextSubTitle>
          <s.SpacerSmall />
          <s.TextDescription style={{alignSelf: "center"}}>description</s.TextDescription>
          </s.Billies> */}

        </s.ContainerTwo>


        <s.Container id="roadmap" flex={1} ai={"center"} jc={"center"} style={{ padding: 100, backgroundColor: "#360368" }}>
            <s.TextTitle>ROADMAP</s.TextTitle>
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
            <s.TextDescription>30 winners of $15,000 total will be selected for giveaways.
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

            <s.TextDescription>4 ether will be spent to sweep the floor and increase the floor price! All Billies will be given back to the community members who have listed their Billies above a certain price or not listed at all.
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
            <s.TextDescription>$50,000 donated to a mental health charity. Our team wants to raise awareness on mental health and we want to contribute in that mission.  The charity will be picked by our community. Polls will be send out in our Discord channel for a vote.
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
            <s.TextDescription>600 free merchandise of your favorite Billie NFT! NFT can be printed on any colored sweatshirt, sweater, shirt, hat, sock or pillow and will be sent to your street address.  Forms to be sent on Discord.
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
            <s.TextDescription>7 Billie holders will have the chance to design their own Billie! Each one of these NFTs will be given rare attributes. Our artists will work with you from the initial sketch down to the last detail of every attribute.  Holders of these NFTs will receive a special role in the Discord channel and will be given other secret prizes.
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
            <s.TextDescription>8 Billie holders will be given concert tickets to the Happier Than Ever, The World Tour. Tickets will be given out based on the location preference of the winners.
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
            <s.TextDescription>9 ether will be spent to sweep the floor and increase the floor price! All Billies will be given back to our community members who have listed their Billies above a certain price or not listed at all.
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
            <s.TextDescription>10% of all royalty proceeds will be added to the community chest and distributed as a dividend to current holders. In addition, we plan to reward Billie holders by redistributing the royalties to members on a monthly basis. This means that holding a Billie will allow you to share in the revenues of all future sales.
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
            <s.TextDescription>10% of all royalty proceeds will be added to the community chest and distributed as a dividend to current holders. In addition, we plan to reward Billie holders by redistributing the royalties to members on a monthly basis. This means that holding a Billie will allow you to share in the revenues of all future sales.
            </s.TextDescription>
        </s.Container>
        </s.Container>
        </s.Container>

        <s.ContainerFour id="faq" flex={1} fd={"column"} ai={"center"} jc={"center"} style={{ padding: 100, marginRight: 150}}>
          <s.TextTitle style={{alignSelf: "flex-end"}}>FAQ IT UP!</s.TextTitle>
          <s.SpacerMedium />
        </s.ContainerFour>

        <s.ContainerThree id="team" flex={1} fd={"column"} ai={"center"} jc={"center"} style={{ padding: 100, marginRight: 150, backgroundColor: "#1f1f2e" }}>
          <s.TextTitle style={{alignSelf: "flex-start"}}>BILLIE'S BUILDERS</s.TextTitle>
          <s.SpacerMedium />

          <s.Billies ai={"center"} style={{flexWrap: "wrap"}}>

            <s.TextDescription><img src={Kleidi} alt="Logo" style={ {borderRadius: 150, border: "2px solid black", boxShadow: "3px 3px black", width: 300, height: 300}}/>
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
        </s.Container>

        <s.Container id="footer" flex={1} ai={"flex-end"}style={{ padding: 30, backgroundColor: "#360368" }}>
        <s.TextDescription>© 2021 Billies</s.TextDescription>
        </s.Container>
        <s.SocialsButton href="https://twitter.com/BilliesNFT">
        <s.TwitterIcon />
        </s.SocialsButton>
        <s.SocialsButton href="https://discord.gg/ZCY7P55q">
        <s.Discord />
        </s.SocialsButton>
      )
    </s.Screen>
  );
}

export default App;
