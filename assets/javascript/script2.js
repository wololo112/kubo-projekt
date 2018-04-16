

//Vi opretter en opgave
function opretkommentar() {
  var kommentarfelt = document.getElementById('kommentarfelt').value;
  var kommentarområde = document.getElementById('kommentarområde').value;

//Vi validerer om alle variabler kommer med info
  if (kommentarfelt && kommentarområde){
    var kommentararray = { //venstre siden af colon af navnet, og højresiden er værdien
      kommentarfelt : kommentarfelt,
      kommentarområde : kommentarområde,
    };
    setglobalvalue2(kommentararray); //Sender informationerne videre (altså indholdet i opgavearray) til global funktionen
  } else {
    console.log("Der er noget som mangler ved kommentararray");
  }
}

//Laver en global handler, der håndterer local host for at kunne oprette opslag
function setglobalvalue2(obj2) {
  obj2 = obj2 || null; // Vi sætter objektet til at være et objekt eller null, da det er lettere at arbejde med i stedet for undefined.
  if(obj2 !== null){ //Data må ikke Wvære lige med null, sikrer at data er sendt igennem obj
    var getlocalstorage2 = localStorage.getItem("opgave2"); //Her er opgave filnavnet i localstorage
    var mylocal2 = [];
    if (getlocalstorage2 !== null){
      var mylocal2 = JSON.parse(getlocalstorage2);
    }
    mylocal2.push(obj2);
    var json2 = JSON.stringify(mylocal2);
    localStorage.setItem("opgave2",json2);
    viskommentar(mylocal2); //det som vi overskrider ved localstorage, vises her, da vi sender objektet videre.
  }
}

//Vi ønsker at vise det visuelt på hjemmesiden
function viskommentar(obj2=null) {

  /*
  2 nedenstående linjer, nulstiller det som er i divs,
   og sikrer sig at det nye  kommer med, samt det som var der før
   */
  var getdivlocation2 = document.getElementById("kommentarvisning");
  getdivlocation2.innerHTML = "";

  obj2 = obj2 || null; // Vi sætter objektet til at være et objekt eller null, da det er lettere at arbejde med i stedet for undefined.
  if(obj2 == null) {
    var getlocalstorage2 = localStorage.getItem("opgave2");
    var obj2 = JSON.parse(getlocalstorage2); //Henter local storage hvis objektet ikke eksiterer og overskriver den
  }
  if(typeof obj2 !== "undefined") { /*typeof viser hvilken type af objekt det er, og hvis det ikke findes vil den altid være undefined da det ikke er klacificeret som noget. Sådan sikrer vi os at vores objekt alt er noget og ikek ingenting.*/
    obj2.forEach(function(arg,ii){
      if (arg.kommentarfelt && arg.kommentarområde) {
        var itemBox2 = document.createElement("div"); // Man opretter første div
        itemBox2.class = 'wrapper';

        var itemBoxTitle2 = document.createElement("button"); //opretter h2
        itemBoxTitle2.innerHTML = arg.kommentarområde;
        itemBoxTitle2.class = 'accordian';
        itemBox2.appendChild(itemBoxTitle2);

        var itemBox3 = document.createElement("div");
        itemBox3.class = 'panel';

        var itemBoxDesc2 = document.createElement("p"); //opretter paragraf
        itemBoxDesc2.innerHTML = arg.kommentarfelt;
        itemBoxDesc2.class = 'content';
        itemBox2.appendChild(itemBoxDesc2);

        var itemButtonSvarPåDenneTråd = document.createElement("button"); //opretter knap
        itemButtonSvarPåDenneTråd.innerHTML = "Svar på denne tråd";
        itemBox2.appendChild(itemButtonSvarPåDenneTråd);

        getdivlocation2.appendChild(itemBox2); //Her viser vi det visuelt
      } else {
        console.log("Der er sket en fejl ved et af argumenterne ved if statement");
      }
    });
  }
}

/*
  Her laver vi funktionen til publisher knappen.
*/

window.addEventListener("load",function()
{
  viskommentar();
  var mybutton2 = document.getElementById("slåkommentarop");
  mybutton2.addEventListener("click",function(){
    opretkommentar();
  });
});

//Prøver at lave noget accordian
var a = document.getElementsByClassName("accordian");

for(var i = 0; i<a.length; i++){
  a[i].onclick = function(){
    var s = this.nextElementSibling;
    if(s.style.display === "block") {
      s.style.display = "none";
    } else {
      s.style.display = "block";
    }
  }
}
