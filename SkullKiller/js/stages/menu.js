
let mainMenu = {
    preload: loadMenu,
    create: initialiseMenu,
};

const PLAY_BUTTON_HEIGHT_OFFSET = 100;

let musicFirst = true;

function loadMenu(){
    game.load.spritesheet('creditb', 'assets/imgs/creditb.png', 134, 147);
    game.load.image('bg', 'assets/imgs/bg-main.png');
    game.load.spritesheet('playButtonA', 'assets/imgs/playButtonA.png', 323, 91);
    game.load.spritesheet('playButtonB', 'assets/imgs/playButtonB.png', 323, 91);
    game.load.spritesheet('playButtonC', 'assets/imgs/playButtonC.png', 323, 91);
    game.load.spritesheet('settingsButton', 'assets/imgs/settingsButton.png', 134, 147);

    game.load.audio('shoot', 'assets/snds/blast.wav');
    game.load.audio('click', 'assets/snds/click.wav');
    game.load.audio('defeat', 'assets/snds/defeat.wav');
    game.load.audio('move', 'assets/snds/move.wav');
    game.load.audio('damage', 'assets/snds/damage.wav');
    game.load.audio('health', 'assets/snds/health.wav');
    game.load.audio('victory', 'assets/snds/victory.wav');
    game.load.audio('trackA', 'assets/snds/music.wav');
    game.load.audio('whoosh', 'assets/snds/whoosh.wav')
    game.load.audio('squish', 'assets/snds/squish.wav')
    game.load.audio('glass', 'assets/snds/glass.wav')
}

function initialiseMenu(){
    game.camera.fadeIn();

    bg =game.add.sprite(0, 0, 'bg');
    bg.sendToBack();

    game.input.enabled = true;

    soundController=new SoundControl(game);

    scoreText = game.add.text(GAME_STAGE_WIDTH/2, 100,
        "SKULL KILLER: the game", {
            font: 'bold Silkscreen',
            fontSize: '50px',
            fill:  textColor,
            align: 'center',

    });
    scoreText.anchor.setTo(0.5, 0.5);


    buttonI = game.add.button(GAME_STAGE_WIDTH/2 - 372, GAME_STAGE_HEIGHT - 100, 'creditb', startInstructions, this, 1, 2, 0);
    buttonI.scale.setTo(0.5, 0.5);


    buttonS = game.add.button(GAME_STAGE_WIDTH - 95, GAME_STAGE_HEIGHT - 100, 'settingsButton', startSetting, this, 1, 2, 0);
    buttonS.scale.setTo(0.5, 0.5);


    playButtona = game.add.button(GAME_STAGE_WIDTH/2, GAME_STAGE_HEIGHT/2- PLAY_BUTTON_HEIGHT_OFFSET, 'playButtonA', startGamea, this, 1, 2, 0);
    playButtonb = game.add.button(GAME_STAGE_WIDTH/2, GAME_STAGE_HEIGHT/3 * 2- PLAY_BUTTON_HEIGHT_OFFSET, 'playButtonB', startGameb, this, 1, 2, 0);
    playButtonc = game.add.button(GAME_STAGE_WIDTH/2, GAME_STAGE_HEIGHT/6 * 5- PLAY_BUTTON_HEIGHT_OFFSET, 'playButtonC', startGamec, this, 1, 2, 0);
    playButtona.anchor.setTo(0.5, 0);
    playButtonb.anchor.setTo(0.5, 0);
    playButtonc.anchor.setTo(0.5, 0);

}

function startGamea(){
    part = 'a';
    GoTo('game');
    soundController.PlayEffect(1);
}

function startGameb(){
    part = 'b';
    GoTo('game');
    soundController.PlayEffect(1);
}

function startGamec(){
    part = 'c';
    GoTo('game');
    soundController.PlayEffect(1);
}

function startSetting(){
    GoTo('settings');
    soundController.PlayEffect(1);
}

function startInstructions(){
    GoTo('instructions');
    soundController.PlayEffect(1);
}
