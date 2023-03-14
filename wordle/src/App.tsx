import { useState } from 'react';
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

const Lattice = styled.input<LatticeProps>`
  width: 62px;
  height: 62px;
  border: 2px solid #d3d6da;
  font-size: 2rem;
  line-height: 62px;
  text-align: center;
  ${(props) =>
    props.status === 'isCorrect' &&
    css`
      border: none;
      background-color: #6aaa64;
      color: #ffffff;
    `}
  ${(props) =>
    props.status === 'isWrongPosition' &&
    css`
      border: none;
      background-color: #c9b458;
      color: #ffffff;
    `}
  ${(props) =>
    props.status === 'isIncorrect' &&
    css`
      border: none;
      background-color: #787c7e;
      color: #ffffff;
    `}
  ${(props) =>
    props.status === 'isTyping' &&
    css`
      border-color: #878a8c;
    `}
`;

type StatusValue =
  | ''
  | 'isCorrect'
  | 'isWrongPosition'
  | 'isIncorrect'
  | 'isTyping';

interface LatticeProps {
  status: StatusValue;
}

type InputValue = {
  inputValue: string;
  status: StatusValue;
};

type Data = InputValue[][];

const data: Data = [
  [
    { inputValue: 'O', status: 'isIncorrect' },
    { inputValue: 'U', status: 'isCorrect' },
    { inputValue: 'T', status: 'isIncorrect' },
    { inputValue: 'E', status: 'isIncorrect' },
    { inputValue: 'R', status: 'isWrongPosition' },
  ],
  [
    { inputValue: 'A', status: 'isTyping' },
    { inputValue: 'E', status: 'isTyping' },
    { inputValue: '', status: '' },
    { inputValue: '', status: '' },
    { inputValue: '', status: '' },
  ],
  [
    { inputValue: '', status: '' },
    { inputValue: '', status: '' },
    { inputValue: '', status: '' },
    { inputValue: '', status: '' },
    { inputValue: '', status: '' },
  ],
  [
    { inputValue: '', status: '' },
    { inputValue: '', status: '' },
    { inputValue: '', status: '' },
    { inputValue: '', status: '' },
    { inputValue: '', status: '' },
  ],
  [
    { inputValue: '', status: '' },
    { inputValue: '', status: '' },
    { inputValue: '', status: '' },
    { inputValue: '', status: '' },
    { inputValue: '', status: '' },
  ],
  [
    { inputValue: '', status: '' },
    { inputValue: '', status: '' },
    { inputValue: '', status: '' },
    { inputValue: '', status: '' },
    { inputValue: '', status: '' },
  ],
];

const App: React.FC = () => {
  const [value, setValue] = useState<Data>(data);

  return (
    <>
      <Normalize />
      <GlobalStyle />
      <Title>Wordle</Title>
      <LatticeContainer>
        {data.map((item, index) => (
          <LatticeRow key={index}>
            {item.map((arr) => (
              <>
                <Lattice status={arr.status} value={arr.inputValue} />
              </>
            ))}
          </LatticeRow>
        ))}
      </LatticeContainer>
    </>
  );
};

export default App;
