let currentWeather = document.getElementById("currentWeather");
let anotherdata = document.getElementById("anotherdata");
let tblforcastData = document.getElementById("tblforcastData");

let forcastdataRow = document.getElementById("forcastdataRow");


function currentcity() {
    let url = "http://api.weatherapi.com/v1/forecast.json?key=0975a3334d124e6bb59130530240904&q=colombo&days=3&aqi=no&alerts=no";
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            let currentdata = ` <div>
                                <h1><img width="35" height="35" src="https://img.icons8.com/color/48/place-marker--v2.png" alt="place-marker--v2"/>${data.location.name}</h1>
                                &nbsp;&nbsp;&nbsp;<img src="${data.current.condition.icon}" alt="">
                                <h3>&nbsp;&nbsp;${data.current.condition.text}</h3>
                                <h1><img width="35" height="35" src="https://img.icons8.com/color/48/temperature--v2.png" alt="temperature--v2"/>${data.current.temp_c}&#8451;</h1>
                            </div>`
            currentWeather.innerHTML = currentdata;

            let body =`
                        <div class="mt-3">
                        <p><img width="35" height="35" src="https://img.icons8.com/color/48/country.png" alt="country"/><b> Country :</b>&nbsp;&nbsp;&nbsp;${data.location.country}</p>
                        <p><img width="35" height="35" src="https://img.icons8.com/color/48/hygrometer.png" alt="hygrometer"/><b> Humidity :</b>&nbsp;&nbsp;${data.current.humidity}</p>
                        <p><img width="35" height="35" src="https://img.icons8.com/fluency/48/cloud.png" alt="cloud"/><b> Cloud :</b>&nbsp;&nbsp;${data.current.cloud}</p>
                        <p><img width="35" height="35" src="https://img.icons8.com/color/48/wind.png" alt="wind"/><b> Wind speed :</b><td>&nbsp;&nbsp;${data.current.wind_kph} km/h</p>
                        <p><img width="48" height="48" src="https://img.icons8.com/color/48/do-not-expose-to-sunlight.png" alt="do-not-expose-to-sunlight"/><b> Uv :</b><td>&nbsp;&nbsp;${data.current.uv}</td></p>

                    </div>`
            
                    anotherdata.innerHTML=body;
            let forcastData="";
            function getForcast(ForcastArray) {
                for (var i = 0; i < ForcastArray.length; i++) {
                    forcastData +=`
                                    <div class="transperent col-lg-3  col-sm-12 mt-sm-5 ms-lg-5">
                                        <h3>${ForcastArray[i].date}</h3>
                                        <div>
                                            <img src="${ForcastArray[i].day.condition.icon}" alt="">
                                            <p>${ForcastArray[i].day.condition.text}</p>
                                        </div>
                                        <h2><img width="35" height="35" src="https://img.icons8.com/fluency/48/cloud.png" alt="cloud"/>${ForcastArray[i].day.avgtemp_c}</h2>
                                    </div>
                                    `
                };
                forcastdataRow.innerHTML=forcastData;
            }
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
            console.log(data);
            let currentdata = ` <div>
                                    <h1><img width="35" height="35" src="https://img.icons8.com/color/48/place-marker--v2.png" alt="place-marker--v2"/>${data.location.name}</h1>
                                    &nbsp;&nbsp;&nbsp;<img src="${data.current.condition.icon}" alt="">
                                    <h3>&nbsp;&nbsp;${data.current.condition.text}</h3>
                                    <h1><img width="35" height="35" src="https://img.icons8.com/color/48/temperature--v2.png" alt="temperature--v2"/>${data.current.temp_c}&#8451;</h1>
                                </div>`
            currentWeather.innerHTML = currentdata;

            let body = `<tr>
                        <td><img width="35" height="35" src="https://img.icons8.com/color/48/country.png" alt="country"/><b> Country</b></td>
                        <td>${data.location.country}</td>
                    </tr>
                    <tr>
                        <td scope="col"><img width="35" height="35" src="https://img.icons8.com/color/48/hygrometer.png" alt="hygrometer"/><b> Humidity</b></td>
                        <td>${data.current.humidity}</td>
                    </tr>
                    <tr>
                        <td scope="col"><img width="35" height="35" src="https://img.icons8.com/fluency/48/cloud.png" alt="cloud"/><b> Cloud</b></td>
                        <td>${data.current.cloud}</td>
                    </tr>
                    <tr>
                        <td><img width="35" height="35" src="https://img.icons8.com/color/48/wind.png" alt="wind"/><b> Wind speed</b></td>
                        <td>${data.current.wind_kph} km/h</td>
                    </tr>
                    <tr>
                        <td><img width="48" height="48" src="https://img.icons8.com/color/48/do-not-expose-to-sunlight.png" alt="do-not-expose-to-sunlight"/><b> Uv</b></td>
                        <td>${data.current.uv}</td>
                    </tr>`
            tblanotherData.innerHTML = body;

            let forcastData="";
            function getForcast(ForcastArray) {
                for (var i = 0; i < ForcastArray.length; i++) {
                    console.log(ForcastArray[i].date);
                    console.log(ForcastArray[i].day.condition.icon);
                    forcastData += `<tr>
                                    <td><img src="${ForcastArray[i].day.condition.icon}" alt=""></td>
                                     <td>${ForcastArray[i].date}</td>
                                     <td>${ForcastArray[i].day.condition.text}</td>
                                     <td>${ForcastArray[i].day.avgtemp_c}</td>
                                     <td>${ForcastArray[i].day.maxwind_mph}</td>
                                     <td>${ForcastArray[i].day.avghumidity}</td>
                                </tr>`
                };
                tblforcastData.innerHTML = forcastData;
            }
            getForcast(data.forecast.forecastday);
        })
}
