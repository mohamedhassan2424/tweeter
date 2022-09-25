$(document).ready(function(event) {
    // --- our code goes here ---
    //console.log("Hello World #tweet-text")
    $(".textareaclass").on('keypress', (event) =>{
        //console.log("HelloWorld")
        const newTweet = event.target.value.length
        const newValue =140 - newTweet
        $('.counter').val(newValue)
        //console.log(event)
        //console.log(newTweet)
    })
    
    //const lengthInput = newTweet.on("change", function(event){
     //   event.length

  });
  $(document).on("blur", function(event){
    //console.log(event)
  })




