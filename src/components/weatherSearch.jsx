import React from 'react'

const weatherSearch = props => {
    return (
        <div>
            <form className='search-area' onSubmit={props.loadWeather}>
                <input type="text" name='city' placeholder='City' autoComplete='off' />
                <input type="text" name='country' placeholder='Country' autoComplete='off' />
                <button>Get Weather</button>
            </form>
            <div className="error">{props.error ? props.error : null}</div>
        </div>
    )
}

export default weatherSearch;
