/* Global Variables */

const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
const units = '&units=metric'; // For converting f degree to C degree. Must append to end of key
const apiKey = '&appid=1e32a5f263864d02667d1379ca8e179a';


document.getElementById('weather').addEventListener('click', performAction);

function performAction(e){
  const newCity = 'London';
  console.log('1')
  
    // Call API to get weather data for city - based on user input into element.
    newInput(baseUrl,newCity,apiKey,units)
        
    .then(function(data){
      console.log('4')
    // Add all data into POST request    
        postData('/all', {
                temp:data.main.temp, 
                location:newCity,
                });
                console.log('6')
            
    }) .then( () =>{
      console.log('7')
        postUpdates()
     }) 
    };

//GET data from WEB API using ASYNC
    const newInput = async (baseURL, city, apiKey, units)=>{
      console.log('2')  
      console.log('New Input', {baseURL, city, apiKey, units})
      const response = await fetch(baseURL+city+apiKey+units) // await until all data is received from API call, then try
      try { // If fetch goes well    
        const data = await response.json(); // Return data as JSON
        console.log('3 ', data)
        console.log(response)
        return data;
      }  catch(error) { //If fetch goes wrong then error.
        console.log("error", error);
        // appropriately handle the error
      }
    }

//POST DATA function
const postData = async ( baseUrl = '', data = {})=>{
  console.log('5')
      const response = await fetch(baseUrl, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });
    //console.log(response);
      try {
        const newData = await response.json();
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

  //CODE TO UPDATE UI
  const postUpdates = async()=>{  
            const entries = await fetch('/all');//baseUrl+city+apiKey+'/getData');
        console.log('8')
        try{
            const projectData = await entries.json();
            document.getElementById('temp').innerHTML = `The temperature is currently: ${projectData.temp}c in ${projectData.city}`;
        }
        catch(err){
            console.log('Error posting data ' + err);
        }}