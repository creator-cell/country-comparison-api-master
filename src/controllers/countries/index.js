'use strict';

const controller = require('./countries.controller');

 

function routes(app, rootUrl) {
  // include api version number
  let fullRootUrl = rootUrl + '/v1';
  
  /**
    * @apiVersion 1.0.0
    * @api {get} /countries
    * @apiGroup Countries
    * @apiName Get list of all countries
    * @apiDescription Returns an array of country names
    *
    * @apiSampleRequest /api/v1/countries
    *
    * @apiSuccess {json} Array of all country names
    * @apiSuccessExample {json} Success-Response:
    *   HTTP/1.1 200 OK
    *   [
    *     "Afghanistan",
    *     "AFRICA",
    *     "Albania",
    *     ...
    *   ]
    *
    * @apiError (Error 500) InternalServerError Returned if there was a server error
    */
  app.get({ url: fullRootUrl + '/countries' },
      
    controller.getCountries);
    /**
    * @apiVersion 1.0.0
    * @api {get} /population
    * @apiGroup Countries
    * @apiName Get the population details
    * @apiDescription Returns an array of country names
    * @sort as ASC or DSC
    * @apiSampleRequest localhost:3000/api/v1/population/2015-12-24?country[]=Brazil&country[]=Algeria&sort=DSC
    * 
    *
    * @apiSuccess {json} json data with country name and population
    * @apiSuccessExample {json} Success-Response:
    *   HTTP/1.1 200 OK
    *   {
    *"[
    *    {
    *        "total_population": {
    *            "date": "2015-12-24",
    *            "population": 208679204
    *        }
    *    },
    *    {
    *        "total_population": {
    *            "date": "2015-12-24",
    *            "population": 40010891
    *        }
    *    }
    *]
    *
    * @apiError (Error 500) InternalServerError Returned if there was a server error
    */
  app.get({url: fullRootUrl + '/population/:date'},
    
  controller.filterCountries)
}

  


module.exports = {
  routes: routes
};
