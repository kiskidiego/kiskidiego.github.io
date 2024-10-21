let mainEnd = {
    preload: loadEnd,
    create: initialiseEnd,
    update: endupdate
};

let endTimer;

function loadEnd(){
    game.load.image('playAgain', 'assets/imgs/playAgain.png');
    game.load.image('bg', 'assets/imgs/bg-game.png');
    game.load.spritesheet('playB', 'assets/imgs/playButtonB.png', 323, 91);
    game.load.spritesheet('playC', 'assets/imgs/playButtonC.png', 323, 91);
}

let restartButton;

function initialiseEnd(){
    game.camera.fadeIn();

    //SCORE, TIME, LOSE OR WIN, BACK TO MENU IN 20'' OR BUTTON AND RESTART BUTTON
    game.add.sprite(0, 0, 'bg');
    restartButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    endText = game.add.text(GAME_STAGE_WIDTH/2, 100,
    "", {
        font: 'Silkscreen',
        fontSize: '50px',
        fill: textColor,
        align: 'center'
    });
    endText.anchor.setTo(0.5, 0.5);

    timeText = game.add.text(30, 220,
        "Your Time: " + timerSecond, {
            font: 'Silkscreen',
            fontSize: '32px',
            fill: textColor
    });

    timeText = game.add.text(GAME_STAGE_WIDTH-30, 220,
        "Your Score: " + scorePoints, {
            font: 'Silkscreen',
            fontSize: '32px',
            fill: textColor
    });
    timeText.anchor.setTo(1, 0);

    instText = game.add.text(GAME_STAGE_WIDTH/2, GAME_STAGE_HEIGHT - 150,
        "Press enter to restart from part A.\nIn 20 seconds you will go to the menu screen.", {
            font: 'Silkscreen',
            fontSize: '22px',
            fill: textColor,
            align: 'center'
    });
    instText.anchor.setTo(0.5, 0);

    if(win)
    {
        win = false;
        if(part == 'a')
        {
            endText.setText('You won part A!!');
            nextbutton = game.add.button(GAME_STAGE_WIDTH/2, GAME_STAGE_HEIGHT/2, 'playB', playb, this, 1, 2, 0);
            nextbutton.anchor.setTo(0.5, 0.5);
        }
        else if(part == 'b')
        {
            endText.setText('You won part B!!');
            nextbutton = game.add.button(GAME_STAGE_WIDTH/2, GAME_STAGE_HEIGHT/2, 'playC', playc, this, 1, 2, 0),
            nextbutton.anchor.setTo(0.5, 0.5);
        }
        else
        {
            endText.setText('You won the game!!');
        }
    }
    else
    {
        endText.setText('You lost :(');
    }

    //TIME OUT
    endTimer=setTimeout(TimerOver,20000);
}

function endupdate()
{
    if(restartButton.justDown)
    {
        restart();
    }
}

function playb()
{
    clearTimeout(endTimer);
    part = 'b';
    GoTo('game');
    soundController.PlayEffect(1);
}

function playc()
{
    clearTimeout(endTimer);
    part = 'c';
    GoTo('game');
    soundController.PlayEffect(1);
}

function restart(){
    clearTimeout(endTimer);
    part = 'a';
    GoTo('game');
    soundController.PlayEffect(1);
}

function TimerOver(){
    GoTo('menu');
}