class Powerup
{
    gameObject = undefined;
    type = undefined;
    tree = undefined;
    game;
    constructor(x, y, tree, game, type = 0)
    {
        this.tree = tree;
        this.game = game;
        if(type == 0)
        {
            this.gameObject = game.add.sprite(x, y,'powerup1');
            this.health = 1;
        }
        else if(type == 1)
        {
            this.gameObject = game.add.sprite(x, y,'powerup2');
        }
        else
        {
            this.gameObject = game.add.sprite(x, y,'powerup3');
        }
        this.gameObject.anchor.x = 0.5;
        this.gameObject.anchor.y = 0.5;
        this.gameObject.scale.setTo(0.15, 0.15);
        this.type = type;
    }
    setPosition(x, y)
    {
        this.gameObject.x = x;
        this.gameObject.y = y;
    }

    Destroy()
    {
        this.gameObject.destroy();
    }
    Effect()
    {
        switch(this.type)
        {
            case 0:         //Cerrar Rama durante 15 secs.
                this.tree.closeBranch();
                break;
            case 1:         //Balas perforantes (3 damage) durante 5 disparos.
                this.tree.piercingBullets();
                break;
            case 2:         //Escudo (3 vida).
                resetShield();
                break;
        }
    }
}