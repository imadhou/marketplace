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
  table.append(thead)
  tr1 = document.createElement("th")
  tr1.innerHTML = "ID item"
  thead.append(tr1)
  tr2 = document.createElement("th")
  tr2.innerHTML = "Status"
  thead.append(tr2)
  tr3 = document.createElement("th")
  tr3.innerHTML = "Action"
  thead.append(tr3)
  tbody = document.createElement("tbody")
  table.append(tbody)

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
                if(e.itemId != 0){
                  trn = document.createElement('tr')
                  trn.setAttribute("id","tr"+e.itemId)
                  tbody.append(trn)
                  const obj = {ids: [e.itemId]}
                  myJSON = JSON.stringify(obj);
                  var xhr = new XMLHttpRequest();
                  xhr.open("POST", "http://localhost:3000/api/transactions/ids", true);
                  xhr.setRequestHeader('Content-Type', 'application/json');

                  xhr.responseType = 'json';
                  xhr.onload = function () {
                  if (xhr.readyState === xhr.DONE) {
                      if (xhr.status === 200) {
                          resp = xhr.response
                          resp.map(ee => {
                            itemid = ee.itemId
                            currTR = document.getElementById("tr"+itemid)
                            console.log("td1"+itemid + " = "+document.getElementById("td1"+itemid))

                            if(document.getElementById("td1"+itemid) == null){
                              td1 = document.createElement('td')
                              td1.setAttribute("id","td1"+itemid)
                              td1.innerHTML = itemid
                              currTR.append(td1)
                            }
                            else{
                              td1.innerHTML = itemid
                            }

                            if(ee.txType == 1){
                              status = "No buyer"
                            }
                            else if (ee.txType == 2) {
                              status = "Buyer bidded " + ee.price + "€. Waiting for approval."
                            }
                            else if (ee.txType == 3){
                              status = "Item sold"
                            }
                            else{
                              status = "Unknown"
                            }
                            if(document.getElementById("td2"+itemid) == null){
                              td2 = document.createElement('td')
                              td2.setAttribute("id","td2"+itemid)
                              td2.innerHTML = status
                              currTR.append(td2)
                            }
                            else{
                              td2.innerHTML = status
                            }



                            if(document.getElementById("td3"+itemid) == null) {
                              td3 = document.createElement('td')
                              td3.setAttribute("id","td3"+itemid)
                              td3.innerHTML = "WIP"
                              currTR.append(td3)
                            }
                            else{
                              td3.innerHTML = "WIP"
                            }

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
