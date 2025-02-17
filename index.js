#!/usr/bin/env node

const { program } = require('commander');

program
  .name('weather-cli')
  .description('CLI tool for weather information')
  .version('1.0.0');

program
  .argument('<city>', 'city name to get weather for')
  .option('-d, --days <number>', 'number of days forecast', '1')
  .action((city, options) => {
    console.log(`Getting weather for ${city}...`);
    if (options.days > 1) {
      console.log(`Forecast for ${options.days} days`);
    }
    // TODO: implement weather API call
  });

program.parse();