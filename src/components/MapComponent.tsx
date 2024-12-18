'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
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

  // Fonction pour récupérer les données des stations
  const fetchBounds = async (bounds: any) => {
    try {
      const response = await axios.get('http://localhost:4000/api/bikes', {
        params: {
          ne_lat: bounds._northEast.lat,
          ne_lng: bounds._northEast.lng,
          sw_lat: bounds._southWest.lat,
          sw_lng: bounds._southWest.lng,
        },
      });
      console.log('Réponse API :', response.data); // Débogage
      setStations(response.data.stations || []);
    } catch (error) {
      console.error('Erreur API RESTful :', (error as any).message);
    }
  };

  // Débounce pour limiter les requêtes
  const debounce = (func: (...args: any) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Composant pour récupérer les événements de la carte
  const MapEvents = () => {
    const map = useMapEvents({
      moveend: debounce(() => {
        const bounds = map.getBounds();
        fetchBounds(bounds);
      }, 500), // Attends 500 ms avant d'exécuter la requête
    });

    // Appelle `fetchBounds` une seule fois au chargement initial
    useEffect(() => {
      const bounds = map.getBounds();
      fetchBounds(bounds);
    }, [map]);

    return null;
  };

  return (
    <div className="w-full h-[500px]">
      <MapContainer
        center={[40.7128, -74.006]} // Coordonnées de New York
        center={[40.7128, -74.006]} // Coordonnées de New York
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapEvents />
        <MarkerClusterGroup>
          {stations.map((station, index) => (
            <Marker key={index} position={[station.latitude, station.longitude]}>
              <Popup>{station.name}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
