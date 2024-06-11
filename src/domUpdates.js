import {calculatePastTripCosts, getPastUserTrips, getVisitedDestinationNames, getNonVisitedDestinationIDs, 
    getDestinationInfo, calculateTotalTripCost, findLastTripId, findDestinationInfo, getPendingUserTrips} from './userFunctions.js'
import { fetchAllPendingUserTrips } from './agency.js';
import Glide from '@glidejs/glide';

let currentTripId;
let currentUserId;
let singleDestinationInfo;
const welcomeHeader = document.querySelector('.welcome-message')
const userCosts = document.querySelector('.user-total-costs');
const userPastTrips = document.querySelector('.user-past-trips');
const userPendingTrips = document.querySelector('.user-pending-trips');
const lastTripDate = document.querySelector('.last-trip-date');
const openModalBtn = document.querySelector("[data-open-modal]");
const closeModalBtn = document.querySelector("[data-close-modal]");
const agentPageSection = document.querySelector('.agent-page')
const modal = document.querySelector("[data-modal]")
const bookTripForm = document.querySelector('#book-trip-form')
const modalSlides = document.getElementById('all-destinations')
const pastTripSlides = document.getElementById('past-destinations')
const destinationSelection = document.getElementById('destinations')
const tripDate = document.querySelector('#trip-date')
const bookTripBtn = document.getElementById('book-trip-btn')
const totalEstimateLine = document.getElementById('total-line')
const totalEstimate = document.querySelector('.total-estimate')
const estimatedLodgeCost = document.querySelector('.estimate-lodge-cost')
const estimatedFlightCost =  document.querySelector('.estimate-flight-cost')
const sliders = document.querySelectorAll('.glide')
const loginPageHeader = document.querySelector('.login-page-header');
const loginPage = document.querySelector('.login-page-background')
const dashboardPage = document.querySelector('.dashboard-page');
const loginForm = document.querySelector('.login')
const failMessage = document.querySelector('.fail-message')
const successMessage = document.querySelector('.success-message');
const userLogoutBtn = document.querySelector('#user-logout-btn')
const usernameLogin = document.querySelector('#username')
const passwordLogin = document.querySelector('#password')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    togglePage();
})
window.addEventListener('DOMContentLoaded', () => {
    toggleSuccessMessage('hidden')
    toggleFailMessage('hidden')
    toggleTotalEstimate('hidden')
})
window.addEventListener('load',() => {
    setTripDate()
})

openModalBtn.addEventListener('click',() =>{
    modal.showModal()
    new Glide(sliders[0]).mount()
})

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

userLogoutBtn.addEventListener('click', (e) => {
    e.preventDefault()
    dashboardPage.classList.add('hidden')
    loginPageHeader.classList.remove('hidden')
    loginPage.classList.remove('hidden')
    clearModal();
})

const togglePage = () => {
    const formData = new FormData(loginForm);
    const usernameInput = formData.get('username');
    const passwordInput = formData.get('password');
    if (usernameInput === 'agency' && passwordInput === 'travel') {
        toggleSuccessMessage('visible')
        toggleFailMessage('hidden')
        setTimeout(() => {
            usernameLogin.value = "";
            passwordLogin.value = "";
            loginPageHeader.classList.add('hidden');
            loginPage.classList.add('hidden');
            agentPageSection.classList.remove('hidden')
            toggleSuccessMessage('hidden')
            fetchAllPendingUserTrips()
        },2000)
        return;
    }
    for (var i = 0; i < 51; i++) {
        if (usernameInput === `traveler${i}` && passwordInput === 'travel') {
            toggleSuccessMessage('visible')
            toggleFailMessage('hidden')
            currentUserId = i;
            setTimeout(() => {
                usernameLogin.value = "";
                passwordLogin.value = "";
                toggleSuccessMessage('hidden')
                showDashboardPage()
            },2000)
            return;
        }
        else {
            toggleFailMessage('visible')
        }
    }
}
const showDashboardPage = () => {
    fetchUserData()
    loginPageHeader.classList.add('hidden');
    loginPage.classList.add('hidden');
    dashboardPage.classList.remove('hidden');
}

const APICall = (urlEndPoint, options) => {
    return fetch(`http://localhost:3001/api/v1/${urlEndPoint}`,options).then(response => response.json())
 }

