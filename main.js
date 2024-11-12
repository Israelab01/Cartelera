const temporadasList = document.getElementById("temporadas");
const contenidoPrincipal = document.getElementById("contenido-principal");

// Cargar datos de JSON y generar el menú
fetch("datos_casa_papel.json")
    .then((response) => response.json())
    .then((data) => {
        const { titulo, descripcion, temporadas } = data;
        document.getElementById("titulo").innerText = titulo;

        // Generar menú de temporadas y episodios
        temporadas.forEach((temporada, index) => {
            const temporadaItem = document.createElement("div");
            temporadaItem.classList.add("temporada-item");
            temporadaItem.innerText = `Temporada ${index + 1}`;

            // Contenedor para los episodios
            const episodiosList = document.createElement("div");
            episodiosList.classList.add("episodios-list");
            episodiosList.style.display = "none";

            // Agregar episodios a cada temporada
            temporada.episodios.forEach((episodio, epIndex) => {
                const episodioItem = document.createElement("div");
                episodioItem.classList.add("episodio-item");
                episodioItem.innerText = `Episodio ${epIndex + 1}: ${episodio.titulo}`;
                
                // Evento para mostrar la descripción del episodio
                episodioItem.addEventListener("click", () => {
                    mostrarDescripcionEpisodio(episodio.titulo, episodio.descripcion);
                });

                episodiosList.appendChild(episodioItem);
            });

            // Mostrar imagen de la temporada al hacer clic
            temporadaItem.addEventListener("click", () => {
                mostrarImagenTemporada(index); 
                const isVisible = episodiosList.style.display === "block";
                document.querySelectorAll(".episodios-list").forEach(list => list.style.display = "none");
                episodiosList.style.display = isVisible ? "none" : "block";
            });

            temporadasList.appendChild(temporadaItem);
            temporadasList.appendChild(episodiosList);
        });
    })
    .catch((error) => console.error("Error al cargar los datos:", error));

// Función para mostrar la descripción del episodio seleccionado
function mostrarDescripcionEpisodio(titulo, descripcion) {
    contenidoPrincipal.innerHTML = `
        <div class="descripcion-tarjeta">
            <h2>${titulo}</h2>
            <p>${descripcion}</p>
        </div>
    `;
}

// Función para mostrar la imagen de la temporada seleccionada
function mostrarImagenTemporada(index) {
    const contenidoPrincipal = document.getElementById('contenido-principal');
    contenidoPrincipal.style.backgroundImage = `url('/imagenes/temporada${index + 1}.png')`;
    contenidoPrincipal.style.backgroundSize = 'cover'; // Hace que la imagen cubra todo el contenedor
    contenidoPrincipal.style.backgroundPosition = 'center'; // Centra la imagen
    contenidoPrincipal.style.backgroundRepeat = 'no-repeat'; // Evita que la imagen se repita
}







