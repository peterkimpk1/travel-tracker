# Travel Tracker

### Abstract
For this application, the user first lands on the login page that authenticates for a traveler's login. Upon logging in, a dashboard is displayed with user's pending/upcoming trips that has information on current/future trips and a summary of the total amount spent in the latest trip year. The past trips section uses Glide to show past visited destinations along with its information. "Book another trip" button opens a modal, featuring a slideshow of all destinations available for booking and the user can see the trip estimate based trip location, duration, and travelers. This application also has a separate login for the agency, where an agent can login to approve or deny user's pending trips, see a summary of the total amount the agency has made from users for the current year, and get a glimpse of all users who are on trips currently or will be in the future.

### Installation Instructions for Front-End
1. Fork the repository
2. Clone the repository to your local machine
3. cd into the directory
4. Run `npm install`
5. Using the terminal, run `npm start` to start the server.

### Installation Instructions for Back-End
1. Clone this [repository](https://github.com/turingschool-examples/travel-tracker-api)
2. cd into the directory
3. Run `npm install`
4. Using the terminal, run `npm start` to start the server.

### Technologies Used
- Javascript, HTML, CSS, Glide.js, Mocha, Chai, Webpack

### Reflections
*Wins*
1. Adding login/logout feature while maintaining correct DOM state
2. Implementing Glide.js to increase user interactivity with the destination images
3. Using selection drop-down to approve/deny user's trips

*Challenges*
1. Adding agency page functionality
2. Mounting Glide in correct window

### Working app
- [Link to Front End](https://peterkimpk1.github.io/travel-tracker/) Note: Must run back-end for application <br> 
- Traveler(1-50) login info [ username: `traveler1`  password: `travel` ] <br>
- Agency login info [ username: `agency`  password: `travel` ]<br><br>
![Screenshot 2024-06-11 at 11 00 03 PM](https://github.com/peterkimpk1/travel-tracker/assets/161254279/d113a6ce-f892-4525-97d2-0fe94389b68e)


### Link to Project Board
- [Project Board](https://github.com/users/peterkimpk1/projects/6) 

### List of contributors
* Peter Kim: https://github.com/peterkimpk1
