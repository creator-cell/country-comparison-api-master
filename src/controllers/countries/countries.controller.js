'use strict';

const co = require('co');
const request = require('request');
const errors = require('restify-errors');
const countryHelper = require('../../lib/country-helper');

exports.getCountries = co.wrap(async function getCountries(req, res, next) {
  try {
    const countries = await countryHelper.getCountries();
    res.json(JSON.parse(countries));
    return next();
  } catch (err) {
    return next(new errors.InternalServerError(err, 'Server error retrieving countries.'));
  }
});

exports.filterCountries = co.wrap(async function filterCountries(req, res, next) {
  try {

    let countryName = req.params.country;
    let date = req.params.date;
    console.log("countryName---", countryName);
    if (countryName && date) {
      const countries = await countryHelper.filterCountries(countryName, date);

      res.json(countries);
    } else {
      return next(new errors.BadRequestError( 'Missing query parameters.'));
    }

    return next();
  } catch (err) {
    return next(new errors.InternalServerError(err, 'Server error retrieving countries.'));
  }
});


