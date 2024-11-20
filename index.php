<?php
// Lire les données du fichier JSON
$file = 'citations.json';

if (file_exists($file)) {
    $citations = json_decode(file_get_contents($file), true);
} else {
    $citations = [];
}
?>


<!DOCTYPE html>
<html lang="fr">
<head>
<link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
<link rel="shortcut icon" href="/favicon/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
<link rel="manifest" href="/favicon/site.webmanifest" />
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestion des Citations</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
        }
        h1 {
            color: #333;
        }
        .container {
            width: 80%;
            max-width: 800px;
            background: #fff;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            font-weight: bold;
            display: block;
            margin-bottom: 5px;
        }
        input[type="text"], button {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        button {
            background-color: #007BFF;
            color: white;
            border: none;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background-color: #0056b3;
        }
        .citation-list {
            margin-top: 20px;
        }
        .citation-item {
            background: #f9f9f9;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <h1>Gestion des Citations</h1>
    <div class="container">
        <div class="form-group">
            <label for="newCitation">Ajouter une nouvelle citation :</label>
            <input type="text" id="newAutor" placeholder="Saisir un Auteur">
            <input type="text" id="newCitation" placeholder="Saisir une citation">
        </div>
        <button onclick="addCitation()">Ajouter</button>

        <div class="form-group">
            <label for="searchCitation">Rechercher une citation :</label>
            <input type="text" id="searchCitation" placeholder="Recherche..." oninput="searchCitation()">
        </div>
        

        <h1>Liste des Citations</h1>
    <div class="citation-list">
        <?php if (!empty($citations)): ?>
            <?php foreach ($citations as $citation): ?>
                <div class="citation-item">
                    "<?php echo htmlspecialchars($citation['texte']); ?>" 
                    <span>- <?php echo htmlspecialchars($citation['auteur']); ?></span>
                </div>
            <?php endforeach; ?>
        <?php else: ?>
            <p>Aucune citation disponible.</p>
        <?php endif; ?>
    </div>
    </div>

    <script>
        fetch('api.php')
            .then(reponse =>{
                if (!reponse.ok){
                    throw new Error(`Erreur HTTP : ${reponse.statut}`);
                }
                return reponse.json();
            })
            .then(data => console.log(data))
            .catch(error => console.error('Erreur :', error));
    </script>
    
</body>
</html>