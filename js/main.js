$(document).ready( function(){

  var match = [];
  var selection = []

  displayShuffle();
  $("img").hide();

  $(".card").on("click", function(){

    if (selection.length === 2){
      selection = [];
    }

    $(this).children().show();
    id = $(this).attr("id");
    selection.push(id);
    checkSelection(match, selection);

  });

  function checkSelection(match, selection){
    if (selection.length === 2){
      console.log(selection);
      if (selection[0] === selection[1]){
        $("#" + selection[0]).children().hide()
        $("#" + selection[1]).children().hide()
        return;
      } else {
        cardComparison(match, selection);
      }
    }else{
      return;
    }
  }

  function cardComparison(match, selection){

    var cardAImg = ($("#" + selection[0]).children().attr("src"));
    var cardBImg = ($("#" + selection[1]).children().attr("src"));

    var cardADiv = ($("#" + selection[0]).children());
    var cardBDiv = ($("#" + selection[1]).children());

    if (cardAImg === cardBImg) {
      $("#" + selection[0]).show();
      $("#" + selection[1]).show();
      match.push(cardAImg);
      match.push(cardBImg);
      if (match.length === 16){
        $("h1").text("You win!");
      } else {
        return;
      }
    }
    else {
      setTimeout(function() {
        $(cardADiv).hide();
      }, 500);
      setTimeout(function() {
        $(cardBDiv).hide();
      }, 500);
      return;
    }
  }

  // Fisher-Yates (aka Knuth) Shuffle

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  function displayShuffle(){
    var picIDs = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    var shuffledPics = shuffle(picIDs);

    for (var i = 0; i < shuffledPics.length; i++){
      $(".card").each(function(i, card) {
        $(card).html("<img src=./images/" + shuffledPics[i] + ".png>");
      });
    }
  }
});
