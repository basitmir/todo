$(function() {
  $('input[name="date"]').daterangepicker({
     minDate:moment(),
     singleDatePicker: true,
     showDropdowns: true,
  });
});


//ajax calls
$(document).ready(function(){ 

  $('#search').click(function(){
    $('#search').val('');
  });

  $('[data-toggle="tooltip"]').tooltip(); 
    
showData();


//insert task into database
$('#getTaskData').submit(function(event){
  event.preventDefault();
        saveTask();  
 });//submit close

 $('#search').keyup(function(){
  var search = $('#search').val();
  if(search){
        searchTask();
    
  }
  else{
    showData();
  }
   
 });//search close

//delete task
$(document).on('click','.btnclk',function(){
  var id =$(this).attr('id');
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to retrieve TASK!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
               deleteTask(id);
    } 
  });
      
  });//close function

//update data
$(document).on('dblclick','#modal',function(){
    $('#exampleModalCenter').modal('show');
  var id= $(this).children('.btn').attr('id');
    $('.modal-footer').attr('id',id);
      singleTask(id);
          });//show close

          //update task
$(document).on('click','#updateTask',function(){
  var id= $(this).parent('.modal-footer').attr('id');
  updateTask(id);
});//close function
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
      swal({
        title: "Something Went Wrong",
        text: "Try Again Later",
        icon: "error",
        button: "OK",
      });
    }


    });
}


function deleteTask(id){                   
  $.ajax({
    url:'save.php?action=delete',
    type:'POST',
    dataType:'JSON',
    data:{id:id},
    success:function(){
      showData();
      swal({
        title: "Task Deleted Successfully",
        icon: "success",
        button: "OK",
        timer: 1500,
      });
    
    },
    error:function(){
      swal({
        title: "Something Went Wrong",
        text: "Try Again Later",
        icon: "error",
        button: "OK",
      });
     
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
  success:function(task){
    swal({
      title: task,
      text: "Task Added Successfully",
      icon: "success",
      button: "OK",
      timer: 1500,
    });
      showData();
      
  },
  error:function(){
    swal({
      title: "Something Went Wrong",
      text: "Try Again Later",
      icon: "error",
      button: "OK",
    });
   

  },
});
}

function singleTask(id){
  
  $.ajax({
    url:'save.php?action=current',
    type:'GET',
    dataType:'JSON',
    data:{id:id},
    success:function(data){
      // console.log(data);
      $('#updateTaskData').val(data[0].task);
      $('input[name=updateradio][value="'+data[0].position+'"]').prop("checked",true);
      $('#datepicker1').val(data[0].dueTask);
      // console.log('success');
    },
    error:function(){
      // console.log('error');
    },
});
}

function updateTask(id){

  $.ajax({
    url: 'save.php?action=update',
    type: 'POST',
    dataType: 'JSON',
    data:{
    id:id,
    task: $('#updateTaskData').val(),
    position: $("input[name='updateradio']:checked").val(),
    date: $('#datepicker1').val(),
},
success:function(data){
  $('#exampleModalCenter').modal('hide');
  swal({
    title: data,
    text: "Task Updated Successfully",
    icon: "success",
    button: "OK",
    timer: 1500,
  });
    showData();
    
},
error:function(){
  $('#exampleModalCenter').modal('hide');
  swal({
    title: "Something Went Wrong",
    text: "Try Again Later",
    icon: "error",
    button: "OK",
  });
 

},
});
}

function searchTask(){
  var search = $('#search').val();
  $.ajax({
    url: 'save.php?action=search',
    type: 'POST',
    dataType: 'JSON',
    data:{
    search: search,
},
success:function(data){
  if(data.length>0){
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
  }//if close
  

   
 },

});
  
}