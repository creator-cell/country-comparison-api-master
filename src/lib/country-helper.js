'use strict';
const { resolveLevel } = require("bunyan");
const request = require("request");
const apiUrl = "https://d6wn6bmjj722w.population.io:443/1.0/"



exports.getCountries = () => {

  return new Promise((resolve, reject) => {
    let options = {
      method: 'GET',
      url: apiUrl + '/countries',
      headers:
      {
        'cache-control': 'no-cache'
      }
    };
    request(options, function (error, response, body) {
      if (error) reject(error);
     
      resolve(JSON.parse(body));

    });
  })

};

exports.filterCountries = (country, date) => {

  return new Promise((resolve, reject) => {
    
    let options = {
      method: 'GET',
      url: apiUrl + 'population/' + country + '/' + date,
      headers:
      {
        'cache-control': 'no-cache'
      }
    };
    request(options, function (error, response, body) {
      if (error) reject(error);
      
      if(body){
        resolve(JSON.parse(body));
      }else{
        reject({"code": 400, "message": "data not found"})
      }

      

    });
  })

};

