var baseurl = "http://localhost:8080";
var getAllEmailsUrl = "/emails";

function displayAllEmail() {
  console.log("displayAllEmail");
  var url = baseurl + getAllEmailsUrl;
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.open("GET", url, true);
  xmlHttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 302) {
      console.log("success get all emails");
      const response = JSON.parse(xmlHttp.responseText);
      response.forEach((email, i) => {
        console.log(email);
      });

    }
  }
  xmlHttp.send(null);
}
window.onload = function () {
  displayAllEmail();
}
