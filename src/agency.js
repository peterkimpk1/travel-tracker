import {getAgencyTrips, getAgencyIncome} from './userFunctions.js'
import {APICall, setTripDate} from './domUpdates.js'
const allPendingUserTrips = document.querySelector('.agency-pending-user-trips')
const pendingSelections = document.querySelector('#pending-trips')
const logoutBtn = document.querySelector('.logout-btn')
const agentPageSection = document.querySelector('.agent-page')
const loginPageHeader = document.querySelector('.login-page-header')
const loginPageBackground = document.querySelector('.login-page-background')
const allUsersOnTrips = document.querySelector('.all-user-pending-approved-trips')
const allUserFutureTrips = document.querySelector('.all-future-pending-approved-trips')
const agencyTotal = document.querySelector('.agency-total')
let allPendingTrips = [];


window.addEventListener('load', () => {
    fetchAllPendingUserTrips()
})
pendingSelections.addEventListener('change',() => {
    changePendingUserList(allPendingTrips)
    addButtonAction()
})
logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    agentPageSection.classList.add('hidden')
    loginPageHeader.classList.remove('hidden')
    loginPageBackground.classList.remove('hidden')
})
const fetchAllPendingUserTrips = () => {
    Promise.all([APICall('trips'),APICall('destinations')]).then(e => {
        const pendingTrips = getAgencyTrips(e[1].destinations,e[0].trips,'pending');
        const approvedTrips = getAgencyTrips(e[1].destinations,e[0].trips,'approved');
        const agencyIncome = getAgencyIncome(e[1].destinations,e[0].trips);
        if (allPendingTrips.length > 0) {
            allPendingTrips = [];
        }
        pendingTrips.forEach(trip => allPendingTrips.push(trip));
        createPendingSelections(pendingTrips);
        pendingSelections.selectedIndex = -1;
        changePendingUserList(pendingTrips);
        const allTrips = pendingTrips.concat(approvedTrips)
        displayUsersOnTrips(allTrips)
        displayAgencyIncome(agencyIncome)
    })
   
}
const displayAgencyIncome = (income) => {
    agencyTotal.innerHTML = `Total income generated from flights this year: $${income.flightIncome} 
    <br>Total income generated from lodging this year: $${income.lodgingIncome}`
}
const createPendingSelections = (trips) => {
    pendingSelections.innerHTML = "";
    trips.forEach(trip => {
        let option = document.createElement("option")
        option.value = trip.destinationName
        option.innerText = trip.destinationName
        pendingSelections.appendChild(option)
    })
    deleteSelectionDupes()
}
const deleteSelectionDupes = () => {
    const destinationNames = [];
    for (var i = 0; i < pendingSelections.options.length; i++){
        destinationNames.push(pendingSelections.options[i].value)
    }  
    let counts = destinationNames.reduce((count,destination, index) => {
        let splitName = destination.split(',')
        if (!count[splitName[0]]) {
            count[splitName[0]] = {count:0,index:[]};
        }
        count[splitName[0]].count += 1;
        count[splitName[0]].index.push(index)
        return count;
    },{})
    let keys = Object.keys(counts)
    keys.forEach(key => {
       if (counts[key].index.length > 1) {
            for (var i = 0; i < counts[key].index.length - 1; i++) {
                pendingSelections.options[counts[key].index[i+1]].remove(counts[key].index[i+1])
            }
       }
    })
       
}
const changePendingUserList = (trips) => {
    const sortedTrips = trips.map(trip => {
        trip.date = new Date(trip.date)
        return trip 
    }).sort((a,b) => a.date - b.date);
    allPendingUserTrips.innerHTML = "";
    let selectionValue = pendingSelections.value
    sortedTrips.forEach((trip,i) => {
        if (trip.destinationName === selectionValue) {
            allPendingUserTrips.innerHTML += `<br><li><strong>[ user: ${trip.userID} ]</strong><br>
            Trip Date: ${trip.date.getFullYear()}/${trip.date.getMonth() + 1}/${trip.date.getDate()}<br>Duration: ${trip.duration} days<br>
           Traveler(s): ${trip.travelers}</li><hr>
           <div class="agent-buttons" id="buttons">
            <button class="approve-trip" id=${trip.id}>Approve</button>
             <button class="deny-trip" id=${trip.id}>Deny</button>
           </div>`
        }
    })

}

