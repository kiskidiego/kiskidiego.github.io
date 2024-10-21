const GAME_STAGE_WIDTH = 800;
const GAME_STAGE_HEIGHT = 600;

var lineNumber = 3;
var musicPlay=true;
var controls = true;

var endScore=0;
var endTime=0;

var textColor = '#e9b564';

var part;

var win;

let game;

var soundController;

var scorePoints;

var timerSecond;

let state=0;

var fadeTimer;

let wfConfig = {
    active: function () {
        sGame();
    },
    google: {
        families: ['Silkscreen']
    }

};

function sGame(){
    game = new Phaser.Game(GAME_STAGE_WIDTH, GAME_STAGE_HEIGHT, Phaser.CANVAS, 'game');
    game.state.add('menu', mainMenu);
    game.state.add('game', mainGame);
    game.state.add('instructions', mainInstructions);
    game.state.add('settings', mainSettings);
    game.state.add('endGame', mainEnd);
    game.state.start('menu');


}

function GoTo(stateN)
{
    game.camera.fade();
    state=stateN;
    game.input.enabled = false;
    fadeTimer = setTimeout(onFade,250);
}

function onFade(){
    soundController.PlayEffect(7);
    switch(state)
    {
        case 'menu':
            game.state.start(state);
            break;
        case 'game':
            game.state.start(state);
            break;
        case 'instructions':
            game.state.start(state);
            break;
        case 'settings':
            game.state.start(state);
            break;
        case 'endGame':
            game.state.start(state);
            break;
    }
    game.input.enabled = true;
}

WebFont.load(wfConfig);

