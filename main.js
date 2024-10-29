const requestURL = '../json/documentaries.json';

//Funcion sincrona

async function fetchMoviesJson(){
	const response = await fetch(requestURL);
	const movies = await response.json();
	return movies;
}