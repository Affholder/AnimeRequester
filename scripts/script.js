APIKEY = null;
var choix = 1;

function setApiKey() {
  APIKEY = prompt("Veuillez entrer votre clé API: ");
  if (APIKEY) {
    alert("Clé API enregistrée !");
  }
  else {
    alert("Clé API obligatoire !");
  }
}

document.getElementById("champRecherche").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    rechercheAnime();
  }
});

function setChoix(user){
  choix = user;
}

function rechercheAnime() {
  var lien = "https://anime-db.p.rapidapi.com/"
  if (!APIKEY || APIKEY.trim() === "") {
    alert("Veuillez d'abord entrer votre clé API !");
    return;
  }
  let val = document.getElementById("champRecherche").value;
  const ulElement = document.getElementById("contenu");
  ulElement.innerHTML = "";
  switch (choix){
    case 1:
      lien += "anime?page=1&size=10&search="+val.trim();
      console.log(lien);
    case 2:
      lien += "anime/by-id/"+val;
    case 3:
      lien += "anime/by-ranking/"+val;;
    case 4:
      ;
    
  }
  fetch(lien.trim() + val.trim(), {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": APIKEY.trim(),
      "X-RapidAPI-Host": "anime-db.p.rapidapi.com"
    }
  })
    .then(response => response.json())
    .then(data => {
      afficherAnime(data, ulElement);
    })
    .catch(err => console.error(err));
}

function afficherAnime(data, ulElement) {
  for (const anime of data.data) {
    const divCard = document.createElement("div");
    divCard.id = "divCard";
    const pSynopsisElement = document.createElement("p");
    pSynopsisElement.id = "pSynopsisElement";
    const pInfoElement = document.createElement("p");
    pInfoElement.id = "pInfoElement";
    const h1Element = document.createElement("h1");
    const imgElement = document.createElement("img");
    h1Element.innerText = `${anime.title}`;
    imgElement.src = `${anime.image}`;
    pSynopsisElement.innerText = `${anime.synopsis}`;
    pInfoElement.innerText = `${anime.genres.join(", ")} \n rank :${anime.ranking}\n Episodes : ${anime.episodes}`;
    divCard.appendChild(h1Element);
    divCard.appendChild(imgElement);
    divCard.appendChild(pSynopsisElement);
    divCard.appendChild(pInfoElement);
    ulElement.appendChild(divCard);
  }
}