let arr = [];
let numbersCard = new Array();

function gameCartFlip(){
    $('.game-card').toggleClass('game-card-hover');
}
function hideCartFlip(){
    gameCartFlip();
    $('.header__btn-start').removeAttr('disabled', false);
    $('.game-card').each(function(i, el){
        $(el).on('click', clickCard);
    });    
    setTimeout(showTime, 1000, 0, 0, 1);
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

let clickCard = function(){
    if (numbersCard.length < 2){
        $(this).toggleClass('game-card-hover');
    }
    if ($(this).hasClass('game-card-hover')){
        numbersCard.push(this);
    }
    if (numbersCard.length == 2){
        if ($(numbersCard[0]).find('img').attr('src')
         == $(numbersCard[1]).find('img').attr('src')){
            console.log("совпадение", numbersCard);
            setTimeout(()=>{
                $(numbersCard[0]).toggle(500, 'linear');
                $(numbersCard[1]).toggle(500, 'linear');
                numbersCard.length = 0;
            }, 2000);
        } else{
            console.log("совпадений нет", numbersCard);
            setTimeout(()=>{
                    $(numbersCard[0]).toggleClass('game-card-hover');
                    $(numbersCard[1]).toggleClass('game-card-hover');
                    numbersCard.length = 0;
                }
            ,2000);
        }
    }
}

$('.header__btn-start').on('click', function(){
    if ($(this).attr('data-state') == 'start'){
        $(this).attr('disabled', true);
        $(this).text("Стоп");
        $(this).attr('data-state', 'stop');

        setTimeout(gameCartFlip, 3000);
        setTimeout(hideCartFlip, 5000);
    
    } else if ($(this).attr('data-state') == 'stop'){
        $(this).text("Начать игру!");
        $(this).attr('data-state', 'start');

        $('.game-card').each(function(){
            if ($(this).hasClass('game-card-hover')){
                $(this).toggleClass('game-card-hover');
            }

            if ($(this).is(':hidden')){
                $(this).toggle(500);
            }

            $('.game-card').each(function(i, el){
                $(el).unbind('click', clickCard)});
    
        });
        numbersCard.length = 0;
    }    
});

function showTime(hour, minutes, seconds){
    if (seconds == 59){
        minutes++;
        seconds = 0;
    }
    if (minutes == 59){
        hour++;
        minutes = 0;
    }
    if (hour == 24){
        hour = minutes = seconds = 0;
    }

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    hour = hour < 10 ? '0' + hour : hour;

    $('.header__clock').text(hour + ':' + 
    minutes + ':' + seconds);

    if ($(".header__btn-start").attr("data-state") == 'start'){
        $('.header__clock').text('00:00:00');
        return;
    }
    setTimeout(showTime, 1000, +hour, +minutes, ++seconds);
}


getArrayRandomCart();