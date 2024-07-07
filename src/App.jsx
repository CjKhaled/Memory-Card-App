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
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(URL)
      const responseData = await response.json()
      const characters = responseData.characters.slice(0, 8).concat(responseData.characters.slice(10, 14))
      setImgURL(characters)
    }
    fetchData();
  }, [])


  return (
    <main>
      <div className="cards">
        {imgURL.map(obj => <Card key={obj.id} link={obj.images[0]} name={obj.name}/>)}
      </div>
      
    </main>
  )
}

export default App
