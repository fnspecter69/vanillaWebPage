document.getElementById("hello").innerHTML = "HelloWorld";
const newDiv = document.createElement("div");

var baseurl = "http://localhost:8080";
var nameurl = "/name";
var emailurl = "/email"

function httpGetAsync(url) {
  var xmlHttp = new XMLHttpRequest();


  xmlHttp.open("GET", url, true); // true for asynchronous
  //xmlHttp.setRequestHeader("Access-Control-Allow-Origin", baseurl);
  xmlHttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log("success");
      const getName = document.createTextNode(xmlHttp.responseText);
      newDiv.appendChild(getName);
      document.body.insertBefore(newDiv, document.getElementById("hello"));
    } else {
      console.log("error");
    }
  }
  xmlHttp.send(null);
  console.log("end ajax call");
}

window.onload = function () {
  var url = baseurl + nameurl;
  httpGetAsync(url);
}

function sendEmail() {
  console.log(send email);
  var to = document.getElementById('to');
  var from = document.getElementById('from');
  var body = document.getElementById('body');
  var url = baseurl + emailurl;
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json");
  var emailData = JSON.stringify({ "to": to.value, "from": from.value, "body": body.value });
  xhttp.send(emailData);
}
