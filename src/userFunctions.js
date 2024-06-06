const calculateTripCost = (tripData, destinationData, userID) =>  {
    let totals = tripData.filter(trip => trip.userID === userID).reduce((acc,trip) => {
        if (!acc.totalLodgingCost && !acc.totalFlightCost) {
            acc.totalLodgingCost = 0;
            acc.totalFlightCost = 0;
        }
        destinationData.forEach(destination => {
            if(trip.destinationID === destination.id) {
                acc.totalLodgingCost += (destination.estimatedLodgingCostPerDay) / (trip.travelers) * 1.1
                acc.totalFlightCost += destination.estimatedFlightCostPerPerson * 1.1
            }
        })
        return acc;
    },{})
    totals.totalLodgingCost = +totals.totalLodgingCost.toFixed(2)
    totals.totalFlightCost = +totals.totalFlightCost.toFixed(2)
    return totals 
}
const getPastUserTrips = (tripData, userID) => {
   return tripData.reduce((userTrips, trip) => {
        if(trip.userID === userID) {
            userTrips.push(trip)
        }
        return userTrips
    },[])
}

const getVisitedDestinationNames = (tripData, destinationData, userID) => {
    let places = [];
    const filteredTrips = tripData.filter(trip => trip.userID === userID).map(trip => trip.destinationID)
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

const getRandomUser = (travelerData) => {
    const randomIndex = Math.floor(Math.random() * travelerData.length)
    return travelerData[randomIndex]
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

export {
    calculateTripCost,
    getPastUserTrips,
    getRandomUser,
    getVisitedDestinationNames,
    getNonVisitedDestinationIDs,
    getDestinationInfo
}