const fetchUserData = () => {
    Promise.all([APICall('travelers'), APICall('trips'),APICall('destinations'),APICall(`travelers/${currentUserId}`)])
    .then(e => {
       const user = e[3]
       currentTripId = findLastTripId(e[1].trips);
       const allDestinationIDs = getNonVisitedDestinationIDs(e[1].trips,0)
       const allDestinationInfo = getDestinationInfo(e[2].destinations,allDestinationIDs)
       createGlideSlides(modalSlides, allDestinationInfo)
       createDestinationSelections(allDestinationInfo)
       const userCost = calculatePastTripCosts(e[1].trips,e[2].destinations,user.id)
       const userTrips = getVisitedDestinationNames(e[1].trips,e[2].destinations,user.id)
       const userPastTripInfo = getPastUserTrips(e[1].trips,user.id).sort((a,b) => new Date(a.date) - new Date(b.date))
       const sortedUserDates = getPastUserTrips(e[1].trips,user.id).map(trip => new Date(trip.date)).sort((a,b) => a-b);
       const userDestinationIDs = getPastUserTrips(e[1].trips,user.id).map(trip => trip.destinationID);
       const userDestinationInfo = getDestinationInfo(e[2].destinations,userDestinationIDs)

       createGlideSlides(pastTripSlides,userDestinationInfo)
       inputWelcomeMessage(user)
       inputLastTripDate(sortedUserDates[sortedUserDates.length - 1])
       inputTotalCosts(userCost.totalFlightCost,userCost.totalLodgingCost)
       inputPastTrips(userTrips, userPastTripInfo)
       const userPendingTrips = getPendingUserTrips(e[2].destinations,e[1].trips,currentUserId)
       inputPendingTrip(userPendingTrips)
       new Glide(sliders[1]).mount()
    }).catch(err => alert('Could not fetch user data..'))
}

const inputWelcomeMessage = (user) => {
    let firstName = user.name.split(' ')[0]
    welcomeHeader.innerText = `Welcome, ${firstName}!`
}

const inputLastTripDate = (date) => {
    lastTripDate.innerText = `Your last trip date was ${date.getMonth() +1}/${date.getDate()}/${date.getFullYear()}`
}
const inputPendingTrip = (pendingTripInfos) => {
    userPendingTrips.innerHTML = ""
    pendingTripInfos.forEach(trip => {
        userPendingTrips.innerHTML += `<br><strong>[ ${trip.destinationName} ]</strong>&nbsp;&nbsp;
        <span>Trip Date: ${trip.date}&nbsp;&nbsp;&nbsp;Duration: ${trip.duration} days&nbsp;&nbsp;Status:</span>
        <span class=pending-status> Pending </span><hr>`
    })
}
const inputTotalCosts = (flightCost,lodgingCost) => {
    userCosts.innerHTML = `You have spent a total of $${flightCost} on flights. 
    <br>You have spent a total of $${lodgingCost} on lodging.`
}

const inputPastTrips = (trips, tripsInfo) => {
    userPastTrips.innerHTML = "";
    trips.forEach((trip,i) => {
        userPastTrips.innerHTML += `<br><strong>[ ${trip} ]</strong>&nbsp;&nbsp;
       <span>Trip Date: ${tripsInfo[i].date}&nbsp;&nbsp;&nbsp;Duration: ${tripsInfo[i].duration} days&nbsp;&nbsp;
       Traveler(s): ${tripsInfo[i].travelers}</span><hr>`
    })
}

const createGlideSlides = (glideSlidesElement, destinations) => {
    destinations.forEach((destinations) => {
        glideSlidesElement.innerHTML += `
        <li class="glide__slide">
        <h4>${destinations.destination}</h4>
        <img src="${destinations.image}" alt="${destinations.alt}"/><br>
        </li>` 
    })
}

const createDestinationSelections = (destinations) => {
    destinationSelection.innerHTML = "";
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
   setTimeout(() => {
    Promise.all([APICall('destinations'),APICall('trips')]).then(e => {
    currentTripId = findLastTripId(e[1].trips);
    const userPendingTrips = getPendingUserTrips(e[0].destinations,e[1].trips,currentUserId);
    inputPendingTrip(userPendingTrips);
    },5000).catch(err => alert('did not work'))})
    clearModal();
}

const postTripEstimate = () => {
    const formData = getFormData()
    Promise.all([APICall('destinations'),APICall('trips')]).then(e => {
        currentTripId = findLastTripId(e[1].trips);
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
const clearModal = () => {
    estimatedFlightCost.innerHTML = 'Estimated Total Flight Cost';
    estimatedLodgeCost.innerHTML = 'Estimated Total Lodging Cost';
    toggleTotalEstimate('hidden')
    bookTripForm.reset();
}
const toggleSuccessMessage = (property) => {
    successMessage.style.visibility = property
}
const toggleFailMessage = (property) => {
    failMessage.style.visibility = property
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
    if (month < 10) {
        month = '0' + (date.getMonth() + 1)
    }
    if (day < 10) {
        day = '0' + (date.getDate())
    }
    tripDate.setAttribute("min",`${year}-${month}-${day}`)
    return {
        day, month, year
    }
}

export {
    APICall,
    setTripDate
}