let idx = 0;
const inputEl = document.querySelector(".search-bar"),
  windEl = document.querySelector(".wind"),
  btnEl = document.querySelectorAll(".btn"),
  scrollEl = document.querySelector(".scroll"),
  tempEl = document.querySelector("#temp"),
  pollutantsEl = document.querySelector("#pollutants"),
  activeEl = document.querySelectorAll(".progress div"),
  directions = [
    "North",
    "NorthEast",
    "East",
    "SouthEast",
    "South",
    "SouthWest",
    "West",
    "NorthWest",
  ],
  progressEl = document.querySelector("#progress div"),
  cardHolder = document.querySelector(".scroll"),
  cardsEl = document.getElementsByClassName("cards"),
  mainEl = document.querySelector("#main"),
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  weather = {
    key: "8d344533d7ea2c3c05ae385c1041290c",
    fetchWeather: function (e) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${e}&appid=${this.key}&units=metric`
      )
        .then((e) => {
          if (!e.ok)
            throw (
              (alert("No weather Data found, Please try again."),
              new Error("No weather found."))
            );
          return e.json();
        })
        .then((e) => {
          this.displayWeather(e);
        });
    },
    fetchPollution: function ({ lon: e, lat: t }) {
      fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${t}&lon=${e}&appid=${this.key}\n      `
      )
        .then((e) => {
          if (!e.ok)
            throw (
              (alert("No weather Data found, Please try again."),
              new Error("No weather found."))
            );
          return e.json();
        })
        .then((e) => this.displayPollution(e));
    },
    fetchForecast: function ({ lon: e, lat: t }) {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${t}&lon=${e}&exclude=current,minutely,hourly,alerts&appid=${this.key}&units=metric\n      `
      )
        .then((e) => {
          if (!e.ok)
            throw (
              (alert("No weather Forecast found, Please try again."),
              new Error("No weather found."))
            );
          return e.json();
        })
        .then((e) => this.displayDaily(e));
    },
    displayWeather: function (e) {
      const { name: t } = e,
        { icon: n, description: a } = e.weather[0],
        { temp: s, pressure: l, humidity: r } = e.main,
        { speed: i, deg: o } = e.wind,
        d = this.convert(o);
      (windEl.textContent = `${d} Wind`),
        (tempEl.innerHTML = `\n        <h3>Weather in ${t}</h3>\n        <div id="temp-el">\n            <h1 class="large">${s} °C</h1>\n            <div class="flex align-center">\n                <img src="https://openweathermap.org/img/wn/${n}.png" alt="" class="icon">\n                <p>${a}</p>\n            </div>\n        </div>\n        <div id="other" class="flex">\n            <div class="small">\n                <p>Pressure</p>\n                <h2>${l}<span class='font-small'>mb</span></h2>\n\n            </div>\n            <div class="small">\n                <p>Wind</p>\n                <h2>${i}<span class='font-small'>km/hr</span></h2>\n\n            </div>\n            <div class="small">\n                <p>Humidity</p>\n                <h2>${r}<span class='font-small'>%</span></h2>\n            </div>\n        </div>\n      `),
        this.fetchPollution(e.coord),
        (tempEl.style.backgroundImage = `url('https://source.unsplash.com/360x270/?${a}+dark+weather')`),
        (mainEl.style.backgroundImage = `url('https://source.unsplash.com/910x720/?${t}+white')`),
        (document.body.style.backgroundImage =
          document.defaultView.getComputedStyle(mainEl).backgroundImage),
        this.fetchForecast(e.coord);
    },
    displayPollution: function (e) {
      const { aqi: t } = e.list[0].main,
        { no2: n, pm10: a, o3: s, pm2_5: l } = e.list[0].components;
      (pollutantsEl.innerHTML = `\n        <div class="small">\n            <p>NO <sub>2</sub></p>\n            <div class="flex justify-between" >\n            <h4>${Math.round(
        n,
        0
      )}</h4><p class="extra-small">&#181;g/m <sup>3</sup></p>\n        </div>\n        </div>\n        <div class="small">\n            <p>PM<sub>10</sub></p>\n            <div class="flex"><h4>${Math.round(
        a,
        0
      )}</h4><p class="extra-small">&#181;g/m <sup>3</sup></p></div>\n        </div>\n        <div class="small">\n            <p>O<sub>3</sub></p>\n            <div class="flex"><h4>${Math.round(
        s,
        0
      )}</h4><p class="extra-small">&#181;g/m <sup>3</sup></p></div>\n        </div>\n        <div class="small">\n            <p>PM<sub>2.5</sub></p>\n            <div class="flex"><h4>${Math.round(
        l,
        0
      )}</h4><p class="extra-small">&#181;g/m <sup>3</sup></p></div>\n        </div>\n      `),
        (progressEl.style.width = 20 * t + "%"),
        activeEl[idx].classList.remove("active"),
        (idx = t - 1),
        activeEl[idx].classList.add("active");
    },
    displayDaily: function ({ daily: e }) {
      let t = new Date(),
        n = "";
      for (let a = 0; a < 7; a++) {
        let s = new Date(t.getTime() + 864e5 * a),
          l = days[s.getDay()];
        0 == a ? (l = "Today") : 1 == a && (l = "Tommorrow"),
          (n += `\n      <div class="cards">\n        <div class="flex column align-center">\n            <h3>${l}</h3>\n            <p>${s.getDate()}/${
            s.getMonth() + 1
          }/${s.getFullYear()}</p>\n        </div>\n        <div class="flex column align-center">\n            <h2>${Math.round(
            e[a].temp.max
          )}/${Math.round(
            e[a].temp.min
          )} °C</h2>\n            <div class="flex align-center">\n                <img src="https://openweathermap.org/img/wn/${
            e[a].weather[0].icon
          }.png" alt="" class="icon">\n                <p>${
            e[a].weather[0].description
          }</p>\n            </div>\n        </div>\n        <div class="flex column align-center">\n            <h4>${this.convert(
            e[a].wind_deg
          )}</h4>\n            <p>${
            e[a].wind_speed
          }km/hr</p>\n        </div>\n      </div>\n      \n      `);
      }
      cardHolder.innerHTML = n;
      for (let t = 0; t < 7; t++)
        cardsEl[t].style.background = `url(images/${e[t].weather[0].main}.jpg)`;
    },
    convert: function (e) {
      let t = (8 * e) / 360;
      return (t = Math.round(t, 0)), directions[(t = (t + 8) % 8)];
    },
    search: function () {
      this.fetchWeather(inputEl.value);
    },
  };
document
  .querySelector("nav button")
  .addEventListener("click", () => weather.search()),
  inputEl.addEventListener(
    "keyup",
    (e) => "Enter" == e.key && weather.search()
  ),
  weather.fetchWeather("Mumbai"),
  btnEl[0].addEventListener("click", () =>
    cardsEl[0].scrollIntoView({ behavior: "smooth" })
  ),
  btnEl[1].addEventListener("click", () =>
    cardsEl[6].scrollIntoView({ behavior: "smooth" })
  );
