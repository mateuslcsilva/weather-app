import React from "react";
import './styles.css'

export const Current = (props:any) => {
    return(
        <div className="current">
        <p className="current-temp">
          {props.result.current.temp_c}
          <span>ºC</span>
        </p>
        <p className='informative-text'>{props.result.current.condition.text}</p>
        <p>
          {`Sensacão Térmica: ${props.result.current.feelslike_c}`}
          <span>ºC</span>
        </p>
      </div>
    )
}