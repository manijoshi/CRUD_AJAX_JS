<?php
    include("dbConnection.php");
    $data=stripslashes(file_get_contents("php://input"));
    $mydata=json_decode($data,true);//true=associative array
    $id=$mydata['sid'];
    
    if(!empty($id)){
        $sql = "DELETE FROM student WHERE id = {$id}";
        if($conn->query($sql)===TRUE){
            echo "Student deleted successfully";
        }
        else{
            echo "Unable to delete student details";
        }

    }
    else{
        echo "plz fill all fields";
    }
?>