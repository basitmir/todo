$(function() {
  $('input[name="date"]').daterangepicker({
    minDate:moment(),
     singleDatePicker: true,
     showDropdowns: true,
  });
});


//ajax calls
$(document).ready(function(){
$('#getTaskData').submit(function(event){
         event.preventDefault();
         $.ajax({
             url: 'save.php',
             type: 'POST',
             dataType: 'JSON',
             data:{
             task: $('#task').val(),
             radio: $("input[name='radio']:checked").val(),
             date: $('#datepicker').val(),
         },
         success:function(data){
             alert(data);
            
         },
         error:function(){
          alert('Something went Wrong');

         },
     });
 });//submit close
});