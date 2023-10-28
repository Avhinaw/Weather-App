const searchButton = document.querySelector(".search-button"); // search button to search specific location
const searchWeather = document.querySelector(".search-weather"); // search specific weather slide
const weatherButton = document.querySelector(".weather-button"); // your weather to get location weather
const access = document.querySelector(".access"); // grant access display whole
const userInfoWeather = document.querySelector(".container"); // weather info using location display whole
const smartWork = document.querySelector(".smart-work");
userInfoWeather.classList.add("inactive");
access.classList.add("inactive");


searchButton.addEventListener("click", function () { // search button click function to show that slide
    searchWeather.classList.add("active");
    searchButton.classList.add("weather-button");
    weatherButton.classList.remove("weather-button");
    access.classList.add("inactive");
    userInfoWeather.classList.add("inactive");
    smartWork.classList.add("inactive");
});
weatherButton.addEventListener("click", function () { // your weather click function to show that slide
    searchWeather.classList.remove("active");
    searchButton.classList.remove("weather-button");
    weatherButton.classList.add("weather-button");
    access.classList.add("inactive");
    userInfoWeather.classList.add("inactive");
    smartWork.classList.add("inactive");
    getFromSessionStorage();
});

function getFromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        access.classList.remove("inactive");
    }else{
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}
const loadingScreen = document.querySelector(".loading-screen")
const apiKey = "7e061849862d4fa5af51d23dd8d2ce4d";
async function fetchUserWeatherInfo(coordinates){
    const {lat, lon} = coordinates;
    loadingScreen.classList.add("active");
    access.classList.add("inactive");
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoWeather.classList.remove("inactive");
        renderWeatherInfo(data);
    }
    catch(err){
        alert("Not working");
    }
}

const cityName = document.querySelector(".city-name");
const countryImg = document.querySelector(".county-img");
const weatherType = document.querySelector(".weather-type");
const weatherTypeImg = document.querySelector(".weather-typeImg");
const temprature = document.querySelector(".temprature");
const windspd = document.querySelector(".windspd");
const humid = document.querySelector(".humid");
const clouds = document.querySelector(".clouds");
function renderWeatherInfo(weatherInfo){
    cityName.innerText = weatherInfo?.name;
    countryImg.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    weatherType.innerText = weatherInfo?.weather?.[0]?.main;
    weatherTypeImg.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temprature.innerText = `${weatherInfo?.main?.temp} °C`;
    windspd.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humid.innerText = `${weatherInfo?.main?.humidity} %`;
    clouds.innerText = `${weatherInfo?.clouds?.all} %`;
}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        alert("No geolocation feature")
    }
}
function showPosition(Position){
    const userCoordinates = {
        lat: Position.coords.latitude,
        lon: Position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

const grantAccess = document.querySelector(".grant-button");
grantAccess.addEventListener("click",getLocation);

const citySearch = document.querySelector(".color-search"); // search button in search slide for searching weather
const textInput = document.querySelector(".text-input"); // written input in textfield
const inputSearch = document.querySelector(".input-search");
let apiCity = "Rewa";
citySearch.addEventListener("click", function () { // api call for search specific city weather
    apiCity = textInput.value;
    fetchSearchWeatherInfo(apiCity);
});

async function fetchSearchWeatherInfo(apiCity){
    loadingScreen.classList.add("active");
    userInfoWeather.classList.add("inactive");
    userInfoWeather.classList.remove("extra-style");
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${apiCity}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        userInfoWeather.classList.remove("inactive");
        userInfoWeather.classList.add("extra-style");
        loadingScreen.classList.remove("active");
        renderWeatherInfo(data);
}catch{
    
}
}
inputSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    if (textInput.value === "") return;
    fetchSearchWeatherInfo(textInput.value);
    textInput.value = "";
  });

