import React from 'react'
import './TeslaStats.css'

const TeslaStats = (props) => {
  // const [carStats] = props.carStats

  const listItems = props.carStats.map((stat) => {
    return(
      <li key={stat.model}>
        <div className={`tesla-stats-icon tesla-stats-icon--${stat.model.toLowerCase()}`}></div>
        <p>{stat.miles}<span>mi</span></p>
      </li>
    )
  })

  // console.log(props.carStats)

  return (
    <div className="tesla-stats">
      <ul>
        {listItems}  
      </ul>
    </div>
  )
}

export default TeslaStats
