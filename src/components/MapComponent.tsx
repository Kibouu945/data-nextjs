'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import io from 'socket.io-client';
import 'leaflet/dist/leaflet.css';

// Correction des icônes Leaflet par défaut
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const MapComponent = () => {
  const [stations, setStations] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Appel à l'API RESTful du backend
        const response = await axios.get('http://localhost:4000/api/bikes');
        setStations(response.data.network.stations);
      } catch (error) {
        console.error('Erreur API RESTful :', (error as any).message);
      }
    };

    // Récupération initiale via l'API RESTful
    fetchData();

    // Connexion Socket.IO pour les mises à jour en temps réel
    const socket = io('http://localhost:4000');
    socket.on('bikeData', (data) => {
      setStations(data.network.stations);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="w-full h-[500px]">
      <MapContainer
        center={[40.7128, -74.006]} // Coordonnées de New York
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {stations.map((station, index) => (
          <Marker key={index} position={[station.latitude, station.longitude]}>
            <Popup>
              <strong>{station.name}</strong> <br />
              Vélos disponibles : {station.free_bikes}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
