var baseurl = "http://localhost:8080";
var getAllEmailsUrl = "/emails";
var deleteButton = document.createElement('button');
deleteButton.innerHTML = "delete";

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
        var checkboxElem = document.createElement("input");
        checkboxElem.setAttribute("type", "checkbox");
        checkboxElem.setAttribute("for", email.id);
        var emailLabel = document.createElement("label");
        emailLabel.textContent = email.from;
        console.log(email);
        console.log(emailLabel);
        liElem.appendChild(checkboxElem);
        liElem.appendChild(emailLabel);
        list.appendChild(liElem);
      });
      console.log(list);
      var inbox = document.querySelector('#inboxContent');
      inbox.appendChild(list);

    }
  }
  xmlHttp.send(null);
}

function deleteEmail(){
  console.log("delete click");
}
window.onload = function () {
  displayAllEmail();
}
