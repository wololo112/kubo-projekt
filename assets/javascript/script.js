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

//Oprette et blogindlæg
var opgavetitel = document.getElementById("");
var emneord = document.getElementById("");
var lektionslængde = document.getElementById("");
var beskrivelse = document.getElementById("");

//Alertbox til registrering af newsletters
function validation() {
  if (document.getElementById("nyhedsbrev").value == "") {
    alert("Du har ikke indtastet nogen emailadresse");
    return false;
  } else {
    alert("Du er nu blevet tilmeldt nyhedsbrevet");
    return true;
  }
}
