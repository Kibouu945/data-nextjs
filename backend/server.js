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

// Route API pour récupérer les données des vélos
app.get('/api/bikes', async (req, res) => {
  try {
    const response = await axios.get(BIKE_API_URL);
    res.json(response.data);
  } catch (error) {
    console.error('Erreur API:', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des données des vélos.' });
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
