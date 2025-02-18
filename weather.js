const axios = require('axios');

const API_KEY = process.env.WEATHER_API_KEY || 'demo';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

async function getCurrentWeather(city) {
  if (!city || city.trim().length === 0) {
    throw new Error('City name is required');
  }

  if (API_KEY === 'demo') {
    throw new Error('Please set WEATHER_API_KEY environment variable');
  }

  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city.trim(),
        appid: API_KEY,
        units: 'metric'
      },
      timeout: 5000
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error(`City "${city}" not found`);
      } else if (error.response.status === 401) {
        throw new Error('Invalid API key');
      } else if (error.response.status === 429) {
        throw new Error('API rate limit exceeded');
      }
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - please check your internet connection');
    }
    throw new Error('Failed to fetch weather data');
  }
}

async function getForecast(city, days = 5) {
  if (!city || city.trim().length === 0) {
    throw new Error('City name is required');
  }

  if (API_KEY === 'demo') {
    throw new Error('Please set WEATHER_API_KEY environment variable');
  }

  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city.trim(),
        appid: API_KEY,
        units: 'metric',
        cnt: Math.min(days * 8, 40)
      },
      timeout: 5000
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error(`City "${city}" not found`);
      } else if (error.response.status === 401) {
        throw new Error('Invalid API key');
      } else if (error.response.status === 429) {
        throw new Error('API rate limit exceeded');
      }
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - please check your internet connection');
    }
    throw new Error('Failed to fetch forecast data');
  }
}

module.exports = {
  getCurrentWeather,
  getForecast
};