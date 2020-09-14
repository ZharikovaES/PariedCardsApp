let arr = [];
let numbersCard = new Array();

function gameCartFlip(){
    $('.game-card').toggleClass('game-card-hover');
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

function getArrayRandomCart(){
    for (let i = 0; i < 8; i++){
        arr.push(i);
        arr.push(i);
    }
    shuffle(arr);

    $('.game-card .back img').each(function(i, el){
        $(el).attr('src', `images/game-cards/space-${arr[i] + 1}.png`);
    });
}


$('.header__btn-start').on('click', function(){
    setTimeout(gameCartFlip, 3000);
    setTimeout(gameCartFlip, 5000);
    $('.game-card').each(function(i, el){
        $(el).on('click', function(){
            if (numbersCard.length < 2){
                $(this).toggleClass('game-card-hover');
            }
            if ($(this).hasClass('game-card-hover')){
                numbersCard.push(this);
                console.log(numbersCard);
            }
            if (numbersCard.length == 2){
                if ($(numbersCard[0]).find('img').attr('src')
                 == $(numbersCard[1]).find('img').attr('src')){
                    console.log("совпадение", numbersCard);
                    setTimeout(()=>{
                            $(numbersCard[0]).toggle(500);
                            $(numbersCard[1]).toggle(500);
                            numbersCard.length = 0;
                        }
                        ,3000)
                } else{
                    console.log("совпадений нет", numbersCard);
                    setTimeout(()=>{
                            $(numbersCard[0]).toggleClass('game-card-hover');
                            $(numbersCard[1]).toggleClass('game-card-hover');
                            numbersCard.length = 0;
                        }
                    ,3000)
                }
            }
        });
    });
    
});
getArrayRandomCart();