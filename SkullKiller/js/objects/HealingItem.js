class HealingItem
{
    gameObject = undefined;
    type = undefined;
    game;
    health = undefined;
    constructor(x, y, game)
    {
        this.game = game;
        this.gameObject = game.add.sprite(x, y, 'healingItem');
        this.gameObject.anchor.x = 0.5;
        this.gameObject.anchor.y = 0.5;
        this.gameObject.scale.setTo(0.15, 0.15);
    }
    setPosition(x, y)
    {
        this.gameObject.x = x;
        this.gameObject.y = y;
    }
    Destroy(i)
    {
        this.gameObject.destroy();
        if(i)
        {
            soundController.PlayEffect(9);
        }
    }
}