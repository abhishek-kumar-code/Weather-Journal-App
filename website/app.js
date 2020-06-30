/* Global Variables */
let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "&units=metric&appid=982e532e62f67c00d8cc011bb8dfce21";
 
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
let zip = document.getElementById("zip").value;
let response = document.getElementById("feelings").value;

getWeather(baseURL, zip, apiKey)
    .then(function(data){
    postData('/addWeather', {date:newDate, temperature: data.main.temp, userfeel:response})
    .then(
        updateUI()
      )
});
};

// GET REQUEST

const getWeather = async (baseURL, zip, apiKey)=>{
    const res = await fetch(baseURL+zip+apiKey)
    try{
        // GET Request - Data received from Openweather API 
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log("error", error);
    }
    
}

// POST REQUEST

const postData = async ( url = '', data = {})=>{
    // POST Request - Data posted to API endpoint on local Node JS Server
    console.log(data)
      const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
  
      try {
        const newData = await response.json();
        // console.log(newData);
        return newData
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  }

// UPDATE UI 
const updateUI = async () => {
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        // GET Request - Data received from API endpoint on local Node JS Server
        console.log(allData);
        Object.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
    // Get the size of an object
    var size = Object.size(allData);
        document.getElementById('date').innerHTML = `Date: ${allData[size-1].date}`;
        document.getElementById('temp').innerHTML = `Temperature(in °F): ${allData[size-1].temperature}`;
        document.getElementById('content').innerHTML = `Feeling: ${allData[size-1].userfeel}`;
    
    }catch(error){
        console.log("error", error);
    }
    }