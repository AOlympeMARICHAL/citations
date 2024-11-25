<?php
header('Content-Type: application/json');

define('DB_SERVER', '192.168.56.13');
define('DB_USERNAME', 'operateur');
define('DB_PASSWORD', 'operateur');
define('DB_NAME', 'Citation');
// Créer une connexion
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);




// Vérifier la connexion
if ($conn->connect_error) {
    die(json_encode(["error" => "Échec de la connexion : " . $conn->connect_error]));
}

$sql = "SELECT * FROM citations";
$result = $conn->query($sql);

$citations = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $citations[] = [
            "id" => $row['id'],
            "texte" => $row['texte'],
            "auteur" => $row['auteur']
        ];
    }
}

$file = 'citations.json';
file_put_contents($file, json_encode($citations, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));





$method = $_SERVER['REQUEST_METHOD'];

if($method == 'GET'){
    echo json_encode($citations);
    
}
    

// Fermer la connexion
$conn->close();
?>
