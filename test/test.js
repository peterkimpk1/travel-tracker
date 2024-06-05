import chai from 'chai';
const expect = chai.expect;
import trips from '../src/test-data/sample-trips.js';
import travelers from '../src/test-data/sample-travelers.js';
import destinations from '../src/test-data/sample-destinations.js';

describe('calculateTripCost', function() {
  var tripData, destinationData;
  beforeEach(() => {
    tripData = trips;
    destinationData = destinations;
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
