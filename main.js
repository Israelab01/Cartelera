const temporadasList = document.getElementById("temporadas");
const contenidoPrincipal = document.getElementById("contenido-principal");

// Cargar datos y generar el menú
async function cargarDatos() {
    try {
        const response = await fetch("datos_casa_papel.json");
        const data = await response.json();
        document.getElementById("titulo").innerText = data.titulo;
        generarMenuTemporadas(data.temporadas);
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
}

// Generar el menú de temporadas y episodios
function generarMenuTemporadas(temporadas) {
    temporadas.forEach((temporada, index) => {
        const temporadaItem = crearElemento("div", "temporada-item", `Temporada ${index + 1}`);
        const episodiosList = crearElemento("div", "episodios-list");
        episodiosList.style.display = "none";

        temporada.episodios.forEach((episodio, epIndex) => {
            const episodioItem = crearElemento("div", "episodio-item", `Episodio ${epIndex + 1}: ${episodio.titulo}`);
            episodioItem.addEventListener("click", () => mostrarDescripcionEpisodio(episodio.titulo, episodio.descripcion));
            episodiosList.appendChild(episodioItem);
        });

        temporadaItem.addEventListener("click", () => {
            mostrarImagenTemporada(index);
            episodiosList.style.display = episodiosList.style.display === "block" ? "none" : "block";
        });

        temporadasList.appendChild(temporadaItem);
        temporadasList.appendChild(episodiosList);
    });
}

// Crear elementos de manera reutilizable
function crearElemento(tag, clase, texto = "") {
    const elemento = document.createElement(tag);
    elemento.classList.add(clase);
    elemento.innerText = texto;
    return elemento;
}

// Mostrar la descripción del episodio seleccionado
function mostrarDescripcionEpisodio(titulo, descripcion) {
    contenidoPrincipal.innerHTML = `
        <div class="descripcion-tarjeta">
            <h2>${titulo}</h2>
            <p>${descripcion}</p>
        </div>
    `;
}

// Mostrar la imagen de la temporada seleccionada
function mostrarImagenTemporada(index) {
    contenidoPrincipal.style.backgroundImage = `url('/imagenes/temporada${index + 1}.png')`;
}

// Ejecutar la carga de datos al iniciar
cargarDatos();
