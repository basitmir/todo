<?php
require "config.php";

    switch ($_GET['action']) {

 case'show':{
                    try {
                        //read
                        $connection=new PDO($dsn, $username, $password, $options);
                        $sql= "SELECT * from test ORDER BY dueTask DESC";
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
                    $message=$_POST['task'];
                    echo json_encode($message);
                } catch (PDOException $error) {
                    echo "in the error";
                    echo $sql. "<br>". $error->getMessage();
                }
           }break;

   case 'delete':{
    try {
        $connection=new PDO($dsn, $username, $password, $options);
        $sql="DELETE from test where id=:id";
        $statment=$connection->prepare($sql);
        $statment->bindParam(":id",$_POST['id'], PDO::PARAM_STR);
        $statment->execute();
        $message="Task deleted Successfully";
        echo json_encode($message);
    } catch (PDOException $error) {
        echo "in the error";
        echo $sql. "<br>". $error->getMessage();
    }
   }break;

   case 'current':{
    try {
        $connection=new PDO($dsn, $username, $password, $options);
        $sql="SELECT * from test where id=:id";
        $statment=$connection->prepare($sql);
        $statment->bindParam(":id",$_GET['id'], PDO::PARAM_STR);
        $statment->execute();
        $result=$statment->fetchAll();
        echo json_encode($result);
    } catch (PDOException $error) {
        echo "in the error";
        echo $sql. "<br>". $error->getMessage();
    }
   }break;

   case 'update':{
    try {
        $edate=strtotime($_POST['date']); 
        $edate=date("Y-m-d",$edate);
        $connection=new PDO($dsn, $username, $password, $options);
        $sql="UPDATE test set task=:task,position=:position,dueTask=:dueTask where id=:id";
        $statment=$connection->prepare($sql);
        $statment->bindParam(":task", $_POST['task'], PDO::PARAM_STR);
        $statment->bindParam(":position", $_POST['position'], PDO::PARAM_STR);
        $statment->bindParam(":dueTask", $edate, PDO::PARAM_STR);
        $statment->bindParam(":id", $_POST['id'], PDO::PARAM_STR);
        $statment->execute();
        $message=  $_POST['task'];
        echo json_encode($message);
    } catch (PDOException $error) {
        echo "in the error";
        echo $sql. "<br>". $error->getMessage();
    }
}break;

case 'search':{
    $search= $_POST['search'];
    if(!empty($search)){
    try {
        $connection=new PDO($dsn, $username, $password, $options);
        $sql="SELECT  * from test where task LIKE '$search%'";
        $statment=$connection->prepare($sql);
        $statment->execute();
        $result=$statment->fetchAll();
        echo json_encode($result);
    } catch (PDOException $error) {
        echo "in the error";
        echo $sql. "<br>". $error->getMessage();
    }
 }//if close
}break;
   
} //switch close

  
       
   
?>