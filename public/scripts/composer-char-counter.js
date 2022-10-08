 $(document).ready(function(event) {
       
          $(".textareaclass").on('keydown', (event) =>{
            console.log("hello worlddddddddd")
              const newTweet = event.target.value.length
              const sumbitted= event
              console.log(event)
              const newValue =140 - newTweet
              
              $('.counter').val(newValue)
              console.log(newTweet)
              console.log(newValue<0)
              if(newValue<0){
                $('.counter').addClass("warning-text");
              }else{
                $('.counter').removeClass("warning-text");
              }
            
          })
          
          
      
        });
       


