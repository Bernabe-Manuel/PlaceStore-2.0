// script.js

import { firestore } from "./js/firebase.js";
import { addDoc, collection, getDocs, getDoc, doc,updateDoc } from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js';

// Inicializa o modal
const emailModal = document.getElementById('email-modal');
const userEmailInput = document.getElementById('user-email');
const submitEmailButton = document.getElementById('submit-email');
const errorMessage = document.getElementById('error-message');
const userIcon = document.getElementById('user-icon');

let userEmail = null;


//criar email no firebase
async function addEmail(email) {
    try {

        const colEmails = collection(firestore, 'emails');

        const _doc = await addDoc(colEmails, {
            email: email
        })

        console.log(_doc.id);
    }
    catch (e) {
        console.log(e);
    }
}


//pegar os emails
async function getEmails() {
    try {
        const docs = await getDocs(collection(firestore, 'emails'));

        const docsData = [];

        for (let x = 0; x < docs.docs.length; x++) {
            const docData = docs.docs[x].data();

            docsData.push({
                id: docs.docs[x].id,
                email: docData.email
            })

        }

        return docsData;

    } catch (e) {
        console.log(e);

    }
    return null;

}

//pegar os email
async function getEmail(id) {
    try {
        const _doc = await getDoc(doc(collection(firestore, 'emails'), id));


        const docData = _doc.data();

        return {
            id: _doc.id,
            email: docData.email
        };

    } catch (e) {
        console.log(e);

    }
    return null;


}



//Atualizar o email
async function updateEmail(id, email) {
    try {
        const _doc = await updateDoc(doc(collection(firestore, 'emails'), id), {
            email: email
        });


        console.log(_doc.id);

    } catch (e) {
        console.log(e);

    }


}

// Função para validar o e-mail
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Evento para enviar o e-mail
submitEmailButton.addEventListener('click', async function () {
    const email = userEmailInput.value.trim();
    if (validateEmail(email)) {
        userEmail = email;
        emailModal.style.display = 'none'; // Esconde o modal
        userIcon.setAttribute('title', userEmail); // Define o e-mail como tooltip
        document.getElementById('user-info').style.display = 'block'; // Mostra o ícone

        //adicionar este email ao firebase (firestore)
        await addEmail(email)

        initializeMap(); // Inicializa o mapa após a validação
    } else {
        errorMessage.style.display = 'block'; // Mostra mensagem de erro
    }
});

