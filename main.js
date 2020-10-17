const api={
    key:"c94c035c86bb75fcd4befaf6fd2c43a5",
    base:"https://api.openweathermap.org/data/2.5/"
}

const searchbox= document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);


function setQuery(evt){
   
    if(evt.keyCode==13){
        
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}


function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weather=>{
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerHTML =`${weather.name}, ${weather.sys.country}`;

    let now=new Date();
    let date = document.querySelector('.location .date');
    date.innerHTML=dateBuilder(now);

    let temp=document.querySelector('.current .temp');
    temp.innerHTML=`${Math.round(weather.main.temp)}<span>°c</span>`;
    let weather_el=document.querySelector('.current .weather');
    weather_el.innerHTML=weather.weather[0].main;

    let hilow=document.querySelector('.hi-low');
    hilow.innerHTML=`${weather.main.temp_min}°c / ${weather.main.temp_max}°c`;
}

function dateBuilder(d){
    let months=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEPT","OCT","NOV","DEC"];
    let days=["SUN","MON","TUE","WED","THRUS","FRI","SAT"];

    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year= d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}