import { useReducer, useState } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import { Normalize } from 'styled-normalize';

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
type InputPayloadType = {
  element: HTMLInputElement;
  value: string;
  rowIndex: number;
  textIndex: number;
  currentGuess: string[];
  setCurrentGuess: React.Dispatch<React.SetStateAction<string[]>>;
};
type BackspacePayloadType = {
  element: EventTarget | HTMLInputElement;
  rowIndex: number;
  textIndex: number;
};
type EnterPayloadType = {
  element: EventTarget | HTMLInputElement;
  rowIndex: number;
  textIndex: number;
  currentGuess: string[];
  setCorrectGuess: React.Dispatch<React.SetStateAction<boolean>>;
  inputStatus: boolean[];
  setInputStatus: React.Dispatch<React.SetStateAction<boolean[]>>;
};
type ActionType =
  | { type: 'STORE_INPUT'; payload: InputPayloadType }
  | { type: 'PRESS_BACKSPACE'; payload: BackspacePayloadType }
  | { type: 'PRESS_ENTER'; payload: EnterPayloadType };

const data: Data = Array.from({ length: 6 }, () =>
  Array.from({ length: 5 }, () => ({ inputValue: '', status: '' }))
);
const answer: string[] = ['F', 'L', 'O', 'R', 'A'];

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
  border-radius: 4px;
  outline: none;
  font-size: 2rem;
  line-height: 62px;
  text-align: center;
  text-transform: capitalize;
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

const Congratulations = styled.p`
  margin: 20px auto;
  text-align: center;
  font-size: 1.25rem;
`;

function reducer(inputData: Data, action: ActionType) {
  const newInputData: Data = [...inputData];

  switch (action.type) {
    case 'STORE_INPUT': {
      const {
        element,
        value,
        rowIndex,
        textIndex,
        currentGuess,
        setCurrentGuess,
      } = action.payload;
      const currentElement = newInputData[rowIndex][textIndex];

      const ENGLISH_ONLY = /^[A-Za-z]+$/;
      let currentGuessData: string[] = [...currentGuess];
      if (ENGLISH_ONLY.test(value)) {
        currentElement.inputValue = value;
        currentElement.status = 'isTyping';
        currentGuessData[textIndex] = value;
        setCurrentGuess(currentGuessData);
      }
      textIndex < 4 &&
        element instanceof HTMLInputElement &&
        (element.nextElementSibling as HTMLInputElement).focus();
      return newInputData;
    }

    case 'PRESS_BACKSPACE': {
      const { element, rowIndex, textIndex } = action.payload;
      const previousElement = newInputData[rowIndex][textIndex - 1];
      const currentElement = newInputData[rowIndex][textIndex];

      if (textIndex > 0 && currentElement.status === '') {
        previousElement.inputValue = '';
        previousElement.status = '';
        (
          (element as HTMLInputElement)
            .previousElementSibling as HTMLInputElement
        ).focus();
      } else {
        console.log(currentElement);
        currentElement.inputValue = '';
        currentElement.status = '';
      }
      return newInputData;
    }

    case 'PRESS_ENTER': {
      const {
        element,
        rowIndex,
        textIndex,
        currentGuess,
        setCorrectGuess,
        inputStatus,
        setInputStatus,
      } = action.payload;
      const currentElement = newInputData[rowIndex][textIndex];

      if (currentElement.inputValue !== '') {
        currentGuess.forEach(
          (text: string, index: number) =>
            (newInputData[rowIndex][index].status =
              answer.indexOf(text) === -1
                ? 'isIncorrect'
                : answer[index] === newInputData[rowIndex][index].inputValue
                ? 'isCorrect'
                : 'isWrongPosition')
        );
        const correctGuess = currentGuess.every(
          (text: string, index: number) => text === answer[index]
        );
        correctGuess && setCorrectGuess(true);
        const statusList = [...inputStatus];
        statusList[rowIndex] = true;
        setInputStatus(statusList);
        (
          (
            ((element as HTMLInputElement).parentNode as HTMLInputElement)
              .nextElementSibling as HTMLInputElement
          ).firstChild as HTMLInputElement
        ).focus();
      }
      return newInputData;
    }

    default: {
      return inputData;
    }
  }
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, data);

  const [currentGuess, setCurrentGuess] = useState<string[]>(Array(1).fill(''));
  const [inputStatus, setInputStatus] = useState<boolean[]>(
    Array(1).fill(false)
  );
  const [correctGuess, setCorrectGuess] = useState<boolean>(false);

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    textIndex: number
  ) {
    dispatch({
      type: 'STORE_INPUT',
      payload: {
        element: e.target,
        value: e.target.value.toUpperCase(),
        rowIndex: rowIndex,
        textIndex: textIndex,
        currentGuess: currentGuess,
        setCurrentGuess: setCurrentGuess,
      },
    });
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    rowIndex: number,
    textIndex: number
  ) {
    if (e.key === 'Backspace') {
      dispatch({
        type: 'PRESS_BACKSPACE',
        payload: {
          element: e.target,
          rowIndex: rowIndex,
          textIndex: textIndex,
        },
      });
    } else if (e.key === 'Enter') {
      dispatch({
        type: 'PRESS_ENTER',
        payload: {
          element: e.target,
          rowIndex: rowIndex,
          textIndex: textIndex,
          currentGuess: currentGuess,
          setCorrectGuess: setCorrectGuess,
          inputStatus: inputStatus,
          setInputStatus: setInputStatus,
        },
      });
    }
  }

  return (
    <>
      <Normalize />
      <GlobalStyle />
      <Title>Wordle</Title>
      <LatticeContainer>
        {state.map((item, rowIndex) => (
          <LatticeRow key={rowIndex}>
            {item.map((input, textIndex) => (
              <Lattice
                key={textIndex}
                type="text"
                maxLength={1}
                disabled={inputStatus[rowIndex] || correctGuess}
                onChange={(e) => handleInputChange(e, rowIndex, textIndex)}
                onKeyDown={(e) => handleKeyDown(e, rowIndex, textIndex)}
                status={input.status}
              />
            ))}
          </LatticeRow>
        ))}
      </LatticeContainer>
      {correctGuess && <Congratulations>You Win👏</Congratulations>}
    </>
  );
};

export default App;
