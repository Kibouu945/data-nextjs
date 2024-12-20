const About = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Grand titre */}
      <h1 className="text-4xl font-bold text-center mb-8">
        Données Statistiques et de Transport en Libre-Service de New York City
      </h1>

      {/* Section 1 - Stations de Vélo et Transports en Libre-Service */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">I - Stations de Vélo et Transports en Libre-Service</h2>
        <p className="text-lg mb-4">
          New York City propose une multitude de stations de vélos en libre-service, permettant aux résidents et aux visiteurs de se
          déplacer facilement à travers la ville. Ces stations font partie intégrante du système de transport en commun de la ville,
          offrant une alternative écologique et pratique aux autres moyens de transport. En 2023, le nombre de stations et de vélos a
          considérablement augmenté, montrant l'engagement de la ville envers la mobilité durable.
        </p>
      </section>

      {/* Section 2 - Licences de Tabac et Cigarettes Électroniques */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">II - Licences de Tabac et Cigarettes Électroniques</h2>

        <p className="text-lg mb-4 font-bold">
          Titre : Comprendre l'impact des licences de détaillant : Une question de régularité et de santé publique
        </p>

        <p className="text-lg mb-4">
          <span className="font-semibold">Introduction :</span> Les licences de détaillant sont un moyen clé pour réguler la vente de tabac et de
          cigarettes électroniques à New York City. Ces licences jouent un rôle crucial dans la lutte contre la fraude et la protection
          de la santé publique. Respecter les limites de licences établies par les autorités est essentiel pour assurer un marché régulé
          et éviter les risques liés à la consommation de produits du tabac illégaux.
        </p>

        {/* Graphiques et Messages Clés */}
        <div className="space-y-6">
          {/* Carte 1 */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Plafond des Licences par District</h3>
            <p className="text-lg">
              Chaque district de New York City a un nombre limité de licences pour la vente de tabac et de cigarettes électroniques.
              Ce plafond vise à éviter une concentration excessive de détaillants, garantissant ainsi un contrôle efficace du marché.
              Respecter cette limite est crucial pour maintenir un équilibre et éviter une concurrence déloyale.
            </p>
            <p className="text-md font-bold text-red-500 mt-4">
              Message clé : Un nombre limité de licences est autorisé pour chaque district. Respectez les règles pour une meilleure régulation.
            </p>
          </div>

          {/* Carte 2 */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Licences Actuelles de Tabac</h3>
            <p className="text-lg">
              En analysant les données actuelles, on peut constater si les licences de tabac dépassent le plafond autorisé. Lorsqu'un
              nombre de licences excède cette limite, cela crée un environnement propice à la fraude, avec des détaillants opérant
              sans autorisation ou vendant des produits illégaux.
            </p>
            <p className="text-md font-bold text-red-500 mt-4">
              Message clé : Lorsque le nombre de licences dépasse le plafond, la fraude devient plus probable. Respectez les limites pour lutter
              contre les activités illégales.
            </p>
          </div>

          {/* Carte 3 */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Licences Actuelles de Cigarettes Électroniques</h3>
            <p className="text-lg">
              De manière similaire, les licences pour la vente de cigarettes électroniques doivent être surveillées et respectées.
              Un excès de licences peut entraîner des violations de la loi et des risques pour la santé publique, notamment en facilitant
              la vente de produits non réglementés.
            </p>
            <p className="text-md font-bold text-red-500 mt-4">
              Message clé : Les licences en excès peuvent mener à des violations de la loi et à des risques pour la santé.
            </p>
          </div>

          {/* Carte 4 */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Licences Disponibles vs. Plafond</h3>
            <p className="text-lg">
              Les districts qui n'ont pas atteint leur plafond de licences restantes offrent des opportunités pour régulariser le marché.
              Cela permet aux détaillants légaux de se conformer aux régulations tout en réduisant les risques de fraude.
            </p>
            <p className="text-md font-bold text-green-500 mt-4">
              Message clé : Les licences restantes représentent une chance de régulariser le marché. Profitez des opportunités légales pour
              réduire la fraude.
            </p>
          </div>
        </div>

        {/* Appels à l'Action */}
        <div className="text-center mt-8">
          <h3 className="text-2xl font-semibold mb-4">Appels à l’Action</h3>
          <p className="text-lg font-bold text-red-500 mb-4">
            Pour les fraudeurs : Restez dans la légalité pour éviter des sanctions sévères et protéger votre réputation.
          </p>
          <p className="text-lg font-bold text-green-500">
            Pour les fumeurs : Sachez où acheter des produits légaux pour votre sécurité et votre santé.
          </p>
        </div>
      </section>

      {/* Encourager la Responsabilité Sociale */}
      <section className="mt-12">
        <p className="text-lg mb-4">
          Il est important de souligner que le respect des régulations est essentiel pour protéger la santé publique. Les témoignages
          d'experts en santé ou des citations pertinentes peuvent servir à ajouter de la légitimité au message et à encourager un changement
          de comportement positif.
        </p>
      </section>
    </div>
  );
};

export default About;
