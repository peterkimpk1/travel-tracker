import {getRandomUser, calculateTripCost, getPastUserTrips, getDestinationNames} from './scripts.js'

const welcomeHeader = document.querySelector('.welcome-message')
const userCosts = document.querySelector('.user-total-costs');
const userPastTrips = document.querySelector('.user-past-trips');
const lastTripDate = document.querySelector('.last-trip-date')
window.addEventListener('load',() => {
    fetchUserData()
})

const APICall = (urlEndPoint, options) => {
    return fetch(`http://localhost:3001/api/v1/${urlEndPoint}`,options).then(response => response.json())
 }

const fetchUserData = () => {
    const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      };
    Promise.all([APICall('travelers',options), APICall('trips',options),APICall('destinations',options)])
    .then(e => {
       let user = getRandomUser(e[0].travelers)
       const userCost = calculateTripCost(e[1].trips,e[2].destinations,user.id)
       const userTrips = getDestinationNames(e[1].trips,e[2].destinations,user.id)
       const sortedUserDates = getPastUserTrips(e[1].trips,user.id).map(trip => new Date(trip.date)).sort((a,b) => a-b)
       inputWelcomeMessage(user)
       inputLastTripDate(sortedUserDates[0])
       inputTotalCosts(userCost.totalFlightCost,userCost.totalLodgingCost)
       inputPastTrips(userTrips)
    }).catch(err => alert('Could not fetch user data..'))
}

const inputWelcomeMessage = (user) => {
    let firstName = user.name.split(' ')[0]
    welcomeHeader.innerText = `Welcome, ${firstName}!`
}

const inputLastTripDate = (date) => {
    lastTripDate.innerText = `Your last trip date was ${date.getMonth() +1}/${date.getDate()}/${date.getFullYear()}`
}

const inputTotalCosts = (flightCost,lodgingCost) => {
    userCosts.innerHTML = `You have spent a total of $${flightCost} on flights. <br>You have spent a total of $${lodgingCost} on lodging.`
}

const inputPastTrips = (trips) => {
    userPastTrips.innerHTML = `Your past visitied locations: `
    trips.forEach(trip => {
        userPastTrips.innerHTML += `<br><strong>[${trip}],</strong>`
    })
}

