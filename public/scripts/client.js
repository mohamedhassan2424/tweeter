/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$("document").ready(function () {
  $(".errorWarning").css("display", "none")
  const renderTweets = function (tweet) {
    $(".tweet-container").empty();
    for (let indivdualTweet of tweet) {
      let tweetElement = createTweetElement(indivdualTweet);
      $(".tweet-container").prepend(tweetElement);
    }
  };

  const createTweetElement = function (tweets) {
   

    let contentFlow = `
        <article class= "articleSection">
       <header>
       <div class="tweetComponents">
       <div class="itemValue"><img src="${tweets.user.avatars}">
       ${tweets.user.name}
       </div>
        <div class="otherContent">
       <p>${tweets.user.handle}</p>
       </div>
       </div>

       </header>
       <div class="contentTweet">
       <p>${tweets.content.text}</p>
       </div>
       <footer>
       <div class="footerValue">
       <div><h5>${timeago.format(tweets.created_at)}</h5></div>
       <div class="mainColorBlue">
       <i class="fa-solid fa-flag" ></i>
       <i class="fa-solid fa-arrows-spin"></i>
       <i class="fa-solid fa-heart"></i>
       </div>
       </div>
       </footer>
       </article>`;

    return contentFlow;
  };
  const loadTweets = function () {
    $.ajax({
      type: "GET",
      url: "/tweets",
      success: (result) => {
        console.log(result);

        renderTweets(result);
      },
    });
  };
  loadTweets()
  // jQuery.timeago(new Date());
  $(".tweeter-form").on("submit", function (event) {
    event.preventDefault();
    const textArea = $(".textareaclass");
    const counter = $(".counter");
    const messagesOutput = $(".messagesOutput");
    const textAreaValue = textArea.val();
    if(textAreaValue.trim()==="" || textAreaValue.trim()===null){
     return messagesOutput.text("Please text something, nothing is being inputed");
    }
  const boobelanValue= textAreaValue.length>140;
  console.log(boobelanValue)
  
  if(boobelanValue){
    $(".errorWarning").show()
        $(".counterChangeColor").show()
      setTimeout(()=>{
        $(".errorWarning").hide()
        $(".counterChangeColor").hide()
      },3000)

      return messagesOutput.text("Your input has excedded input limit of 140");
  }
    const data = $(this).serialize();
    console.log($(this).serialize());
    $.ajax({
      method: "POST",
      data: data,
      url: "/tweets",
    }).then((response) => {
      $.ajax({
        type: "GET",
        url: "/tweets",
      }).then((data) => {
        $(".counter").val(140)
        $(".textareaclass").val("")
        renderTweets(data);
      });
    });
  });
});

