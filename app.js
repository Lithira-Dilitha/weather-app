let currentWeather = document.getElementById("currentWeather");
let anotherdata = document.getElementById("anotherdata");
let forcastdataRow = document.getElementById("forcastdataRow");


function currentcity() {
    let url = "http://api.weatherapi.com/v1/forecast.json?key=0975a3334d124e6bb59130530240904&q=colombo&days=3&aqi=no&alerts=no";
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            loadCurrentCity(data);
            loadAnotherData(data);

            getForcast(data.forecast.forecastday);

        })

}
currentcity();
function getAnotherCity() {
    let city = document.getElementById("txtCityname").value;
    let url = `http://api.weatherapi.com/v1/forecast.json?key=0975a3334d124e6bb59130530240904&q=${city}&days=3&aqi=no&alerts=no`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            loadCurrentCity(data);
            loadAnotherData(data);
            getForcast(data.forecast.forecastday);
        })
}


function getForcast(ForcastArray) {
    let forcastData = "";
    for (var i = 0; i < ForcastArray.length; i++) {
        forcastData += `
                        <div class="Space transperent col-lg-3  col-sm-12 mt-sm-5 ms-lg-5">
                            <h3>${getDay(ForcastArray[i].date)}</h3>
                            <div>
                                <img src="${ForcastArray[i].day.condition.icon}" alt="">
                                <p><b>${ForcastArray[i].day.condition.text}</b></p>
                            </div>
                            <p><img width="30" height="30" src="https://img.icons8.com/color/48/temperature--v2.png" alt="temperature--v2"/>&nbsp;<b>temperature :</b>&nbsp;&nbsp;${ForcastArray[i].day.avgtemp_c}&#8451;</p>
                            <p><img width="30" height="30" src="https://img.icons8.com/color/48/wind.png" alt="wind"/>&nbsp;<b>wind speed :</b>&nbsp;&nbsp;${ForcastArray[i].day.maxwind_mph} km/h</p>
                            <p><img width="30" height="30" src="https://img.icons8.com/color/48/hygrometer.png" alt="hygrometer"/>&nbsp;<b>Average humidity :</b>&nbsp;&nbsp;${ForcastArray[i].day.avghumidity}&percnt;</p>
                            <p><img width="30" height="30" src="https://img.icons8.com/color/48/rain--v1.png" alt="rain--v1"/>&nbsp;<b>Chance Of Rain :</b>&nbsp;&nbsp;${ForcastArray[i].day.daily_chance_of_rain}&percnt;</p>
                        </div>
                        `
    };
    forcastdataRow.innerHTML = forcastData;
}

function loadCurrentCity(response) {
    let currentdata = ` <div>
                            <h1><img width="35" height="35" src="https://img.icons8.com/color/48/place-marker--v2.png" alt="place-marker--v2"/>${response.location.name}</h1>
                            &nbsp;&nbsp;&nbsp;<img src="${response.current.condition.icon}" alt="">
                            <h3>&nbsp;&nbsp;${response.current.condition.text}</h3>
                            <h1><img width="35" height="35" src="https://img.icons8.com/color/48/temperature--v2.png" alt="temperature--v2"/>${response.current.temp_c}&#8451;</h1>
                        </div>`
    currentWeather.innerHTML = currentdata;
}

function loadAnotherData(response) {
    let body = `<div class="Space mt-3">
                    <p><img width="35" height="35" src="https://img.icons8.com/color/48/country.png" alt="country"/><b> Country :</b>&nbsp;&nbsp;&nbsp;${response.location.country}</p>
                    <p><img width="35" height="35" src="https://img.icons8.com/color/48/hygrometer.png" alt="hygrometer"/><b> Humidity :</b>&nbsp;&nbsp;${response.current.humidity}&percnt;</p>
                    <p><img width="35" height="35" src="https://img.icons8.com/fluency/48/cloud.png" alt="cloud"/><b> Cloud :</b>&nbsp;&nbsp;${response.current.cloud}&percnt;</p>
                    <p><img width="35" height="35" src="https://img.icons8.com/color/48/wind.png" alt="wind"/><b> Wind speed :</b><td>&nbsp;&nbsp;${response.current.wind_kph} km/h</p>
                    <p><img width="48" height="48" src="https://img.icons8.com/color/48/do-not-expose-to-sunlight.png" alt="do-not-expose-to-sunlight"/><b> Uv :</b><td>&nbsp;&nbsp;${response.current.uv}</td></p>
                 </div>`

    anotherdata.innerHTML = body;
}
function getDay(response) {
    let daysOfWeek = ["Sunday", "Monday", "Tuseday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let date = new Date(response);
    let day = date.getDay();
    return daysOfWeek[day];
}
