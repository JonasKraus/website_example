<?php

/**
 * Created by PhpStorm.
 * User: jonas-uni
 * Date: 20.01.2017
 * Time: 19:52
 */

include("../php/databaseConstants.php");

class databaseManager {

    private $conn;
    /**
     * Database_progress_timestamp constructor.
     */
    public function __construct()
    {
        $servername = databaseConstants::$SERVER_NAME;
        $username = databaseConstants::$USER_NAME;
        $password = databaseConstants::$PASSWORD;
        $dbname = databaseConstants::$DATABASE_NAME;

        try {

            // Create connection
            $this->conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

            // set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        } catch (PDOException $e) {

            var_dump($e->getMessage());
        }
    }


    /**
     * @param $text
     * @return bool
     */
    public function saveText($text) {

        $sqlPrepared = $this->conn->prepare("INSERT INTO text (text) VALUES (:text)");
        $sqlPrepared->bindParam(":text", $text);

        if ($sqlPrepared->execute() === TRUE) {

            return true;
        } else {
            return false;
        }
    }


    /**
     * @return array
     */
    public function getText() {

        $sqlPrepared = $this->conn->prepare("SELECT * FROM text");

        $sqlPrepared->execute();

        // Fetch data ass assoc array
        $results = $sqlPrepared->fetchAll(PDO::FETCH_ASSOC);

        return $results;
    }


}