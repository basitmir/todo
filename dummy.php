// //read
// $sql= "SELECT * from test ORDER BY dueTask ";
// $statment=$connection->prepare($sql);
// $statment->execute();
// $result=$statment->fetchAll();

<?php



// try {
    
// //read
// $connection=new PDO($dsn,$username,$password,$options);
// $sql= "SELECT * from test";
// $statment=$connection->prepare($sql);
// $statment->execute();
// $result=$statment->fetchAll();


// } catch (PDOException $error) {
//     echo $sql. "<br>". $error->getMessage();

// }


?>
<!-- update -->

<?php






?>
         
           
          <script>
          console.log('<?= 'Sucessfully added task'?>');
          </script>
        
        <ul class="list-group list-group-flush">
                             <!-- here goes the task details -->
                             
                                    
                                    <li class="list-group-item bg-secondary border-0"><?=$data["task"]; ?>
                        
            
                                          <!-- Button trigger modal -->
                                        <button type="button" class="btn btn-primary btn-sm btn-danger float-right" data-toggle="modal" data-target="#exampleModalCenter" id="modalOpen">
                                          EDIT
                                        </button><br>
                                            <small class="text-center text-muted"><?=$data["dueTask"]; ?></small>

                                        <!-- Modal -->
                                        <form>
                                        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                          <div class="modal-dialog modal-dialog-centered" role="document">
                                              <div class="modal-content">
                                                  <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLongTitle">UPDATE</h5>
                                                  
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                          <span aria-hidden="true">&times;</span>
                                                        </button>
                                                  </div>
                                                    <div class="modal-body">
                                                            <div class="input-group mb-2">
                                                              <div class="input-group-prepend">
                                                              <div class="input-group-text">TASK</div>
                                                              </div>
                                                              <input type="text" name="task" class="form-control" id="inlineFormInputGroup" placeholder="Enter the task" required>
                                                            </div>
                                                          <div class="w-100"></div>
                                                          <div class="col-5 ml-5"></div>
                                                          <div class="form-check form-check-inline">
                                                              <input class="form-check-input" type="radio" name="radio" id="inlineRadio1" value="1">
                                                                <label class="form-check-label" for="inlineRadio1">1</label>
                                                        </div>
                                                                        <div class="form-check form-check-inline">
                                                                          <input class="form-check-input" type="radio" name="radio" id="inlineRadio2" value="2">
                                                                          <label class="form-check-label" for="inlineRadio2">2</label>
                                                                        </div>
                                                                        <div class="form-check form-check-inline">
                                                                          <input class="form-check-input" type="radio" name="radio" id="inlineRadio3" value="3">
                                                                          <label class="form-check-label" for="inlineRadio3">3</label>
                                                                        </div>
                                                                        <div class="form-check form-check-inline">
                                                                          <input class="form-check-input" type="radio" name="radio" id="inlineRadio4" value="4">
                                                                          <label class="form-check-label" for="inlineRadio4">4</label>
                                                                        </div>
                                                      
                                                    
                                                    </div>
                                                    <!-- modal body close -->
                                                    <div class="modal-footer">
                                                    
                                                      <input type="submit" data-dismiss="modal" name="submit1" value="Close" class="btn btn-primary btn-sm btn-primary"
                                                      id="btnClosePopup">

                                                      <input type="submit" name="submit2" value="SAVE" class="btn btn-primary btn-sm btn-danger">

                                                    </div>
                                              </div>
                                          </div>
                                        </div>
                                        </form>



                                    </li>
                          
                        
                              
                            
                      </ul>