//Vi opretter en opgave
function opretopgave() {
  var opgavetitel = document.getElementById('opgavetitel').value;
  var emneord = document.getElementById('emneord').value;
  var lektionslængde = document.getElementById('lektionslængde').value;
  var beskrivelse = document.getElementById('beskrivelse').value;
  var klassetrin = document.getElementById('klassetrin').value;

//Vi validerer om alle variabler kommer med info
  if (opgavetitel && emneord && lektionslængde && beskrivelse && klassetrin){
    var opgavearray = { //venstre siden af colon af navnet, og højresiden er værdien
      opgavetitel : opgavetitel,
      emneord : emneord,
      lektionslængde : lektionslængde,
      beskrivelse : beskrivelse,
      klassetrin : klassetrin
    };
    setglobalvalue(opgavearray); //Sender informationerne videre (altså indholdet i opgavearray) til global funktionen
  } else {
    console.log("Der er noget som mangler");
  }
}

//Laver en global handler, der håndterer local host for at kunne oprette opslag
function setglobalvalue(obj) {
  obj = obj || null; // Vi sætter objektet til at være et objekt eller null, da det er lettere at arbejde med i stedet for undefined.
  if(obj !== null){ //Data må ikke Wvære lige med null, sikrer at data er sendt igennem obj
    var getlocalstorage = localStorage.getItem("opgave"); //Her er opgave filnavnet i localstorage
    var mylocal = [];
    if (getlocalstorage !== null){
      var mylocal = JSON.parse(getlocalstorage);
    }
    mylocal.push(obj);
    var json = JSON.stringify(mylocal);
    localStorage.setItem("opgave",json);
    visopgaver(mylocal); //det som vi overskrider ved localstorage, vises her, da vi sender objektet videre.
  }
}

//Vi ønsker at vise det visuelt på hjemmesiden
function visopgaver(obj) {

  /*
  2 nedenstående linjer, nulstiller det som er i divs,
   og sikrer sig at det nye  kommer med, samt det som var der før
   */
  var getdivlocation = document.getElementById("debatvisning");
  getdivlocation.innerHTML = "";

  obj = obj || null; // Vi sætter objektet til at være et objekt eller null, da det er lettere at arbejde med i stedet for undefined.
  if(obj == null) {
    var getlocalstorage = localStorage.getItem("opgave");
    var obj = JSON.parse(getlocalstorage); //Henter local storage hvis objektet ikke eksiterer og overskriver den
  }
  if(typeof obj !== "undefined") { //typeof viser hvilken type af objekt det er, og hvis det ikke findes vil den altid være undefined da det ikke er klacificeret som noget. Sådan sikrer vi os at vores objekt alt er noget og ikek ingenting.
    obj.forEach(function(arg,ii){
      if (arg.opgavetitel && arg.emneord && arg.lektionslængde && arg.beskrivelse && arg.klassetrin) {
        var itemBox = document.createElement("div"); // Man opretter div

        var itemBoxTitle = document.createElement("h2"); //opretter h2
        itemBoxTitle.innerHTML = arg.opgavetitel;
        itemBox .appendChild(itemBoxTitle);

        var itemBoxSub = document.createElement("span"); //opretter span
        itemBoxSub.innerHTML = arg.emneord;
        itemBox.appendChild(itemBoxSub);

        var itemBoxClass= document.createElement("span"); //opretter span
        itemBoxClass.innerHTML = arg.lektionslængde;
        itemBox.appendChild(itemBoxClass);

        var itemBoxTime= document.createElement("span"); //opretter span
        itemBoxTime.innerHTML = arg.klassetrin;
        itemBox.appendChild(itemBoxTime);

        var itemBoxDesc = document.createElement("p"); //opretter paragraf
        itemBoxDesc .innerHTML = arg.beskrivelse;
        itemBox.appendChild(itemBoxDesc);

        getdivlocation.appendChild(itemBox); //Her viser vi det visuelt
      } else {
        console.log("Der er sket en fejl ved et af argumenterne ved if statement");
      }
    });
  }
}

/*
  Her laver vi funktionen til publisher knappen.
*/
window.onload = function()
{
  visopgaver();
  var mybutton = document.getElementById("detteharandreikke");
  mybutton.addEventListener("click",function(){
    opretopgave();
  });
}

//Funktion der kan redigere ens profiloplysninger
//function redigeroplysninger {
//}

//Funktion der kan fjerne en opgave
//function fjernopgave() {
//}

//Funktion der kan sortere mellem ens opslag
//function søgopgave() {
//}


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
