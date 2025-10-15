APIKEY = null;
const choix = document.getElementById('endpoint');

function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  if (document.body.classList.contains('dark-theme')) {
      document.getElementById('changeTheme').textContent = 'Thème clair';
  } else {
      document.getElementById('changeTheme').textContent = 'Thème sombre';
  }
}

function setApiKey() {
  APIKEY = prompt("Veuillez entrer votre clé API: ");
  if (APIKEY) {
    alert("Clé API enregistrée !");
    chargerGenres();
    afficherCheckboxGenres();

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

function creerGenre(){
  
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
  switch (choix.value){
    case "search":
      lien += "anime?page=1&size=10&search="+val.trim();
      console.log(lien);
      break;
    case "by-id":
      lien += "anime/by-id/"+val;
      break;
    case "by-ranking":
      lien += "anime/by-ranking/"+val;
      console.log(lien);
      break;
    case "by-genre":
      const genres = Array.from(document.querySelectorAll('input[name="genre"]:checked')).map(cb => cb.value);
      if (genres.length === 0) return alert("Veuillez sélectionner au moins un genre !");
      lien += `anime?page=1&size=10&genres=${encodeURIComponent(genres.join(","))}`;
      break;
      ;
    
  }
  
  fetch(lien.trim(), {
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
  if (Array.isArray(data.data)) {
    for (const anime of data.data) {
      creerCarteAnime(anime, ulElement);
    }
  }
  else {
    creerCarteAnime(data, ulElement);
  }
}

function creerCarteAnime(anime, ulElement) {
  const divCard = document.createElement("div");
  divCard.id = "divCard";

  const h1Element = document.createElement("h1");
  h1Element.innerText = anime.title;

  const imgElement = document.createElement("img");
  imgElement.src = anime.image;

  const pSynopsisElement = document.createElement("p");
  pSynopsisElement.id = "pSynopsisElement";
  pSynopsisElement.innerText = anime.synopsis;

  const pInfoElement = document.createElement("p");
  pInfoElement.id = "pInfoElement";
  pInfoElement.innerText = `${anime.genres?.join(", ") ?? "Genres inconnus"}\nRank: ${anime.ranking ?? "?"}\nEpisodes: ${anime.episodes ?? "?"}`;

  divCard.appendChild(h1Element);
  divCard.appendChild(imgElement);
  divCard.appendChild(pSynopsisElement);
  divCard.appendChild(pInfoElement);

  ulElement.appendChild(divCard);
}

  document.getElementById("endpoint").addEventListener("change", (e) => {
    const selected = e.target.value;
    const zoneGenres = document.getElementById("zoneGenres");
    if (selected === "by-genre") {
      zoneGenres.style.display = "grid";
    } else {
      zoneGenres.style.display = "none";
    }
  });

function chargerGenres() {
  var lien = "https://anime-db.p.rapidapi.com/"
  if (!APIKEY) return;

  fetch(lien + "genre", {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": APIKEY.trim(),
      "X-RapidAPI-Host": "anime-db.p.rapidapi.com"
    }
  })
    .then(resp => resp.json())
    .then(genres => {
      console.log("Genres récupérés :", genres);
      afficherCheckboxGenres(genres);
    })
    .catch(err => {
      console.error("Erreur récupération genres :", err);
    });
}

function afficherCheckboxGenres(genres) {
  const container = document.getElementById("checkboxGenres");
  container.innerHTML = "";

  genres.forEach(item => {
    const genreName = item._id;

    const label = document.createElement("label");
    label.style.display = "flex";
    label.style.alignItems = "center";
    label.style.gap = "5px";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "genre";
    checkbox.value = genreName;

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(genreName));
    container.appendChild(label);
  });
}

