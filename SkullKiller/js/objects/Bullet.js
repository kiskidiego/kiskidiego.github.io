class Bullet
{
    gameObject = undefined;
    hp = undefined;
    constructor(x, y, game, hp = 1)
    {
        this.gameObject = game.add.sprite(x, y, 'bullet');
        this.gameObject.anchor.x = 0.5;
        this.gameObject.anchor.y = 0.5;
        this.hp = hp;


        this.gameObject.animations.add('bullet' , [0, 1, 2, 3], true);
        this.gameObject.animations.play('bullet', 10, true);
    }
    Move(x, y)
    {
        this.gameObject.x = x;
        this.gameObject.y = y;
    }
    Hit()
    {
        this.hp--;
        if(this.hp <= 0)
        {
            this.Destroy();
            return true;
        }
        return false;
    }
    Destroy()
    {
        this.gameObject.destroy();
    }
}