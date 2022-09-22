// variáveis e seleção de elementos
const apiKey = "ddb2bfc8ed2b7133fbc5e3f3e780cf97";
const apiCountryURL = "https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");


// loader
const toggleLoader = () => {
    loader.classList.toggle("hide");
};

// Funções

const getWeatherData = async(city) => {
    toggleLoader();

    const apiweatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiweatherURL)
    const data = await res.json();

    toggleLoader();

    return data


};

// tratamento de erro
const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
    errorMessageContainer.classList.add("hide");
    weatherContainer.classList.add("hide");

    suggestionContainer.classList.add("hide");

};

const showWeatherData = async (city) => {
    hideInformation();
    const data = await getWeatherData(city);

    if (data.cod == "404") {
        showErrorMessage();
        return;
    }

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute(
        "src", 
        `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    );
    countryElement.setAttribute("src", apiCountryURL + data.sys.country);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;
    
    // change bg img
    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

    weatherContainer.classList.remove("hide");
};

// Eventos
/* = > funcão anonima */
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value

    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter"){
        const city = e.target.value

        showWeatherData(city);
    }
});


// Sugestões
suggestionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const city = btn.getAttribute("id");
  
      showWeatherData(city);
    });
  });