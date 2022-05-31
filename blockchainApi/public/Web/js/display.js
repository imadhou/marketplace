/*!
* Start Bootstrap - Shop Item v5.0.5 (https://startbootstrap.com/template/shop-item)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-item/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

function display_seller(){
  div = document.getElementById('display')
  div.innerHTML = ''
  table = document.createElement("table")
  div.append(table)
  thead = document.createElement("thead")
  table.append("thead")
  tr1 = document.createElement("th")
  tr1.innerHTML = "ID item"
  tr2 = document.createElement("th")
  tr2.innerHTML = "Status"
  tr3 = document.createElement("th")
  tr3.innerHTML = "Action"
  tbody = document.createElement("tbody")
  table.append("tbody")

  mail = document.getElementById('mail').value

  const obj = {
    from: {
        field: "from",
        values: [mail],
        operator: "in"
    },
    to: {
        field: "",
        values: [""],
        operator: "in"
    },
    txType: {
        field: "txType",
        values: [1],
        operator: "in"
    },
    operator: "AND"
}
  myJSON = JSON.stringify(obj);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/api/transactions/search", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.responseType = 'json';

  xhr.onload = function () {
      if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200) {
              resp = xhr.response
              resp.map(e => {
                if(e.id != 0){
                  tbody.append()
                  trn = document.createElement('tr')
                  trn.setAttribute("id","tr"+e)
                  const obj = {
                    from: {
                        field: "from",
                        values: [mail],
                        operator: "in"
                    },
                    to: {
                        field: "",
                        values: [""],
                        operator: "in"
                    },
                    txType: {
                        field: "txType",
                        values: [1],
                        operator: "in"
                    },
                    operator: "AND"
                  }

                  xhr.open("POST", "http://localhost:3000/api/transactions/search", true);
                  xhr.setRequestHeader('Content-Type', 'application/json');

                  xhr.responseType = 'json';
                  xhr.onload = function () {
                  if (xhr.readyState === xhr.DONE) {
                      if (xhr.status === 200) {
                          resp = xhr.response
                          resp.map(ee => {
                            currTR = tr.getElementByID("tr"+e.id)
                            td1 = createElement('td')
                            td1.innerHTML = ee.id
                            td2 = createElement('td')
                            td2.innerHTML = ee.txType
                            td3 = createElement('td')
                            //CODER BOUTONS ACCEPTER REFUSER ACHAT
                          })


                        }
                      }
                  };


                  xhr.send(myJSON);
                }
              })


          }
      }
  };



  xhr.send(myJSON);




}
