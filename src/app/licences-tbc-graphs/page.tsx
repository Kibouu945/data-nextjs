'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LicencesPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Appel vers votre backend pour récupérer les données des licences
        const response = await axios.get('http://localhost:4000/api/licences'); // Changez l'URL si nécessaire
        const transformedData = response.data.map((item: { borough: any; tobacco_retail_dealer_cap: any; active_tobacco_retail_dealer: any; }) => ({
          borough: item.borough || 'Inconnu',
          tobacco_retail_dealer_cap: parseInt(item.tobacco_retail_dealer_cap || 0),
          active_tobacco_retail_dealer: parseInt(item.active_tobacco_retail_dealer || 0),
        }));
        setData(transformedData);
      } catch (err) {
        setError(true);
        console.error('Error fetching data:', (err as any).message);
      }
    };
    fetchData();
  }, []); // Appel une seule fois lors du montage du composant

  if (error) {
    return <div className="text-center text-red-600">Une erreur est survenue lors du chargement des données.</div>;
  }

  return (
    <div className="p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">Plafonds de Licences à NYC</h1>
      <div className="flex justify-center">
        <BarChart width={800} height={400} data={data} className="shadow-lg">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="borough" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="tobacco_retail_dealer_cap" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default LicencesPage;
