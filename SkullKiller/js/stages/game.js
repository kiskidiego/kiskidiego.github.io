let mainGame = {
    preload: loadAssets,
    create: initialiseGame,
    update: gameUpdate
};

const DIFFICULTY_1_ENEMY_SPAWN_TIMER = 1200;
const DIFFICULTY_1_ENEMY_ADVANCE_TIMER = 1000;
const DIFFICULTY_1_HEALING_SPAWN_PROBABILITY = 0.4;

const DIFFICULTY_2_ENEMY_SPAWN_TIMER = 800;
const DIFFICULTY_2_ENEMY_ADVANCE_TIMER = 600;
const DIFFICULTY_2_HEALING_SPAWN_PROBABILITY = 0.2;

const DIFFICULTY_3_ENEMY_SPAWN_TIMER = 400;
const DIFFICULTY_3_ENEMY_ADVANCE_TIMER = 300;
const DIFFICULTY_3_HEALING_SPAWN_PROBABILITY = 0.1;

const DIFFICULTY_2_THRESHOLD = 20;
const DIFFICULTY_3_THRESHOLD = 35;


let tree;
let fireButton;
let cursor;

const MAXHEALTH=5;
let health;
let healthVector = [];
let shieldVector = [];

function loadAssets()
{

    game.load.spritesheet('bullet', 'assets/imgs/bullet.png', 64, 64);
    game.load.image('healingItem', 'assets/imgs/heal-item.png');
    game.load.image('background', 'assets/imgs/bg-game.png');

    //ENEMY
    game.load.spritesheet('enemy1', 'assets/imgs/enemy.png', 64, 64);
    game.load.spritesheet('enemy2', 'assets/imgs/enemy2.png', 64, 64);
    game.load.spritesheet('enemy3', 'assets/imgs/enemy3.png', 64, 64);

    //PLAYER
    game.load.spritesheet('player', 'assets/imgs/player.png', 84, 79);

    game.load.image('powerup1', 'assets/imgs/block-powerup.png');
    game.load.image('powerup2', 'assets/imgs/pierce-powerup.png');
    game.load.image('powerup3', 'assets/imgs/shield-item.png');

    game.load.image('cross', 'assets/imgs/block-powerup.png');

    //HUD
    game.load.image('heart', 'assets/imgs/heart2.png');
    game.load.image('shield', 'assets/imgs/shield.png');
    game.load.spritesheet('backButton', 'assets/imgs/backButton.png', 134, 147);
}

function initialiseGame(){
    game.camera.fadeIn();

    win = false;
    game.add.sprite(0, 0, 'background');
    health=MAXHEALTH - 1;
    scorePoints=0;
    timerSecond=0;
    if(part == 'a')
    {
        tree = new Tree(game, 50, 100, 700, 400, 9, lineNumber);
    }
    else
    {
        tree = new Tree(game, 50, 100, 700, 400, 9, lineNumber, true);
    }
    if(controls)
    {
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        cursor = game.input.keyboard.createCursorKeys();
    }
    tree.timer1 = setInterval(tree.advanceBullets.bind(tree), 50);
    tree.timer2 = setInterval(tree.advanceEnemies.bind(tree), DIFFICULTY_1_ENEMY_ADVANCE_TIMER);
    tree.timer3 = setInterval(tree.addRandomEnemy.bind(tree), DIFFICULTY_1_ENEMY_SPAWN_TIMER);
    tree.timer4 = setInterval(tree.advanceDownwardItems.bind(tree), 200);
    if(part == 'c')
    {
        tree.timer5 = setInterval(tree.addPowerUp.bind(tree), 7500);
        tree.timer6 = setInterval(tree.swapEnemy2Positions.bind(tree), 500);
    }

    //HUD
    initHealthHUD();
    tree.timer=setInterval(updateTimer,1000);
    timeText = game.add.text(GAME_STAGE_WIDTH - 50, 30,
        "Time: " + timerSecond, {
            font: 'Silkscreen',
            fontSize: '32px',
            fill:  textColor
    });
    timeText.anchor.setTo(1, 0);

    difficultyText = game.add.text(GAME_STAGE_WIDTH/2, 30,
        "Easy", {
            font: 'Silkscreen',
            fontSize: '32px',
            fill:  textColor
    });
    difficultyText.anchor.setTo(0.5, 0);

    score = game.add.text(50, 30,
        "Score: " + scorePoints, {
            font: 'Silkscreen',
            fontSize: '32px',
            fill:  textColor
    });

    buttonS = game.add.button(GAME_STAGE_WIDTH - 95, GAME_STAGE_HEIGHT - 100, 'backButton', backToMenuFromGame, this, 1, 2, 0);
    buttonS.scale.setTo(0.4, 0.4);

    //END SCORE AND TIME
    endScore=0;
    endTime=0;

    //music
    if(musicPlay)
    {
        soundController.PlayMusic();
    }
}

