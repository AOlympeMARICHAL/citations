
// Soluction ChatGPT

// const request = indexedDB.open("Citation", 1);

// request.onupgradeneeded = (event) =>{
//     const db = event.target.result;
//     if (!db.objectStoreNames.contains("citations")){
//         db.createObjectStore("citations", {keyPath: "id"});
//     }
// };

// request.onsuccess = (event) =>{
//     console.log("Base de données ouverte avec succès !")
//     const db = event.target.result;
// };

// request.onerror = (event) => {
//     console.error("Erreur :", event.target.error);
// };

// // Ajouter des données dans une table
// function ajouterDonnees(db, data){
//     const transaction = db.transaction("citations", "readwrite");
//     const store = transaction.objectStore("citations");

//     const ajout = store.add(data);

//     ajout.onsuccess = () => console.log("Donnée ajoutée !");
//     ajout.onerror = (event) => console.error("Erreur d'ajout :", event.target.error);
// }

// // ++++++ Exemple d'utilisation ++++++
// // request.onsuccess = (event) => {
// //     const db = event.target.result;
// //     ajouterDonnees(db, { id: 1, nom: "Jean", age: 30 });
// // };

// // Lire les données
// function lireDonnees(db, id) {
//     const transaction = db.transaction("citations", "readonly");
//     const store = transaction.objectStore("citations");
  
//     const lecture = store.get(id);
  
//     lecture.onsuccess = () => console.log("Donnée lue :", lecture.result);
//     lecture.onerror = (event) => console.error("Erreur de lecture :", event.target.error);
//   }
  
//   // Exemple d'utilisation
//   request.onsuccess = (event) => {
//     const db = event.target.result;
//     lireDonnees(db, 1);
//   };

function ouvrirBaseDeDonnees(nom, version, miseAJourCallback) { // OK
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(nom, version);
  
      request.onupgradeneeded = (event) => {
        console.log("Mise à jour ou création de la base de données...");
        const db = event.target.result;
        if (miseAJourCallback) miseAJourCallback(db);
      };
  
      request.onsuccess = (event) => {
        console.log("Base de données ouverte avec succès !");
        resolve(event.target.result);
      };
  
      request.onerror = (event) => {
        console.error("Erreur d'ouverture :", event.target.error);
        reject(event.target.error);
      };
    });
  };

  async function recupData(url) { // OK
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erreur connexion : ${response.status}`);
      }
      const donnees = await response.json();
      console.log("Données récupérées :", donnees);
      return donnees;
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      throw error;
    }
  };



  async function synchroDB(db, storeName, donnees) { // ERREUR
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
  
      donnees.forEach((item) => {
        store.put(item); // Utilise `put` pour insérer ou mettre à jour automatiquement
      });
  
      transaction.oncomplete = () => {
        console.log("Synchronisation terminée !");
        resolve();
      };
  
      transaction.onerror = (event) => {
        console.error("Erreur de synchronisation :", event.target.error);
        reject(event.target.error);
      };
    });
  };

  // -------------------------------------



  async function ajouterDonnees(db, storeName, donnees) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
  
      const request = store.add(donnees);
  
      request.onsuccess = () => {
        console.log("Donnée ajoutée :", donnees);
        resolve(donnees);
      };
  
      request.onerror = (event) => {
        console.error("Erreur d'ajout :", event.target.error);
        reject(event.target.error);
      };
    });
  };

  async function lireDonnees(db, storeName, id) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
  
      const request = store.get(id);
  
      request.onsuccess = () => {
        console.log("Donnée lue :", request.result);
        resolve(request.result);
      };
  
      request.onerror = (event) => {
        console.error("Erreur de lecture :", event.target.error);
        reject(event.target.error);
      };
    });
  };

  async function mettreAJourDonnees(db, storeName, donnees) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
  
      const request = store.put(donnees);
  
      request.onsuccess = () => {
        console.log("Donnée mise à jour :", donnees);
        resolve(donnees);
      };
  
      request.onerror = (event) => {
        console.error("Erreur de mise à jour :", event.target.error);
        reject(event.target.error);
      };
    });
  };

  async function supprimerDonnees(db, storeName, id) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
  
      const request = store.delete(id);
  
      request.onsuccess = () => {
        console.log(`Donnée avec ID ${id} supprimée.`);
        resolve(id);
      };
  
      request.onerror = (event) => {
        console.error("Erreur de suppression :", event.target.error);
        reject(event.target.error);
      };
    });
  };
  
  
  