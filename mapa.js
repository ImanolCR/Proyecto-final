class Evento {
    constructor(titulo, descripcion, fecha, hora, ubicacion, tipo) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.hora = hora;
        this.ubicacion = ubicacion;
        this.tipo = tipo;
    }
}

// Función para el archivo json
async function obtenerEventos() {
    try {
        const response = await fetch('mapa.json');
        const data = await response.json();
        return data.map(evento => new Evento(evento.titulo, evento.descripcion, evento.fecha, evento.hora, evento.ubicacion, evento.tipo));
    } catch (error) {
        console.error('Error al cargar los eventos:', error);
    }
}

// Iniciar el mapa
const map = L.map('map').setView([-12.046374, -77.042793], 5);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


function mostrarEventos(eventos) {
    const listaEventos = document.getElementById('events');
    listaEventos.innerHTML = ''; 
    eventos.forEach(evento => {
        
        const marker = L.marker(evento.ubicacion).addTo(map);
        marker.bindPopup(`<b>${evento.titulo}</b><br>${evento.descripcion}`);

       
        const li = document.createElement('li');
        li.textContent = `${evento.titulo} - ${evento.fecha} - ${evento.tipo}`;
        li.addEventListener('click', () => {
            marker.openPopup();
        });
        listaEventos.appendChild(li);
    });
}


async function init() {
    const eventos = await obtenerEventos();
    mostrarEventos(eventos);
}

init();