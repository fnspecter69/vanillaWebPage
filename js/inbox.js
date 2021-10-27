var baseurl = "http://localhost:8080";
var getAllEmailsUrl = "/emails";

function displayAllEmail() {
  console.log("displayAllEmail");
  var url = baseurl + getAllEmailsUrl;
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.open("GET", url, true);
  xmlHttp.onreadystatechange = function() {
    var emailDiv = document.createElement("div");
    var list = document.createElement('ul');
    if (this.readyState == 4 && this.status == 302) {
      console.log("success get all emails");
      const response = JSON.parse(xmlHttp.responseText);
      response.forEach((email, i) => {
        var liElem = document.createElement("li");
        console.log(email);
        console.log(email.from);
        liElem.textContent = email.from;
        console.log(liElem);
        list.appendChild(liElem);
      });
      console.log(list);
      var inbox = document.querySelector('#inboxContent');
      inbox.appendChild(list);
      //document.body.insertAfter(inbox, document.getElementById("inboxContent"));

    }
  }
  xmlHttp.send(null);
}
window.onload = function () {
  displayAllEmail();
}
