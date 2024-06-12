import chai from 'chai';
const expect = chai.expect;
import trips from '../src/test-data/sample-trips.js';
import destinations from '../src/test-data/sample-destinations.js';
const {calculatePastTripCosts, getPastUserTrips, getVisitedDestinationNames, getNonVisitedDestinationIDs, 
  getDestinationInfo, findDestinationInfo, calculateTotalTripCost, findLastTripId, getPendingUserTrips, getAgencyIncome,
  getUpcomingUserTrips} = require('../src/userFunctions.js')

describe('calculatePastTripCosts', function() {
  var tripData, destinationData;
  beforeEach(() => {
    tripData = trips.trips;
    destinationData = destinations.destinations;
  })
  it('should return the total trip costs for lodging and flight for a single user. Costs should be rounded to the nearest cent.', () => {
    const userID = 3;
    const totals = calculatePastTripCosts(tripData, destinationData, userID)
    expect(totals.totalLodgingCost).to.equal(1925);
    expect(totals.totalFlightCost).to.equal(9570)
  });
  it('should be able to calculate total cost from a single trip.', () => {
    const userID = 8;
    const totals = calculatePastTripCosts(tripData, destinationData, userID)
    expect(totals.totalLodgingCost).to.equal(539);
    expect(totals.totalFlightCost).to.equal(5280);
  })
  it('should only calculate costs from the year past year', () => {
    const userID = 36;
    const totals = calculatePastTripCosts(tripData, destinationData, userID)
    expect(totals.totalLodgingCost).to.equal(660)
    expect(totals.totalFlightCost).to.equal(3300)
  })
  it ('should return 0 if the user has not visited any locations yet', () => {
    const userID = 51;
    const totals = calculatePastTripCosts(tripData, destinationData, userID)
    expect(totals.totalLodgingCost).to.equal(0)
    expect(totals.totalFlightCost).to.equal(0)
  })
});

describe('getPastUserTrips', () => {
  var tripData;
  beforeEach(() => {
    tripData = trips.trips;
  })
  it('should return all of the users past trips', () => {
    const userID = 25;
    const e = getPastUserTrips(tripData, userID);
    expect(e).to.deep.equal([{
      "id": 1,
      "userID": 25,
      "destinationID": 15,
      "travelers": 2,
      "date": "2022/08/14",
      "duration": 12,
      "status": "approved",
      "suggestedActivities": []
    },
    {
      "id": 20,
      "userID": 25,
      "destinationID": 37,
      "travelers": 6,
      "date": "2020/07/03",
      "duration": 13,
      "status": "approved",
      "suggestedActivities": []
    },
    {
      "id": 24,
      "userID": 25,
      "destinationID": 42,
      "travelers": 5,
      "date": "2020/05/06",
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
        "date": "2018/09/30",
        "duration": 7,
        "status": "approved",
        "suggestedActivities": []
      }])
  },
  it ('should be return a string message if the user has no past trips', () => {
    const userID = 51;
    const noPastTripMessage = getPastUserTrips(tripData,userID);
    expect (noPastTripMessage).to.equal('No past trips yet..')
  })
)})

describe('getVisitedDestinationNames', () => {
  var destinationData, tripData;
  beforeEach(() => {
    destinationData = destinations.destinations;
    tripData = trips.trips;
  })
  it ('should return the names of destinations the user has visited', () => {
    const userID = 25;
    const destinationNames = getVisitedDestinationNames(tripData, destinationData, userID)
    expect(destinationNames).to.deep.equal(["Tulum, Mexico", "Kathmandu, Nepal", "Anchorage, Alaska"])
  })
  it ('should be able to return the destination for a single trip', () => {
    const userID = 8;
    const destinationName = getVisitedDestinationNames(tripData, destinationData, userID);
    expect(destinationName).to.deep.equal(["Antananarivo, Madagascar"])
  })
  it ('should return a message if the user has not visited a destination yet.', () => {
    const userID = 51;
    const noDestinationMessage = getVisitedDestinationNames(tripData, destinationData, userID);
    expect(noDestinationMessage).to.equal('No visited destinations yet.. book your first trip today!')
  }) 
})

describe('getNonVisitedDestinationIDs', () => {
  it ('should return all the ids of the destinations the user has NOT visited, excluding duplicates', () => {
    let tripData = trips.trips;
    const userID = 25;
    const destinationIDs = getNonVisitedDestinationIDs(tripData, userID)
    expect(destinationIDs).to.deep.equal(
      [12, 13, 16, 18, 20, 21, 23, 26, 27, 29, 33, 34, 37, 38, 41, 42, 45, 47, 50]
    )
  })
})

