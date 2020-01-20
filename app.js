window.addEventListener('load',()=>{
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree      = document.querySelector('.temperature-degree');
  let locationTimezone       = document.querySelector('.location-timezone'); 
  const temperatureSection   = document.querySelector('.temperature');
  let temperatureSpan        = document.querySelector('.degree-section span');
  //console.log(temperatureSection);
  //https://darksky.net/dev/account
  //https://cors-anywhere.herokuapp.com/
  

  if(navigator.geolocation)
  {
     navigator.geolocation.getCurrentPosition(position=>{
           long   = position.coords.longitude;
           lat    = position.coords.latitude;

           //this api enables cross-origin requests to anywhere
           const proxy  = 'https://cors-anywhere.herokuapp.com/';
           const api    = `${proxy}https://api.darksky.net/forecast/3d31261ade9c4ccab2686d87a61dd96a/${lat},${long}`;

            fetch(api)
            .then(response=>{
                return response.json();
            }).then(data=>{
                console.log(data);
                const {temperature,summary,icon} = data.currently;
                //Set DOM Elements from the API 
                temperatureDegree.textContent      = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent       = data.timezone;
              
                //set icon
                setIcons(icon,document.querySelector('.icon'));
                //change temperature to celsius/farenheit
                temperatureSection.addEventListener('click',()=>{
                      //FORMULA FOR CELSIUS
                       let celsius       = (temperature - 32) * (5 / 9);
                       if(temperatureSpan.textContent == 'F')
                       {
                           temperatureSpan.textContent   = 'C';
                           temperatureDegree.textContent = Math.floor(celsius);
                       }
                       else{
                            temperatureSpan.textContent   = 'F';
                            temperatureDegree.textContent = temperature;
                       }
                });
            });   
     });
      
  }
   //https://github.com/darkskyapp/skycons
    function setIcons(icon,iconID)
    {
        const skycons     = new Skycons({"color": "white"});
        const currentIcon = icon.replace(/-/g,'_').toUpperCase();
        console.log(currentIcon);

        // start animation!
        skycons.play();

        skycons.set(iconID,Skycons[currentIcon]);
    }

});