var callback = function (){

  const uid = JSON.parse(localStorage.getItem('user_id')).userId;

  function addFilm(title, director, year, genre){
    firebase.database().ref('users/' + uid).push({
      title: title,
      director: director,
      year: year,
      genre: genre
    });
  }

  let gitlog = document.getElementById('login');
  gitlog.addEventListener('click',function(result){
    // Ett objekt för att hantera GitHub-autentisering
    let provider = new firebase.auth.GithubAuthProvider();
    // Skapa ett Promise som visar ett popup-fönster
    // Obs! Kontrollera att fönstret inte blockeras av en ad blocker
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      localStorage.removeItem('user_id');
      window.location = 'http://localhost:8000/Documents/FEU17/JS2/lab3/index.html';
    }).catch(function(result) {
      // An error happened.
      alert('Oups, something went wrong. Try reloadgin the page.');
    });
  });
}

window.addEventListener('load', callback);
