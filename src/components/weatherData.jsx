import React from 'react'

const WeatherData = props => {
    return (
        <div>
            <main className='weatherData'>
                <h3 className='date'>{props.currentDateTime}</h3>
                <h3 className='city-country'>{props.city_Country}</h3>
                {props.tempCelsius? <h1 className='temp'>{props.tempCelsius}&deg;</h1> : null}
                <img className='weatherIcon' src={props.icon} alt={props.icon} />
                <h2 className='description'>{props.description}</h2>
            </main>
        </div>
    )
}

export default WeatherData;
