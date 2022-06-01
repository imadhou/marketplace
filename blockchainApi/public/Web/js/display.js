/*!
* Start Bootstrap - Shop Item v5.0.5 (https://startbootstrap.com/template/shop-item)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-item/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project


function cancel_item(itemid, txtype){
  if(txtype != 4 && txtype != 5){
    mail = document.getElementById("mail").value
    const obj = {from: mail, to: "", itemId: itemid.toString(), price: "0", txType: "4"};
    console.log(obj)
    myJSON = JSON.stringify(obj);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/api/transactions/", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(myJSON);


    xhr.responseType = 'json';

    xhr.onload = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                setTimeout(() => { display_seller(); }, 5000);
            }
        }
    };
  }
}

function cancel_item_buyer(itemid, txtype){
  if(txtype != 4 && txtype != 5){
    mail = document.getElementById("mail").value
    const obj = {from: mail, to: "", itemId: itemid.toString(), price: "0", txType: "5"};
    console.log(obj)
    myJSON = JSON.stringify(obj);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/api/transactions/", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(myJSON);


    xhr.responseType = 'json';

    xhr.onload = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                setTimeout(() => { display_buyer(); }, 5000);
            }
        }
    };
  }
}

function accept_item(itemid, txtype, buyer, price){
  console.log(buyer)
  if(txtype == 2){
    mail = document.getElementById("mail").value



    const obj = {from: buyer, to: mail, itemId: itemid.toString(), price: price, txType: "3"};
    console.log(obj)
    myJSON = JSON.stringify(obj);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/api/transactions/", true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.responseType = '';

    xhr.onload = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                setTimeout(() => { display_seller(); }, 5000);
            }
        }
    };
    xhr.send(myJSON);

  }
}

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
                            else if(ee.txType == 4){
                              status = "Cancelled by seller"
                            }
                            else if(ee.txType == 5){
                              status = "Cancelled by buyer"
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
                              cancel = document.createElement("Button")
                              cancel.setAttribute("onclick","cancel_item("+itemid+","+ee.txType+")")
                              cancel.setAttribute("id","cancel_button"+itemid)
                              cancel.setAttribute("txtype",ee.txType)
                              cancel.innerHTML = "Cancel product"
                              td3.append(cancel)
                              accept = document.createElement("Button")
                              accept.setAttribute("onclick","accept_item("+itemid+","+ee.txType+","+"'"+ee.from+"'"+","+ee.price+")")
                              accept.setAttribute("id","accept_button"+itemid)
                              accept.setAttribute("txtype",ee.txType)
                              accept.innerHTML = "Accept Bid"
                              td3.append(accept)




                              currTR.append(td3)
                            }
                            else{
                                cancel = document.getElementById("cancel_button"+itemid)
                                cancel.setAttribute("id","cancel_button"+itemid)
                                cancel.setAttribute("onclick","cancel_item("+itemid+","+ee.txType+")")
                                cancel.setAttribute("txtype",ee.txType)
                                td3.append(cancel)
                                accept = document.getElementById("accept_button"+itemid)
                                accept.setAttribute("onclick","accept_item("+itemid+","+ee.txType+","+"'"+ee.from+"'"+","+ee.price+")")
                                accept.setAttribute("id","accept_button"+itemid)
                                accept.setAttribute("txtype",ee.txType)
                                accept.innerHTML = "Accept Bid"
                                td3.append(accept)



                            }



                          })
                          if(document.getElementById("cancel_button"+e.itemId)&& (document.getElementById("cancel_button"+e.itemId).getAttribute("txtype") == 4 || document.getElementById("cancel_button"+e.itemId).getAttribute("txtype") == 5 || document.getElementById("cancel_button"+e.itemId).getAttribute("txtype") == 3)){
                            while(document.getElementById("cancel_button"+e.itemId)){
                              document.getElementById("cancel_button"+e.itemId).remove()
                            }
                          }
                          if(document.getElementById("accept_button"+e.itemId) && document.getElementById("accept_button"+e.itemId).getAttribute("txtype") != 2 ){
                            console.log("zzz"+e.itemId)
                            while(document.getElementById("accept_button"+e.itemId)){
                              document.getElementById("accept_button"+e.itemId).remove()
                            }

                          }

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

function display_buyer(){
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
        values: [2,3],
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
                              status = "bug 1"
                            }
                            else if (ee.txType == 2) {
                              status = "Bid sent : " + ee.price + "€. Waiting for approval."
                            }
                            else if (ee.txType == 3){
                              status = "Item bought"
                            }
                            else if(ee.txType == 4){
                              status = "Cancelled by seller"
                            }
                            else if(ee.txType == 5){
                              status = "Cancelled by buyer"
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
                              cancel = document.createElement("Button")
                              cancel.setAttribute("onclick","cancel_item_buyer("+itemid+","+ee.txType+")")
                              cancel.setAttribute("id","cancel_button"+itemid)
                              cancel.setAttribute("txtype",ee.txType)
                              cancel.innerHTML = "Cancel product"
                              td3.append(cancel)




                              currTR.append(td3)
                            }
                            else{
                                cancel = document.getElementById("cancel_button"+itemid)
                                cancel.setAttribute("id","cancel_button"+itemid)
                                cancel.setAttribute("onclick","cancel_item_buyer("+itemid+","+ee.txType+")")
                                cancel.setAttribute("txtype",ee.txType)
                                td3.append(cancel)



                            }

                            //CODER BOUTONS ACCEPTER REFUSER ACHAT
                          })
                          if(document.getElementById("cancel_button"+e.itemId)&& (document.getElementById("cancel_button"+e.itemId).getAttribute("txtype") == 4 || document.getElementById("cancel_button"+e.itemId).getAttribute("txtype") == 5 || document.getElementById("cancel_button"+e.itemId).getAttribute("txtype") == 3)){
                            document.getElementById("cancel_button"+e.itemId).remove()
                          }

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
