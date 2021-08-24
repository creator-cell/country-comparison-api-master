const app = require('../../../src/server.js');
const config = require('../../../src/config');
const request = require('supertest');
const sinon = require('sinon');
require('chai').should();

const countryHelper = require('../../../src/lib/country-helper');
const filterMockCountries = require('../../fixtures/data/filter-mock.json');

describe('filter countries endpoint tests population', () => {
  let sandbox;
  beforeEach(function beforeEach() {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function afterEach() {
    sandbox.restore();
  });

  describe('get countries', function getCountries() {
    const endpointUrl = config.routes.controllerRootUrl + '/v1/population/Brazil/2015-12-24';

    it('should return a list of population details', function handleGettingCountries(done) {
      sandbox.stub(countryHelper, 'filterCountries').returns(filterMockCountries);

      request(app)
      .get(`${endpointUrl}`)
      .set('accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        console.log(res.body)
        res.body.should.eql(filterMockCountries);

        return done();
      });
    });

    it('should return 500 if error getting population details', function handleErrorGettingCountries(done) {
        const error = new Error('fake error');
        sandbox.stub(countryHelper, 'filterCountries').throws(error);
  
        request(app)
        .get(`${endpointUrl}`)
        .set('accept', 'application/json')
        .expect(500)
        .end(err => {
          if (err) {
            return done(err);
          }
          return done();
        });
      });




  });
});
