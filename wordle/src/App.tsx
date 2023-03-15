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
  outline: none;
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

const answer: string[] = ['A', 'P', 'P', 'L', 'E'];

const App: React.FC = () => {
  const [inputData, setInputData] = useState<Data>(data);
  const [currentGuess, setCurrentGuess] = useState<string[]>([
    '',
    '',
    '',
    '',
    '',
  ]);

  const newData: Data = [...inputData];

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    textIndex: number
  ) {
    const value: string = e.target.value.toUpperCase();
    const ENGLISH_ONLY = /^[A-Za-z]+$/;
    let currentGuessData: string[] = [...currentGuess];
    if (ENGLISH_ONLY.test(value)) {
      newData[rowIndex][textIndex].inputValue = value;
      newData[rowIndex][textIndex].status = 'isTyping';
      setInputData(newData);
      currentGuessData[textIndex] = value;
      setCurrentGuess(currentGuessData);
    }
    textIndex < 4 && (e.target.nextElementSibling as HTMLInputElement).focus();
  }

  // function handleClearInput(
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   rowIndex: number,
  //   textIndex: number
  // ) {
  //   newData[rowIndex][textIndex].inputValue = '';
  //   newData[rowIndex][textIndex].status = '';
  //   setInputData(newData);
  // }

  function handleInputStyle(rowIndex: number) {
    currentGuess.forEach(
      (text, index) =>
        (newData[rowIndex][index].status =
          answer.indexOf(text) === -1
            ? 'isIncorrect'
            : answer[index] === newData[rowIndex][index].inputValue
            ? 'isCorrect'
            : 'isWrongPosition')
    );
    setInputData(newData);
  }

  function handleKeyPress(
    e: React.KeyboardEvent<HTMLInputElement>,
    rowIndex: number,
    textIndex: number
  ) {
    if (e.key === 'Backspace') {
      if (textIndex > 0 && newData[rowIndex][textIndex].status === '') {
        newData[rowIndex][textIndex - 1].inputValue = '';
        newData[rowIndex][textIndex - 1].status = '';
        (e.target.previousElementSibling as HTMLInputElement).focus();
      } else {
        newData[rowIndex][textIndex].inputValue = '';
        newData[rowIndex][textIndex].status = '';
      }
      setInputData(newData);
    } else if (textIndex === 4 && e.key === 'Enter') {
      handleInputStyle(rowIndex);
    }
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
                  // onFocus={(e) => handleClearInput(e, rowIndex, textIndex)}
                  onKeyDown={
                    (e) => handleKeyPress(e, rowIndex, textIndex)

                    // (e) =>
                    //   e.key === 'Backspace' &&
                    //   console.log('Backspace key pressed ✅')

                    // textIndex === 4 &&
                    // e.key === 'Enter' &&
                    // handleInputStyle(rowIndex)
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
