import React, { useEffect, useState } from 'react'
import TeslaNotice from '../../components/TeslaNotice/TeslaNotice'
import TeslaCar from '../../components/TeslaCar/TeslaCar'
import TeslaStats from '../../components/TeslaStats/TeslaStats'
import TeslaCounter from '../../components/TeslaCounter/TeslaCounter'
import TeslaClimate from '../../components/TeslaClimate/TeslaClimate'
import TeslaWheels from '../../components/TeslaWheels/TeslaWheels'
import { getModelData } from '../../services/BatteryService'
import './TeslaBattery.css'


const TeslaBattery = () => {
    
  const [carStats, setCarStats] = useState([])
  const [config, setConfig] = useState({
    speed: 55,
    temperature: 20,
    climate: true,
    wheels: 19
  })

  const counterDefaultVal = {
    speed: {
      title: "Speed",
      unit: "mph",
      step: 5,
      min: 45,
      max: 70
    },
    temperature: {
      title: "Outside Temperature",
      unit: "°",
      step: 10,
      min: -10,
      max: 40
    }
  }

  const statsUpdate = () => {
    const carModels = ['60', '60D', '75', '75D', '90D', 'P100D']
    setCarStats(calculateStats(carModels, config))
  }


  const calculateStats = (models, value) => {
    const dataModels = getModelData()
    
    return models.map(model => {
      // ES6 Object destructuring Syntax,
      // takes out required values and create references to them
      const { speed, temperature, climate, wheels } = value;
      const miles = dataModels[model][wheels][climate ? 'on' : 'off'].speed[speed][temperature];
      // console.log(model, miles)
      return {
        model,
        miles
      }
      
    })
  }

  const updateCounterState = (title, newValue) => {

    const configArray = { ...config }
    
    // update config state with new value
    title === 'Speed' ? configArray['speed'] = newValue : configArray['temperature'] = newValue
    
    // update our state
    setConfig({config, ...configArray })
  }

  const increment = (e, title) => {
    e.preventDefault()

    let currentValue, maxValue, step

    const { speed, temperature } = counterDefaultVal

    if (title === 'Speed') {
      currentValue = config.speed
      maxValue = speed.max
      step = speed.step
    } else {
      currentValue = config.temperature
      maxValue = temperature.max
      step = temperature.step
    }

    if (currentValue < maxValue) {
      const newValue = currentValue + step
      updateCounterState(title, newValue)
    }
  }

  const decrement = (e, title) => {
    e.preventDefault()

    let currentValue, minValue, step

    const { speed, temperature } = counterDefaultVal

    if (title === 'Speed') {
      currentValue = config.speed
      minValue = speed.min
      step = speed.step
    } else {
      currentValue = config.temperature
      minValue = temperature.min
      step = temperature.step
    }

    if (currentValue > minValue) {
      const newValue = currentValue - step
      updateCounterState(title, newValue)
    }
  }

  // handle aircon & heating click event handler
  const handleChangeClimate = () => {
    // const config = {...config};
    config['climate'] = !config.climate;
    setConfig({ config, ...config });
  }

  const handleChangeWheels = (size) => {
    config['wheels'] = size;
    setConfig({ config, ...config })
  }

  useEffect(() => {
    statsUpdate()
  }, [])

  
  return (
    <div className='tesla-battery'>
      <h1>Range Per Charge</h1>
      <TeslaCar wheelSize = {config.wheels} />
      <TeslaStats carStats = {carStats}/>

      <div className="tesla-controls">
        <TeslaCounter
          currentValue={config.speed}
          initValues={counterDefaultVal.speed}
          increment={increment}
          decrement={decrement}
        />
        
        <div className="vertical-line"></div>

        <div className="climate-control">
          <TeslaCounter
            currentValue={config.temperature}
            initValues={counterDefaultVal.temperature}
            increment={increment}
            decrement={decrement}
          />

          <TeslaClimate
            value={config.climate}
            limit={config.temperature > 10}
            handleChangeClimate={handleChangeClimate}
          /> 
        </div>
        <div className="vertical-line"></div>
        <TeslaWheels
          value={config.wheels}
          handleChangeWheels={handleChangeWheels}
        />
      </div>
      
      <TeslaNotice />
      {/* {JSON.stringify(carStats)} */}

    </div>
  )
}

export default TeslaBattery
