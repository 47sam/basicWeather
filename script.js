const inputEl = document.querySelector('.search-bar');
const windEl = document.querySelector('.wind');
const iconEl = document.querySelector('.icon');
const cityEl = document.querySelector('#temp h3');
const descriptionEl = document.querySelector('#temp-el p');
const tempEl = document.querySelector('#temp-el h1');
const pressureEl = document.querySelector('.small:nth-of-type(1) h2');

const speedEl = document.querySelector('.small:nth-of-type(2) h2');
const humidityEl = document.querySelector('.small:nth-of-type(3) h2');
const noTwo = document.querySelector('.small:nth-of-type(1) div h4');
const pmTen = document.querySelector('.small:nth-of-type(2) div h4');
const oThree = document.querySelector('.small:nth-of-type(3) div h4');
const pmTwoFive= document.querySelector('.small:nth-of-type(4) div h4');
const activeEl = document.querySelectorAll('.progress div');
const directions = ['North', 'NorthEast', 'East', 'SouthEast', 'South', 'SouthWest', 'West', 'NorthWest'];


const progressEl = document.querySelector('#progress div');
const cardHolder = document.querySelector('.scroll');
const cardsEl = document.getElementsByClassName('cards');

const condition = { 
  Haze: 'https://images.unsplash.com/photo-1526398579509-50c91045b50d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8aGF6ZSBkYXJrfHx8fHx8MTY1MDcxODU3NA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=150',
  Rain: 'https://images.unsplash.com/photo-1509929626220-f76cfddcd2b5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8cmFpbiBkYXJrfHx8fHx8MTY1MDcxODY2MQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=150',
  Clouds: 'https://images.unsplash.com/photo-1509934053585-b72b60c14695?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2xvdWRzIGRhcmt8fHx8fHwxNjUwNzgwNTQ2&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=150',
  Clear: 'https://images.unsplash.com/photo-1649723815149-502e0eb742cb?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8c3RhcnJ5IG5pZ2h0IGRhcmt8fHx8fHwxNjUwNzc5MTkz&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=150',
  Thunderstorm: 'https://images.unsplash.com/photo-1514856841774-b927b221d7c9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8dGh1bmRlcnN0b3JtIGRhcmt8fHx8fHwxNjUwNzE5MDYx&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=150',
  Drizzle: 'https://images.unsplash.com/photo-1475070929565-c985b496cb9f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8ZHJpenpsZSBkYXJrfHx8fHx8MTY1MDcxOTExMA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=150',
  Snow: 'https://images.unsplash.com/photo-1510562395835-4f6ab235cae9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8c25vdyBkYXJrfHx8fHx8MTY1MDc4MTAwNg&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=150'
}
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const weather = {
  apiKey: "8d344533d7ea2c3c05ae385c1041290c",
  fetchWeather: function(city) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`
    )
      .then((response) => {
        if(!response.ok) {
          alert("No weather Data found, Please try again.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => {
        this.displayWeather(data);
        this.fetchPollution(data.coord);
        this.fetchForecast(data.coord); 
      });
  },
  fetchPollution: function({lon, lat}){
    fetch(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${this.apiKey}
      `
    )
      .then((response) => {
        if(!response.ok) {
          alert("No weather Data found, Please try again.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((info) => this.displayPollution(info));    
  },
  fetchForecast: function({lon,lat}) {
    // console.log(lat, lon);

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&appid=${this.apiKey}&units=metric
      `
    )
      .then((response) => {
        if(!response.ok) {
          alert("No weather Forecast found, Please try again.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayDaily(data)); 
  },
  displayWeather: function(data) {
    const {name} = data;
    const {icon,description} = data.weather[0];
    const {temp, pressure, humidity} = data.main;
    const {speed, deg} = data.wind;
    const direction = this.convert(deg);
    iconEl.src = "https://openweathermap.org/img/wn/" + icon + ".png";
    windEl.innerHTML = `${direction} Wind`;
    descriptionEl.innerHTML = description;
    cityEl.innerHTML = `Weather in ${name}`;
    pressureEl.innerHTML = pressure + "<span class='font-small'>mb</span>";
    tempEl.innerHTML = temp + " °C"; 
    humidityEl.innerHTML= humidity + "<span class='font-small'>%</span>";
    speedEl.innerHTML = speed + "<span class='font-small'>km/hr</span>";
    document.querySelector('#temp').style.background = `url('https://source.unsplash.com/400x300/?${description}+dark')`;
    document.querySelector('#main').style.background = `url('https://source.unsplash.com/1000x650/?${name}+white')`;
  },
  displayPollution: function(info){
    const {aqi} = info.list[0].main;
    const {no2,pm10,o3,pm2_5} = info.list[0].components;
    // console.log(aqi,no2,pm10,o3,pm2_5);
    noTwo.innerHTML = Math.round(no2,0);
    pmTen.innerHTML = Math.round(pm10,0);
    oThree.innerHTML = Math.round(o3,0);
    pmTwoFive.innerHTML = Math.round(pm2_5,0);
    progressEl.style['width'] = aqi*20 + '%';
    for(let i=0;i<5;i++) {
      activeEl[i].classList.remove('active');
    }
    activeEl[aqi - 1].classList.add('active');
  },
  displayDaily: function({daily}) {
    // console.log(daily.length)
    let now = new Date();
    let cards = ``;
    for(let i=0;i<7;i++) {
      let today = new Date(now.getTime() + 3600*24*1000*i);
      let day = days[today.getDay()];
      if(i == 0) {
        day = 'Today';
      }
      else if(i == 1) {
        day = 'Tommorrow';
      }
      cards+= `
      <div class="cards">
        <div class="flex column align-center">
            <h3>${day}</h3>
            <p>${today.getDate()}/${today.getMonth()}/${today.getFullYear()}</p>
        </div>
        <div class="flex column align-center">
            <h2>${Math.round(daily[i].temp.max)}/${Math.round(daily[i].temp.min)} °C</h2>
            <div class="flex align-center">
                <img src="https://openweathermap.org/img/wn/${daily[i].weather[0].icon}.png" alt="" class="icon">
                <p>${daily[i].weather[0].description}</p>
            </div>
        </div>
        <div class="flex column align-center">
            <h4>${this.convert(daily[i].wind_deg)}</h4>
            <p>${daily[i].wind_speed}km/hr</p>
        </div>
      </div>
      
      `
    }
    cardHolder.innerHTML = cards;
    for(let i=0;i<7;i++) {
      // console.log(new Date(daily[i].sunrise));
      
      cardsEl[i].style.background = `url(${condition[daily[i].weather[0].main]})`;
    }
  },
  convert: function(deg){
    let idx = deg*8 / 360;
    idx = Math.round(idx,0);
    idx = (idx + 8)% 8 ;
    return directions[idx];
  },
  search:function(){
    this.fetchWeather(inputEl.value);
    // console.log('clicked');
  }
};

document.querySelector('nav button').addEventListener('click', function() {
  weather.search();
});

inputEl.addEventListener('keyup', function(event) {
  if(event.key == "Enter") {
    weather.search();
  }
});

weather.fetchWeather('tokyo');