function gameUpdate(){
    ManageInput();
}

let canshoot = true;

function ManageInput()
{
    if(controls)
    {
        if (cursor.left.justDown)
        {
            tree.player.PlayerMove(-1);
        }
        else if (cursor.right.justDown)
        {
            tree.player.PlayerMove(1);
        }
        if(fireButton.justDown)
        {
            tree.player.Shoot();
            soundController.PlayEffect(0);
        }
    }
    else
    {
        tree.player.moveTo(tree.getClosestToPointer());
        if(game.input.mousePointer.leftButton.justPressed(30))
        {
            if(canshoot)
            {
                tree.player.Shoot();
                soundController.PlayEffect(0);
                canshoot = false;
            }
        }
        else
        {
            canshoot = true;
        }
    }
}

function initHealthHUD(){

    for(let i=0; i<MAXHEALTH;i++){
        healthVector[i] = game.add.sprite(50*i + 10, GAME_STAGE_HEIGHT-40, 'heart');
        healthVector[i].scale.setTo(0.1, 0.1);
    }

}

function upHealthHUD(){
    soundController.PlayEffect(3);
    if(health<MAXHEALTH - 1){
        health++;
        healthVector[health] = game.add.sprite(50*health + 10, GAME_STAGE_HEIGHT-40, 'heart');
        healthVector[health].scale.setTo(0.1, 0.1);
        updateShield();
    }
}

function resetShield()
{
    for(let i = 0; i < shieldVector.length; i++)
    {
        shieldVector[i].destroy();
    }
    for(let i = 0; i < 3; i++)
    {
        shieldVector[i] = game.add.sprite(50 * i + 50*health + 60, GAME_STAGE_HEIGHT-40, 'shield');
        shieldVector[i].scale.setTo(0.1, 0.1);
    }
}

function updateShield()
{
    for(let i = 0; i < shieldVector.length; i++)
    {
        shieldVector[i].x = 50 * i + 50*health + 60;
    }
}

function downHealthHUD(){

    if(shieldVector.length > 0)
    {
        shieldVector[shieldVector.length - 1].destroy();
        shieldVector.splice(shieldVector.length - 1, 1);
        soundController.PlayEffect(2);
    }
    else if(health>=0){
        healthVector[health].kill();  //borramos corazon actual
        health--; //bajamos salud
        soundController.PlayEffect(2);
    }
    else{
        reset();
        endScore=scorePoints;
        endTime=timerSecond;
        GoTo('endGame');  //end game state
        soundController.PlayEffect(4);
    }

}

function updateTimer(){
    timerSecond++;
    timeText.setText("Time: " + timerSecond);
}

function updateScore()
{
    score.setText("Score: " + scorePoints);
    if(scorePoints == DIFFICULTY_2_THRESHOLD)
    {
        clearInterval(tree.timer2);
        clearInterval(tree.timer3);
        tree.timer2 = setInterval(tree.advanceEnemies.bind(tree), DIFFICULTY_2_ENEMY_ADVANCE_TIMER);
        tree.timer3 = setInterval(tree.addRandomEnemy.bind(tree), DIFFICULTY_2_ENEMY_SPAWN_TIMER);
        if(part != 'a')
        {
            tree.addRandomBranches();
        }
        difficultyText.setText('Medium');
    }
    if(scorePoints == DIFFICULTY_3_THRESHOLD)
    {
        clearInterval(tree.timer2);
        clearInterval(tree.timer3);
        tree.timer2 = setInterval(tree.advanceEnemies.bind(tree), DIFFICULTY_3_ENEMY_ADVANCE_TIMER);
        tree.timer3 = setInterval(tree.addRandomEnemy.bind(tree), DIFFICULTY_3_ENEMY_SPAWN_TIMER);
        if(part != 'a')
        {
            tree.addRandomBranches();
        }
        difficultyText.setText('Hard');
    }
    if(scorePoints == 50)
    {
        reset();
        win = true;
        GoTo('endGame')
    }
}

function reset()
{
    clearInterval(tree.timer);
    clearInterval(tree.timer1);
    clearInterval(tree.timer2);
    clearInterval(tree.timer3);
    clearInterval(tree.timer4);
    clearInterval(tree.timer5);
    soundController.PauseMusic();
    tree.ClearAll();
}

function backToMenuFromGame()
{
    reset();
    GoTo('menu');
    soundController.PlayEffect(1);
}