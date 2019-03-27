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
 });//submit close
});

function showData(){
  $.ajax({
    url:'save.php?action=show',
    type:'GET',
    dataType:'JSON',
    success:function(data){
     console.log(data);
     $('#task1,#task2,#task3,#task4').empty();
      for(var i=0; i<data.length ; i++){
        if(data[i].position==1){
          $('#task1').append(
            '<li class="list-group-item bg-secondary border-0">'+data[i].task+' '+
                  '<button type="button" class="btn btn-primary btn-sm btn-danger float-right" data-toggle="modal" data-target="#exampleModalCenter" id="modalOpen">'+
                    'DELETE'+
                  '</button><br>'+
                '<small class="text-center text-muted">'+data[i].dueTask+'</small>'+
             '</li>'
                            );
          {/* append close */}
        }

          if(data[i].position==2){
            $('#task2').append(
              '<li class="list-group-item bg-secondary border-0">'+data[i].task+' '+
                    '<button type="button" class="btn btn-primary btn-sm btn-danger float-right" data-toggle="modal" data-target="#exampleModalCenter" id="modalOpen">'+
                      'DELETE'+
                    '</button><br>'+
                  '<small class="text-center text-muted">'+data[i].dueTask+'</small>'+
               '</li>'
                              );
            {/* append close */}
        }

        if(data[i].position==3){
          $('#task3').append(
            '<li class="list-group-item bg-secondary border-0">'+data[i].task+' '+
                  '<button type="button" class="btn btn-primary btn-sm btn-danger float-right" data-toggle="modal" data-target="#exampleModalCenter" id="modalOpen">'+
                    'DELETE'+
                  '</button><br>'+
                '<small class="text-center text-muted">'+data[i].dueTask+'</small>'+
             '</li>'
                            );
          {/* append close */}
      }

      if(data[i].position==4){
        $('#task4').append(
          '<li class="list-group-item bg-secondary border-0">'+data[i].task+' '+
                '<button type="button" class="btn btn-primary btn-sm btn-danger float-right" data-toggle="modal" data-target="#exampleModalCenter" id="modalOpen">'+
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