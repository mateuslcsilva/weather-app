import React from "react";
import './styles.css'

export const Current = (props:any) => {
  console.log(props.result.current.temp_c)
    return(
        <div className="current">
        <p className="current-temp">
          {Math.floor(props.result.current.temp_c)}
          <span>ºC</span>
        </p>
        <p className='informative-text'>{props.result.current.condition.text}</p>
        <p className='informative-text'>
          {`Sensacão Térmica: ${Math.floor(props.result.current.feelslike_c)}`}
          <span>ºC</span>
        </p>
      </div>
    )
}