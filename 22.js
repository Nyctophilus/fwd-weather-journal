/* Global Variables */
let baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=`;
const apiKey = `,&appid=...`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getDate()}-${d.toLocaleString("en-us", {
  month: "short",
})}-${d.getFullYear()}`;

/*
	route functions
*/

// fetch from weather API
const fetchWeather = async (zipCode) => {
  const res = await fetch(
    `${baseURL}${zipCode}${apiKey}&units=metric`
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
const dynUpdateUI = async (data) => {
  // fetch data from the post route
  console.log(data.city);
  console.log(data.temp);
  console.log(data.date);
  console.log(data.userResponse);
  console.log(data.weatherStatus);

  // 	entry holders
  const temp = document.getElementById("temp"),
    date = document.getElementById("date"),
    city = document.getElementById("city"),
    statusIcon = document.getElementById("statusIcon"),
    content = document.getElementById("content");

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
  city.textContent = data.city;
  temp.textContent = data.temp;
  date.textContent = data.date;
  content.textContent =
    data.userResponse || "Nothing Felt!";

  //   fetch data from server on /get route!
  //   const res = await fetch("/get");

  //   try {
  //     const DATA = await res.json();
  //     console.log(DATA);
  //     return DATA;
  //   } catch (e) {
  //     console.log(e);
  //   }
};

// function which call all the chaining promises!!
const executer = () => {
  // fetching zip code from the user
  const zipCode = document.getElementById("zip").value;
  const feelings =
    document.getElementById("feelings").value;

  fetchWeather(zipCode).then((resolve) => {
    if (resolve.cod === 200) {
      postData(`/add`, {
        city: resolve.name,
        temp: `${resolve.main.temp}\u00B0C`,
        date: newDate,
        weatherStatus: resolve.weather[0].main,
        userResponse: feelings,
      }).then((resolve) => dynUpdateUI(resolve));
    } else {
      // [ ] city found found on cod:404
      console.log(resolve.message);
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
