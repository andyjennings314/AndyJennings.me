angular.module('AJPortfolio').component('weather', {
  templateUrl: 'weather/weather.html',
  bindings: {},
  controller: function ($http, $timeout) {
    var ctrl = this;
    ctrl.coords = [0, 0];
    ctrl.weatherData = null;
    ctrl.weatherSpecifics = {temp: 0}
    ctrl.hour = new Date().getHours()

    ctrl.init = function () {
        //ctrl.getUserLocation();
        $http.get("http://api.ipstack.com/check?access_key=8f24b4a9c4cba8e5cd8140cb5e2a8cbd")
           .then(
               function (response) {
                   var data = response.data;
                   ctrl.coords = [data.latitude, data.longitude]
                   ctrl.getWeatherAtLocation(ctrl.coords);
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

    ctrl.getUserLocation = function () {
        $http.get("https://freegeoip.net/json/?callback=")
           .then(
               function (response) {
                   var data = response.data;
                   ctrl.coords = [data.latitude, data.longitude]
               },
               function (response) {
                   alert("YOU FUCKED UP");
               }
            );
    }

    ctrl.getWeatherAtLocation = function (coords) {
        $http.get("http://api.openweathermap.org/data/2.5/weather?lat=" + coords[0] + "&lon=" + coords[1] + "&units=metric&APPID=ccb35c4ddc9c18fbc7a99948519855b7")
           .then(
               function (response) {
                   ctrl.weatherData = response.data;
                   ctrl.massageTheData();
               },
               function (response) {
                   // failure call back
               }
            );
    }

    ctrl.getWeatherAtPlace = function (placeID) {
        $http.get("http://api.openweathermap.org/data/2.5/weather?id=" + placeID + "&units=metric&APPID=ccb35c4ddc9c18fbc7a99948519855b7")
           .then(
               function (response) {
                   ctrl.weatherData = response.data;
                   ctrl.massageTheData();
               },
               function (response) {
                   // failure call back
               }
            );
    }

    ctrl.massageTheData = function () {
        if (ctrl.weatherData != null) {

            //get the local time, and the sunset/rise times
            let now = Date.now(),
              sunTimes = [
                (ctrl.weatherData.sys.sunrise * 1000) - 3600000,
                (ctrl.weatherData.sys.sunrise * 1000) + 3600000,
                (ctrl.weatherData.sys.sunset * 1000) - 3600000,
                (ctrl.weatherData.sys.sunset * 1000) + 3600000
              ];
            
            
            if (now < sunTimes[0] || now > sunTimes[3]) {
                //It's night time
                ctrl.weatherSpecifics.day = false;
                ctrl.weatherSpecifics.dusk = false;
            } else if (now > sunTimes[1] && now < sunTimes[2]) {
                //It's day time
                ctrl.weatherSpecifics.day = true;
                ctrl.weatherSpecifics.dusk = false;
            } else {
              //From dusk or dawn
              ctrl.weatherSpecifics.day = false;
              ctrl.weatherSpecifics.dusk = true;
            }


            //weather API can return multiple types of weather for an area, but the first one is the predominant type of weather. So we'll operate on that one!
            var mainWeather = ctrl.weatherData.weather[0];
            ctrl.weatherSpecifics.label = mainWeather.main;

            //run the temperature through the animation process
            ctrl.changeTemperature(ctrl.weatherData.main.temp.toFixed(0));

            //first digit of the weather ID is (mostly) what determines the broad weather type. Get that and switch against it for the weather details
            var weatherCode = mainWeather.id;
            switch (String(weatherCode).charAt(0)) {
                case '2':
                    //thunder
                    ctrl.weatherSpecifics.icon = "🌩";
                    break;
                case '3':
                    //drizzle
                case '5':
                    //rain
                    ctrl.weatherSpecifics.icon = "🌧";
                    break;
                case '6':
                    //snow
                    ctrl.weatherSpecifics.icon = "❄";
                    break;
                case '7':
                    //"atmosphere"
                    ctrl.weatherSpecifics.icon = "🌫";
                    break;
                case '8':
                    if (weatherCode == 800){
                        //clear skies - check if it's night or day for the icon
                        if (ctrl.weatherSpecifics.day = true) {
                            ctrl.weatherSpecifics.icon = "☀";
                        } else {
                            ctrl.weatherSpecifics.icon = "☾";
                        }
                    }
                    else {
                        //cloudy
                        ctrl.weatherSpecifics.icon = "☁";
                    }
                    break;
                case '9':
                    if (String(weatherCode).charAt(1) == '0') {
                        //EXTREME WEATHER!!
                        ctrl.weatherSpecifics.icon = "!!!";
                    }
                    else {
                        //everything else - mostly wind
                        ctrl.weatherSpecifics.icon = "🌬";
                    }
                    break;
            }
        }
    }

    ctrl.changeTemperature = function (newTemp) {
        //ctrl.weatherSpecifics.temp
        //newTemp
        if (ctrl.weatherSpecifics.temp != newTemp) {
            var goingUp = (ctrl.weatherSpecifics.temp < newTemp) ? true : false;
            if (goingUp) { ctrl.weatherSpecifics.temp++ } else { ctrl.weatherSpecifics.temp-- }

            $timeout(function () {
                if (ctrl.weatherSpecifics.temp != newTemp) {
                    ctrl.changeTemperature(newTemp);
                }
            }, 25)
        }
    }

    ctrl.init();
  }
});