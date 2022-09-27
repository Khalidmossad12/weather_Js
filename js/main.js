let data;
if (localStorage.getItem("ourdata")!=null)
{
  data = JSON.parse(localStorage.getItem("ourdata"));
  displayData();
    
}
async function search(location)
{
    let response= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=eb02fc9a25954cb1ba0175848211409&q=${location}&days=3`);
    if(response.ok && response.status != 400 )
    {
        data = await response.json();
        console.log(data)
        localStorage.setItem("ourdata",JSON.stringify(data));
        displayData();
    }

}
function displayData(){
    let fullData = new Date();
    let tableData = `<div class="today forecast px-3 col-lg-4">
    <div
      class="forecast-header d-flex justify-content-between"
      id="today">
      <div class="day">${fullData.getDate()}</div>
      <div class="date">${data.forecast.forecastday[0].date}</div>
    </div>
    
    <div class="forecast-content" id="current">
      <div class="location">${data.location.name}</div>
      <div class="degree d-flex">
        <div class="num">${data.current.temp_c}<sup>o</sup>C</div>

        <div class="forecast-icon">
          <img src="http:${data.current.condition.icon}" alt="" width="90 " />
        </div>
      </div>
      <div class="custom">${data.current.condition.text}</div>
      <span
        ><img
          class="px-1"
          src="image/icon-umberella.png"
          alt=""
        />20%</span
      >
      <span
        ><img
          class="px-1"
          src="image/icon-wind.png"
          alt=""
        />${data.current.wind_kph}</span
      >
      <span
        ><img
          class="px-1"
          src="image/icon-compass.png"
          alt=""
        />East</span
      >
    </div>
  </div>
  <div class="forecast text-center col-lg-4">
    <div class="forecast-header">
      <div class="day">${data.forecast.forecastday[1].date}</div>
    </div>
    <!-- .forecast-header -->
    <div class="forecast-content">
      <div class="forecast-icon py-1">
        <img src="http:${data.forecast.forecastday[1].day.condition.icon}" alt="" width="48" />
      </div>
      <div class="degree py-1">${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</div>
      <small>${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></small>
      <div class="custom py-1">${data.forecast.forecastday[1].day.condition.text}</div>
    </div>
  </div>
  <div class="forecast text-center col-lg-4">
    <div class="forecast-header">
      <div class="day">${data.forecast.forecastday[2].date}</div>
    </div>
    <!-- .forecast-header -->
    <div class="forecast-content">
      <div class="forecast-icon py-1">
        <img src="http:${data.forecast.forecastday[2].day.condition.icon}" alt="" width="48" />
      </div>
      <div class="degree py-1">${data.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</div>
      <small>${data.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></small>
      <div class="custom py-1">${data.forecast.forecastday[2].day.condition.text}</div>
    </div>`

    document.getElementById("forecast").innerHTML=tableData
}
let locationInput=document.getElementById("search");
locationInput.addEventListener("keyup",function(){

    search(locationInput.value);
})