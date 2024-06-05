import './css/styles.css';

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

export {
    calculateTripCost,
    getPastUserTrips
}