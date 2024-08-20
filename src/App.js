import {useState, useEffect, useRef} from 'react';
import './styles/App.css';
import VCard from './VCard.js'

function App() {
  const [ID, setID] = useState("");
  const [fredURL, setFredURL] = useState("");
  const [isVCard, setIsVCard] = useState(false)
  const inputRef = useRef()

  const apiKey = '648627c409b96041497804cd3b77cce1';
  const type= 'series'
  const subType= 'observations'
  const tag=''
  


  const openCard = () => {
    setIsVCard(true)
  }

  const closeCard = () => {
    setIsVCard(false)
  }

  function handleClick() {
    //console.log("im called")
    setID(inputRef.current.value)
  }


  useEffect( () =>{
    
    async function getKeys(){
      const response = await fetch('http://localhost:3001/fredkeys/GDP') // Use the actual URL of your backend
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`
        console.log(message)
        return;
      }
      
      

      const cardKey = await response.json()
      
      //console.log(cardKey.series_id.toString())
      
      var apiUrl = correctURL(type, cardKey.series_id, subType, tag, apiKey )
      console.log(apiUrl)
      setFredURL(apiUrl)
      
      //openCard()
    }

    if (ID !== ""){
    getKeys()
    }
  }, [ID])

  useEffect( () => {
    if(fredURL !== ""){
      openCard()
    }
  }, [fredURL])

  return (
    <>
    <section className="dashboard">
      <h1 className="title">FRED</h1>
      <div className="line"></div>

        <div className="search-container">

            <div id="searchCoun">
              <input type="text" className="searchInput" placeholder='Search for Graph' ref={inputRef} />
            
              <button className="btn" onClick={handleClick}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.023,16.977c-0.513-0.488-1.004-0.997-1.367-1.384c-0.372-0.378-0.596-0.653-0.596-0.653l-2.8-1.337 C15.34,12.37,16,10.763,16,9c0-3.859-3.14-7-7-7S2,5.141,2,9s3.14,7,7,7c1.763,0,3.37-0.66,4.603-1.739l1.337,2.8 c0,0,0.275,0.224,0.653,0.596c0.387,0.363,0.896,0.854,1.384,1.367c0.494,0.506,0.988,1.012,1.358,1.392 c0.362,0.388,0.604,0.646,0.604,0.646l2.121-2.121c0,0-0.258-0.242-0.646-0.604C20.035,17.965,19.529,17.471,19.023,16.977z M9,14 c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S11.757,14,9,14z">
                  </path>
                </svg>
              </button>
            </div>
            
        </div>
        
    </section>

    {isVCard && <VCard onClose={closeCard} onOpen={openCard} url={fredURL}/>}

    <div className="spacer"></div>
    </>  
  );
}

function correctURL(type, id, subType, tag, apiKey)
{
    var apiUrl = `https://api.stlouisfed.org/fred/${type}?api_key=${apiKey}&file_type=json`;

    if (id!= 0)
    {
        apiUrl = `https://api.stlouisfed.org/fred/${type}?${type}_id=${id}&api_key=${apiKey}&file_type=json`;
    }

    if (subType!=0)
    {
        apiUrl = `https://api.stlouisfed.org/fred/${type}/${subType}?${type}_id=${id}&api_key=${apiKey}&file_type=json`;
    }
    
    if(tag!=0)
    {
        apiUrl = `https://api.stlouisfed.org/fred/${type}/${subType}?${type}_id=${id}&api_key=${apiKey}&tag_names=${tag};quarterly&file_type=json`;
        
    }
    return apiUrl;
}

export default App;
