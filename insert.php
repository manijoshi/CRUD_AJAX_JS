<?php
    include('dbConnection.php');
    $data=stripslashes(file_get_contents("php://input"));
    $mydata=json_decode($data,true);//convert json data to php object
    $id = $mydata['id'];
    $name=$mydata['name'];
    $email=$mydata['email'];
    $password=$mydata['password'];

    if(!empty($name) && !empty($email) && !empty($password)){
        $sql="INSERT INTO student(id,name,email,password) VALUES ('$id','$name','$email','$password') ON DUPLICATE KEY UPDATE name='$name', email='$email', password='$password'";
        if($conn->query($sql)==TRUE){
            echo "Student saved successfully";
        }
        else{
            echo "Unable to save details of student";
        }
    }
    else{
        echo "Fill all fields";
    }
    
?>