import chai from 'chai';
const expect = chai.expect;
import trips from '../src/test-data/sample-trips.js';
import travelers from '../src/test-data/sample-travelers.js';
import destinations from '../src/test-data/sample-destinations.js';
const {calculateTripCost, getPastUserTrips} = require('../src/scripts.js')

describe('calculateTripCost', function() {
  var tripData, destinationData;
  beforeEach(() => {
    tripData = trips.trips;
    destinationData = destinations.destinations;
  })
  it('should return the total trip costs for lodging and flight for a single user. Costs should be rounded to the nearest cent.', () => {
    const userID = 3;
    const totals = calculateTripCost(tripData, destinationData, userID)
    expect(totals.totalLodgingCost).to.equal(36.67);
    expect(totals.totalFlightCost).to.equal(2200)
  });
  it('should be able to calculate total cost from a single trip.', () => {
    const userID = 8;
    const totals = calculateTripCost(tripData, destinationData, userID)
    expect(totals.totalLodgingCost).to.equal(19.25);
    expect(totals.totalFlightCost).to.equal(1320);
  })
});

describe('getPastUserTrips', () => {
  var tripData;
  beforeEach(() => {
    tripData = trips.trips;
  })
  it('should return all of the user\s past trips', () => {
    const userID = 25;
    const e = getPastUserTrips(tripData,userID);
    expect(e).to.deep.equal([{
      "id": 1,
      "userID": 25,
      "destinationID": 15,
      "travelers": 2,
      "date": "2023/08/14",
      "duration": 12,
      "status": "approved",
      "suggestedActivities": []
    },
    {
      "id": 20,
      "userID": 25,
      "destinationID": 37,
      "travelers": 6,
      "date": "2023/07/03",
      "duration": 13,
      "status": "approved",
      "suggestedActivities": []
    },
    {
      "id": 24,
      "userID": 25,
      "destinationID": 42,
      "travelers": 5,
      "date": "2023/05/06",
      "duration": 12,
      "status": "approved",
      "suggestedActivities": []
    }])
  })
  it ('should be able to see the past trip for a single trip', () => {
    const userID = 8;
    const e = getPastUserTrips(tripData, userID);
    expect(e).to.deep.equal([
      {
        "id": 2,
        "userID": 8,
        "destinationID": 33,
        "travelers": 4,
        "date": "2023/09/30",
        "duration": 7,
        "status": "approved",
        "suggestedActivities": []
    }])
  })
})