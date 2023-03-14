import { Normalize } from 'styled-normalize';
import styled, { createGlobalStyle, css } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans TC', sans-serif;
    font-weight: bold;
    margin: 0;
    padding: 0;
  }
`;

const Title = styled.h1`
  margin-top: 50px;
  text-align: center;
`;

const LatticeContainer = styled.div`
  display: flex;
  width: 330px;
  margin: 10px auto;
  flex-wrap: wrap;
  gap: 5px;
`;

const LatticeRow = styled.div`
  display: flex;
  gap: 5px;
`;

const Lattice = styled.div<LatticeProps>`
  width: 62px;
  height: 62px;
  border: 2px solid #d3d6da;
  font-size: 2rem;
  line-height: 62px;
  text-align: center;
  ${(props) =>
    props.isCorrect &&
    css`
      border: none;
      background-color: #6aaa64;
      color: #ffffff;
    `}
  ${(props) =>
    props.isWrongPosition &&
    css`
      border: none;
      background-color: #c9b458;
      color: #ffffff;
    `}
  ${(props) =>
    props.isIncorrect &&
    css`
      border: none;
      background-color: #787c7e;
      color: #ffffff;
    `}
  ${(props) =>
    props.isTyping &&
    css`
      border-color: #878a8c;
    `}
`;

type LatticeProps = {
  isCorrect?: boolean;
  isWrongPosition?: boolean;
  isIncorrect?: boolean;
  isTyping?: boolean;
  isBlank?: boolean;
};

const App: React.FC = () => {
  return (
    <>
      <Normalize />
      <GlobalStyle />
      <Title>Wordle</Title>
      <LatticeContainer>
        <LatticeRow>
          <Lattice isIncorrect>O</Lattice>
          <Lattice isCorrect>U</Lattice>
          <Lattice isIncorrect>T</Lattice>
          <Lattice isIncorrect>E</Lattice>
          <Lattice isWrongPosition>R</Lattice>
        </LatticeRow>
        <LatticeRow>
          <Lattice isTyping>A</Lattice>
          <Lattice isTyping>E</Lattice>
          <Lattice />
          <Lattice />
          <Lattice />
        </LatticeRow>
        <LatticeRow>
          <Lattice></Lattice>
          <Lattice></Lattice>
          <Lattice></Lattice>
          <Lattice></Lattice>
          <Lattice></Lattice>
        </LatticeRow>
        <LatticeRow>
          <Lattice></Lattice>
          <Lattice></Lattice>
          <Lattice></Lattice>
          <Lattice></Lattice>
          <Lattice></Lattice>
        </LatticeRow>
        <LatticeRow>
          <Lattice></Lattice>
          <Lattice></Lattice>
          <Lattice></Lattice>
          <Lattice></Lattice>
          <Lattice></Lattice>
        </LatticeRow>
        <LatticeRow>
          <Lattice></Lattice>
          <Lattice></Lattice>
          <Lattice></Lattice>
          <Lattice></Lattice>
          <Lattice></Lattice>
        </LatticeRow>
      </LatticeContainer>
    </>
  );
};

export default App;
