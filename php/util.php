<?php

/**
 * Created by PhpStorm.
 * User: jonas-uni
 * Date: 21.01.2017
 * Time: 15:04
 */
class util {

    public static function getRealPOST() {

        $pairs = explode("&", file_get_contents("php://input"));
        $vars = array();

        foreach ($pairs as $pair) {

            $nv = explode("=", $pair);
            $name = urldecode($nv[0]);
            $value = urldecode($nv[1]);
            $vars[$name] = $value;

        }

        return $vars;
    }
}