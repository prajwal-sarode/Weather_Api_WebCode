const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

  const query = req.body.cityName;
  const apiKey = "bb4c01c67f804c154a1daaba630c9dd8";
  const Units = "metric"

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=" + apiKey + "&units=" + Units + ""
    
  https.get(url, function(response){
      console.log(response.statusCode);

      response.on("data", function(data){

      const weatherData = JSON.parse(data);

      const temp = weatherData.main.temp;

      const weatherDescription = weatherData.weather[0].description;
          
      const icon = weatherData.weather[0].icon;
          
      const imageUrl = "http://openweathermap.org/img/wn/" +icon+ "@2x.png";


      //   we can only write one res.send but we can write multiple res.write instead of send
        res.write("<h1>The Temperature in "+ query +" is "+temp+ " degrees Celcius.</h1>");
        res.write("The Weather is currently "+weatherDescription+ "<p>");
        res.write("<img src="+imageUrl+">");
        res.send()
        });
    });
});




app.listen(3000, function(){

    console.log("server is running on port 3000.");
});