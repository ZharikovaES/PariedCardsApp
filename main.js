let arr = [];
let numbersCard = new Array();

function gameCartFlip(){
    $('.game-card').toggleClass('game-card-hover');
}
function hideCartFlip(){
    gameCartFlip();
    $('.header__btn-start').attr('disabled', false);
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
    arr.length = 0;
    for (let i = 0; i < 8; i++){
        arr.push(i);
        arr.push(i);
    }
    shuffle(arr);

    $('.game-card .back img').each(function(i, el){
        $(el).attr('src', `images/game-cards/space-${arr[i] + 1}.png`);
    });
}

function defaultsCards(btnStart){
    btnStart.text("Начать игру!");
    btnStart.attr('data-state', 'start');

    $('.game-card').each(function(){
        if ($(this).hasClass('game-card-hover')){
            $(this).toggleClass('game-card-hover');
        }

        if ($(this).is(':hidden')){
            $(this).toggle(500);
        }

        $(this).unbind('click', clickCard);
    });
    numbersCard.length = 0;

}

let clickCard = function(){
    if (numbersCard.length < 2){
        $('.header__btn-start').attr('disabled', true);

        $(this).toggleClass('game-card-hover');
        if ($(this).hasClass('game-card-hover') && (numbersCard.length == 0 || 
        (numbersCard.length == 1 && $(numbersCard[0]).parent().index() != $(this).parent().index()))){
            numbersCard.push(this);
            $('.header__btn-start').attr('disabled', false);
        }
        if (!$(this).hasClass('game-card-hover') && 
        numbersCard.length == 1 && $(numbersCard[0]).find('img').attr('src') == $(this).find('img').attr('src')){
            numbersCard.length = 0;
            $('.header__btn-start').attr('disabled', false);
        }

        if (numbersCard.length == 2){
            if ($(numbersCard[0]).find('img').attr('src')
            == $(numbersCard[1]).find('img').attr('src')){
                setTimeout(()=>{
                    $('.header__btn-start').attr('disabled', false);

                    let T = true;
                    $('.game-card').each(function(i, el){
                        if ($(el).css('display') != 'none' && !(el == numbersCard[0] || el == numbersCard[1])){
                            T = false;
                            return false;
                        }
                    });

                    if (T){
                        setTimeout(defaultsCards, 2000, $('.header__btn-start'));
                    }
                    $(numbersCard[0]).toggle(500);
                    $(numbersCard[1]).toggle(500);
                    numbersCard.length = 0;
                }, 1000);
            } else{
                setTimeout(()=>{
                        $(numbersCard[0]).toggleClass('game-card-hover');
                        $(numbersCard[1]).toggleClass('game-card-hover');
                        numbersCard.length = 0;
                        $('.header__btn-start').attr('disabled', false);
                    }
                ,1000);
            }
        }
    }
}

$('.header__btn-start').on('click', function(){
    if ($(this).attr('data-state') == 'start'){
        getArrayRandomCart();
        $(this).attr('disabled', true);
        $('.header__clock').text('00:00:00');
        $(this).text("Стоп");
        $(this).attr('data-state', 'stop');

        setTimeout(gameCartFlip, 2000);
        setTimeout(hideCartFlip, 5000);
    
    } else if ($(this).attr('data-state') == 'stop'){
        defaultsCards($(this));
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
    let T = true;
    $('.game-card').each(function(i, el){
        if ($(el).is(':visible')){
            T = false;
            return false;
        }
    });
    if (T){ return; }

    setTimeout(showTime, 1000, +hour, +minutes, ++seconds);
}