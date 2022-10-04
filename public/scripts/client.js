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
    /*
  //Creating the basic html structure for the artciel and what will contain it
      let creatingNewArticle = $(`<article class="articleSection">`); 
      let creatingNewHeader= $(`<header class="header">`)
      let creatingNewName=$(`<span  class="header">`);
      let creatingNewAvatar=$(`<img class="name">`);
      let creatingNewHandler=$(`<span  class="header">`);
      let creatingNewContent=$(`<p class="content">`);
      let creatingNewErrorMessage=$('<p class="error"><i class="fa-solid fa-triangle-exclamation triangleColor"></i>Too long Plz resepect our aribitary limit of 140 chars.#kthxbye<i class="fa-solid fa-triangle-exclamation triangleColor"></i></p>')
      let creatingNewSymbol=$(`<div><i class="fa-solid fa-flag color" ></i><i class="fa-solid fa-arrows-spin color"></i><i class="fa-solid fa-heart color"></i></div>`);
      let creatingNewTimeElement=$(`<div>`);
      let creatingNewFooter=$(`<footer class="footerSection">`);
      //Creating the basic inseration text for these element
      creatingNewName.text(tweets.user.name)
      creatingNewAvatar.text(tweets.user.avatars)
      creatingNewHandler.text(tweets.user.handle)
      creatingNewContent.text(tweets.content.text)
      creatingNewTimeElement.text(timeago.format(tweets.created_at))

      //appending header
      creatingNewHeader.append(creatingNewName)
      creatingNewHeader.append(creatingNewHandler)

      //appending Foorter
      //appending header
      creatingNewFooter.append(creatingNewTimeElement)
      creatingNewFooter.append(creatingNewSymbol)

      //Appeding Element to article
      creatingNewArticle.append(creatingNewHeader)
      creatingNewArticle.append(creatingNewAvatar)
      //creatingNewArticle.append(creatingNewHandler)
      creatingNewArticle.append(creatingNewContent)
      //creatingNewArticle.append(creatingNewSymbol)
      creatingNewArticle.append(creatingNewFooter)
   */
    // let creatingNewArticle = $("<article class= articleSection>")

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
       <span><h5>${timeago.format(tweets.created_at)}</h5></span>
       <span>
       <i class="fa-solid fa-flag" ></i>
       <i class="fa-solid fa-arrows-spin"></i>
       <i class="fa-solid fa-heart"></i>
       </span>
       </footer>
       </article>`;

    return contentFlow;

    //creatingNewArticle.append(creatingNewFooter)
    // return creatingNewArticle;
    //return $tweet;
  };

  /*const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }

];
const tweetData = {
  user: {
    name: "Newton",
    avatars: "https://i.imgur.com/73hZDYK.png",
    handle: "@SirIsaac",
  },
  content: {
    text: "If I have seen further it is by standing on the shoulders of giants",
  },
  created_at: 1461116232227,
};
*/
  //const $tweet = createTweetElement(tweetData);
  //renderTweets(data);

  //console.log(tweetData.user.name)
  //console.log(createTweetElement())
  //$(".tweet-container").append($tweet)
  //console.log("testing", $tweet);
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
        renderTweets(data);
      });
    });
  });
});

/*$.ajax({
      method:'Get'
  }).then((response) => {
      let newArticle= createTweetElement(response)
  
      $('section').append(createTweetElement(newArticle))
  })*/
