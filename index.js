getRandomQuotes();

// get random photos from unsplash api
fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=programming"
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    document.getElementById("author").textContent = `By: ${data.user.name}`;
  })
  .catch((err) => {
    // Use a default background image/author
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`;
    document.getElementById("author").textContent = `By: Dodi Achmad`;
  });

// get the current crryto informations
fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
  .then((res) => {
    if (!res.ok) {
      throw Error("Something went wrong");
    }
    return res.json();
  })
  .then((data) => {
    document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `;
    document.getElementById("crypto").innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `;
  })
  .catch((err) => console.error(err));

// get current time
function getCurrentTime() {
  const date = new Date();
  document.getElementById("time").textContent = date.toLocaleTimeString(
    "en-us",
    { timeStyle: "short" }
  );
}

// get random quotes and render it
function getRandomQuotes() {
  let quoteText = document.getElementById("quote");
  fetch("https://api.goprogram.ai/inspiration")
    .then((res) => {
      if (!res.ok) {
        throw Error("Can't get the quote");
      }
      return res.json();
    })
    .then((data) => (quoteText.textContent = `"${data.quote}"`))
    .catch((err) => {
      console.error(err);
      quoteText.textContent = "You must do the thing you think you cannot do.";
    });
}

// render the time in every second
setInterval(getCurrentTime, 1000);

//to get geolocation for mozllla firefox
//location.services.mozilla.com/v1/geolocate?key=test

// get geolocation of the current device and only works on chrome and pass it to weather api to get the current weather info based on location
navigator.geolocation.getCurrentPosition(
  (position) => {
    // get current weather informations
    get;
    fetch(
      `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Weather data not available");
        }
        return res.json();
      })
      .then((data) => {
        // to get weather icon based on current weather
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `;
      })
      .catch((err) => console.error(err));
  },
  error,
  { enableHighAccuracy: true }
);

function error(err) {
  console.error(err.code + " : " + err.message);
}
