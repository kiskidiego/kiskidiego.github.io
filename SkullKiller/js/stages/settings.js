
let mainSettings = {
    preload: loadSetting,
    create: initialiseSettings,
};



function loadSetting(){
    game.load.spritesheet('backButton', 'assets/imgs/backButton.png', 134, 147);
    game.load.spritesheet('plButton', 'assets/imgs/plButton.png', 103, 109);
    game.load.spritesheet('paButton', 'assets/imgs/paButton.png', 103, 109);
    game.load.spritesheet('volSprite', 'assets/imgs/volSprite.png', 121, 33);
    game.load.spritesheet('soundSprite', 'assets/imgs/soundSprite.png', 220, 177);
    game.load.spritesheet('mnkSprite', 'assets/imgs/mnkSprite.png', 219, 122);
    game.load.image('bg', 'assets/imgs/bg-main.png');
}

function initialiseSettings(){
    game.camera.fadeIn();

    bg =game.add.sprite(0, 0, 'bg');
    bg.sendToBack();


    //SELECCION DE LÍNEAS
    lineText = game.add.text(GAME_STAGE_WIDTH/2, 50,
        'Lines in game', {
            font: 'Silkscreen',
            fontSize: '32px',
            fill:  textColor
    });
    lineText.anchor.setTo(0.5, 0);

    lineaddButton = game.add.button(GAME_STAGE_WIDTH/2 + 100, GAME_STAGE_HEIGHT/2 - 200, 'paButton', addLine, this, 1, 2, 0);
    lineaddButton.scale.setTo(0.7, 0.7);
    linelessButton = game.add.button(GAME_STAGE_WIDTH/2 - 190, GAME_STAGE_HEIGHT/2 - 200, 'plButton', lessLine, this, 1, 2, 0);
    linelessButton.scale.setTo(0.7, 0.7);


    lineSprite = game.add.sprite(GAME_STAGE_WIDTH/2 - 100, GAME_STAGE_HEIGHT/2 - 185, 'volSprite');
    lineSprite.scale.setTo(1.5, 1.5);
    lineSprite.animations.add('volSprite' , [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], false);
    lineSprite.frame = lineNumber - 3;


    //SELECCIÓN DE VOLUMEN
    soundSP = game.add.sprite(GAME_STAGE_WIDTH/2, GAME_STAGE_HEIGHT/2 - 70, 'soundSprite');
    soundSP.scale.setTo(0.5, 0.5);
    soundSP.animations.add('soundSprite' , [0, 1], 10, false);

    soundM = game.add.text(GAME_STAGE_WIDTH/2 - 200, GAME_STAGE_HEIGHT/2 - 50,
        "Sound:", {
            font: 'Silkscreen',
            fontSize: '32px',
            fill:  textColor
    });
    if(musicPlay){
        soundSP.frame = 0;
    }
    else{
        soundSP.frame = 1;
    }

    soundM.inputEnabled = true;
    soundM.events.onInputDown.add(onSoundMPressed, this);


    //SELECCIÓN DE CONTROLES
    mnkSP = game.add.sprite(GAME_STAGE_WIDTH/2 + 50, GAME_STAGE_HEIGHT/2 + 50, 'mnkSprite');
    mnkSP.scale.setTo(0.5, 0.5);
    mnkSP.animations.add('mnkSprite' , [0, 1], 10, false);
    if(controls){
        mnkSP.frame = 0;
    }
    else{
        mnkSP.frame = 1;
    }
    controlText = game.add.text(GAME_STAGE_WIDTH/2 - 200, GAME_STAGE_HEIGHT/2 + 50,
        "Controls:", {
            font: 'Silkscreen',
            fontSize: '32px',
            fill:  textColor,
    });
    controlText.inputEnabled = true;
    controlText.events.onInputDown.add(onControlTextPressed, this);

    //BOTÓN DE VOLVER
    buttonS = game.add.button(GAME_STAGE_WIDTH - 95, GAME_STAGE_HEIGHT - 100, 'backButton', backToMenu, this, 1, 2, 0);
    buttonS.scale.setTo(0.5, 0.5);

}


function lessLine(){

    if(lineNumber>3){
        lineNumber--;
    }
    lineSprite.frame = lineNumber - 3;
    soundController.PlayEffect(1);
}

function addLine(){

    if(lineNumber<9){
        lineNumber++;
    }
    lineSprite.frame = lineNumber - 3;
    soundController.PlayEffect(1);
}


function onSoundMPressed(){
    if (musicPlay == true){
        musicPlay = false;
        soundSP.frame =1;
        soundController.PlayEffect(1);
    }
    else{
        musicPlay = true;
        soundSP.frame =0;
        soundController.PlayEffect(1);
    }
}

function onControlTextPressed()
{
    if (controls)
    {
        controls = false;
        mnkSP.frame = 1;
        soundController.PlayEffect(1);
    }
    else
    {
        controls = true;
        mnkSP.frame = 0;
        soundController.PlayEffect(1);
    }
}

function backToMenu(){

    GoTo('menu');
    soundController.PlayEffect(1);

}