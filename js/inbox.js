var baseurl = "http://localhost:8080";
var getAllEmailsUrl = "/emails";
var deleteButton = document.createElement('button');
deleteButton.innerHTML = "delete";
var content = document.getElementById("inboxContent");

function displayAllEmail() {
  console.log("displayAllEmail");
  var url = baseurl + getAllEmailsUrl;
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.open("GET", url, true);
  xmlHttp.onreadystatechange = function() {
    var emailDiv = document.createElement("div");
    var list = document.createElement('ul');
    list.setAttribute("id", "inboxList");
    console.log(this.status);
    if (this.readyState == 4 && this.status == 302) {
      console.log("success get all emails");
      content.textContent = "";
      const response = JSON.parse(xmlHttp.responseText);
      response.forEach((email, i) => {
        var liElem = document.createElement("li");

        var checkboxElem = document.createElement("input");
        checkboxElem.setAttribute("type", "checkbox");
        checkboxElem.setAttribute("value", email.id);
        var emailLabel = document.createElement("label");
        emailLabel.textContent = email.subject;
        emailLabel.style.backgroundColor = "grey";
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
      content.textContent = "Your inbox is empty";
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

// Get the modal
var modal = document.getElementById("editModal");

var checkBox = document.querySelectorAll("input[type='checkbox']:checked");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  console.log(event);
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function update() {
  modal.style.display = "none";
}

function edit() {
  var checked =
    Array.prototype.slice.call(document.querySelectorAll("input[type='checkbox']:checked"));

  if (checked.length == 1) {
    console.log("one selected");
    var inputid = checked[0].value;
    var findUrl = baseurl + "/email/" + inputid;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", findUrl, true);

    xmlHttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 302) {
        console.log("email found");
        const response = JSON.parse(xmlHttp.responseText);
      }
    }

    xmlHttp.send(null);
  }
  modal.style.display = "block";
}

window.onload = function () {
  displayAllEmail();
}
