import { useEffect, useState } from "react";
import Card from "./components/Card";
import "./App.css"

function shuffleArray(array) {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array
}


function App() {
  const URL = "https://dattebayo-api.onrender.com/characters"
  const [imgURL, setImgURL] = useState([])
  const [clickedImages, setClickedImages] = useState([])
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(URL)
      const responseData = await response.json()
      const characters = responseData.characters.slice(0, 8).concat(responseData.characters.slice(10, 14))
      setImgURL(characters)
    }
    fetchData();
  }, [])


  function handleClick(e) {
    const character = e.currentTarget.id;
    if (checkInArray(character)) {
      if (currentScore > bestScore) {
        setBestScore(currentScore);
      }
      
      setCurrentScore(0);
      setClickedImages([])
    } else {
      setCurrentScore(currentScore + 1);
      setClickedImages([...clickedImages, character])
    }

    setImgURL(shuffleArray(imgURL))
    
  }
  
  function checkInArray(value) {
    for (const character of clickedImages) {
      if (character === value) {
        return true
      }
    }

    return false;
  }

  return (
    <main>
      <h1>Naruto Ninja Match</h1>
      <div className="scores">
        <h2>Current Score: {currentScore}</h2>
        <h2>Best Score: {bestScore}</h2>
      </div>
      <div className="cards">
        {imgURL.map(obj => <Card key={obj.id} handleClick={handleClick} link={obj.images[0]} name={obj.name}/>)}
      </div>
      
    </main>
  )
}

export default App
