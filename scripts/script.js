APIKEY = null;

// Fonction utilisée pour saisir la clé API et l'enregistrer
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

// Fonction utilisée pour recherher un anime
function rechercheAnime() {
  if (!APIKEY || APIKEY.trim() === "") {
    alert("Veuillez d'abord entrer votre clé API !");
    return;
  }
  let nom = document.getElementById("champRecherche").value;
  console.log(nom);
  const ulElement = document.querySelector("ul");
  ulElement.innerHTML = "";
  fetch("https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=" + nom.trim(), {
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
