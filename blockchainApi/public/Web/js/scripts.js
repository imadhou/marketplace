/*!
* Start Bootstrap - Shop Homepage v5.0.5 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project


$(document).ready(function () {
    setAllTransactions();
  });
// setAllTransactions();

function setAllTransactions() {
    console.log("hello ?");
    $.get(
        "http://localhost:3000/api/transactions/Last",
        //{paramOne : 1, paramX : 'abc'},
        function(data) {
          for (var i = 0; i < data.length; i++) {
            addRetrievedItem(data[i]);
            //Do something
        }
           
        }
    );
}

function search() {
  let searchWord = document.getElementById("search").value;
  console.log(searchWord);
    // $.get(
    //     "http://localhost:3000/api/transactions",
    //     //{paramOne : 1, paramX : 'abc'},
    //     function(data) {
    //        alert('page content: ' + data);
    //     }
    // );
}

function addRetrievedItem(transaction) {
  let newItem = document.createElement('div');
  newItem.className = "col mb-5";
  let div1 = document.createElement('div');
  div1.className = "card h-100";
  let img = document.createElement('img');
  // img.src = "https://dummyimage.com/450x300/dee2e6/6c757d.jpg";
  img.src = transaction.product_img;
  img.className = "card-img-top";

  let div1_1 = document.createElement('div');
  div1_1.className = "card-body p-4";
  let div1_1_1 = document.createElement('div');
  div1_1_1.className = "text-center";
  let price = document.createElement('p');
  // price.innerHTML = "25.99$";
  price.innerHTML = transaction.price + " € ";
  let h5 = document.createElement('h5');
  // h5.textContent = "Item text";
  h5.textContent = transaction.product_name;
  h5.className = "fw-bolder";

  div1_1_1.appendChild(h5);
  div1_1_1.appendChild(price);
  div1_1.appendChild(div1_1_1);

  let div1_2 = document.createElement('div');
  div1_2.className = "card-footer p-4 pt-0 border-top-0 bg-transparent";
  let div1_2_1 = document.createElement('div');
  div1_2_1.className = "text-center";
  let buy = document.createElement("a");
  buy.className = "btn btn-outline-dark mt-auto";
  buy.href = "shopItem.html?id="+transaction.id;
  buy.innerHTML = "Buy";

  div1_2_1.appendChild(buy);
  div1_2.appendChild(div1_2_1);

  
  div1.appendChild(img);
  div1.appendChild(div1_1);
  div1.appendChild(div1_2);
  newItem.appendChild(div1);

  let itemContainer = document.getElementById("itemContainer").appendChild(newItem);
  console.log(itemContainer);
}

function addItem() {
    let newItem = document.createElement('div');
    newItem.className = "col mb-5";
    let div1 = document.createElement('div');
    div1.className = "card h-100";
    let img = document.createElement('img');
    img.src = "https://dummyimage.com/450x300/dee2e6/6c757d.jpg";
    img.className = "card-img-top";

    let div1_1 = document.createElement('div');
    div1_1.className = "card-body p-4";
    let div1_1_1 = document.createElement('div');
    div1_1_1.className = "text-center";
    let price = document.createElement('p');
    price.innerHTML = "25.99$";
    let h5 = document.createElement('h5');
    h5.textContent = "Item text";
    h5.className = "fw-bolder";

    div1_1_1.appendChild(h5);
    div1_1_1.appendChild(price);
    div1_1.appendChild(div1_1_1);

    let div1_2 = document.createElement('div');
    div1_2.className = "card-footer p-4 pt-0 border-top-0 bg-transparent";
    let div1_2_1 = document.createElement('div');
    div1_2_1.className = "text-center";
    let buy = document.createElement("a");
    buy.className = "btn btn-outline-dark mt-auto";
    buy.href = "shopItem.html";
    buy.innerHTML = "Buy";

    div1_2_1.appendChild(buy);
    div1_2.appendChild(div1_2_1);

    
    div1.appendChild(img);
    div1.appendChild(div1_1);
    div1.appendChild(div1_2);
    newItem.appendChild(div1);

    let itemContainer = document.getElementById("itemContainer").appendChild(newItem);
    console.log(itemContainer);
  }