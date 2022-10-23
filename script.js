var url =
  "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";
let infocontent = document.getElementById("info-content");
let tablebody = document.getElementById("table-body");


let content = new XMLHttpRequest();
content.open("GET", url, true);
content.send();
function showTable(id, firstname, lastname, email, phone, address, description) {
  const trow = document.createElement("tr");
  trow.classList.add("data-row");
  trow.id = id;
  trow.addEventListener("click", function () {
    let element = document.getElementsByClassName("data-row");
    for (let i = 0; i < element.length; i++) {
      element[i].style.backgroundColor = "white";
    }
    document.getElementById(id).style.backgroundColor = "lightseagreen";
    let innerName =
      "<div><b>User selected:</b>" + firstname + " " + lastname + "</div>";
    let innerDescription =
      "<div><b> Description: </b><textarea cols='50' rows='5' readonly>" +
      description +
      "</textarea></div >";
    let street = "<div><b>Address:</b>" + address["streetAddress"] + "</div>";
    let city = "<div><b>City:</b>" + address["city"] + "</div>";
    let state = "<div><b>State:</b>" + address["state"] + "</div>";
    let zip = "<div><b>Zip:</b>" + address["zip"] + "</div>";
    let view = innerName + innerDescription + street + city + state + zip;

    infocontent.innerHTML = view;
    infocontent.style.display = "block";
  });
  column1 = document.createElement("td");
  column1.classList.add("col1");
  column1.innerText = id;
  column2 = document.createElement("td");
  column2.classList.add("col2");
  column2.innerText = firstname;
  column3= document.createElement("td");
  column3.classList.add("col3");
  column3.innerText = lastname;
  column4 = document.createElement("td");
  column4.classList.add("col4");
  column4.innerText = email;
  column5 = document.createElement("td");
  column5.classList.add("col5");
  column5.innerText = phone;
  trow.appendChild(column1);
  trow.appendChild(column2);
  trow.appendChild(column3);
  trow.appendChild(column4);
  trow.appendChild(column5);

  tablebody.appendChild(trow);
}

content.onreadystatechange = function () {
  if (content.readyState == 4) {
    const response = JSON.parse(content.responseText);
   
    for (i = 0; i < response.length; i++) {
      firstname = response[i]["firstName"];
      id = response[i]["id"];
      Email = response[i]["email"];
      lastname = response[i]["lastName"];
      address = response[i]["address"];
      description = response[i]["description"];
      phone = response[i]["phone"];
      showTable(id, firstname, lastname, Email, phone, address, description);
    }
  }
};


const searchingElement = document.getElementsByClassName("data-row");
const search = document.getElementById("search-box");


search.addEventListener("input", function () {
  content1 = search.value;
  for (let i = 0; i < searchingElement.length; i++) {
    name1 = searchingElement[i].getElementsByClassName("col2")[0].innerText;
    name1 = name1.toLowerCase();
    if (!name1.includes(content1)) {
      searchingElement[i].style.display = "none";
    } else {
      searchingElement[i].style.display = "";
    }
  }
});
