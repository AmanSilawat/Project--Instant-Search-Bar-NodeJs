<?php


    // $res = $_GET['q'];

    // var_dump($res);

    // header('Content-Type: application/json');

    echo json_encode(
        array(
        "firstName" => "User1",
        "lastName" => "Last1",
        "occupation" => "Chief Executive Officer",
        "href" => "/people/view/1414"
        )
    );
?>