// backend/server.js


const express = require('express');
const axios = require('axios');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Autoriser toutes les origines (pour le développement)
    methods: ['GET', 'POST'],
  },
});

const PORT = 4000;
const BIKE_API_URL = 'https://api.citybik.es/v2/networks/citi-bike-nyc'; // API pour les données des vélos

app.use(cors());
app.use(express.json());

// Backend : Filtrage par Bounding Box
// Route API pour récupérer les données des vélos
let cachedData = null;
let lastFetchTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes en millisecondes

app.get('/api/bikes', async (req, res) => {
  const { ne_lat, ne_lng, sw_lat, sw_lng } = req.query;
  const currentTime = new Date().getTime();

  // Utilise les données en cache si elles sont encore valides
  if (cachedData && lastFetchTime && currentTime - lastFetchTime < CACHE_DURATION) {
    console.log('Envoi des données depuis le cache');
    const filteredStations = cachedData.filter(
      (station) =>
        station.latitude <= ne_lat &&
        station.latitude >= sw_lat &&
        station.longitude <= ne_lng &&
        station.longitude >= sw_lng
    );
    return res.json({ stations: filteredStations });
  }

  try {
    console.log('Requête vers CityBik en cours...');
    const response = await axios.get(BIKE_API_URL);
    const stations = response.data.network.stations;

    // Mise en cache des données
    cachedData = stations;
    lastFetchTime = new Date().getTime();

    const filteredStations = stations.filter(
      (station) =>
        station.latitude <= ne_lat &&
        station.latitude >= sw_lat &&
        station.longitude <= ne_lng &&
        station.longitude >= sw_lng
    );

    console.log('Données fraîches depuis l\'API externe.');
    res.json({ stations: filteredStations });
  } catch (error) {
    console.error('Erreur API externe :', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
  }
});



// Socket.IO pour les mises à jour en temps réel
io.on('connection', (socket) => {
  console.log('Client connecté via Socket.IO');

  const fetchAndEmitBikeData = async () => {
    try {
      const response = await axios.get(BIKE_API_URL);
      socket.emit('bikeData', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données via socket:', error.message);
    }
  };

  fetchAndEmitBikeData(); // Fetch les données immédiatement
  const interval = setInterval(fetchAndEmitBikeData, 10000); // Mettre à jour toutes les 10 secondes

  socket.on('disconnect', () => {
    console.log('Client déconnecté');
    clearInterval(interval);
  });
});

// Démarrer le serveur backend
server.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
