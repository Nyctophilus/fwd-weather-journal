/* Global Variables */
const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=`;
let apiKey = `,&appid=78e5b891e6da809c0b2db304f0ca8cd1`;

// ,apiKey = `,&appid=${process.env.APIKEY}`

/*  get key from the server

never used... i made it for testing perposes only and got the key in the server code too
const getKey = async () => {
	const res = await fetch("/apikey");
	
	try {
		const key = await res.json();
		console.log(key.key);
	} catch (e) {
		console.log(e);
	}
};
*/

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getDate()}-${d.toLocaleString("en-us", {
  month: "short",
})}-${d.getFullYear()}`;

/*
	helper functions
*/
function manipulateUI(data) {
  // 	entry holders
  const temp = document.getElementById("temp"),
    date = document.getElementById("date"),
    city = document.getElementById("city"),
    statusIcon = document.getElementById("statusIcon"),
    feeling = document.getElementById("feeling");

  // chnage source img based on the weather status aquired!
  switch (data.weatherStatus) {
    case "Snow":
      statusIcon.src = `https://www.svgrepo.com/show/252488/snowy-snow.svg`;
      break;
    case "Clouds":
      statusIcon.src = `https://www.svgrepo.com/show/68769/weather.svg`;
      break;

    default:
      statusIcon.src = `https://www.svgrepo.com/show/315013/weather.svg`;
  }
  // show the icon
  statusIcon.hidden = false;

  // update the ui with the aquired data
  city.innerHTML = `City Name: <strong>${data.city}</strong>`;
  temp.innerHTML = `Temperature: <strong>${data.temp}</strong>`;
  date.innerHTML = `Date: <strong>${data.date}</strong>`;
  feeling.innerHTML = `Your Feedback: <strong>${
    data.userResponse || "Nothing Felt!"
  }</strong>`;
}

/*
	route functions
*/

// fetch from weather API
const fetchWeather = async (key, zipCode) => {
  const units = "metric";
  const res = await fetch(
    `${baseURL}${zipCode}${key}&units=${units}`
  );

  try {
    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

// post data to my app
const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await res.json();
    console.log(`posted this data`);
    console.log(newData);
    return newData;
  } catch (e) {
    console.log(e);
  }
};

/*
	Update UI
*/
const dynUpdateUI = async () => {
  // fetch data from server on /get route!
  const res = await fetch("/all");

  try {
    const DATA = await res.json();
    manipulateUI(DATA);
  } catch (e) {
    console.log(e);
  }
};

/*
	EXECUTE!
*/

// function which call all the chaining promises!!
const executer = () => {
  // fetching zip code from the user
  const zipCode = document.getElementById("zip").value;
  const feelings =
    document.getElementById("feelings").value;

  fetchWeather(apiKey, zipCode).then((resolve) => {
    if (resolve.cod === 200) {
      postData(`/add`, {
        city: resolve.name,
        temp: `${resolve.main.temp}\u00B0C`,
        date: newDate,
        weatherStatus: resolve.weather[0].main,
        userResponse: feelings,
      }).then(dynUpdateUI());
    } else {
      // [x] city found found on cod:404
      document.getElementById(
        "error"
      ).innerHTML = `Aw, ${resolve.message} 😰`;
    }
  });
};

/*
	events
*/

// execute chaining on the button click
document
  .getElementById("generate")
  .addEventListener("click", executer);
