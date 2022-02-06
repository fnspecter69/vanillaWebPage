document.getElementById("hello").innerHTML = "Test Page";
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
}

window.onload = function () {
  var url = baseurl + nameurl;
  httpGetAsync(url);
}

function sendEmail() {
  var url = baseurl + emailurl;
  var to = document.getElementById('to').value;
  var from = document.getElementById('from').value;
  var body = document.getElementById('body').value;
  var subject = document.getElementById('subject').value;
  const xhttp = new XMLHttpRequest();
  var emailData = JSON.stringify({ "to": to, "from": from, "body": body , "subject": subject});

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
      alert("email has been sent");
    }
  }
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Accept", "application/json")
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(emailData);
}
