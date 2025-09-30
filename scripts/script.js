APIKEY = null;
function setApiKey() {
  APIKEY = prompt("Veuillez entrer votre clé API: ");
  const ulElement = document.querySelector("ul");

  fetch("https://anime-db.p.rapidapi.com/anime?page=1&size=20", {
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
        // genres est un tableau → on le joint avec des virgules
        liElement.innerText = `${anime.title} → ${anime.genres.join(", ")}`;
        ulElement.appendChild(liElement);
      }
    })
    .catch(err => console.error(err));
  if (APIKEY) {
    alert("Clé API enregistrée !");
  }
  else {
    alert("Clé API obligatoire !");
  }
}
