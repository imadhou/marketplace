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
  $.get(
      "http://localhost:3000/api/transactions/"+id,
      //{paramOne : 1, paramX : 'abc'},
      function(data) {
          console.log(data);
          productName = document.getElementById("productName");
          productDescription = document.getElementById("productDescription");
          productSeller = document.getElementById("productSeller");
          productPrice = document.getElementById("productPrice");
          productImage = document.getElementById("productImage");
          productName.innerHTML = data.product_name;
          productSeller.innerHTML = data.from;
          productPrice.innerHTML = data.price + " € ";
          productDescription.innerHTML = data.product_description;
          productImage.src = data.product_img;
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