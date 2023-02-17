function showInput() {
  document.getElementById("extraInput").style.display = "block";
}

function hideInput() {
  document.getElementById("extraInput").style.display = "none";
}

function calcola() {
  var services = document.getElementById("services").value;
  var extra = document.getElementById("domain");
  var maintenance1month = document.getElementById("1month");
  var maintenance6months = document.getElementById("6months");
  var maintenance1year = document.getElementById("1year");
  var result = document.getElementById("result");
  var NameRequired = document.getElementById("NameRequired");
  var LastNameRequired = document.getElementById("LastNameRequired");
  var DateRequired = document.getElementById("DateRequired");

  if (NameRequired.value === "" || LastNameRequired.value === "" || DataRequired === "") {
    // il campo è vuoto
    if (NameRequired.value === "") {
      result.innerText = "Name required";
    }
    if (LastNameRequired.value === "") {
      result.innerText = "Last name required";
    }
    if (DataRequired.value === "") {
        result.innerText = "Data required";
    }
  } else {
    // il campo contiene un valore

    var valore = 0;
    switch (services) {
      case "static":
        valore += 50;
        break;
      case "cms":
        valore += 100;
        break;
      case "ecom":
        valore += 150;
        break;
      case "management":
        valore += 200;
        break;
      case "iot":
        valore += 250;
        break;
      case "ia":
        valore += 200;
        break;
      default:
        result.innerText = "chose a service";
        return;
    }

    if (extra.value === "yes" && extra.checked) {
      valore += 50;
    }
    if (maintenance1month.checked) {
      valore += 50;
    }
    if (maintenance6months.checked) {
      valore += 100;
    }
    if (maintenance1year.checked) {
      valore += 200;
    }
    result.innerText = "The price is: " + valore + "€";
  }
}
