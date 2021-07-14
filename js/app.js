document.getElementById("hello").innerHTML = "HelloWorld";

var baseurl = "https://localhost:8080";
var nameurl = "/name";

function httpGetAsync(url) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  }
  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
  xmlHttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xmlHttp.responseText);
    }
  }
  console.log("end ajax call");
}

window.onload = function () {
  var url = baseurl + nameurl;
  httpGetAsync(url);
}
