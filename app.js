window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let minTemperature = document.querySelector(".min-temperature");
  let maxTemperature = document.querySelector(".max-temperature");
  let humidity = document.querySelector(".humidity");
  let visibility = document.querySelector(".visibility");
  let icon = document.querySelector(".icon");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ed852f29c24fda879ea4695ee6afbdbe`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //  console.log(data);
          //  const {} = data.main;

          let code = data.weather[0].icon;

          temperatureDegree.textContent = Math.floor(data.main.temp - 273.15);
          temperatureDescription.textContent =
            data.weather[0].description.toUpperCase();
          locationTimezone.textContent = data.name;
          minTemperature.textContent = Math.floor(data.main.temp_min - 273.15);
          maxTemperature.textContent = Math.floor(data.main.temp_max - 273.15);
          humidity.textContent = data.main.humidity;
          visibility.textContent = data.visibility / 1000;
          icon.innerHTML = `<img src='http://openweathermap.org/img/wn/${code}@4x.png'>`;
        });
    });
  }
});
