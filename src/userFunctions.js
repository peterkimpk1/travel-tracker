const calculatePastTripCosts = (tripData, destinationData, userID) =>  {
    var latestYear;
    let filteredTrips = tripData.filter(trip => trip.userID === userID && trip.status === 'approved')
    latestYear = new Date(filteredTrips[0].date).getFullYear()
    filteredTrips.forEach(trip => {
        if (latestYear < new Date(trip.date).getFullYear()) {
            latestYear = new Date(trip.date).getFullYear()
        }
    })
    let totals = filteredTrips.reduce((acc,trip) => {
        if (!acc.totalLodgingCost && !acc.totalFlightCost) {
            acc.totalLodgingCost = 0;
            acc.totalFlightCost = 0;
        }
        let currentYear = new Date(trip.date).getFullYear()
        destinationData.forEach(destination => {
            if(trip.destinationID === destination.id && latestYear === currentYear) {
                acc.totalLodgingCost += destination.estimatedLodgingCostPerDay * 1.1 * trip.duration
                acc.totalFlightCost += destination.estimatedFlightCostPerPerson * 1.1 * trip.travelers
            }
        })
        return acc;
    },{})
    totals.totalLodgingCost = +totals.totalLodgingCost.toFixed(2)
    totals.totalFlightCost = +totals.totalFlightCost.toFixed(2)
    totals.latestYear = latestYear
    return totals 
}

const getPendingUserTrips = (destinationData, tripData, userID) => {
    let pendingTrips = tripData.filter(trip => trip.status === 'pending' && trip.userID === userID)
    return pendingTrips.map(trip => {
        var destinationInfo = destinationData.find(destination => {
            return destination.id === trip.destinationID
        })
        return {destinationName: destinationInfo.destination, ...trip}
    })
}

const getAgencyTrips = (destinationData, tripData, status) => {
    let pendingTrips = tripData.filter(trip => trip.status === status)
    return pendingTrips.map(trip => {
        var destinationInfo = destinationData.find(destination => {
            return destination.id === trip.destinationID
        })
        return {destinationName: destinationInfo.destination, ...trip}
    })
}

const getPastUserTrips = (tripData, userID) => {
   return tripData.reduce((userTrips, trip) => {
        if(trip.userID === userID && trip.status === 'approved') {
            userTrips.push(trip)
        }
        return userTrips
    },[]).filter(trip => new Date(trip.date).getFullYear() < 2024)
}

const getUpcomingUserTrips = (tripData, userID) => {
    return tripData.reduce((userTrips, trip) => {
        if(trip.userID === userID && trip.status === 'approved') {
            userTrips.push(trip)
        }
        return userTrips
    },[]).filter(trip => new Date(trip.date).getFullYear() === 2024)
}

const getVisitedDestinationNames = (tripData, destinationData, userID) => {
    let places = [];
    const filteredTrips = tripData.filter(trip => trip.userID === userID && trip.status === 'approved').map(trip => trip.destinationID)
    filteredTrips.forEach(place => {
        let destination = destinationData.find(destination => destination.id === place)
        places.push(destination.destination)
    })
    return places;
}

const getNonVisitedDestinationIDs = (tripData, userID) => {
    let allids = [];
    tripData.filter(trip => trip.userID !== userID).map(trip => trip.destinationID).sort((a,b) => a-b).forEach(id => {
        if (!allids.includes(id)) {
            allids.push(id)
        }
    })
    return allids;
}

const getDestinationInfo = (destinationData, destinationIDs) => {
    let destinations = [];
    destinationIDs.forEach(id => {
       let location = destinationData.find(destination => destination.id === id)
        destinations.push({image: location.image, alt: location.alt, destination: location.destination, 
            lodgingCost: location.estimatedLodgingCostPerDay, flightCost: location.estimatedFlightCostPerPerson})
    })
    return destinations
}
const findDestinationInfo = (destinationData, destinationName) => {
    return destinationData.find(destination => destination.destination === destinationName)
}

const calculateTotalTripCost = (duration, travelers, destinationName, destinationData) => {
   const singleDestinationInfo = findDestinationInfo(destinationData, destinationName)
   let totalCost = {};
    totalCost.flightCost = singleDestinationInfo.estimatedFlightCostPerPerson * travelers * 1.1;
    totalCost.lodgingCost = singleDestinationInfo.estimatedLodgingCostPerDay * duration * 1.1;
    totalCost.flightCost = +totalCost.flightCost.toFixed(2)
    totalCost.lodgingCost = +totalCost.lodgingCost.toFixed(2)
    return totalCost
}

const findLastTripId = (tripData) => {
    return tripData[tripData.length-1].id
}
const getAgencyIncome = (destinationData, tripData) => {
    const currentYearTrips = tripData.map(trip => {
         trip.date = new Date(trip.date)
         return trip
     }).filter(trip => trip.date.getFullYear() === 2024 && trip.status === 'approved')
     let totals =currentYearTrips.reduce((total,trip) => {
         let foundDestination = destinationData.find(destination => destination.id === trip.destinationID)
         if (!total.flightIncome && !total.lodgingIncome) {
             total.flightIncome = 0;
             total.lodgingIncome = 0;
         }
         total.flightIncome += foundDestination.estimatedFlightCostPerPerson * trip.travelers * 0.1;
         total.lodgingIncome += foundDestination.estimatedLodgingCostPerDay * trip.duration * 0.1;
         return total;
     },{})
     totals.flightIncome = +totals.flightIncome .toFixed(2)
     totals.lodgingIncome = + totals.lodgingIncome.toFixed(2)
     return totals;
 }
export {
    calculatePastTripCosts,
    getPastUserTrips,
    getPendingUserTrips,
    getVisitedDestinationNames,
    getNonVisitedDestinationIDs,
    getDestinationInfo,
    findDestinationInfo,
    calculateTotalTripCost,
    findLastTripId,
    getAgencyTrips,
    getAgencyIncome,
    getUpcomingUserTrips
}