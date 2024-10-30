const requestURL = "./datos_casa_papel.json";

async function fetchCasaPapelJson() {
    const response = await fetch(requestURL);
    const data = await response.json();
    return data;
}

async function showCasaPapelData() {
    const leftColumn = document.getElementById("leftColumn");
    const rightColumnTitle = document.getElementById("seasonTitle");
    const rightColumnDescription = document.getElementById("seasonDescription");
    const casaPapelData = await fetchCasaPapelJson();

    const titulo = document.createElement("h1");
    titulo.textContent = casaPapelData.titulo;
    titulo.classList.add("text-center", "my-4");
    leftColumn.appendChild(titulo);

    casaPapelData.temporadas.forEach((temporada, index) => {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("text-center", "my-3", "position-relative");

        const img = document.createElement("img");
        img.src = temporada.imagen;
        img.classList.add("img-fluid", "rounded", "shadow", "mb-2");
        img.alt = `Imagen de la temporada ${index + 1}`;
        img.style.cursor = "pointer";
        img.style.width = "80%";

        img.addEventListener("click", () => {
            rightColumnTitle.textContent = `Temporada ${index + 1}`;
            rightColumnDescription.textContent = temporada.resumen;
        });

        imgContainer.appendChild(img);
        leftColumn.appendChild(imgContainer);
    });
}

showCasaPapelData();
