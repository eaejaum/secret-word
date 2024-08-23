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
  const [letters, setLetters] = useState("");

  const pickWordAndCategory = () => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    console.log(category);
    
    const randomWord = words[category][Math.floor(Math.random() * words[category].length)];
    console.log(randomWord);

    return { randomWord, category };
  };

  const startGame = () => {
    const { randomWord, category } = pickWordAndCategory();

    let wordLetters = randomWord.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());
    console.log(wordLetters);

    setPickedWord(randomWord);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  };

  const verifyLetter = () => {
    setGameStage(stages[2].name);
  };

  const retry = () => {
    setGameStage(stages[0].name);
  };

  return (
    <div className="App"> 
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && <Game verify={verifyLetter}/>}
      {gameStage === 'end' && <GameOver retry={retry}/> }
    </div>
  );
}

export default App;
