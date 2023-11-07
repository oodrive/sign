<?php

require_once 'vendor/autoload.php';
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
include('utils.php');

session_start();
$base_url = $_SESSION['base_url_swagger'];
$token = $_SESSION['token'];
$cdi = $_SESSION['cdi'];
$contract_id = $_SESSION['contract_id'];
$actor_id = $_SESSION['actor_id'];
$contractor_id = $_SESSION['contractor_id'];

$client = new Client([
    'timeout'  => 30.0,
]);

try {
    if (isset($_GET['contractor_id'])) {
        $contractor_id = intval($_GET['contractor_id']);
        
        // Construct the payload
        $payload = [
            "recipient_id" => $contractor_id,
                "options" => [
                "duration_in_minutes" => 15,
                "hide_header" => true,
                "enable_iframe" => true
            ]
        ];

        // Send the request to generate the signature link
        $resp_sl = $client->request('POST', "$base_url/contracts/$contract_id/transaction/signaturelink", [
            'headers' => [
                'j_token' => $token,
                'Content-type' => 'application/json',
                'Accept' => 'application/json'
            ],
            'json' => $payload // Send the payload as JSON
        ]);

        $resp_obj = json_decode($resp_sl->getBody()->getContents());
        $signature_link = $resp_obj->signature_link;

        $resp_json = array('code' => $resp_sl->getStatusCode(), 'response' => $signature_link);
        echo json_encode($resp_json);
    } else {
        $resp_json = array('code' => 400, 'response' => 'Contractor ID is missing.');
        echo json_encode($resp_json);
    }
} catch (RequestException $e) {
    $resp_json = array('code' => 400, 'response' => $e->getMessage());
    echo json_encode($resp_json);
}
?>
