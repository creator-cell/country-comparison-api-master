'use strict';

const co = require('co');
const errors = require('restify-errors');
const countryHelper = require('../../lib/country-helper');

// exports.getCountries = co.wrap(async function* getCountries(req, res, next) {
// exports.filterCountries = co.wrap(async function filterCountries(req, res, next) {
//   try {
//       console.log("Country name ----", req.params.country)
//       console.log("Date -----", req.params.date)
//     const countries = JSON.parse(await countryHelper.getCountries());
//     res.json(countries);
//     // return next();
//   } catch (err) {
//     return next(new errors.InternalServerError(err, 'Server error retrieving countries.'));
//   }
// });
