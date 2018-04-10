function Publicher { //Tester rundt//
  var fieldValue = document.getElementById("opgavetitel").value
  localStorage.setItem('opgavetitel', fieldValue);
}

function load() { { //Tester rundt//
  var storageValue = localStorage.getItem("opgavetitel");
}

// local storage

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

// Laver en søgebar -> https://www.youtube.com/watch?v=3NG8zy0ywIk <-
const search = document.forms['search'].querySelector('input');
search.addEventListener('keyup',function(e){
  const term = e.target.value.toLowerCase();
  const forums = list.getElementByTagName(li);
  Array.from(forums).forEach(function(forum){
    const title = forums.firstElementChild.textContent; //titlen af et forum
    if(title.toLowerCase().indexOf(term) !=-1){ //Metoder der tjekker
      forum.style.display = 'block';
    } else {v
      forum.style.display = 'none';
    }
  })
})
