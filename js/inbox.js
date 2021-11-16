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
    list.setAttribute("id", "inboxList");

    if (this.readyState == 4 && this.status == 302) {
      console.log("success get all emails");
      const response = JSON.parse(xmlHttp.responseText);
      response.forEach((email, i) => {
        var liElem = document.createElement("li");

        var checkboxElem = document.createElement("input");
        checkboxElem.setAttribute("type", "checkbox");
        checkboxElem.setAttribute("value", email.id);
        var emailLabel = document.createElement("label");
        emailLabel.textContent = email.from;
        liElem.setAttribute("id", email.id);
        liElem.appendChild(checkboxElem);
        liElem.appendChild(emailLabel);
        list.appendChild(liElem);
      });
      console.log(list);
      var inbox = document.querySelector('#inboxContent');
      inbox.appendChild(list);

    } else {
      console.log("no new email");
    }
  }
  xmlHttp.send(null);
}

function deleteEmail(){
  console.log("delete click");
  var url = baseurl + "/email/delete/";
  var xmlHttp = new XMLHttpRequest();
  var list = document.getElementById("inboxList");
  var checked =
    Array.prototype.slice.call(document.querySelectorAll("input[type='checkbox']:checked"));
  console.log(checked);
  checked.forEach((item, i) => {
    var id = item.value;
    console.log(id);
    var delUrl = url + id;
    xmlHttp.open("DELETE", delUrl, true);

    xmlHttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 302) {
        console.log("email deleted");
        let li = document.getElementById(id);
        list.removeChild(li);
      }
    }
  });

  xmlHttp.send(null);

}
window.onload = function () {
  displayAllEmail();
}
