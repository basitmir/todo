$(function() {
  $('input[name="date"]').daterangepicker({
     minDate:moment(),
     singleDatePicker: true,
     showDropdowns: true,
  });
});


//ajax calls
$(document).ready(function(){  
showData();


//insert task into database
$('#getTaskData').submit(function(event){
  event.preventDefault();
        saveTask();  
 });//submit close

//delete task
$(document).on('click','.btnclk',function(){
      deleteTask();
  });//close function

//update data
$(document).on('dblclick','#modal',function(){
    
    $('#exampleModalCenter').modal('show');
 
  var id= $(this).children('.btn').attr('id');
      updateTask(id);
          });//update close

        })

function showData(){
  $.ajax({
    url:'save.php?action=show',
    type:'GET',
    dataType:'JSON',
    success:function(data){
     $('#task1,#task2,#task3,#task4').empty();
      for(var i=0; i<data.length ; i++){
        if(data[i].position==1){
          $('#task1').append(
            '<li class="list-group-item bg-secondary border-0" data-toggle="modal" id="modal">'+data[i].task+' '+
                  '<button type="button" class="btn btn-primary btn-sm btn-danger float-right btnclk" id="'+data[i].id+'">'+
                    'DELETE'+
                  '</button><br>'+
                '<small class="text-center text-muted">'+data[i].dueTask+'</small>'+
             '</li>'
                            );
          {/* append close */}
        }

          if(data[i].position==2){
            $('#task2').append(
              '<li class="list-group-item bg-secondary border-0" data-toggle="modal" id="modal">'+data[i].task+' '+
                    '<button type="button" class="btn btn-primary btn-sm btn-danger float-right  btnclk" id="'+data[i].id+'">'+
                      'DELETE'+
                    '</button><br>'+
                  '<small class="text-center text-muted">'+data[i].dueTask+'</small>'+
               '</li>'
                              );
            {/* append close */}
        }

        if(data[i].position==3){
          $('#task3').append(
            '<li class="list-group-item bg-secondary border-0" data-toggle="modal" id="modal">'+data[i].task+' '+
                  '<button type="button" class="btn btn-primary btn-sm btn-danger float-right  btnclk" id="'+data[i].id+'">'+
                    'DELETE'+
                  '</button><br>'+
                '<small class="text-center text-muted">'+data[i].dueTask+'</small>'+
             '</li>'
                            );
          {/* append close */}
      }

      if(data[i].position==4){
        $('#task4').append(
          '<li class="list-group-item bg-secondary border-0" data-toggle="modal" id="modal">'+data[i].task+' '+
                '<button type="button" class="btn btn-primary btn-sm btn-danger float-right  btnclk" id="'+data[i].id+'">'+
                  'DELETE'+
                '</button><br>'+
              '<small class="text-center text-muted">'+data[i].dueTask+'</small>'+
           '</li>'
                          );
        {/* append close */}
    }
         
      }
      // for close


      
    },
    error:function(){
      console.log('error');
    }


    });
}


function deleteTask(){
  var id =$(this).attr('id');
                      
  $.ajax({
    url:'save.php?action=delete',
    type:'POST',
    dataType:'JSON',
    data:{id:id},
    success:function(data){
    console.log(data);
    console.log('sucess');
    showData();
    },
    error:function(){
      console.log('error');
    }


  });
}

function saveTask(){
  
  $.ajax({
      url: 'save.php?action=save',
      type: 'POST',
      dataType: 'JSON',
      data:{
      task: $('#task').val(),
      radio: $("input[name='radio']:checked").val(),
      date: $('#datepicker').val(),
  },
  success:function(data){
      alert(data);
      showData();
      
  },
  error:function(){
   alert('Something went Wrong');
   

  },
});
}

function updateTask(id){
  
  $.ajax({
    url:'save.php?action=current',
    type:'GET',
    dataType:'JSON',
    data:{id:id},
    success:function(data){
      console.log(data);
      $('#updateTask').val(data[0].task);
      $('input[name=radio][value="'+data[0].position+'"]').prop("checked",true);
      $('#datepicker1').val(data[0].dueTask);
      console.log('success');
    },
    error:function(){
      console.log('error');
    },
});
}