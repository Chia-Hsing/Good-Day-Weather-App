# Good-Day-Weather-App

# Development stack

# External packages

# APIs

## APIs used
  - Weather forecast data are fetched from [Open Weather Map API](https://openweathermap.org/api)
    - current weather and daily weather are fetched from [One Call API](https://openweathermap.org/api/one-call-api)
    - hourly weather is fetched from [5 Day / 3 Hour Forecast](https://openweathermap.org/forecast5)
  - Client's current coordinates are fetched by [Google Geolocation API](https://developers.google.com/maps/documentation/geolocation/overview)
  - Location is positioned through [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview) by latitude and longitude.
## API keys
  ### Get Google API Key
  1. Sign in your Google account.
  2. Create or select a project on [Google Cloud Platform](https://console.developers.google.com/)
  3. From the menu, click the __API and services__ then click __Credentials__.
  4. Click __Create credentials__.
  5. Click __API key__ then the API key would be showed on the dialog box.

# Running
  ## Clone
  ```
  $ git clone https://github.com/Chia-Hsing/Good-Day-Weather-App-react.git
  ```
  
  ## Setup
  1. ```$ cd Good-Day-Weather-App-react
  ```
  2. ```
  $ npm install
  ```
  3. ```
  $ touch .env
  ```
  4.  Store your API Key in .env file and save.
     ```
     REACT_APP_OPEN_WEATHER_API_KEY = 'ff19d157e14f44206656bad4cc1189ab'
     REACT_APP_GOOGLE_GEO_API_KEY = 'AIzaSyD-h4Aob9JC2TSsgEfhjO_KSIJFGxpQ9mQ'
     ```
  

# Clone & install

# Current progress

# App Display

![image](https://github.com/Chia-Hsing/Good-Day-Weather-App-react/blob/master/src/img/1.png)

![image](https://github.com/Chia-Hsing/Good-Day-Weather-App-react/blob/master/src/img/2.png)

# Live Demo

[Good Day Weather App](https://chia-hsing.github.io/Good-Day-Weather-App-react/)
