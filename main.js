const requestURL = "./datos_casa_papel.json"; // Asegúrate de tener la ruta correcta

async function fetchCasaPapelJson() {
    const response = await fetch(requestURL);
    const data = await response.json();
    return data;
}

async function showCasaPapelData() {
    const cartel = document.getElementById("cartel");
    const casaPapelData = await fetchCasaPapelJson();

    // Título y Descripción
    const titulo = document.createElement("h1");
    titulo.textContent = casaPapelData.titulo;
    cartel.appendChild(titulo);

    const descripcion = document.createElement("p");
    descripcion.textContent = casaPapelData.descripcion;
    cartel.appendChild(descripcion);

    // Imágenes de las temporadas
    const temporadasDiv = document.createElement("div");
    temporadasDiv.classList.add("row", "justify-content-center");

    casaPapelData.temporadas.forEach((temporada, index) => {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("col-md-2", "text-center", "mb-3");

        const img = document.createElement("img");
        img.src = temporada.imagen;
        img.classList.add("img-fluid", "rounded", "shadow", "season-image");
        img.alt = `Imagen de la temporada ${index + 1}`;
        img.style.cursor = "pointer";

        // Evento para mostrar el modal con el resumen
        img.addEventListener("click", () => {
            showSeasonModal(temporada.resumen, index + 1);
        });

        imgContainer.appendChild(img);
        temporadasDiv.appendChild(imgContainer);
    });

    cartel.appendChild(temporadasDiv);
}

// Función para mostrar el modal
function showSeasonModal(resumen, seasonNumber) {
    const modal = document.getElementById("seasonModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");

    modalTitle.textContent = `Temporada ${seasonNumber}`;
    modalBody.textContent = resumen;

    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}

showCasaPapelData();
