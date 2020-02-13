/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
const cards = document.querySelector(".cards");

axios.get("https://api.github.com/users/AlexanderKarren")
.then(response => {
  console.log(response.data);
  cards.appendChild(BuildCard(response));
})
.catch(error => {
  console.log("Couldn't fetch data –", error);
})

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

axios.get("https://api.github.com/users/AlexanderKarren/followers")
.then(response => {
  response.data.forEach(user => {
    axios.get(user.url)
    .then(followerResponse => {
      cards.appendChild(BuildCard(followerResponse));
    })
    .catch(followerError => {
      console.log("Couldn't fetch data –", followerError);
    })
  })
})
.catch(error => {
  console.log("Couldn't fetch data –", error);
})

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
function BuildCard(object) {
  // parent container
  const card = document.createElement("div");
  card.classList.add("card");
  // avatar element
  const avatar = document.createElement("img");
  avatar.src = object.data.avatar_url;
  card.appendChild(avatar);
  // information parent
  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");
  card.appendChild(cardInfo);
  // name
  const name = document.createElement("h3");
  name.classList.add("name");
  name.textContent = object.data.name;
  cardInfo.appendChild(name);
  // username
  const userName = document.createElement("p");
  userName.classList.add("username")
  userName.textContent = object.data.login;
  cardInfo.appendChild(userName);
  // location
  const location = document.createElement("p");
  location.textContent = `Location: ${object.data.location}`
  cardInfo.appendChild(location);
  // profile
  const profile = document.createElement("p");
  profile.textContent = "Profile: ";
  cardInfo.appendChild(profile);
  // profile URL
  const profileURL = document.createElement("a");
  profileURL.href = object.data.html_url;
  profileURL.textContent = object.data.html_url;
  profile.appendChild(profileURL);
  // follower count
  const followersCount = document.createElement("p");
  followersCount.textContent = `Followers: ${object.data.followers}`;
  cardInfo.appendChild(followersCount);
  // following count
  const followingCount = document.createElement("p");
  followingCount.textContent = `Following: ${object.data.following}`;
  cardInfo.appendChild(followingCount);
  // bio
  const bio = document.createElement("p");
  bio.textContent = `Bio: ${object.data.bio}`;
  cardInfo.appendChild(bio);

  console.log(card);
  return card;
}
/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
