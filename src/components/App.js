import React, { useEffect, useState } from "react";

function App() {

  const [dogs, setDogs] = useState([])
  const [pup, setPup] = useState('')
  const [goodDog, setGoodDog] = useState('')
  const [filter, setFilter] = useState(false)


  useEffect(() => {
    fetch('http://localhost:3001/pups')
      .then(r => r.json())
      .then(data => setDogs(data))
  },[])

  useEffect(() => {
    setGoodDog(pup.isGoodDog)
  },[pup])

  console.log(dogs)

  function handleGoodClick() {
    console.log(pup)
    fetch(`http://localhost:3001/pups/${pup.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isGoodDog: !pup.isGoodDog,
      }),
    })
      .then((r) => r.json())
      .then((updatedItem) => setDogs(dogs.map(dog => {
        if (dog.id === updatedItem.id) {
          return {...dog, isGoodDog: !pup.isGoodDog}
        } else {
          return dog
        }
      }
      )));
    setGoodDog(!goodDog)
  }

  const filterPups = dogs.filter(dog => filter ? dog.isGoodDog : true )


  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter"onClick={() => setFilter(!filter)}>Filter good dogs: {filter ? 'ON' : 'OFF'}</button>
      </div>
      <div id="dog-bar">
        {filterPups.map(dog => (
          <span key={dog.id} onClick={()=>setPup(dog)}>{dog.name}</span>
        ))}
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info" >
          <img src={pup.image} alt={pup.name} />
          <h2>{pup.name}</h2>
          {pup === '' ? '' : (
            <button onClick={handleGoodClick}>{goodDog ? 'Good Dog!' : 'Bad Dog!'}</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
