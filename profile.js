var callback = function (){

  /* DECLARATION OF VARIABLES */

  const uid = JSON.parse(localStorage.getItem('user_id')).userId;
  const name = JSON.parse(localStorage.getItem('user_id')).name;

  let add = document.getElementById('add');
  let remove = document.getElementById('remove');
  let gitlog = document.getElementById('login');
  let info = document.getElementById('info');

  /* LOGIN-WELCOME HEADER GENERATION */

  let div = document.createElement('div');
  let p = document.createElement('p');
  p.innerHTML = 'Welcome to your Muviverse, ' + name;
  div.appendChild(p);
  div.classList.add('welcome');
  document.getElementsByTagName('nav')[0].insertBefore(div,gitlog);

  /* DISABLE BUTTONS ON THE FIRST PLACE */

  add.disabled = false;
  remove.disabled = false;


  /* Flechas para cambiar de página: flecha de la izquierda .onclick = -1; flecha derecha .onclick = +1;*/


  /* FUNCTION DECLARATIONS */

  function toTitle(str){
    str = str.split(' ');

    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
  }

  function appendMovie(element,movie,number){

    let obj = element[movie];

    let new_div = document.createElement('div');
    //let img = element[i].img;
    let title = document.createElement('p');
    title.innerHTML = toTitle(obj.title);
    let director = document.createElement('p');
    director.innerHTML = 'By: ' + toTitle(obj.director);
    let year = document.createElement('p');
    year.innerHTML = 'Year: ' + obj.year;
    let genre = document.createElement('p');
    genre.innerHTML = 'Genre: ' + toTitle(obj.genre);
    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('removeCheck');
    let newBoxId = obj.id;
    //checkBox.id = newBoxId;



    //new_div.appendChild(img);
    new_div.appendChild(title);
    new_div.appendChild(director);
    new_div.appendChild(year);
    new_div.appendChild(genre);
    new_div.appendChild(checkBox);
    new_div.classList.add('row_element');
    new_div.id = newBoxId;

    new_div.addEventListener('click', function(event){
      let target = event.target;
      let id = target.id;
      let thisDiv = document.getElementById(id);

      let thisCheck = target.getElementsByClassName('removeCheck')[0];

      if (!thisCheck.checked){
        thisCheck.checked = true;
        removeList.push(id);
        thisDiv.style.backgroundColor = "rgba(220, 0, 0, 0.6)";
        console.log(removeList);
      } else if(thisCheck.checked) {
        thisCheck.checked = false;
        thisDiv.style.backgroundColor = "transparent";
        removeList.pop(id);
        console.log(removeList);
      }
    });

    let rowNumber = 'r' + number;
    let row = document.getElementById(rowNumber);
    row.appendChild(new_div);

  }


  function displayFilms(element, arrow){

    let count = 0;
    let number = 1;

    let r1 = document.getElementById('r1');
    let r2 = document.getElementById('r2');
    let r3 = document.getElementById('r3');

    if (arrow == 0){

      for (let movie in element){

        appendMovie(element,movie,number);
        count++;

        if (count == 3) { number++; count = 0; }

        if (number == 4) {break;}

      }
    } else if (arrow != 0){

      let countFilmsBefore = 0;

      for (let movie in element){

        countFilmsBefore++;

        if (countFilmsBefore > (arrow * 9) && countFilmsBefore < (arrow * 9) + 10) {

          appendMovie(element,movie,number);
          count++;

          if (count == 3) { number++; count = 0; }

          if (number == 4) {break;}

        }
      }
    }
  }


  function addFilm(title, director, year, genre){

    firebase.database().ref('users/' + uid + '/catalogue').push({
      title: title.toLowerCase(),
      director: director.toLowerCase(),
      year: year,
      genre: genre.toLowerCase()
    });
  }

  function removeFilm(id){

    firebase.database().ref('users/' + uid + '/catalogue/' + id).remove();
  }

  function removeForm(){
    let form = document.getElementById('addForm');
    document.body.removeChild(form);
  }

  function check(x, y, z, a){
    if(x.value == 'null' || y.value == 'null' || z.value == 'null' || a.value == 'null'){
      return false;
    } else {return true;}
  }

  function addForm(){
    let div = document.createElement('div');
    let subDiv1 = document.createElement('div');
    subDiv1.classList.add('subDiv1');
    let subDiv2 = document.createElement('div');
    subDiv2.classList.add('subDiv1');
    let subDiv3 = document.createElement('div');
    subDiv3.classList.add('subDiv3');
    let title = document.createElement('input');
    title.type = 'text';
    title.id = 'title';
    let tiLable = document.createElement('label');
    tiLable.for = "#" + title.id;
    tiLable.innerHTML = 'Title: ';
    let director = document.createElement('input');
    director.type = 'text';
    director.id = 'director';
    let dirLable = document.createElement('label');
    dirLable.for = "#" + director.id;
    dirLable.innerHTML = 'Director: ';
    let year = document.createElement('input');
    year.type = 'text';
    year.id = 'year';
    let yeLable = document.createElement('label');
    yeLable.for = "#" + year.id;
    yeLable.innerHTML = 'Year: ';
    let genre = document.createElement('select');
    genre.id = 'genre';
    let genres = ['Adventure','Comedy','Drama','Historical','Horror','Sci-fi','Thriller','War'];
    for (x in genres){
      let option = document.createElement('option');
      option.value = genres[x].toLowerCase();
      option.innerHTML = genres[x];
      genre.appendChild(option);
    }
    let geLable = document.createElement('label');
    geLable.for = "#" + genre.id;
    geLable.innerHTML = 'Genre: ';
    let addClose = document.createElement('span');
    addClose.classList.add('fa');
    addClose.classList.add('fa-times');
    addClose.classList.add('fa-2x');
    addClose.classList.add('addCloseButton');
    addClose.id = 'addCloseButton';
    let button = document.createElement('button');
    button.innerHTML = 'Add Film';
    button.classList.add('addFormButton');
    button.id = 'confirmButton';
    subDiv1.appendChild(tiLable);
    subDiv1.appendChild(title);
    subDiv1.appendChild(dirLable);
    subDiv1.appendChild(director);
    subDiv2.appendChild(yeLable);
    subDiv2.appendChild(year);
    subDiv2.appendChild(geLable);
    subDiv2.appendChild(genre);
    subDiv3.appendChild(addClose);
    subDiv3.appendChild(button);
    div.appendChild(subDiv1);
    div.appendChild(subDiv2);
    div.appendChild(subDiv3);
    div.classList.add('addForm');
    div.id = 'addForm';
    document.body.appendChild(div);

    let titleField = document.getElementById('title');
    let directorField = document.getElementById('director');
    let yearField = document.getElementById('year');
    let genreField = document.getElementById('genre');

    let addCloseButton = document.getElementById('addCloseButton');
    addCloseButton.addEventListener('click', removeForm);
    let confirmButton = document.getElementById('confirmButton');
    confirmButton.addEventListener('click',function(){
      if (check(titleField, directorField, yearField, genreField)){
        addFilm(titleField.value, directorField.value, yearField.value, genreField.value);
        removeForm();
      } else {
        prompt('You must fill in all the fields before you can add a new film.');
      }
    });
  }

  /* SUBSCRIPTION TO CHANGES ON DATABASE FOR CONSTANT UPDATE OF USERS CATALOGUE */
  var library = [];

  let db = firebase.database();
  db.ref('users/' + uid + '/catalogue').orderByChild('title')
  .on('value', function(snapshot) {

    library = [];

    if (snapshot.val() != null && snapshot.val() != 'undefined'){

      snapshot.forEach( child => {
        let movie_id = child.key;
        let movie = child.val();  // objekten kommer i ordning
        movie.id = movie_id;
        library.push(movie);
      });

      console.log(library);


      while (r1.hasChildNodes()) {
        r1.removeChild(r1.lastChild);
      }
      while (r2.hasChildNodes()) {
        r2.removeChild(r2.lastChild);
      }
      while (r3.hasChildNodes()) {
        r3.removeChild(r3.lastChild);
      }
      displayFilms(library, arrow);

    } else if(snapshot.val() == null || snapshot.val() == 'undefined'){

      while (r1.hasChildNodes()) {
        r1.removeChild(r1.lastChild);
      }
      while (r2.hasChildNodes()) {
        r2.removeChild(r2.lastChild);
      }
      while (r3.hasChildNodes()) {
        r3.removeChild(r3.lastChild);
      }
    }

  });

  /* TRIGGERS / EXECUTABLE CODE */

  gitlog.addEventListener('click',function(success){
    // Ett objekt för att hantera GitHub-autentisering
    let provider = new firebase.auth.GithubAuthProvider();
    // Skapa ett Promise som visar ett popup-fönster
    // Obs! Kontrollera att fönstret inte blockeras av en ad blocker
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      localStorage.removeItem('user_id');
      window.location = 'index.html';
    }).catch(function(fail) {
      // An error happened.
      alert('Oups, something went wrong. Try reloadgin the page.');
    });
  });

  // PAGING GENERATION


  let arrowRight = document.getElementById('arrowRight');
  let arrowLeft = document.getElementById('arrowLeft');

  var arrow = 0;
  //
  arrowRight.addEventListener('click', function(){

    if (library[(arrow * 9) + 1] != null){

      while (r1.hasChildNodes()) {
        r1.removeChild(r1.lastChild);
      }
      while (r2.hasChildNodes()) {
        r2.removeChild(r2.lastChild);
      }
      while (r3.hasChildNodes()) {
        r3.removeChild(r3.lastChild);
      }
      arrow++;
      displayFilms(library, arrow);
    }

  });

  arrowLeft.addEventListener('click', function(){

    if (library[((arrow-1) * 9) + 1] != null){

      while (r1.hasChildNodes()) {
        r1.removeChild(r1.lastChild);
      }
      while (r2.hasChildNodes()) {
        r2.removeChild(r2.lastChild);
      }
      while (r3.hasChildNodes()) {
        r3.removeChild(r3.lastChild);
      }
      arrow--;
      displayFilms(library, arrow);
    }
  });
  //

  add.addEventListener('click', addForm);

  let removeCheck = document.getElementsByClassName('removeCheck');

  var removeList = [];

  remove.addEventListener('click', function(){
    console.log(removeList);
    for (let id in removeList){
      removeFilm(removeList[id]);
    }
    removeList.length = 0;
  });

  info.addEventListener('mouseover',function(){
    let div = document.createElement('div');
    let p = document.createElement('p');
    p.innerHTML = "Click on one or several for films to select them. Once yo're done selecting the film(s), click on 'Remove Film(s)' to erase delete them from your catalogue. WARNING: this action cannot be undone."
    div.appendChild(p);
    div.id = 'infoMs';
    document.body.append(div);
  });
  info.addEventListener('mouseleave',function(){
    let div = document.getElementById('infoMs');
    document.body.removeChild(div);
  });
}

window.addEventListener('load', callback);
