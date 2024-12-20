const axios = require('axios');
const { Pool } = require('pg');

// Configuration PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'licences', 
  password: '1234',
  port: 5433,
});

const NYC_API_URL = 'https://data.cityofnewyork.us/resource/p2wf-m8zt.json';

async function 
importDataToPostgres() {
  try {
    console.log("Récupération des données depuis l'API NYC...");
    const response = await axios.get(NYC_API_URL);
    const data = response.data;

    // Transformation des données pour éviter les champs vides ou mal formatés
    const transformedData = data.map(item => ({
      borough: item.borough || 'Inconnu',
      community_district: parseInt(item.community_district || 0),
      community_district_name: item.community_district_name || 'Non spécifié',
      tobacco_retail_dealer_cap: parseInt(item.tobacco_retail_dealer_cap || 0),
      active_tobacco_retail_dealer: parseInt(item.active_tobacco_retail_dealer || 0),
      trd_available_under_cap: parseInt(item.trd_available_under_cap || 0),
      electronic_cigarette_retail: parseInt(item.electronic_cigarette_retail || 0),
      active_electronic_cigarette: parseInt(item.active_electronic_cigarette || 0),
      ecd_available_under_cap: parseInt(item.ecd_available_under_cap || 0),
      data_as_of: item.data_as_of ? new Date(item.data_as_of).toISOString().split('T')[0] : null,
    }));

    await client.connect();
    console.log('Connexion à PostgreSQL réussie.');

    console.log('Insertion des données dans PostgreSQL...');
    for (const item of transformedData) {
      const query = `
        INSERT INTO license_limits (
          borough,
          community_district,
          community_district_name,
          tobacco_retail_dealer_cap,
          active_tobacco_retail_dealer,
          trd_available_under_cap,
          electronic_cigarette_retail,
          active_electronic_cigarette,
          ecd_available_under_cap,
          data_as_of
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `;

      const values = [
        item.borough,
        item.community_district,
        item.community_district_name,
        item.tobacco_retail_dealer_cap,
        item.active_tobacco_retail_dealer,
        item.trd_available_under_cap,
        item.electronic_cigarette_retail,
        item.active_electronic_cigarette,
        item.ecd_available_under_cap,
        item.data_as_of,
      ];

      try {
        await client.query(query, values);
        console.log(`Données insérées pour le district ${item.community_district_name}.`);
      } catch (insertError) {
        console.error('Erreur lors de l\'insertion des données :', insertError.message);
      }
    }

    console.log('Données importées avec succès dans PostgreSQL.');
  } catch (error) {
    console.error('Erreur lors de l\'importation des données :', error.message);
  } finally {
    await client.end();
    console.log('Connexion à PostgreSQL fermée.');
  }
}

// Fonction pour récupérer les données depuis PostgreSQL
async function 
getLicences() {
    const client = await pool.connect(); // Récupère un client du pool
    try {
      console.log('Connexion à PostgreSQL réussie pour la récupération des données.');
  
      const query = 'SELECT * FROM license_limits';
      const result = await client.query(query);
      console.log('Données récupérées avec succès.');
      return result.rows;
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error.message);
      throw error;
    } finally {
    client.release(); // Libère le client pour qu'il puisse être réutilisé
    console.log('Connexion à PostgreSQL libérée après récupération des données.');
  }
}
module.exports = { importDataToPostgres , getLicences };
