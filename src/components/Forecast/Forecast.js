import React, { useState } from 'react';
import Conditions from '../Conditions/Conditions';
import classes from './Forecast.module.css';



const Forecast = () => {
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');

    let [responseObj, setResponseObj] = useState({});
    const uriEncodedCity = encodeURIComponent(city);

    function getForecast(e) {
        e.preventDefault();
        if (city.length === 0) {
            return setError(true);
        }
        // Clear state in preparation for new data
        setError(false);
        setResponseObj({});

        setLoading(true);

        let uriEncodedCity = encodeURIComponent(city);
        fetch(`https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                    "x-rapidapi-key": "5f4cb85755msh09746cdfe219bd7p1390c1jsn843053e37595"
                }
            })
            .then(response => response.json())
            .then(response => {
                if (response.cod !== 200) {
                    throw new Error()
                }
                setResponseObj(response);
                setLoading(false);
            })
            .catch(err => {
                setError(true);
                setLoading(false);
                console.log(err.message);
            });
    }

    return (
        // JSX code will go here
        <
        div >
        <
        h2 > Find Current Weather Conditions
        for your City < /h2>

        <
        form onSubmit = { getForecast } >
        <
        input type = "text"
        placeholder = "Enter City"
        maxLength = "50"
        value = { city }
        className = { classes.textInput }
        onChange = {
            (e) => setCity(e.target.value) }
        /> <
        br / > < br / >
        <
        label >
        <
        input type = "radio"
        name = "units"
        checked = { unit === "imperial" }
        value = "imperial"
        className = { classes.Radio }
        onChange = {
            (e) => setUnit(e.target.value) }
        />
        Fahrenheit <
        /label> <
        label >
        <
        input type = "radio"
        name = "units"
        checked = { unit === "metric" }
        value = "metric"
        className = { classes.Radio }
        onChange = {
            (e) => setUnit(e.target.value) }
        />
        Celcius <
        /label> <
        button className = { classes.Button }
        type = "submit" > Get Forecast < /button> <
        /form> <
        Conditions responseObj = { responseObj }
        error = { error } //new
        loading = { loading } //new
        /> <
        /div>
    )
}


export default Forecast;