import {getRandomUser, calculatePastTripCosts, getPastUserTrips, getVisitedDestinationNames, getNonVisitedDestinationIDs, 
    getDestinationInfo, calculateTotalTripCost, findLastTripId, findDestinationInfo} from './userFunctions.js'
import Glide from '@glidejs/glide';

let currentTripId;
let currentUserId;
let singleDestinationInfo;
const welcomeHeader = document.querySelector('.welcome-message')
const userCosts = document.querySelector('.user-total-costs');
const userPastTrips = document.querySelector('.user-past-trips');
const lastTripDate = document.querySelector('.last-trip-date');
const openModalBtn = document.querySelector("[data-open-modal]");
const closeModalBtn = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]")
const bookTripForm = document.querySelector('#book-trip-form')
const modalSlides = document.querySelector('.glide__slides')
const destinationSelection = document.getElementById('destinations')
const tripDate = document.querySelector('#trip-date')
const bookTripBtn = document.getElementById('book-trip-btn')
const totalEstimateLine = document.getElementById('total-line')
const totalEstimate = document.querySelector('.total-estimate')
const breakdownSection = document.querySelector('.breakdown')
const estimatedLodgeCost = document.querySelector('.estimate-lodge-cost')
const estimatedFlightCost =  document.querySelector('.estimate-flight-cost')
window.addEventListener('load',() => {
    fetchUserData()
    setTripDate()
    toggleTotalEstimate('hidden')
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
bookTripBtn.addEventListener('click',() => {
    postTripRequest()
    modal.close()
})

bookTripForm.addEventListener('submit', (e) => {
    e.preventDefault()
    postTripEstimate()
})

const APICall = (urlEndPoint, options) => {
    return fetch(`http://localhost:3001/api/v1/${urlEndPoint}`,options).then(response => response.json())
 }

const fetchUserData = () => {
    Promise.all([APICall('travelers'), APICall('trips'),APICall('destinations')])
    .then(e => {
       let user = getRandomUser(e[0].travelers)
       currentTripId = findLastTripId(e[1].trips);
       currentUserId = user.id;
       const allDestinationIDs = getNonVisitedDestinationIDs(e[1].trips,0)
       const allDestinationInfo = getDestinationInfo(e[2].destinations,allDestinationIDs)
       createGlideSlides(allDestinationInfo)
       createDestinationSelections(allDestinationInfo)
       const userCost = calculatePastTripCosts(e[1].trips,e[2].destinations,user.id)
       const userTrips = getVisitedDestinationNames(e[1].trips,e[2].destinations,user.id)
       const sortedUserDates = getPastUserTrips(e[1].trips,user.id).map(trip => new Date(trip.date)).sort((a,b) => a-b);
       inputWelcomeMessage(user)
       inputLastTripDate(sortedUserDates[sortedUserDates.length - 1])
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
    userPastTrips.innerHTML = `Your past visited locations: `
    trips.forEach(trip => {
        userPastTrips.innerHTML += `<br><strong>[${trip}],</strong>`
    })
}

const createGlideSlides = (destinations) => {
    destinations.forEach((destinations) => {
        modalSlides.innerHTML += `
        <li class="glide__slide">
        <h5>${destinations.destination}</h5>
        <img src="${destinations.image}" alt="${destinations.alt}"/><br>
        </li>` 
    })
}

const createDestinationSelections = (destinations) => {
    destinations.forEach(destination => {
        let option = document.createElement("option")
        option.value = destination.destination
        option.innerText = destination.destination
        destinationSelection.appendChild(option)
    })
}
const getFormData = () => {
    const formData = new FormData(bookTripForm)
    const destination = formData.get('destinations')
    const duration = formData.get('duration')
    const travelers = formData.get('travelers')
    const date = formData.get('date')
    return {
        destination: destination,
        duration: duration,
        travelers: travelers,
        date: date
    }
}
const postTripRequest = () => {
    const formData = getFormData()
    formData.date = formData.date.split("-").join("/")
    const options = {
        method: 'POST',
        body: JSON.stringify({
            id: currentTripId + 1,
            userID: currentUserId,
            destinationID: singleDestinationInfo.id,
            travelers: +formData.travelers,
            date: formData.date,
            duration: +formData.duration,
            status: 'pending',
            suggestedActivities: []
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };
   APICall('trips',options).then(e => console.log(e)).catch(err => alert('did not work'))
}

const postTripEstimate = () => {
    const formData = getFormData()
    Promise.all([APICall('destinations')]).then(e => {
        let totalCost = calculateTotalTripCost(formData.duration, formData.travelers, formData.destination, e[0].destinations)
        toggleTotalEstimate('visible');
        estimatedFlightCost.innerHTML = `Estimated Total Flight Cost <br>
        <span>For ${formData.travelers} Adult(s): $${totalCost.flightCost}</span>`;
        estimatedLodgeCost.innerHTML = `Estimated Total Lodging Cost <br>
        <span>For ${formData.duration} Night(s): $${totalCost.lodgingCost}</span>`;
        totalEstimate.innerHTML = `Total Estimate: 
        <span class="dollar-estimate">$${totalCost.flightCost + totalCost.lodgingCost}
        </span>`;
        singleDestinationInfo = findDestinationInfo(e[0].destinations, formData.destination)
    })
}

const toggleTotalEstimate = (property) => {
    totalEstimateLine.style.visibility = property
    totalEstimate.style.visibility = property
    bookTripBtn.style.visibility = property
}
const setTripDate = () => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear()
    if (month.toString.length === 1) {
        month = '0' + (date.getMonth() + 1)
    }
    if (day.toString.length === 1) {
        day = '0' + (date.getDate())
    }
    tripDate.setAttribute("min",`${year}-${month}-${day}`)
}

