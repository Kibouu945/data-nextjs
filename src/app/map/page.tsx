import Navbar from '@/components/Navbar';

import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('../../components/MapComponent'), {
  ssr: false, // Désactive le rendu côté serveur
  loading: () => <p>Chargement de la carte...</p>,
});

const MapPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Carte</h1>
        <p className="text-lg text-center mb-8">Visualisez les stations de vélos de New York City sur cette carte interactive.</p>
        <MapComponent />
      </main>
    </div>
  );
};
export default MapPage; 