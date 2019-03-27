<?php
require "config.php";

    switch ($_GET['action']) {

 case'show':{
                    try {
                        //read
                        $connection=new PDO($dsn, $username, $password, $options);
                        $sql= "SELECT * from test";
                        $statment=$connection->prepare($sql);
                        $statment->execute();
                        $result=$statment->fetchAll();
                        echo json_encode($result);
                    } catch (PDOException $error) {
                        echo $sql. "<br>". $error->getMessage();
                    }
                   }break;
 case 'save':{
                try {
                    $edate=strtotime($_POST['date']); 
                    $edate=date("Y-m-d",$edate);
                    $connection=new PDO($dsn, $username, $password, $options);
                    $sql="INSERT into test(task,position,dueTask)values(:task,:position,:dueTask)";
                    $statment=$connection->prepare($sql);
                    $statment->bindParam(":task", $_POST['task'], PDO::PARAM_STR);
                    $statment->bindParam(":position", $_POST['radio'], PDO::PARAM_STR);
                    $statment->bindParam(":dueTask", $edate, PDO::PARAM_STR);
                    $statment->execute();
                    $message="Task Added Successfully";
                    echo json_encode($message);
                } catch (PDOException $error) {
                    echo "in the error";
                    echo $sql. "<br>". $error->getMessage();
                }
           }break;


} //switch close

  
       
   
?>