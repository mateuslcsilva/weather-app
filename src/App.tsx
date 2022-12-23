import { useEffect, useState } from 'react'
import { BASE_URL } from './utils/requests'
import { API_KEY } from './utils/key'
import {sunny, cloudy, calmRain, storm, snow} from './utils/weatherConditions'
import {morning, midDay, evening, night} from './utils/dayPeriod'
import './utils/backgrounds.css'
import './App.css'

function App() {
  const [requestType, setRequestType] = useState('current')
  const [cityRequested, setCityRequested] = useState('')
  const [result, setResult] = useState<any>()
  const [backgroundState, setBackgroundState] = useState<any>('clear-morning')

  const getData = async () => {
    let response = await fetch(`${BASE_URL}${requestType}.json?key=${API_KEY}&q=${cityRequested}&aqi=yes`)
    let result = await response.json()
    console.log(result.location)
    setResult(result)
}

const getBackground = () => {
  if(result?.location) {
  let weatherConditions = ''
  let dayPeriod = ''

  console.log(result.location.localtime.substring(11, 13))

  if(sunny.includes(result.current.condition.code)) weatherConditions = 'clear'
  if(cloudy.includes(result.current.condition.code)) weatherConditions = 'cloudy'
  if(calmRain.includes(result.current.condition.code)) weatherConditions = 'calm-rain'
  if(storm.includes(result.current.condition.code)) weatherConditions = 'storm'
  if(snow.includes(result.current.condition.code)) weatherConditions = 'snow'

  if(morning.includes(result.location.localtime.substring(11, 13))) dayPeriod = 'morning'
  if(midDay.includes(result.location.localtime.substring(11, 13))) dayPeriod = 'mid-day'
  if(evening.includes(result.location.localtime.substring(11, 13))) dayPeriod = 'evening'
  if(night.includes(result.location.localtime.substring(11, 13))) dayPeriod = 'night'

  setBackgroundState(`${weatherConditions}-${dayPeriod}`)
}
}

useEffect(() => {
  console.log(backgroundState)
}, [backgroundState])

useEffect(() => {
  getBackground()
  console.log(result)
  console.log("background: " + backgroundState)
}, [result])

  return (
    <div className={`App ${backgroundState}`}>
      <div className='input-search-div'>
        <input
        type="text"
        className='input-search'
        id='searchBar'
        spellCheck="false"
        autoComplete='off'
        onChange={(e) => setCityRequested(e.target.value)}
        value={cityRequested}
        onKeyUp={getData}
        />
{/*         <label htmlFor="searchBar" className='search-bar-label'><i className="bi bi-arrow-left"></i>Digite qualquer cidade</label> */}
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
