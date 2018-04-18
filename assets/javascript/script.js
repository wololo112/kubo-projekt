//Vi opretter en funktion her der kan oprette en opgave, uden at den bliver vist endnu.
function opretopgave() {
  var opgavetitel = document.getElementById('opgavetitel').value; //Man opretter variabler for opgavetitel, hvor man tager dets ID's værdi
  var emneord = document.getElementById('emneord').value; //Man opretter variabler for emneord, hvor man tager dets ID's værdi
  var lektionslængde = document.getElementById('lektionslængde').value; //Man opretter variabler for lektionslængde, hvor man tager dets ID's værdi
  var beskrivelse = document.getElementById('beskrivelse').value; //Man opretter variabler for beskrivelse, hvor man tager dets ID's værdi
  var klassetrin = document.getElementById('klassetrin').value; //Man opretter variabler for klassetrin, hvor man tager dets ID's værdi

//Vi validerer om alle variabler kommer med info
  if (opgavetitel && emneord && lektionslængde && beskrivelse && klassetrin){
    var opgavearray = { //venstre siden af colon af navnet, og højresiden er værdien - man opretter et array
      opgavetitel : opgavetitel,
      emneord : emneord,
      lektionslængde : lektionslængde,
      beskrivelse : beskrivelse,
      klassetrin : klassetrin
    };
    console.log("det virker");
    setglobalvalue(opgavearray); //Sender informationerne videre (altså indholdet i opgavearray) til global funktionen
  } else {
    console.log("Der er noget som mangler");
  }
}

//Vi opretter en funktion her der kan oprette en kommentar, uden at den bliver vist endnu.
function opretkommentar() {
  var skrivkommentar = document.getElementById('skrivkommentar').value; //opretter variabel for at skrive en kommentar ud fra ID'et
  var kommentarområde = document.getElementById('kommentarområde').value; //opretter variabel for at skrive en kommentarområde ud fra ID'et

  if(skrivkommentar && kommentarområde && slåop) { //venstre siden af colon af navnet, og højresiden er værdien - man opretter et array
    var opslagsid = window.location.hash.substr(1); //Man tager andet bogstav på substring og frem
    var gammelkommentar = JSON.parse(localStorage.getItem("kommentar_" + opslagsid));
    var kommentar = { //opretter array
      kommentar : skrivkommentar,
      område : kommentarområde
    };
    if (gammelkommentar != null){
        gammelkommentar.push(kommentar);
    } else {
        var gammelkommentar = [];
        gammelkommentar.push(kommentar);
    }
    localStorage.setItem("kommentar_" + opslagsid, JSON.stringify(gammelkommentar)); //Man benytter stringify når man skal hente data til og fra en side.
  } else {
    console.log("Der er noget fra kommentararray der mangler");
  }
}

//Her viser vi kommentaren
function viskommentar () {
  var opslagsid = window.location.hash.substr(1); //Man tager andet bogstav på substring og frem
  var allekommentarer = JSON.parse(localStorage.getItem("kommentar_" + opslagsid)); //JSON.parse benyttes til at lave data om til et objekt
  if (allekommentarer != null) { // != er ikke lig med

    document.getElementById("kommentarsporgsmal").innerHTML = ""; //Man hentyder inner HTML ID'et kommentarsporgsmal og ændrer det til at være tomt
    document.getElementById("kommentarandringer").innerHTML = ""; //Man hentyder inner HTML ID'et kommentarandringer og ændrer det til at være tomt
    document.getElementById("kommentarandet").innerHTML = ""; //Man hentyder inner HTML ID'et kommetarandet og ændrer det til at være tomt

    allekommentarer.forEach(function(kom,ki){ //
      var kommentar = kom.kommentar || "";
      var område = null;
      if (kom.område == "opgaven") {
        område = document.getElementById("kommentarsporgsmal");
        var områdenavn = "kommentarsporgsmal";
      } else if (kom.område == "ændringer"){
        område = document.getElementById("kommentarandringer");
        var områdenavn = "kommentarandringer";
      } else if (kom.område == "andet"){
        område = document.getElementById("kommentarandet");
        var områdenavn = "kommentarandet";
      } else {
        console.log ("ingen område");
      }
      if (område != null) {
        var nykommentar = document.createElement("p");
        nykommentar.setAttribute("class", "content");
        nykommentar.innerHTML = kommentar;
        område.appendChild(nykommentar);
      }
    });
  }
}


//Laver en global handler, der håndterer local host for at kunne oprette opslag
function setglobalvalue(obj) {
  obj = obj || null; // Vi sætter objektet til at være et objekt eller null, da det er lettere at arbejde med i stedet for undefined.
  if(obj !== null){ //Data må ikke være lige med null, sikrer at data er sendt igennem obj
    var getlocalstorage = localStorage.getItem("opgave"); //Her er opgave filnavnet i localstorage
    var mylocal = []; //Et tomt array
    if (getlocalstorage !== null){ //
      var mylocal = JSON.parse(getlocalstorage);
    }
    mylocal.push(obj);
    var json = JSON.stringify(mylocal);
    localStorage.setItem("opgave",json);
    visopgaver(mylocal); //det som vi overskrider ved localstorage, vises her, da vi sender objektet videre.
  }
}

