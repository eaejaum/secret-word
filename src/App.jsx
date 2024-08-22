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

  const [gameStage, setGameStage] = useState('start');

  const [words] = useState(wordsList);
  console.log(words);

  return (
    <div className="App"> 
      {gameStage === 'start' && <StartScreen />}
      {gameStage === 'game' && <Game />}
      {gameStage === 'end' && <GameOver /> }
    </div>
  );
}

export default App;
