import styled from "styled-components";
import gradient from "./gradient.jpeg";
import gradientTwo from "./gradientTwo.jpeg";
import {CheckCircle} from '@styled-icons/bootstrap/CheckCircle';
import {Circle} from '@styled-icons/bootstrap/Circle';
import {Rocket} from '@styled-icons/ionicons-sharp/Rocket';
import {Link45deg} from '@styled-icons/bootstrap/Link45deg';
import {LinkedinSquare} from '@styled-icons/boxicons-logos/LinkedinSquare';
import {Instagram} from '@styled-icons/boxicons-logos/Instagram';
import {Github} from '@styled-icons/boxicons-logos/Github';
import {DiscordAlt} from '@styled-icons/boxicons-logos/DiscordAlt';
import {Twitter} from '@styled-icons/boxicons-logos/Twitter'


// Used for wrapping a page component
export const Screen = styled.div`
  background-color: #360368;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "row")};
  justify-content: ${({ jc }) => (jc ? jc : "space-between")};
  align-items: ${({ ai }) => (ai ? ai : "center")};
  font-size: 50px;
  line-height: 100px;
  height: 80px;
  background: #360368;
  color: #fff;
  font-family: "Marker felt";
`;

export const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "row")};
  justify-content: ${({ jc }) => (jc ? jc : "space-between")};
  align-items: ${({ ai }) => (ai ? ai : "center")};
  font-size: 50px;
  line-height: 80px;
  height: 80px;
  background: #360368;
  color: #fff;
  font-family: "Marker felt";
`;

export const HeaderButton = styled.button`
  padding: 10px;
  height: 40px;
  width: 100px;
  border-radius: 20px;
  background: #360368;
  color: white;
  font-weight: bold;
  font-family: "Marker felt";
  border: 2px solid #360368;

  &:hover {
    background-color: orange;
    border: 2px solid orange;
  }

`;

export const MintButton = styled.button`
  padding: 10px;
  height: 40px;
  width: 140px;
  border-radius: 20px;
  background: #360368;
  color: white;
  font-weight: bold;
  font-family: "Marker felt";
  border: 2px solid #360368;

  &:hover {
    background-color: orange;
    border: 2px solid orange;
  }
  &:focus {
    opacity: 0.2;
  }
`;

export const ConnectButton = styled.button`
  padding: 10px;
  height: 80px;
  width: 240px;
  border-radius: 40px;
  background: orange;
  color: white;
  font-weight: bold;
  font-family: "Marker felt";
  border: 2px solid orange;

  &:hover {
    background-color: #ffe0b3;
    border: 2px solid #ffe0b3;
  }
  &:focus {
    opacity: 0.2;
  }
`;

// Used for providing space between components
export const SpacerXSmall = styled.div`
  height: 8px;
  width: 8px;
`;

// Used for providing space between components
export const SpacerSmall = styled.div`
  height: 16px;
  width: 16px;
`;

// Used for providing space between components
export const SpacerMedium = styled.div`
  height: 75px;
  width: 75x;
`;

// Used for providing space between components
export const SpacerLarge = styled.div`
  height: 175px;
  width: 175px;
`;

// Used for providing a wrapper around a component
export const Container = styled.div`
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ test }) => (test ? "pink" : "none")};
  width: 100%;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;

`;

export const ContainerTwo = styled.div`
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ test }) => (test ? "pink" : "none")};
  width: 100%;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  background-image: url(${gradient});
`;

export const ContainerThree = styled.div`
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ test }) => (test ? "pink" : "none")};
  width: 100%;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
`;

export const ContainerFour = styled.div`
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ test }) => (test ? "pink" : "none")};
  width: 100%;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  background-image: url(${gradientTwo});
  font-family: "Marker felt";
`;

export const Billies = styled.p`
margin-top: 20px;
display: flex;
flex-direction: ${({ fd }) => (fd ? fd : "row")};
justify-content: ${({ jc }) => (jc ? jc : "space-between")};
align-items: ${({ ai }) => (ai ? ai : "flex-start")};
width: 100%;
`;

export const TextTitle = styled.p`
  color: var(--white);
  font-size: 80px;
  font-weight: bold;
  font-family: "Marker felt";
  display: flex;
  align-self: ${({ ai }) => (ai ? ai : "flex-start")};
`;

export const TextSubTitle = styled.p`
  color: var(--white);
  font-size: 40px;
  font-weight: bold;
  font-family: "Marker felt"
`;

export const TextDescription = styled.p`
  color: var(--white);
  font-size: 20px;
  font-weight: 300;
  font-family: "Marker felt";

`;

export const StyledClickable = styled.div`
  :active {
    opacity: 0.5;
    fill: magenta
  }
`;

export const SocialsButton = styled.a`
  background: transparent;
  color: white;
`;

export const CheckMark = styled(CheckCircle)`
  color: #00cc00;
  height: 30px;
  width: 30px;
`;

export const Unchecked = styled(Circle)`
  color: white;
  height: 30px;
  width: 30px;
`;

export const RocketIcon = styled(Rocket)`
  color: white;
  height: 40px;
  width: 40px;
`;

export const Portfolio = styled(Link45deg)`
  width: 50px;
  height: 50px;
  transition: fill 0.25s;

  &:hover {
    fill: rebeccapurple;
  }

  &:active {
    fill: #e6ffb3;
  }
`;

export const LinkedIn = styled(LinkedinSquare)`
  width: 50px;
  height: 50px;
  transition: fill 0.25s;

  &:hover {
    fill: rebeccapurple;
  }

  &:active {
    fill: #ff9999;
  }
`;

export const Git = styled(Github)`
  width: 50px;
  height: 50px;
  transition: fill 0.25s;

  &:hover {
    fill: rebeccapurple;
  }

  &:active {
    fill: #ffff99;
  }
`;

export const Ig = styled(Instagram)`
  width: 50px;
  height: 50px;
  transition: fill 0.25s;

  &:hover {
    fill: rebeccapurple;
  }

  &:active {
    fill: #ff99ff;
  }
`;

export const Discord = styled(DiscordAlt)`
  position: fixed;
  bottom: 15px;
  right: 15px;
  border
  width: 50px;
  height: 50px;
  transition: fill 0.25s;
  color: white;


  &:hover {
    fill: orange;
  }

  &:active {
    fill: #ff99ff;
  }
`;

export const TwitterIcon = styled(Twitter)`
  position: fixed;
  bottom: 15px;
  right: 70px;
  border
  width: 50px;
  height: 50px;
  transition: fill 0.25s;
  color: white;


  &:hover {
    fill: orange;
  }

  &:active {
    fill: #ff99ff;
  }
`;