describe('getDestinationInfo', () => {
  var tripData, destinationData;
  beforeEach(() => {
    tripData = trips.trips;
    destinationData = destinations.destinations;
  })
  it ('should be able to return the locations destination information based on the matching destination IDs', () => {
    const userID = 8;
    const destinationIDs = getNonVisitedDestinationIDs(tripData, userID)
    const availableDestinations = [destinationIDs[0], destinationIDs[2]]
    const destinations = getDestinationInfo(destinationData, availableDestinations)
    expect(destinations[0].lodgingCost).to.equal(158)
    expect(destinations[0].flightCost).to.equal(275)
    expect(destinations[1].lodgingCost).to.equal(100)
    expect(destinations[1].flightCost).to.equal(350)
  })
})

describe('findDestinationInfo', () => {
  it ('should be able to return the destinations info, given the destination name.', () => {
    const destinationName = 'Miami, Florida'
    const destinationData = destinations.destinations;
    const destinationInfo = findDestinationInfo(destinationData, destinationName)
    expect(destinationInfo).to.deep.equal({
      "id": 12,
      "destination": "Miami, Florida",
      "estimatedLodgingCostPerDay": 158,
      "estimatedFlightCostPerPerson": 275,
      "image": "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1573&q=80",
      "alt": "sand with palm trees and tall buildings in the background"
    })
  })
})

describe('calculateTotalTripCost', () => {
  it ('should be able to calculate the total booking cost', () => {
    const destinationData = destinations.destinations;
    const destinationName = 'Miami, Florida'
    const duration = 5;
    const travelers = 5;
    const totalCost = calculateTotalTripCost(duration, travelers, destinationName, destinationData)
    expect(totalCost.flightCost).to.equal(1512.5)
    expect(totalCost.lodgingCost).to.equal(869)
  })
})

describe('findLastTripId', () => {
  it ('should find the last trip id available', () => {
    const tripData = trips.trips;
    const lastId = findLastTripId(tripData);
    expect(lastId).to.equal(39)
  })
})

describe('getPendingUserTrips', () => {
  it ('should return only a users pending trips', () => {
    const destinationData = destinations.destinations
    const tripData = trips.trips;
    const userID = 12;
    const pendingTrips = getPendingUserTrips(destinationData, tripData, userID);
    expect(pendingTrips).to.deep.equal([
      {
        "id": 36,
        "userID": 12,
        "destinationID": 18,
        "destinationName": "Copenhagen, Denmark",
        "travelers": 3,
        "date": "2024/06/06",
        "duration": 8,
        "status": "pending",
        "suggestedActivities": []
      },
      {
        "id": 38,
        "userID": 12,
        "destinationID": 41,
        "destinationName": "Seoul, South Korea",
        "travelers": 1,
        "date": "2024/06/20",
        "duration": 5,
        "status": "pending",
        "suggestedActivities": []
      }
    ])
  })
})

describe('getAgencyIncome', () => {
  var tripsData,destinationData;
  beforeEach(() => {
    tripsData = trips.trips;
    destinationData = destinations.destinations;
  })
  it (`should be able to return the total income made by the agency for this years trips rounded to the cent. 
    Should only calculate from approved trips`, () => {
    const totalIncome = getAgencyIncome(destinationData, tripsData);
    expect(totalIncome.flightIncome).to.equal(15)
    expect(totalIncome.lodgingIncome).to.equal(600)
  })
  it ('total amount should return 0 if there are no past trips', () => {
    let tripData =  [{
      "id": 37,
      "userID": 15,
      "destinationID": 20,
      "travelers": 3,
      "date": "2023/06/12",
      "duration": 8,
      "status": "pending",
      "suggestedActivities": []
    },
    {
      "id": 38,
      "userID": 12,
      "destinationID": 41,
      "travelers": 1,
      "date": "2023/06/20",
      "duration": 5,
      "status": "pending",
      "suggestedActivities": []
    },
    {
      "id": 39,
      "userID": 50,
      "destinationID": 41,
      "travelers": 1,
      "date": "2023/06/20",
      "duration": 5,
      "status": "approved",
      "suggestedActivities": []
    },]
    const totalIncome = getAgencyIncome(destinationData, tripData)
    expect(totalIncome.flightIncome).to.equal(0);
    expect(totalIncome.lodgingIncome).to.equal(0);
  })
})

describe('getUpcomingUserTrips', () => {
  var tripData;
  beforeEach(() => {
    tripData = trips.trips;
  })
  it ('should only return approved trips for this year.', () => {
    const userID = 50;
    const upcomingTrip = getUpcomingUserTrips(tripData, userID);
    const currentYear = upcomingTrip[0].date.getFullYear()
    expect(currentYear).to.equal(2024)
  }),
  it ('should return a message that says that the user has no upcoming trips', () => {
    const userID = 51;
    const noUpcomingTripMessage = getUpcomingUserTrips(tripData, userID);
    expect(noUpcomingTripMessage).to.equal('Looks like you dont have any upcoming trips yet. Book your next adventure today!')
  })
})
