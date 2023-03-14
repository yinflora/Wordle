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

type LatticeProps = {
  status: StatusValue;
};

type InputValue = {
  inputValue: string;
  status: StatusValue;
};

type Data = InputValue[][];

const data: Data = [
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

const answer: string = 'APPLE';

const App: React.FC = () => {
  const [inputData, setInputData] = useState<Data>(data);
  const [currentGuess, setCurrentGuess] = useState(['', '', '', '', '']);

  const firstValueArr = Array.from(data);
  const secondValueArr = Array.from(firstValueArr);
  console.log(secondValueArr);

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    textIndex: number
  ) {
    const value = e.target.value.toUpperCase();
    const ENGLISH_ONLY = /^[A-Za-z]+$/;
    const newData = [...inputData];
    let currentGuessData = [...currentGuess];
    if (ENGLISH_ONLY.test(value)) {
      newData[rowIndex][textIndex].inputValue = value;
      newData[rowIndex][textIndex].status = 'isTyping';
      setInputData(newData);
      currentGuessData[textIndex] = value;
      setCurrentGuess(currentGuessData);
    }
    textIndex < 4 && (e.target.nextElementSibling as HTMLInputElement).focus();
  }

  function handleInputStyle(rowIndex: number) {
    const answerArr = answer.split('');
    const newData = [...inputData];
    currentGuess.forEach(
      (text, index) =>
        // (newData[rowIndex][index].status =
        //   answerArr.indexOf(text) === -1
        //     ? 'isIncorrect'
        //     : answerArr.indexOf(text) === index
        //     ? 'isCorrect'
        //     : 'isWrongPosition')
        (newData[rowIndex][index].status =
          answerArr.indexOf(text) === -1
            ? 'isIncorrect'
            : answerArr[index] === newData[rowIndex][index].inputValue
            ? 'isCorrect'
            : 'isWrongPosition')
    );
    setInputData(newData);
  }

  return (
    <>
      <Normalize />
      <GlobalStyle />
      <Title>Wordle</Title>
      <LatticeContainer>
        {inputData.map((item, rowIndex) => (
          <LatticeRow key={rowIndex}>
            {item.map((arr, textIndex) => (
              <>
                <Lattice
                  key={textIndex}
                  type="text"
                  maxLength={1}
                  status={arr.status}
                  value={arr.inputValue}
                  onChange={(e) => handleInputChange(e, rowIndex, textIndex)}
                  onKeyPress={(e) =>
                    textIndex === 4 &&
                    e.key === 'Enter' &&
                    handleInputStyle(rowIndex)
                  }
                />
              </>
            ))}
          </LatticeRow>
        ))}
      </LatticeContainer>
    </>
  );
};

export default App;
