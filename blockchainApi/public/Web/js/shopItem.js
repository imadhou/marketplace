/*!
* Start Bootstrap - Shop Item v5.0.5 (https://startbootstrap.com/template/shop-item)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-item/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

$(document).ready(function () {
  const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    getTransaction(id);
});

function getTransaction(id) {
  console.log("hello ?");
  $.get(
      "http://localhost:3000/api/transactions/"+id,
      //{paramOne : 1, paramX : 'abc'},
      function(data) {
          console.log(data);
          productName = document.getElementById("productName");
          productDescription = document.getElementById("productDescription");
          productSeller = document.getElementById("productSeller");
          productPrice = document.getElementById("productPrice");
          // productImage = document.getElementById("productImage");
          productName.innerHTML = data.id;
          productSeller.innerHTML = data.from;
          productPrice.innerHTML = data.price + " € ";
          productDescription.innerHTML = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium at dolorem quidem modi. Nam sequi consequatur obcaecati excepturi alias magni, accusamus eius blanditiis delectus ipsam minima ea iste laborum vero?";
      }
  );
}

function buy() {
  //document.getElementById("demo").style.color = "red";
  
  console.log("buy");
}

function makeAnOffer() {
    //document.getElementById("demo").style.color = "red";
    
    console.log("make an offer");
  }