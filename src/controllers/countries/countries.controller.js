'use strict';

const co = require('co');
const request = require('request');
const errors = require('restify-errors');
const countryHelper = require('../../lib/country-helper');

exports.getCountries = co.wrap(async function getCountries(req, res, next) {
  try {
    const countries = await countryHelper.getCountries();
    
    res.json(countries);
    return next();
  } catch (err) {
    return next(new errors.InternalServerError(err, 'Server error retrieving countries.'));
  }
});

exports.filterCountries = co.wrap(async function filterCountries(req, res, next) {
  try {
    
    let countryNames = req.query.country;
    let sort = req.query.sort
    let date = req.params.date
    let populationDetails = [];
    if(!countryNames && !date) return next(new errors.BadRequestError( 'Missing query parameters.'));
    for (let i = 0; i < countryNames.length; i++) {
      
      const countries = await countryHelper.filterCountries(countryNames[i], date);
      if(countries){
        populationDetails.push(countries)
      }   
    }
   
      if(sort == "ASC"){
        populationDetails.sort((a,b)=> {return a.total_population.population - b.total_population.population})
      }else if(sort == "DSC"){
        populationDetails.sort((a,b)=> {return b.total_population.population - a.total_population.population})
      }else{
        return next(new errors.InternalServerError( 'Invalid sort query. Please send ASC or DSC'));
      }
    res.json(populationDetails);
   
    return next();
  } catch (err) {
    if(err.code){
      return next(new errors.InternalServerError("Data Not Found"));
    }else{
      return next(new errors.InternalServerError(err, err));
    }
    
  }
});