//Vi ønsker at vise det visuelt på hjemmesiden ift. de debatter man opretter
function visopgaver(obj=null) {

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
  if(typeof obj !== "undefined" && obj != null) { /*typeof viser hvilken type af objekt det er, og hvis det ikke findes vil den altid være undefined da det ikke er klacificeret som noget. Sådan sikrer vi os at vores objekt alt er noget og ikek ingenting.*/
    obj.forEach(function(arg,ii){
      if (arg.opgavetitel && arg.emneord && arg.lektionslængde && arg.beskrivelse && arg.klassetrin) {
        var itemBox = document.createElement("div"); // Man opretter div

        var itemBoxTitle = document.createElement("h2"); //opretter h2
        itemBoxTitle.innerHTML = arg.opgavetitel;
        itemBox.appendChild(itemBoxTitle);

        var itemBoxDesc = document.createElement("p"); //opretter paragraf
        itemBoxDesc.innerHTML = arg.beskrivelse;
        itemBox.appendChild(itemBoxDesc);

        var itemBoxSub = document.createElement("span"); //opretter span
        itemBoxSub.innerHTML = "Emneord: " + arg.emneord;
        itemBox.appendChild(itemBoxSub);

        var itemBoxClass= document.createElement("span"); //opretter span
        itemBoxClass.innerHTML = "Lektionslængde: " + arg.lektionslængde;
        itemBox.appendChild(itemBoxClass);

        var itemBoxTime= document.createElement("span"); //opretter span
        itemBoxTime.innerHTML = "Klassetrin: " + arg.klassetrin;
        itemBox.appendChild(itemBoxTime);

        var itemButtonReadMore = document.createElement("a"); //Opretter et href link, der fører videre til ens matematikopslag side
        itemButtonReadMore.setAttribute("href", "./matematikopslag.html#" + ii);
        itemButtonReadMore.innerHTML = "Læs mere";
        itemBox.appendChild(itemButtonReadMore);

        getdivlocation.appendChild(itemBox); //Her viser vi det visuelt
      } else {
        console.log("Der er sket en fejl ved et af argumenterne ved if statement");
      }
    });
  }
}

// Man ønsker man at vise den enkelte opgave
function visenkeltopgave(id=null) {
  if (id == null) {
    console.log("mangler id");
  } else {
    var getall = JSON.parse(localStorage.getItem("opgave"));
    if (getall.length >0) {
      if (typeof getall[id] == "object") {
        var arg = getall[id];
        if (arg.opgavetitel && arg.emneord && arg.lektionslængde && arg.beskrivelse && arg.klassetrin) {
          document.getElementById("spanlektionslængde").innerHTML = arg["lektionslængde"];
          document.getElementById("spanbeskrivelse").innerHTML = arg["beskrivelse"];
          document.getElementById("spanklassetrin").innerHTML = arg["klassetrin"];
          document.getElementById("spanemneord").innerHTML = arg["emneord"];
          document.getElementById("spantitel").innerHTML = arg["opgavetitel"];
        }
      }
    }
  }
}

/*
  Her laver vi funktionen til publisher knappen, samt slåop
*/
window.addEventListener("load",function()
{
  var idtag = window.location.hash;
  if (idtag.length <2){
    visopgaver();
    var mybutton = document.getElementById("detteharandreikke");
    mybutton.addEventListener("click",function(){
      opretopgave();
    });
  } else {
    visenkeltopgave(idtag.substr(1));
    viskommentar();
    var kommentarbutton = document.getElementById("slåop");
    if (kommentarbutton != null) {
      kommentarbutton.addEventListener("click",function(){
        opretkommentar();
        viskommentar();
      });
    }
  }
});

//Alertbox til registrering af newsletters
function validation() {
  if (document.getElementById("nyhedsbrev").value == "") { //if else statement,
    alert("Du har ikke indtastet nogen emailadresse");
    return false;
  } else {
    alert("Du er nu blevet tilmeldt nyhedsbrevet"); //alert der fortæller at man
    return true;
  }
}

//Funktion til at kunne logge ind//
function check(form)
{
 if(form.userid.value == "Mike" && form.pswrd.value == "momo") //Vi tjekker om ens username og password er Mike og momo
 {
   window.open('kedulandingpage.html') && window.close('login.html') //så kan man logge ind
 } else {
   alert("Brugernavn og/eller Password er ugyldigt. Prøv igen.") //Ellers får man en besked om forkert brugerlogin
 }
}
