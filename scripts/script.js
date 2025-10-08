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
  fetch("https://anime-db.p.rapidapi.com/anime?page=1&size=10&search="+nom.trim(), {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": APIKEY.trim(),
      "X-RapidAPI-Host": "anime-db.p.rapidapi.com"
    }
  })
    .then(response => response.json())
    .then(data => {
      for (const anime of data.data) {
        const liElement = document.createElement("li");
        const h1Element = document.createElement("h1");
        const imgElement = document.createElement("img");
        h1Element.innerText = `${anime.title}`;
        imgElement.src = `${anime.image}`;
        liElement.innerText = `${anime.synopsis} \n ${anime.genres.join(", ")} \n rank :${anime.ranking}\n Episodes : ${anime.episodes}` ;
        ulElement.appendChild(h1Element);
        ulElement.appendChild(imgElement);
        ulElement.appendChild(liElement);
      }
    })
    .catch(err => console.error(err));
}

function afficherAnime(data){

}
