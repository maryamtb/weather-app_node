const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/0f7df2b6c36478f46d087e3956a10717/" +
    latitude +
    "," +
    longitude;


  request({ url, json: true }, (error, { body }) => {
    var inCelsius = ((body.currently.temperature - 32) * 5) / 9;
    var valueCelsius = inCelsius.toFixed(2);

    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        "Daily Report: " +
          body.daily.data[0].summary +
          " It is currently " +
          valueCelsius +
          "°C (" +
          body.currently.temperature +
          "°F)" +
          " out. There is a " +
          body.currently.precipProbability +
          "% chance of rain.",
      );
    }
  });
};

module.exports = forecast;
