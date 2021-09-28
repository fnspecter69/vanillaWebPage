document.getElementById("hello").innerHTML = "HelloWorld";
const newDiv = document.createElement("div");

var baseurl = "http://localhost:8080";
var nameurl = "/name";

function httpGetAsync(url) {
  var xmlHttp = new XMLHttpRequest();


  xmlHttp.open("GET", url, true); // true for asynchronous
  //xmlHttp.setRequestHeader("Access-Control-Allow-Origin", baseurl);
  xmlHttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log("success");
      const getName = document.createTextNode(xmlHttp.responseText);
      newDiv.appendChild(getName);
      console.log(xmlHttp.responseText);
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

const form = document.getElementById("emailForm");

form.addEventListener('submit', (event) => {
    console.log("form submited");
});
