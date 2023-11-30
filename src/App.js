import { useEffect, useState } from 'react';
import './App.css';

function Square(props){
const {value, onSquareClick} = props;

return(
  <button onClick={onSquareClick}>
  {value}
  </button>
)
}
export default function Board() {
  const [squares, setSquares]=useState(Array(9).fill(null))
  const [currentPlayerIsX, toggleCurrentPlayer]= useState(true)
  const [status, setStatusText]= useState("X's turn")
  const [turnsPlayed, setTurnsPlayed]= useState(0);
  
  useEffect(()=>{
  const winner = isWinnerFound()
  if(winner)
    setStatusText(`${winner} Won !`)
  if(turnsPlayed===9 && !winner)
    setStatusText(`Its a Tie !`)
  }, [squares, turnsPlayed])

  function isWinnerFound(){
    const winningIndexes=[
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    for(let i=0; i< winningIndexes.length; i++) {
      const [a,b,c]=winningIndexes[i];
      if(squares[a] && squares[a]===squares[b] && squares[b]===squares[c])
      {
        return squares[a]
      }
    }
  }
  
  const handleSquareClick=(i)=>{
    setTurnsPlayed(turnsPlayed+1);
    if(squares[i] || isWinnerFound())
    return;
    const nextBoard = squares.slice()
    nextBoard[i]= currentPlayerIsX ? 'X' : 'O'
    setSquares(nextBoard)
    toggleCurrentPlayer(!currentPlayerIsX);
    currentPlayerIsX && !isWinnerFound() ? setStatusText("O's turn"): setStatusText("X's turn")
  }

  return (
    <div className='app'>
      <p className='title'> Tic-Tac-Toe </p>
    <div className='board-container'>
    <div className='board'>
    <div className='board-row'>
    <Square value={squares[0]} onSquareClick={()=>handleSquareClick(0)}/>
    <Square value={squares[1]} onSquareClick={()=>handleSquareClick(1)}/>
    <Square value={squares[2]} onSquareClick={()=>handleSquareClick(2)}/>
    </div>
    <div className='board-row'>
    <Square value={squares[3]} onSquareClick={()=>handleSquareClick(3)}/>
    <Square value={squares[4]} onSquareClick={()=>handleSquareClick(4)}/>
    <Square value={squares[5]} onSquareClick={()=>handleSquareClick(5)}/>
    </div>
    <div className='board-row'>
    <Square value={squares[6]} onSquareClick={()=>handleSquareClick(6)}/>
    <Square value={squares[7]} onSquareClick={()=>handleSquareClick(7)}/>
    <Square value={squares[8]} onSquareClick={()=>handleSquareClick(8)}/>
    </div>
    </div>
    </div>
      <p className='status'>{status}</p>
    </div>
  );
}

