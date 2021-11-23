import React from 'react'
import './TeslaCounter.css'
const TeslaCounter = (props) => {
  return (
    <div className="tesla-counter">
      
      <p className="tesla-counter__title">{props.initValues.title}</p>

      <div className="tesla-counter__container">

        
        <div className="tesla-counter__inner cf">
          <p className="tesla-counter__number">
            { props.currentValue }
            <span>{ props.initValues.unit }</span>
          </p>
          <div className="tesla-counter__controls">
            <button 
              onClick={(e) => props.increment(e, props.initValues.title)} 
              disabled={props.currentValue >= props.initValues.max} 
            >
            </button>
            <button 
              onClick={(e) => props.decrement(e, props.initValues.title)} 
              disabled={props.currentValue <= props.initValues.min}
            >
            </button>
          </div>
        </div>
        
      </div>

    </div>  
  )
}

export default TeslaCounter
