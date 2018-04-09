function Publicher {
  var fieldValue = document.getElementById("opgavetitel").value
  localStorage.setItem('opgavetitel', fieldValue);
}

function load() {
  var storageValue = localStorage.getItem("opgavetitel");
}
