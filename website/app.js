//variables
const zipCode = document.getElementById("zip");
const feeling = document.getElementById("feelings");
const error = document.getElementById("error");
const entry = document.getElementById("entry");
const generateKey = document.getElementById("generate");

//create new date
let date = new Date();
let newDate = date.toDateString();

// Personal API Key for OpenWeatherMap API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",&appid=bfd077c187fb6097c49110b696e866c1&units=metric";

// server url
const server = "http://localHost:4000";

// generating data
function generateData(e){
    const zip = zipCode.value;
    const feelings = feeling.value;
    getWeatherData(zip).then((data) => {
        if (data) {
            const {
                main: { temp },
                name: city,
                weather: [{ description }],
            } = data;

            const info = {
                newDate,
                city,
                temp: Math.round(temp),
                description,
                feelings,
            };

            dataPost(server + "/add", info);

            updateUI();
            entry.style.opacity = 1;
        }
    });
};

/* Function called by event listener */
generateKey.addEventListener("click", generateData);

/* Function to GET Web API Data*/
const getWeatherData = async (zip) => {
    try {
        const res = await fetch(baseURL + zip + apiKey);
        const data = await res.json();

        if (data.cod != 200) {
            error.innerHTML = data.message;
            setTimeout((_) => (error.innerHTML = ""), 3000);
            throw `${data.message}`;
        }

        return data;
    } catch (error) {
        console.log(error);
    }
};

/* Function to POST data */
const dataPost = async (url = "", info = {}) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
    });

    try {
        const secData = await res.json();
        console.log(`You just saved`, secData);
        return secData;
    } catch (error) {
        console.log(error);
    }
};

/* Function to GET Project Data */
const updateUI = async () => {
    const res = await fetch(server + "/all");
    try {
        const savedData = await res.json();

        document.getElementById("city").innerHTML = savedData.city;
        document.getElementById("date").innerHTML = savedData.newDate;
        document.getElementById("temp").innerHTML = savedData.temp + "&degC";
        document.getElementById("content").innerHTML = savedData.feelings;
        document.getElementById("description").innerHTML = savedData.description;
    } catch (error) {
        console.log(error);
    }
};
