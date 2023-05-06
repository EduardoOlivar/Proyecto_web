import React, { useState, useEffect } from 'react';
import fail from "../images/fail.mp3"
import success from "../images/success.mp3"
import casa from "../images/casa.png"
import reolad from "../images/reload.png"
import play from "../images/play-button.png"
import "../hojas-de-estilo/PrePaesTrivia.css";
function MathGame() {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [num1, setNum1] = useState(Math.floor(Math.random() * 10) + 1);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 10) + 1);
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(5); // segundos de espera
  const [hasLost, setHasLost] = useState(false);
  const [playedFailSound, setPlayedFailSound] = useState(false);
  const successSound = new Audio(success);
  const failSound = new Audio(fail);
  const [showMenu, setShowMenu] = useState(true);

  
  useEffect(() => {
    if (timeLeft === 1 ) {
      failSound.play();
      setMessage('Tiempo agotado. La respuesta es: ' + (num1 * num2));
      
      
      setHasLost(true);

    }
    const intervalId = setInterval(() => {
      if(!showMenu)
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft, num1, num2]);

  useEffect(() => {
    const storedHighScore = parseInt(localStorage.getItem('highScore'));
    if (storedHighScore) {
      setHighScore(storedHighScore);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(answer) === num1 * num2) {
      setMessage('¡Correcto!');
      setScore(score + 1);
      console.log(score)
      setLevel(level + 1);
      setNum1(Math.floor(Math.random() * 10) + 1);
      setNum2(Math.floor(Math.random() * 10) + 1);
      setAnswer('');
      successSound.play(); // reproduce el sonido de acierto
      setTimeLeft(5); // Reiniciar el temporizador
    } else {
      setMessage(`Lo siento, la respuesta correcta era ${num1 * num2}.`);
      console.log(score)
      setLevel(1);
      setNum1(Math.floor(Math.random() * 10) + 1);
      setNum2(Math.floor(Math.random() * 10) + 1);
      setAnswer('');
      setHasLost(true);
   
      setTimeLeft(1); // Reiniciar el temporizador
     
    }
  };
  const handleMenu = () => {
    setTimeLeft(5);
    setShowMenu(true);
    setHasLost(true);
   
    // aquí puedes agregar la lógica para inicializar el juego
  };
  const handleStart = () => {
    setShowMenu(false);
    setHasLost(false);
    setScore(0);
    setLevel(1);
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setAnswer('');
    setMessage('');
    setTimeLeft(5);
    // aquí puedes agregar la lógica para inicializar el juego
  };
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', score.toString());
    }
  }, [score]);
  const handleRetry = () => {
    setHasLost(false);
    setScore(0);
    setLevel(1);
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setAnswer('');
    setMessage('');
    setTimeLeft(5);
    setPlayedFailSound(false);
  };

  return (
    <div className='container'>
      {showMenu && (
        <div>
          <h1>PRE-PAES TRIVIA</h1>
          <p>Puntaje máximo: {highScore}</p>
          <img className='imgTrivia' src={play} alt="" onClick={handleStart}/>
          <p> PRE-PAES TRIVIA es el juego perfecto para afilar tus habilidades y sentirte más seguro antes de realizar un ensayo.  </p>
      
          
        </div>
      )}

      {!showMenu && (
        <>
          {hasLost && (
            <div>
              <form>
                
                <p>Puntaje: {score}</p>
                <p>{message}</p>
                <p>¡Perdiste! ¿Quieres intentarlo de nuevo?</p>
                <div >
                  <img className='imgTrivia' src={casa} alt="" onClick={handleMenu}/>
                  <img className='imgTrivia'src={reolad} alt="" onClick={handleRetry}/>
                </div>
              
              </form>
            </div>
          )}

          {!hasLost && (
            <div>
              <h2>Nivel {level}</h2>
              <div className='container-time-bar'>
                <div className='time-bar' style={{ width: `${((timeLeft - 2) / 40) * 700}%`, transition: `${timeLeft === 0 ? 'none' : 'width 1s linear'}` }} />
              </div>

              <form onSubmit={handleSubmit}>
                <h1>¿Cuál es el resultado de {num1} x {num2}?</h1>
                <input type='number' value={answer} onChange={(e) => setAnswer(e.target.value)} />
                <button type='submit'>Enviar</button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );

}

export default MathGame;
