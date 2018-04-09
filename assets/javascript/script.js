function Publicher { <!--Tester rundt-->
  var fieldValue = document.getElementById("opgavetitel").value
  localStorage.setItem('opgavetitel', fieldValue);
}

function load() { { <!--Tester rundt-->
  var storageValue = localStorage.getItem("opgavetitel");
}

<!--Dette er en local storage funktion-->

function getData() {
  var name = document.getElementById("opgavetitel").value;
  var name = document.getElementById("emneord").value;
  var name = document.getElementById("lektionslængde").value;
  var name = document.getElementById("beskrivelse").value;

  console.log("opgavetitel");

  alert("Name: " + opgavetitel + emneord + lektionslængde + beskrivelse);

  document.getElementById("succesbox").style.display="block";
  document.getElementById("succesbox").innerHTML="Welcome: " + name + " You have now logged in succesfully"
}
