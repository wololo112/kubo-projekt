function Publicher { <!--Tester rundt-->
  var fieldValue = document.getElementById("opgavetitel").value
  localStorage.setItem('opgavetitel', fieldValue);
}

function load() { { <!--Tester rundt-->
  var storageValue = localStorage.getItem("opgavetitel");
}
