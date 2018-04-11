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
function submitblog(text, time, important) {

}