// Função para inicializar o mapa
function initializeMap() {
    // Dados fictícios de locais com coordenadas e endereços
    const places = {
        farmacia: [
            { name: "Farmácia de Angola", coords: [-8.8650, 13.2550], address: "Viana, Rua A" },
            { name: "Farmácia Tandu Far II", coords: [-8.8710, 13.2610], address: "Estalagem, Rua B" },
            { name: "Farmácia Mixcenter", coords: [-8.8770, 13.2670], address: "Luanda Sul, Rua C" },
            { name: "Mecofarma", coords: [-8.8830, 13.2730], address: "Viana, Rua D" },
            { name: "Suafarma", coords: [-8.8890, 13.2790], address: "Estalagem, Rua E" }
        ],
        supermercado: [
            { name: "Candando", coords: [-8.8660, 13.2560], address: "Viana, Rua F" },
            { name: "Império", coords: [-8.8720, 13.2620], address: "Estalagem, Rua G" },
            { name: "Fresmart", coords: [-8.8780, 13.2680], address: "Luanda Sul, Rua H" },
            { name: "Angomart", coords: [-8.8840, 13.2740], address: "Viana, Rua I" },
            { name: "Nossa Casa", coords: [-8.8900, 13.2800], address: "Estalagem, Rua J" }
        ],
        mercado: [
            { name: "Mercado do km 30", coords: [-8.8670, 13.2570], address: "Viana, Praça Central" },
            { name: "Mercado da Estalagem", coords: [-8.8730, 13.2630], address: "Estalagem, Praça Norte" },
            { name: "Belas Shopping", coords: [-8.8790, 13.2690], address: "Luanda Sul, Praça Sul" },
            { name: "Mercado Sanzanza", coords: [-8.8850, 13.2750], address: "Viana, Praça Leste" },
            { name: "Mercado Mamã Gorda", coords: [-8.8910, 13.2810], address: "Estalagem, Praça Oeste" }
        ],
        cantina: [
            { name: "KFC Viana", coords: [-8.8680, 13.2580], address: "Viana, Rua K" },
            { name: "Rabugento", coords: [-8.8740, 13.2640], address: "Estalagem, Rua L" },
            { name: "Cantina Kicuia", coords: [-8.8800, 13.2700], address: "Luanda Sul, Rua M" },
            { name: "Casa Viana", coords: [-8.8860, 13.2760], address: "Viana, Rua N" },
            { name: "Cantinho da Tia Any", coords: [-8.8920, 13.2820], address: "Estalagem, Rua O" }
        ]
    };

    // Ícones personalizados
    const icons = {
        farmacia: L.icon({
            iconUrl: 'assets/icons/pharmacy.png', // Ícone de farmácia
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        }),
        supermercado: L.icon({
            iconUrl: 'assets/icons/supermarket.png', // Ícone de supermercado
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        }),
        mercado: L.icon({
            iconUrl: 'assets/icons/market.png', // Ícone de mercado
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        }),
        cantina: L.icon({
            iconUrl: 'assets/icons/canteen.png', // Ícone de cantina
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        })
    };

    // Inicializa o mapa
    const map = L.map('map').setView([-8.8750, 13.2650], 13); // Coordenadas aproximadas da região central

    // Adiciona o tile layer (camada de mapa)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Variáveis globais
    let selectedMarker = null;
    let routingControl = null;

    // Função para adicionar marcadores no mapa
    function addMarkers(placeType) {
        map.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        if (placeType === 'all') {
            Object.keys(places).forEach(type => {
                places[type].forEach(place => {
                    const marker = L.marker(place.coords, { icon: icons[type] }).addTo(map);
                    marker.bindPopup(`<b>${place.name}</b><br>${place.address}`);
                    marker.on('click', function () {
                        handleMarkerClick(marker, place);
                    });
                });
            });
        } else {
            places[placeType].forEach(place => {
                const marker = L.marker(place.coords, { icon: icons[placeType] }).addTo(map);
                marker.bindPopup(`<b>${place.name}</b><br>${place.address}`);
                marker.on('click', function () {
                    handleMarkerClick(marker, place);
                });
            });
        }
    }

    // Função para lidar com o clique em um marcador
    function handleMarkerClick(marker, place) {
        selectedMarker = place;
        document.getElementById('destination').value = place.name;

        // Remove a rota anterior, se existir
        if (routingControl) {
            map.removeControl(routingControl);
            routingControl = null;
        }

        // Amplia o mapa até o nível das ruas
        map.setView(place.coords, 16); // Zoom 16 mostra ruas claramente

        // Exibe uma mensagem informando que o destino foi selecionado
        alert(`Destino selecionado: ${place.name}. Clique no botão "Mostrar Rota" para calcular a rota.`);
    }

    // Função para calcular a rota
    function calculateRoute(destinationCoords) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const userCoords = [position.coords.latitude, position.coords.longitude];

                // Remove rotas anteriores
                if (routingControl) {
                    map.removeControl(routingControl);
                }

                // Adiciona a nova rota
                routingControl = L.Routing.control({
                    waypoints: [
                        L.latLng(userCoords[0], userCoords[1]),
                        L.latLng(destinationCoords[0], destinationCoords[1])
                    ],
                    routeWhileDragging: true,
                    showAlternatives: true
                }).addTo(map);

                // Amplia o mapa até o nível das ruas
                map.fitBounds(routingControl.getPlan().getWaypoints().map(wp => wp.latLng), { padding: [50, 50] });
            }, error => {
                alert("Erro ao obter sua localização.");
            });
        } else {
            alert("Seu navegador não suporta geolocalização.");
        }
    }

    // Evento para selecionar o tipo de local
    document.getElementById('place-type').addEventListener('change', function (e) {
        const selectedType = e.target.value;
        addMarkers(selectedType);
    });

    // Geolocalização do usuário
    document.getElementById('locate-me').addEventListener('click', function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const userCoords = [position.coords.latitude, position.coords.longitude];
                map.setView(userCoords, 16); // Zoom 16 mostra ruas claramente
                L.marker(userCoords).addTo(map).bindPopup("Você está aqui").openPopup();
            }, error => {
                alert("Erro ao obter sua localização.");
            });
        } else {
            alert("Seu navegador não suporta geolocalização.");
        }
    });

    // Botão "Mostrar Rota"
    document.getElementById('find-route').addEventListener('click', function () {
        if (!selectedMarker) {
            alert("Por favor, selecione um destino no mapa.");
            return;
        }

        // Calcula a rota para o destino selecionado
        calculateRoute(selectedMarker.coords);
    });

    // Carrega os marcadores iniciais
    addMarkers('all');
}