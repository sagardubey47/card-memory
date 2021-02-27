import React,{useState, useEffect} from "react"
import './App.css';


const url = "https://pokeres.bastionbot.org/images/pokemon";

function App() {

  const [start, setStart] = useState(false);
  const [counter, setCounter] = useState(0);
  const [openedCard, setOpenedCard] = useState([]);
  const [matched, setMatched] = useState([]);
  const [win, setWin] = useState(false);

  const pokemons = [
    { id: 1, name: "balbasaur" },
    { id: 8, name: "wartotle" },
    { id: 9, name: "blastoise" },
    { id: 6, name: "charizard" },
    { id: 7, name: "suzoto" },
    { id: 10, name: "panta" },
    { id: 1, name: "balbasaur" },
    { id: 8, name: "wartotle" },
    { id: 9, name: "blastoise" },
    { id: 6, name: "charizard" },
    { id: 7, name: "suzoto" },
    { id: 10, name: "panta" },
  ]


  
  function flipCard(index) {
    setOpenedCard((opened) => [...opened, index]);
    console.log(matched);
    if(matched.length === 5) {
      setStart(false);
      setWin(true);
    }
  }

  function playAgain() {
    setWin(false);
    setStart(true);
    setMatched([]);
    setCounter(0);
    setOpenedCard([]);
  }

  useEffect(() => {
    if (openedCard < 2) return;

    const firstMatched = pokemons[openedCard[0]];
    const secondMatched = pokemons[openedCard[1]];

    if (secondMatched && firstMatched.id === secondMatched.id) {
      setMatched([...matched, firstMatched.id]);
    }
  
    if (openedCard.length === 2) setTimeout(() => setOpenedCard([]), 10);
    
  }, [openedCard]);



  // to increment counter
  function tick() {
    setCounter((preCount) => {
      return preCount + 1;
    })
  }



  // to mount and unmount counter
   useEffect(() => {
     let interval; 
     if(start) {
      interval = setInterval(() => { tick() }, 1000);
     }
    return () => {
      clearInterval(interval); 
    }
  }, [start])



  // to render the page on start button
  function renderTimer() {
    if(start) {
      // render page if start button is clicked
      return <>
       <div style={{textAlign:"center", margin:"20px"}}>{counter} sec </div>
       <div className="cards">
            {pokemons.map((pokemon, index) => {

              let isFlipped = false;

              if (openedCard.includes(index)) isFlipped = true;
              if (matched.includes(pokemon.id)) isFlipped = true;

              return <div 
              className={`pokemon-card ${isFlipped ? "flipped" : ""}`}
              id={`${isFlipped ? "disableClick" : ""}`}
              key={index}
              onClick={() => flipCard(index)}
              >
                       <div className="inner">
                          <div className="front">
                           <img src={`${url}/${pokemon.id}.png`} width="100" alt="img" />
                          </div>
                          <div className="back"></div>
                       </div> 
                    </div>
            })
            }
       </div>
      </>

    } else if(win) {
       return <>
                <div className="msg">
                  <div>congrats!!! u won in {counter} sec</div>
                  <button className="btn" style={{margin:"10px "}} onClick={playAgain}>play again</button>   
                </div>
              </>
    } else {
      // render button
      return <button 
      className="btn"
      onClick={() => {setStart(true)}}>
      start
      </button>

    }
  }


  return (
    <>
      {renderTimer()}
    </>
  );
}

export default App;
