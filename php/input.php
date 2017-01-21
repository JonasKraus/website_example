<?php
/**
 * Created by PhpStorm.
 * User: jonas-uni
 * Date: 20.01.2017
 * Time: 19:28
 */

include("../php/databaseManager.php");
include("../php/util.php");

// Set header for json response
header('Content-Type: application/json');

try {

    // getting post vars
    $postParams = util::getRealPOST();

    // Instantiate new Database
    $database = new databaseManager();

    if (isset($postParams['action'])) {

        switch ($postParams['action']) {

            case 'saveText':

                // call method
                $success = $database->saveText($postParams['param1']);

                $response = array (
                    'success'=> $success
                );

                echo json_encode($response);
                break;

            case 'getText':

                // method call
                $data = $database->getText();

                $response = array (
                    'success'=> true,
                    'data'=> $data
                );

                echo json_encode($response);
                break;

            default:

                echo json_decode(
                    array (
                        'success'=> false,
                        'message'=> 'unknown action'
                    )
                );
        }
    }

} catch (PDOException $e) {

    echo "Error: " . $e->getMessage();
}
