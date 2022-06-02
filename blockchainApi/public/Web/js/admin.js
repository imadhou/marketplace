/*!
    * Start Bootstrap - SB Admin v7.0.5 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2022 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

function login() {
    let email = document.getElementById("inputEmail").value;
    let password = document.getElementById("inputPassword").value;
    localStorage.setItem('email',email);
    localStorage.setItem('password',password);
    window.location.replace("index.html");
    console.log(email + " "+ password);
      // $.get(
      //     "http://localhost:3000/api/transactions",
      //     //{paramOne : 1, paramX : 'abc'},
      //     function(data) {
      //        alert('page content: ' + data);
      //     }
      // );
  }

  function register() {
    let email = document.getElementById("inputEmail").value;
    let password = document.getElementById("inputPassword").value;
    let confirmPassword = document.getElementById("inputPasswordConfirm").value;
    let firstName = document.getElementById("inputFirstName").value;
    let lastName = document.getElementById("inputLastName").value;
    // localStorage.setItem('email',email);
    // localStorage.setItem('password',password);
    // window.location.replace("index.html");
    // console.log(email + " "+ password);
    
      if ( password === confirmPassword ) {
          console.log(email+ " " + password + " "+ confirmPassword + " "+ firstName + " " + lastName);
          let obj = {"email" : email, "pseudo" : email, "password" : password};
          console.log(obj)

      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:3000/api/transactions/", true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      myJSON = JSON.stringify(obj);
      xhr.send(myJSON);


      xhr.responseType = 'json';

      xhr.onload = function () {
          if (xhr.readyState === xhr.DONE) {
              if (xhr.status === 200) {
                localStorage.setItem('email',email);
                localStorage.setItem('password',password);
                window.location.href="index.html"
              }
          }
      };
      } else {
          alert(" Les deux mots de passes saisies ne correspondent pas !");
      }
      
  }
