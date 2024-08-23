import './App.css';
import StartScreen from './components/StartScreen';
import { useCallback, useEffect, useState } from 'react';
import { wordsList } from './data/words.jsx';
import Game from './components/Game.jsx';
import GameOver from './components/GameOver.jsx';

function App() {
  const stages = [
    {id: 1, name: 'start'},
    {id: 2, name: 'game'},
    {id: 3, name: 'end'},
  ];

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0)

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    
    const randomWord = words[category][Math.floor(Math.random() * words[category].length)];

    return { randomWord, category };
  }, [words]);

  const startGame = useCallback(() => {
    clearLetterState();
    const { randomWord, category } = pickWordAndCategory();

    let wordLetters = randomWord.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setPickedWord(randomWord);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ])
      setGuesses(guesses - 1);
    }
};

const clearLetterState = () => {
  setGuessedLetters([]);
  setWrongLetters([]);
}

  useEffect(() => {
    if(guesses <= 0){
      clearLetterState();
      setGameStage(stages[2].name)
    }
  }, [guesses])

  useEffect(() => {

    const uniqueLetters = [... new Set(letters)]; 
    if(guessedLetters.length === uniqueLetters.length){
      setScore((actualScore) => (actualScore += 100));
      startGame();
    } 

  }, [guessedLetters, letters, startGame])

  const retry = () => {
    setScore(0);
    setGuesses(3);
    setGameStage(stages[0].name);
  };

  return (
    <div className="App"> 
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && 
        <Game 
          verify={verifyLetter} 
          pickedWord={pickedWord} 
          pickedCategory={pickedCategory} 
          letters={letters} 
          guessedLetters={guessedLetters} 
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />}
      {gameStage === 'end' && 
      <GameOver 
        retry={retry}
        score={score}
      /> }
    </div>
  );
}

export default App;
