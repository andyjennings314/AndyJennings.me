angular.module('AJPortfolio').controller('weatherCtrl', function ($http, $timeout) {
    var self = this;
    self.coords = [0, 0];
    self.weatherData = null;
    self.weatherSpecifics = {temp: 0}
    self.hour = new Date().getHours()

    self.init = function () {
        //self.getUserLocation();
        $http.get("http://api.ipstack.com/check?access_key=8f24b4a9c4cba8e5cd8140cb5e2a8cbd")
           .then(
               function (response) {
                   var data = response.data;
                   self.coords = [data.latitude, data.longitude]
                   self.getWeatherAtLocation(self.coords);
               },
               function (response) {
                   alert("Error: there is no such thing as weather any more.");
               }
            );

        //https://freegeoip.net/json/?callback=
        //var lati = data.latitude.roundTo(0)
        //var long = data.longitude.roundTo(0)
        //api.openweathermap.org/data/2.5/weather?lat=" + lati + "&lon=" + long + "
    }

    self.getUserLocation = function () {
        $http.get("https://freegeoip.net/json/?callback=")
           .then(
               function (response) {
                   var data = response.data;
                   self.coords = [data.latitude, data.longitude]
               },
               function (response) {
                   alert("YOU FUCKED UP");
               }
            );
    }

    self.getWeatherAtLocation = function (coords) {
        $http.get("http://api.openweathermap.org/data/2.5/weather?lat=" + coords[0] + "&lon=" + coords[1] + "&units=metric&APPID=ccb35c4ddc9c18fbc7a99948519855b7")
           .then(
               function (response) {
                   self.weatherData = response.data;
                   self.massageTheData();
               },
               function (response) {
                   // failure call back
               }
            );
    }

    self.getWeatherAtPlace = function (placeID) {
        $http.get("http://api.openweathermap.org/data/2.5/weather?id=" + placeID + "&units=metric&APPID=ccb35c4ddc9c18fbc7a99948519855b7")
           .then(
               function (response) {
                   self.weatherData = response.data;
                   self.massageTheData();
               },
               function (response) {
                   // failure call back
               }
            );
    }

    self.massageTheData = function () {
        if (self.weatherData != null) {

            //get the local time, and the sunset/rise times
            var now = Date.now();
            var sunTimes = [self.weatherData.sys.sunrise * 1000, self.weatherData.sys.sunset * 1000];
            if (now < sunTimes[0] || now > sunTimes[1]) {
                //It's night time
                self.weatherSpecifics.day = false;
            } else {
                //It's day time
                self.weatherSpecifics.day = true;
            }


            //weather API can return multiple types of weather for an area, but the first one is the predominant type of weather. So we'll operate on that one!
            var mainWeather = self.weatherData.weather[0];
            self.weatherSpecifics.label = mainWeather.main;

            //run the temperature through the animation process
            self.changeTemperature(self.weatherData.main.temp.toFixed(0));

            //first digit of the weather ID is (mostly) what determines the broad weather type. Get that and switch against it for the weather details
            var weatherCode = mainWeather.id;
            switch (String(weatherCode).charAt(0)) {
                case '2':
                    //thunder
                    self.weatherSpecifics.icon = "🌩";
                    break;
                case '3':
                    //drizzle
                case '5':
                    //rain
                    self.weatherSpecifics.icon = "🌧";
                    break;
                case '6':
                    //snow
                    self.weatherSpecifics.icon = "❄";
                    break;
                case '7':
                    //"atmosphere"
                    self.weatherSpecifics.icon = "🌫";
                    break;
                case '8':
                    if (weatherCode == 800){
                        //clear skies - check if it's night or day for the icon
                        if (self.weatherSpecifics.day = true) {
                            self.weatherSpecifics.icon = "☀";
                        } else {
                            self.weatherSpecifics.icon = "☾";
                        }
                    }
                    else {
                        //cloudy
                        self.weatherSpecifics.icon = "☁";
                    }
                    break;
                case '9':
                    if (String(weatherCode).charAt(1) == 0) {
                        //EXTREME WEATHER!!
                        self.weatherSpecifics.icon = "!!!";
                    }
                    else {
                        //everything else - mostly wind
                        self.weatherSpecifics.icon = "🌬";
                    }
                    break;
            }
        }
    }

    self.changeTemperature = function (newTemp) {
        //self.weatherSpecifics.temp
        //newTemp
        if (self.weatherSpecifics.temp != newTemp) {
            var goingUp = (self.weatherSpecifics.temp < newTemp) ? true : false;
            if (goingUp) { self.weatherSpecifics.temp++ } else { self.weatherSpecifics.temp-- }

            $timeout(function () {
                if (self.weatherSpecifics.temp != newTemp) {
                    self.changeTemperature(newTemp);
                }
            }, 25)
        }
    }

    self.init();

});