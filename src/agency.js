import {calculatePastTripCosts, getPastUserTrips, getVisitedDestinationNames, getNonVisitedDestinationIDs, 
    getDestinationInfo, calculateTotalTripCost, findLastTripId, findDestinationInfo, getPendingUserTrips, getAgencyPendingUserTrips} from './userFunctions.js'
import {APICall } from './domUpdates.js'
const allPendingUserTrips = document.querySelector('.agency-pending-user-trips')
const pendingSelections = document.querySelector('#pending-trips')
let allPendingTrips = [];
window.addEventListener('load', () => {
    fetchAllPendingUserTrips()
})
pendingSelections.addEventListener('change',() => {
    changePendingUserList(allPendingTrips)
})

const fetchAllPendingUserTrips = () => {
    Promise.all([APICall('trips'),APICall('destinations')]).then(e => {
        const pendingTrips = getAgencyPendingUserTrips(e[1].destinations,e[0].trips).sort((a,b) => new Date(a.date) - new Date(b.date))
        pendingTrips.forEach(trip => allPendingTrips.push(trip))
        createPendingSelections(pendingTrips)
    })
}

const createPendingSelections = (trips) => {
    trips.forEach(trip => {
        let option = document.createElement("option")
        option.value = trip.destinationName
        option.innerText = trip.destinationName
        pendingSelections.appendChild(option)
    })
}

const changePendingUserList = (trips) => {
    allPendingUserTrips.innerHTML = "";
    console.log(allPendingTrips)
    trips.forEach(trip => {
        if (trip.destinationName === pendingSelections.value) {
            allPendingUserTrips.innerHTML += `<br><li><strong>[ user: ${trip.userID} ]</strong><br>
            Trip Date: ${trip.date}<br>Duration: ${trip.duration} days<br>
           Traveler(s): ${trip.travelers}</li><hr>`
        }
    })
}
