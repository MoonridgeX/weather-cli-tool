#!/usr/bin/env node

const { program } = require('commander');
const { getCurrentWeather, getForecast } = require('./weather');

program
  .name('weather-cli')
  .description('CLI tool for weather information')
  .version('1.0.0');

function displayCurrentWeather(data) {
  console.log(`\n🌤️  Current weather in ${data.name}, ${data.sys.country}:`);
  console.log(`Temperature: ${data.main.temp}°C (feels like ${data.main.feels_like}°C)`);
  console.log(`Condition: ${data.weather[0].description}`);
  console.log(`Humidity: ${data.main.humidity}%`);
  console.log(`Wind: ${data.wind.speed} m/s`);
  console.log(`Pressure: ${data.main.pressure} hPa`);
}

program
  .argument('<city>', 'city name to get weather for')
  .option('-f, --forecast', 'show 5-day forecast')
  .action(async (city, options) => {
    try {
      if (options.forecast) {
        console.log(`Getting forecast for ${city}...`);
        const forecast = await getForecast(city);
        console.log(`\n📅 5-day forecast for ${forecast.city.name}:`);
        
        const dailyData = {};
        forecast.list.forEach(item => {
          const date = new Date(item.dt * 1000).toDateString();
          if (!dailyData[date]) {
            dailyData[date] = item;
          }
        });
        
        Object.values(dailyData).slice(0, 5).forEach(day => {
          const date = new Date(day.dt * 1000);
          console.log(`${date.toDateString()}: ${day.main.temp}°C - ${day.weather[0].description}`);
        });
      } else {
        const weather = await getCurrentWeather(city);
        displayCurrentWeather(weather);
      }
    } catch (error) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  });

program.parse();