const findTripIndex = (id) => {
   return allPendingTrips.map(trip => trip.id).indexOf(id)
}
const addButtonAction = () => {
    const approveTripBtns = document.querySelectorAll('.approve-trip')
    approveTripBtns.forEach(approveBtn => {
        approveBtn.addEventListener('click', approveTrip)
    })
    const denyTripBtns = document.querySelectorAll('.deny-trip')
    denyTripBtns.forEach(denyBtn => {
    denyBtn.addEventListener('click', deleteTrip)
    })
}

const approveTrip = (e) => {
    const tripIndex = findTripIndex(+e.target.id)
    const options = {
        method: 'POST',
        body: JSON.stringify({
            id: allPendingTrips[tripIndex].id,
            status: 'approved'
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    APICall('updateTrip',options).then(e => console.log(e)).catch(err => 'did not update')
    allPendingUserTrips.innerHTML += `<p class=update-trip-message>Approved the trip for <strong>user: ${allPendingTrips[tripIndex].userID}</strong></p>`
    setTimeout(() => {
        fetchAllPendingUserTrips()
    },3000)
}

const deleteTrip = (e) => {
    const tripIndex = findTripIndex(+e.target.id)
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    APICall(`trips/${allPendingTrips[tripIndex].id}`,options).then(e => e).catch(err => 'did not delete')
        allPendingUserTrips.innerHTML += `<p class=delete-trip-message>Deleted the trip for <strong>user: ${allPendingTrips[tripIndex].userID}</strong></p>`
    setTimeout(() => {
        fetchAllPendingUserTrips()
    },3000)
}

const displayUsersOnTrips = (trips) => {
    const currentDate = setTripDate()
     let allTrips = trips.map(trip => { 
        trip.date = new Date(trip.date)
         return trip
     })
    const filteredTrips = allTrips.filter(trip => ((trip.date.getDate() === currentDate.day) &&(trip.date.getMonth() + 1) === parseInt(currentDate.month) && (trip.date.getFullYear() === currentDate.year))).sort((a,b)=>a.date-b.date)
    const futureTrips = allTrips.filter(trip => ((trip.date.getDate() > currentDate.day) && (trip.date.getMonth() + 1) >= parseInt(currentDate.month) && (trip.date.getFullYear() >= currentDate.year))).sort((a,b)=>a.date-b.date)
    allUsersOnTrips.innerHTML = "";
    filteredTrips.forEach(trip => {
        allUsersOnTrips.innerHTML += `<strong>[ ${trip.destinationName} ]</strong>&nbsp;&nbsp;
        <span>Trip Date: ${trip.date.getFullYear()}/${trip.date.getMonth() + 1}/${trip.date.getDate()}&nbsp;&nbsp;&nbsp;Duration: ${trip.duration} days&nbsp;&nbsp;Status:</span>
        <span class=${trip.status}-status> ${trip.status} </span><hr>`
    })
    allUserFutureTrips.innerHTML = "";
    futureTrips.forEach(trip => {
        allUserFutureTrips.innerHTML += `<strong>[ ${trip.destinationName} ]</strong>&nbsp;&nbsp;
        <span>Trip Date: ${trip.date.getFullYear()}/${trip.date.getMonth() + 1}/${trip.date.getDate()}&nbsp;&nbsp;&nbsp;Duration: ${trip.duration} days&nbsp;&nbsp;Status:</span>
        <span class=${trip.status}-status> ${trip.status} </span><hr>`
    })
}

export {
    fetchAllPendingUserTrips
}