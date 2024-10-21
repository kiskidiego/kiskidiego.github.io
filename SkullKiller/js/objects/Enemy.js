class Enemy
{
    gameObject = undefined;
    type = undefined;
    game;
    health = undefined;
    constructor(x, y, game, position, type = 0)
    {
        this.game = game;
        if(type == 0)
        {
            this.gameObject = game.add.sprite(x, y,'enemy1');
            this.gameObject.animations.add('en1' , [0, 1, 2, 3], true);
            this.gameObject.animations.play('en1', 5, true);
            this.health = 1;
        }
        else if(type == 1)
        {
            this.gameObject = game.add.sprite(x, y,'enemy2');
            this.gameObject.animations.add('en2' , [0, 1, 2, 3], true);
            this.gameObject.animations.play('en2', 5, true);
            this.timer = setInterval(tree.addEnemyBullet.bind(tree), 5000, position);
            this.health = 2;
        }
        else
        {
            this.gameObject = game.add.sprite(x, y,'enemy3');
            this.gameObject.animations.add('en3' , [0, 1, 2, 3], true);
            this.gameObject.animations.play('en3', 5, true);
            this.health = 2;
        }
        this.gameObject.anchor.x = 0.5;
        this.gameObject.anchor.y = 0.5;
        this.type = type;
    }
    setPosition(x, y)
    {
        this.gameObject.x = x;
        this.gameObject.y = y;
    }
    Damage()
    {
        this.gameObject.destroy();
        downHealthHUD();
    }
    Destroy()
    {
        if(this.type = 1)
        {
            clearInterval(this.timer);
        }
        scorePoints+=1;
        updateScore();
        this.gameObject.destroy();
        if(scorePoints < DIFFICULTY_2_THRESHOLD || part == 'a')
        {
            if(Phaser.Math.random() <= DIFFICULTY_1_HEALING_SPAWN_PROBABILITY)
            {
                tree.addRandomHealing();
            }
        }
        else if(scorePoints < DIFFICULTY_3_THRESHOLD)
        {
            if(Phaser.Math.random() <= DIFFICULTY_2_HEALING_SPAWN_PROBABILITY)
            {
                tree.addRandomHealing();
            }
        }
        else
        {
            if(Phaser.Math.random() <= DIFFICULTY_3_HEALING_SPAWN_PROBABILITY)
            {
                tree.addRandomHealing();
            }
        }
    }
    Hit()
    {
        this.health--;
        if(this.health == 0)
        {
            soundController.PlayEffect(8);
            this.Destroy();
            return true;
        }
        return false;
    }
    DestroyAlt()
    {
        if(this.type = 1)
        {
            clearInterval(this.timer);
        }
        this.gameObject.destroy();
    }
}