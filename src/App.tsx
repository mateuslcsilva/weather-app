import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from './utils/requests'
import { API_KEY } from './utils/key'
import './App.css'

function App() {
  const [requestType, setRequestType] = useState('current')
  const [cityRequested, setCityRequested] = useState('')
  const [result, setResult] = useState<any>()

  const getData = async () => {
    setTimeout(() => {
      //just waiting
    }, 1500)
    let response = await fetch(`${BASE_URL}${requestType}.json?key=${API_KEY}&q=${cityRequested}`)
    let result = await response.json()
    console.log(result.location)
    setResult(result)
}
useEffect(() => {
  console.log(cityRequested)
}, [cityRequested])

  return (
    <div className="App">
      <div className='input-search-div'>
        <input
        type="text"
        className='input-search'
        id='searchBar'
        spellCheck="false"
        onChange={(e) => setCityRequested(e.target.value)}
        value={cityRequested}
        onKeyUp={getData}
        />
        <label htmlFor="searchBar" className='search-bar-label'><i className="bi bi-arrow-left"></i>Digite qualquer cidade</label>
      </div>

      <div>
        {result?.location &&
        <div>
          <h3>{result.location.name}</h3>
          <h3>{result.location.region}</h3>
          <h3>{result.location.country}</h3>
          <h3>{result.current.temp_c}ºC</h3>
          <h3>{result.current.temp_f}ºF</h3>
        </div>
        }
      </div>
    </div>
  )
}

export default App
