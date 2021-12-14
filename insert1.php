<?php
    include('dbConnection1.php');

    $mydata = stripslashes(file_get_contents("php://input"));
    $data=json_decode($mydata,true);

    $id=$data['id'];
    $name=$data['name'];
    $email=$data['email'];
    $password=$data['password'];

    if(!empty($name) && !empty($email) && !empty($password)){
        $sql="INSERT INTO student(id,name,email,password) VALUES ('$id','$name','$email','$password') ON DUPLICATE KEY UPDATE name='$name', email='$email', password='$password'";
        if($conn->query($sql)==TRUE){
            echo "Student saved successfully";
        }
        else{
            echo "Unable to enter details";
        }
    }
    else{
        echo "pls fill all fields";
    }
?>