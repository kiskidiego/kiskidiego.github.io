const PLAYER_SIZE = 100;
class Player
{
    gameObject;
    game;
    tree = undefined;
    position = 0;
    constructor(game,img, tree){
        this.game = game;
        this.tree = tree;
        this.gameObject = game.add.sprite(this.tree.vertices[(tree.filas - 1)*tree.columnas].x, this.tree.vertices[(tree.filas - 1)*tree.columnas].y, img);
        this.gameObject.width = PLAYER_SIZE;
        this.gameObject.height = PLAYER_SIZE;
        this.gameObject.anchor.x = 0.3;
        this.gameObject.anchor.y = 0;
        this.gameObject.animations.add('player', [0, 1, 2, 3], true);
        this.gameObject.animations.play('player', 5, true);
    }
    PlayerMove(i){
        if((this.position > 0 || i > 0) && (this.position < this.tree.columnas - 1 || i < 0))
        {
            soundController.PlayEffect(6);
            this.position += i;
            this.gameObject.x = this.tree.vertices[(tree.filas - 1)*tree.columnas + this.position].x;
        }
        if(this.tree.vertices[(tree.filas - 1)*tree.columnas + this.position].healingItem != null)
        {
            soundController.PlayEffect(6);
            this.tree.vertices[(tree.filas - 1)*tree.columnas + this.position].healingItem.Destroy();
            this.tree.vertices[(tree.filas - 1)*tree.columnas + this.position].healingItem = null;
            upHealthHUD();
        }
    }
    Shoot()
    {
        this.tree.addBullet(this.position);
    }
    moveTo(i)
    {
        if(this.position != i)
        {
            soundController.PlayEffect(6);
            this.position = i;
            this.gameObject.x = this.tree.vertices[(tree.filas - 1)*tree.columnas + this.position].x;
        }
    }
}