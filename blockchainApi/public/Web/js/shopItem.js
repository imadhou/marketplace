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
          //console.log(data.product_name)
          productSeller.innerHTML = data.from;
          productPrice.innerHTML = data.price + " € ";
          productDescription.innerHTML = data.product_description;
          productImage.src = data.product_img;




          const obj = {item: data.product_name};
          //console.log(data.product_name)
          //const obj = {item: globalName};
          myJSON = JSON.stringify(obj);
          console.log(obj)

          var xhr = new XMLHttpRequest();
          xhr.open("POST", "http://localhost:3000/api/transactions/recommandation", true);
          xhr.setRequestHeader('Content-Type', 'application/json');


          xhr.responseType = 'json';

          xhr.onload = function () {
              if (xhr.readyState === xhr.DONE) {
                  if (xhr.status === 200) {
                      //window.location.href="index.html"
                      console.log(xhr.response)
                      for ( let i = 1; i < 5; i++ ) {
                        document.getElementById("relatedIMG"+i).src = xhr.response[i].product_img;
                        document.getElementById("relatedTitle"+i).innerHTML = xhr.response[i].product_name;
                        document.getElementById("relatedPrice"+i).innerHTML = xhr.response[i].price + "€";
                        document.getElementById("relatedLink"+i).href = "http://localhost:3000/Web/shopItem.html?id=" + xhr.response[i].itemId;
                      }
                      
                  }
              }
          };


          xhr.send(myJSON);




        }
  );
  
}

function buy() {
    if(!document.getElementById("mail")){
      var a = document.getElementById("buy_div");
      var newcontent = document.createElement('li');
      newcontent.innerHTML += "<label for='mail' style='margin-left:40px'>Enter your e-mail address then click on the buy button again to confirm :</label>";
      newcontent.innerHTML += "<textarea id='mail' name='mail' rows='1' cols='20' style='margin:40px'></textarea>";
      a.appendChild(newcontent);
    }
    else{
      if(!document.getElementById('mail').value == ""){
        price = document.getElementById('productPrice').innerHTML;
        price = price.replace(" ", "")
        price = price.replace("€", "")
        price = price.replace("$", "")
        price = price.trim()
        const searchParams = new URLSearchParams(window.location.search);
        iditem = searchParams.get("id");
        nick = document.getElementById('mail');
        to = document.getElementById('productSeller');
        const obj = {from: nick.value, to: to.innerHTML, itemId: iditem, price: price, txType: "3"};
        myJSON = JSON.stringify(obj);
        console.log(obj)

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/api/transactions/", true);
        xhr.setRequestHeader('Content-Type', 'application/json');


        xhr.responseType = 'json';

        xhr.onload = function () {
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200) {
                    window.location.href="index.html"
                }
            }
        };


        xhr.send(myJSON);


      }
    }
}

function makeAnOffer() {
  if(!document.getElementById("offer")){
    var a = document.getElementById("buy_div");
    var newcontent = document.createElement('li');
    newcontent.innerHTML += "<label for='mail2' style='margin-left:40px'>Enter your e-mail address and chosen price then click on the offer button again to confirm :</label>";
    newcontent.innerHTML += "<textarea id='mail2' name='mail2' rows='1' cols='20' style='margin:40px'></textarea>";
    newcontent.innerHTML += "<label for='offer' style='margin-left:40px'>Price :</label>";
    newcontent.innerHTML += "<textarea type='number' id='offer' name='offer' rows='1' cols='20' style='margin:40px'></textarea>";
    a.appendChild(newcontent);
  }
  else{
    if(!document.getElementById('mail2').value == ""){
      price = document.getElementById('offer').value;
      const searchParams = new URLSearchParams(window.location.search);
      iditem = searchParams.get("id");
      nick = document.getElementById('mail2');
      to = document.getElementById('productSeller');
      const obj = {from: nick.value, to: to.innerHTML, itemId: iditem, price: price, txType: "2"};
      myJSON = JSON.stringify(obj);
      console.log(obj)

      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:3000/api/transactions/", true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(myJSON);


      xhr.responseType = 'json';

      xhr.onload = function () {
          if (xhr.readyState === xhr.DONE) {
              if (xhr.status === 200) {
                  window.location.href="index.html"
              }
          }
      };
      }
    }
  }
