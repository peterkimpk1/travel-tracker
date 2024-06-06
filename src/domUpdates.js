import {getRandomUser, calculateTripCost, getPastUserTrips, getDestinationNames, getDestinationIDs} from './userFunctions.js'
import Glide from '@glidejs/glide';

let currentUserId;
const welcomeHeader = document.querySelector('.welcome-message')
const userCosts = document.querySelector('.user-total-costs');
const userPastTrips = document.querySelector('.user-past-trips');
const lastTripDate = document.querySelector('.last-trip-date');
const openModalBtn = document.querySelector("[data-open-modal]");
const closeModalBtn = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]")
// const bookTripForm = document.querySelector('.book-trip-form')
const modalSlides = document.querySelector('.glide__slides')
const destinationSelection = document.getElementById('destinations')

window.addEventListener('load',() => {
    fetchUserData()

})

openModalBtn.addEventListener('click',() =>{
    modal.showModal()
    new Glide('.glide').mount()
})
// modal.addEventListener('click', () => {

// })
closeModalBtn.addEventListener('click', () => {
    modal.close()
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
       currentUserId = user.id
       const AlldestinationIDs = getDestinationIDs(e[1].trips,0)
       createTripImageSlides(e[2].destinations,AlldestinationIDs)
       const userCost = calculateTripCost(e[1].trips,e[2].destinations,user.id)
       const userTrips = getDestinationNames(e[1].trips,e[2].destinations,user.id)
       const allDestinationNames = getDestinationNames(e[1].trips,e[2].destinations,0)
       const sortedUserDates = getPastUserTrips(e[1].trips,user.id).map(trip => new Date(trip.date)).sort((a,b) => a-b);
       inputWelcomeMessage(user)
       inputLastTripDate(sortedUserDates[0])
       inputTotalCosts(userCost.totalFlightCost,userCost.totalLodgingCost)
       inputPastTrips(userTrips)
       
    }).catch(err => alert('Could not fetch user data..'))
}

const createTripImageSlides = (destinationData, destinationIDs) => {
    let imageURLs = [];
    destinationIDs.forEach(id => {
       let location = destinationData.find(destination => destination.id === id)
        imageURLs.push({image: location.image, alt: location.alt, destination: location.destination})
    })
    imageURLs.forEach((imageURL,i) => {
        modalSlides.innerHTML += `
        <li class="glide__slide">
        <h5>${imageURL.destination}</h5>
        <img src="${imageURL.image}" alt="${imageURL.alt}"/><br>
        </li>` 
    })

    return imageURLs
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
    userPastTrips.innerHTML = `Your past visited locations: `
    trips.forEach(trip => {
        userPastTrips.innerHTML += `<br><strong>[${trip}],</strong>`
    })
}
