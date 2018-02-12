const static = JSON.parse(
  require("fs")
    .readFileSync("./static.json")
    .toString()
);
const express = require("express");
const router = express.Router();
const request = require("request");
const $ = require("cheerio");

const cities = static.cities,
  baseWeatherUrl =
    "https://www.msn.com/en-au/weather/today/rishonimcentralisrael/we-city?q=";
weatherIcons = static.weatherIcons;

function createLocationWeatherFromResponse(location, body) {
  const html = $.load(body),
    main = html("#main");
  let weatherObj = { location };
  weatherObj.temp = main.find("div.current-info > span").text();
  weatherObj.desc = main.find("div.weather-info > span").text();
  weatherObj.wind = main.find("div.weather-info > ul > li:nth-child(2)").text().replace('Wind', '');
  weatherObj.imageUrl = main.find(" div > ul > li.active > a > img").attr('src');
  weatherObj.humidity = main
    .find("div.weather-info > ul > li:nth-child(5)")
    .text();
  return weatherObj;
}

router.post("/getWeather", function(req, res, next) {
  const locations = req.body;
  if (locations && locations.length) {
    let requsetsToProccess = locations.length,
      locationsWeather = [];
    locations.forEach(function(location) {
      request(baseWeatherUrl + location, (error, response, body) => {
        if (!error && body) {
          locationsWeather.push(
            createLocationWeatherFromResponse(location, body)
          );
        }
        if (!--requsetsToProccess) {
          res.status(200).json(locationsWeather);
        }
      });
    });
  } else {
    res.status(200).send([]);
  }
});

module.exports = router;
