// Fonction pour gérer l'API
async function searchAnime(query) {
    const url = 'https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=Fullmetal&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '7168f98cfdmsh3eaffd2b287f39fp16be4bjsn5224cfc56766',
        'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
      }
    };
    
    const response = await fetch(url, options);
    return await response.json();
  }