/* Global Variables */

let baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=`;
const apiKey = `,&appid=78e5b891e6da809c0b2db304f0ca8cd1`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getDate()}-${d.toLocaleString("en-us", {
  month: "short",
})}-${d.getFullYear()}`;

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

// update UI
const dynUpdateUI = async (data) => {
  // fetch data from the post route
  console.log(data.city);
  console.log(data.temp);
  console.log(data.date);
  console.log(data.userResponse);

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
        userResponse: feelings,
      }).then((resolve) => dynUpdateUI(resolve));
    } else {
      // city found found on cod:404
      console.log(resolve.message);
    }
  });
};

document
  .getElementById("generate")
  .addEventListener("click", executer);
