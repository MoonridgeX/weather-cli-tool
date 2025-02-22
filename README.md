# Weather CLI Tool

A simple command line tool to check weather information for any city.

## Installation

```bash
npm install
```

## Setup

You'll need an API key from [OpenWeatherMap](https://openweathermap.org/api).

Set your API key as an environment variable:
```bash
export WEATHER_API_KEY=your_api_key_here
```

## Usage

Get current weather:
```bash
node index.js "New York"
```

Get 5-day forecast:
```bash
node index.js "London" --forecast
```

## Features

- Current weather information
- 5-day weather forecast
- Temperature, humidity, wind speed
- Weather conditions and descriptions

## Requirements

- Node.js 12+
- OpenWeatherMap API key