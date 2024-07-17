<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header('Content-Type: application/json'); // pokenginang ito lang pala yung hayop na hinayupak kaya napakaliit ng manok ko naiiwan pa sa baba yung coke ko para mapagana yung query sa hinayupak na expo na yan 

    $CN = mysqli_connect("localhost", "root", "", "test2");

    if (!$CN) {
        die("Connection failed: " . mysqli_connect_error());
    }


    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    $memberNo = $DecodedData["m_no"];
    $memberName = $DecodedData["m_name"];
    $memberCourse = $DecodedData["m_course"];
    
    $IQ = $CN->prepare("INSERT INTO member (m_no, m_name, m_course) VALUES (?, ?, ?)");
    $IQ->bind_param("iss", $memberNo, $memberName, $memberCourse);
    
    if ($IQ->execute()) {
        $Message = "Member has registered";
    } else {
        $Message = "Server Error: " . $IQ->error;
    }
    
    $IQ->close();
    $CN->close();
    
    $Response []=array("Message"=>$Message);
    echo json_encode($Response);
?>
