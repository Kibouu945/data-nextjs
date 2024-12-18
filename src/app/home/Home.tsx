import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Bienvenue sur NYC Urban Data Analytics</h1>
        <p className="text-lg text-center mb-8">
          Une application interactive pour explorer les données de criminalité et de transport en libre-service de New York City.
        </p>
        
        <div className="flex justify-center gap-8">
          <Link href="/stations" passHref>
            <span className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300">
              Voir les Stations de Vélos
            </span>
          </Link>
          <Link href="/map" passHref>
            <span className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300">
              Voir la Carte
            </span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
