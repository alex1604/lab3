var callback = function (){

  function writeUserData(userId, name, email) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
    }).then(function(success){
      alert('You were successfully registered.');
    }).catch(function(fail){
      alert('Something went wrong, we couldn´t register you. Try reloading the page.');
    });
  }

  let gitlog = document.getElementById('login');
  gitlog.addEventListener('click',function(){
    // Ett objekt för att hantera GitHub-autentisering
    let provider = new firebase.auth.GithubAuthProvider();
    // Skapa ett Promise som visar ett popup-fönster
    // Obs! Kontrollera att fönstret inte blockeras av en ad blocker
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      console.log(result);
      let username = result.additionalUserInfo.profile.name;
      let email = result.additionalUserInfo.profile.email;
      var user = firebase.auth().currentUser;

      if (user != null) {
        var uid = user.uid;
        var name = username;
      }

      let userId = uid;
      // CHECK IF THE USER ALREADY EXISTS IN THE DATABASE:
      let db = firebase.database();
      db.ref('users/').once('value',function(snapshot){
        let allData = snapshot.val();
        let userid_list = Object.getOwnPropertyNames(allData); // get array with every user's id
        let check;

        for (i=0; i < userid_list.length; i++){ // compare current user id with user ids in database

          if(userid_list[i] == userId) { // if user exists - log in

            check = true;
            alert('You are logged in.');
            break;
          }
          else {
            check = false;
          }
        }
        if (!check){ // if user doesn't already exist - register and create user in database

          writeUserData(userId, username, email);
        }
        /* LOG OUT:

        firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
      // An error happened.
    });

    */
  });

  const user_id = {userId: uid, name:name}; // WE USE THIS CONST TO GET THE USERNAME WITH USER.NAME
  let dataString = JSON.stringify( user_id );
  window.localStorage.setItem('user_id', dataString);
  console.log('localStorage: ' + JSON.parse(localStorage.getItem('user_id')).userId);

  window.location = 'profile.html';
})
.catch(function(result){
  alert('Something went wrong. Try to reload the page');
});
});
}

window.addEventListener('load', callback);
