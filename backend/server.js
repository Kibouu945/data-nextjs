const express = require('express');
const axios = require('axios');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { importDataToPostgres } = require('./importData'); 
const { getLicences } = require('./importData'); 

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const PORT = 4000;
const BIKE_API_URL = 'https://api.citybik.es/v2/networks/citi-bike-nyc';

app.use(cors());
app.use(express.json());

// Route pour importer les données dans PostgreSQL
app.post('/api/import-data', async (req, res) => {
  try {
    await importDataToPostgres(); // Appelle la fonction d'importation
    res.status(200).json({ message: 'Données importées avec succès dans PostgreSQL.' });
  } catch (error) {
    console.error('Erreur lors de l\'importation des données :', error.message);
    res.status(500).json({ error: 'Erreur lors de l\'importation des données.' });
  }
});
// Route pour récupérer les données des licences
app.get('/api/licences', async (req, res) => {
  try {
    const licences = await getLicences(); // Récupère les données depuis PostgreSQL
    res.status(200).json(licences);
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
  }
});
// Route API pour récupérer les données des vélos
let cachedData = null;
let lastFetchTime = null;
const CACHE_DURATION = 5 * 60 * 1000;

// Route API pour récupérer les données des vélos
app.get('/api/bikes', async (req, res) => {
  const { ne_lat, ne_lng, sw_lat, sw_lng } = req.query;
  const currentTime = new Date().getTime();

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

  fetchAndEmitBikeData();
  const interval = setInterval(fetchAndEmitBikeData, 10000);

  socket.on('disconnect', () => {
    console.log('Client déconnecté');
    clearInterval(interval);
  });
});

// Démarrer le serveur backend
server.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
