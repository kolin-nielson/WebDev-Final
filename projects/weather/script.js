async function APIInteraction() {
  let div = document.getElementById("inject");
  div.innerHTML = "NAN";

  let url = "https://api.weather.gov/points/39.3614,-111.5842";
  let urlFetch = await fetch(url);

  let obj = await urlFetch.json();
  let forecastUrl = obj.properties.forecast;

  let forecastPage = await fetch(forecastUrl);
  let obj2 = await forecastPage.json();
  div.innerHTML = obj2.properties.periods[index].shortForecast;

  let iconLink = obj2.properties.periods[index].icon;

  document.getElementById("pic").src = iconLink;

  let name = obj2.properties.periods[index].name;
  document.getElementById("time").innerText = name;

  let temperature = obj2.properties.periods[index].temperature;
  document.getElementById("temp").innerText = temperature + "°F";
}




let index = 0;

APIInteraction();

document.getElementById("next").addEventListener("click", function () {
  index++;
  APIInteraction();
});
document.getElementById("previous").addEventListener("click", function () {
  index--;
  APIInteraction();
});
