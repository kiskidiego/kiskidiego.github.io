class Tree
{
    vertices = [];
    filas;
    columnas;
    game;
    player;
    bullethp;
    bulletAmount;
    bulletText;
    constructor(game, xorigin, yorigin, treeWidth, treeHeight, filas = 4, columnas = 4, ramas)
    {
        this.bulletAmount = 0;
        this.bullethp = 1;
        this.game = game;
        this.filas = filas;
        this.columnas = columnas;
        for(let i = 0; i < filas; i++)
        {
            for(let j = 0; j < columnas; j++)
            {
                this.vertices[i * columnas + j] = new Vertice(xorigin + ((treeWidth/columnas)*j + (treeWidth/filas/columnas * i)), yorigin + ((treeHeight/filas)*i));
            }
        }
        for(let i = 1; i < filas; i++)
        {
            for(let j = 0; j < columnas; j++)
            {
                this.addBranch(this.vertices[i * columnas + j - columnas], this.vertices[i * columnas + j]);
            }
        }
        if(ramas)
        {
            this.addRandomBranches();
        }
        this.player = new Player(game,'player', this);
    }
    addRandomBranches()
    {
        for(let i = 0; i < this.columnas/2; i++)
        {
            this.addRandomBranch();
        }
    }
    addRandomBranch()
    {
        let rcol = Phaser.Math.between(0, this.columnas - 1);
        let rfil = Phaser.Math.between(0, this.filas - 2);
        let lado;
        if(rcol != 0)
        {
            lado = -1;
        }
        else
        {
            lado = 1;
        }
        if(rcol != this.columnas - 1)
        {
            if(Phaser.Math.random() > 0.5)
            {
                lado = 1;
            }
        }
        this.addBranch(this.vertices[rfil * this.columnas + rcol], this.vertices[(rfil + 1) * this.columnas + rcol + lado]);
    }
    addBranch(vert1, vert2)
    {
        vert1.branch.push(vert2);
        let graphics = this.game.add.graphics(vert1.x, vert1.y);
        graphics.lineStyle(10, 0xE9B564);
        graphics.lineTo(vert2.x - vert1.x, vert2.y - vert1.y);
        graphics.endFill();
    }
    addRandomEnemy()
    {
        let r = Phaser.Math.between(0, this.columnas - 1);
        while(!this.vertices[r].open)
        {
            r = Phaser.Math.between(0, this.columnas - 1);
        }
        let type1 = false;
        let type = 0;
        if(part == 'c')
        {
            for(let i = 0; i < this.vertices[r].enemy.length; i++)
            {
                if(this.vertices[r].enemy[i].type == 1)
                {
                    type1 = true;
                }
            }
            if(type1)
            {
                if(Phaser.Math.random() < 0.3)
                {
                    type = 2;
                }
            }
            else
            {
                if(Phaser.Math.random() < 0.5)
                {
                    if(Phaser.Math.random() < 0.5)
                    {
                        type = 2;
                    }
                    else
                    {
                        type = 1;
                    }
                }
            }
        }
        this.vertices[r].enemy.push(new Enemy(this.vertices[r].x, this.vertices[r].y, this.game, r, type));
    }
    addBullet(i)
    {
        if(this.vertices[(this.filas-1)*this.columnas + i].bullet == null)
        {
            this.vertices[(this.filas-1)*this.columnas + i].bullet = new Bullet(this.vertices[(this.filas-1)*this.columnas + i].x, this.vertices[(this.filas-1)*this.columnas + i].y, this.game, this.bullethp);
        }
        if(this.vertices[(this.filas-1)*this.columnas + i].enemy.length != 0)
        {
            if(this.vertices[(this.filas-1)*this.columnas + i].bullet.Hit())
            {
                this.vertices[(this.filas-1)*this.columnas + i].bullet = null;
            }
            if(this.vertices[(this.filas-1)*this.columnas + i].enemy[0].Hit())
            {
                this.vertices[(this.filas-1)*this.columnas + i].enemy.splice(0, 1);
            }
        }
        if(this.bullethp != 1)
        {
            this.bulletText.setText("Piercing bullets: " + --this.bulletAmount);
            if(this.bulletAmount == 0)
            {
                this.bulletText.destroy();
                this.bullethp = 1;
            }
        }
    }
    addRandomHealing()
    {
        let r = Phaser.Math.between(0, this.columnas - 1);
        while(!this.vertices[r].open)
        {
            r = Phaser.Math.between(0, this.columnas - 1);
        }
        this.vertices[r].healingItem = new HealingItem(this.vertices[r].x, this.vertices[r].y, this.game);
    }
    addPowerUp()
    {
        let r = Phaser.Math.between(0, this.columnas - 1);
        while(!this.vertices[r].open)
        {
            r = Phaser.Math.between(0, this.columnas - 1);
        }
        this.vertices[r].powerUp = new Powerup(this.vertices[r].x, this.vertices[r].y, this, this.game, Phaser.Math.between(0, 2));
    }
    addEnemyBullet(i)
    {
        this.vertices[i].enemyBullet = new Bullet(this.vertices[this.columnas + i].x, this.vertices[this.columnas + i].y, this.game);
    }
    advanceEnemies()
    {
        for(let j = this.columnas - 1; j >= 0; j--)
        {
            for(let i = this.vertices[(this.filas - 1) * this.columnas + j].enemy.length - 1; i >= 0; i--)
            {
                this.vertices[(this.filas - 1) * this.columnas + j].enemy[i].Damage();
                this.vertices[(this.filas - 1) * this.columnas + j].enemy.splice(i, 1);
            }
        }
        for(let i = this.filas - 2; i >= 0; i--)
        {
            for(let j = this.columnas - 1; j >= 0; j--)
            {
                for(let e = this.vertices[i * this.columnas + j].enemy.length - 1; e >= 0; e--)
                {
                    if(this.vertices[i * this.columnas + j].enemy[e].type != 1)
                    {
                        let r = Phaser.Math.between(0, this.vertices[i * this.columnas + j].branch.length - 1);
                        this.vertices[i * this.columnas + j].branch[r].enemy.push(this.vertices[i * this.columnas + j].enemy[e]);

                        if(this.vertices[i*this.columnas + j].branch[r].bullet != null)
                        {
                            if(this.vertices[i*this.columnas + j].branch[r].bullet.Hit())
                            {
                                this.vertices[i*this.columnas + j].branch[r].bullet = null;
                            }
                            if(this.vertices[i*this.columnas + j].enemy[e].Hit())
                            {
                                this.vertices[i*this.columnas + j].branch[r].enemy.splice(this.vertices[i*this.columnas + j].branch[r].enemy.length - 1, 1);
                            }
                        }
                        else
                        {
                            this.vertices[i * this.columnas + j].enemy[e].setPosition(this.vertices[i * this.columnas + j].branch[r].x, this.vertices[i * this.columnas + j].branch[r].y);
                        }
                        this.vertices[i*this.columnas + j].enemy.splice(e, 1);
                    }
                }
            }
        }
        for(let j = this.columnas - 1; j >= 0; j--)
        {
            for(let e = 0; e < this.vertices[j].enemy.length; e++)
            {
                if(this.vertices[j].enemy[e].type != 1)
                {
                    this.vertices[j].enemy.splice(e, 1);
                }
            }
        }
    }
    advanceDownwardItems()
    {
        for(let j = this.columnas - 1; j >= 0; j--)
        {
            if(this.vertices[(this.filas - 1) * this.columnas + j].healingItem != null)
            {
                if(this.player.position == j)
                {
                    upHealthHUD();
                }
                this.vertices[(this.filas - 1) * this.columnas + j].healingItem.Destroy(false);
                this.vertices[(this.filas - 1) * this.columnas + j].healingItem = null;
            }

            if(this.vertices[(this.filas - 1) * this.columnas + j].powerUp != null)
            {
                if(this.player.position == j)
                {
                    this.vertices[(this.filas - 1) * this.columnas + j].powerUp.Effect();
                }
                this.vertices[(this.filas - 1) * this.columnas + j].powerUp.Destroy();
                this.vertices[(this.filas - 1) * this.columnas + j].powerUp = null;
            }

            if(this.vertices[(this.filas - 1) * this.columnas + j].enemyBullet != null)
            {
                downHealthHUD();
                this.vertices[(this.filas - 1) * this.columnas + j].enemyBullet.Destroy();
                this.vertices[(this.filas - 1) * this.columnas + j].enemyBullet = null;
            }
        }
        for(let i = this.filas - 2; i >= 0; i--)
        {
            for(let j = this.columnas - 1; j >= 0; j--)
            {
                this.vertices[(i + 1)*this.columnas + j].healingItem = this.vertices[i*this.columnas + j].healingItem;
                if(this.vertices[(i + 1)*this.columnas + j].healingItem != null)
                {
                    this.vertices[(i + 1)*this.columnas + j].healingItem.setPosition(this.vertices[(i + 1)*this.columnas + j].x, this.vertices[(i + 1)*this.columnas + j].y);
                    if(this.vertices[(i + 1)*this.columnas + j].bullet != null)
                    {
                        if(this.vertices[(i + 1)*this.columnas + j].bullet.Hit())
                        {
                            this.vertices[(i + 1)*this.columnas + j].bullet = null;
                        }
                        this.vertices[(i + 1)*this.columnas + j].healingItem.Destroy(true);
                        this.vertices[(i + 1)*this.columnas + j].healingItem = null;
                    }
                }

                this.vertices[(i + 1)*this.columnas + j].powerUp = this.vertices[i*this.columnas + j].powerUp;
                if(this.vertices[(i + 1)*this.columnas + j].powerUp != null)
                {
                    this.vertices[(i + 1)*this.columnas + j].powerUp.setPosition(this.vertices[(i + 1)*this.columnas + j].x, this.vertices[(i + 1)*this.columnas + j].y);
                }

                this.vertices[(i + 1)*this.columnas + j].enemyBullet = this.vertices[i*this.columnas + j].enemyBullet;
                if(this.vertices[(i + 1)*this.columnas + j].enemyBullet != null)
                {
                    this.vertices[(i + 1)*this.columnas + j].enemyBullet.Move(this.vertices[(i + 1)*this.columnas + j].x, this.vertices[(i + 1)*this.columnas + j].y);
                }
            }
        }
        for(let j = this.columnas - 1; j >= 0; j--)
        {
            this.vertices[j].healingItem = null;
            this.vertices[j].powerUp = null;
            this.vertices[j].enemyBullet = null;
        }
    }
    advanceBullets()
    {
        for(let i = 0; i < this.columnas; i++)
        {
            if(this.vertices[i].bullet != null)
            {
                this.vertices[i].bullet.Destroy();
                this.vertices[i].bullet = null;
            }
        }
        for(let i = 0; i < this.filas - 1; i++)
        {
            for(let j = 0; j < this.columnas; j++)
            {
                this.vertices[i*this.columnas + j].bullet = this.vertices[(i+1)*this.columnas + j].bullet;
                if(this.vertices[i*this.columnas + j].bullet != null)
                {
                    this.vertices[i*this.columnas + j].bullet.Move(this.vertices[i*this.columnas + j].x, this.vertices[i*this.columnas + j].y);
                    if(this.vertices[i*this.columnas + j].enemy.length != 0)
                    {
                        if(this.vertices[i*this.columnas + j].bullet.Hit())
                        {
                            this.vertices[i*this.columnas + j].bullet = null;
                        }
                        if(this.vertices[i*this.columnas + j].enemy[0].Hit())
                        {
                            this.vertices[i*this.columnas + j].enemy.splice(0, 1);
                        }
                    }
                    else if(i > 0 && this.vertices[(i-1)*this.columnas + j].enemy.length != 0)
                    {
                        if(this.vertices[i*this.columnas + j].bullet.Hit())
                        {
                            this.vertices[i*this.columnas + j].bullet = null;
                        }
                        if(this.vertices[(i-1)*this.columnas + j].enemy[0].Hit())
                        {
                            this.vertices[(i-1)*this.columnas + j].enemy.splice(0, 1);
                        }
                    }
                }
                if(this.vertices[i*this.columnas + j].bullet != null)
                {
                    if(this.vertices[(i)*this.columnas + j].healingItem != null)
                    {
                        if(this.vertices[i*this.columnas + j].bullet.Hit())
                        {
                            this.vertices[i*this.columnas + j].bullet = null;
                        }
                        this.vertices[i*this.columnas + j].healingItem.Destroy(true);
                        this.vertices[i*this.columnas + j].healingItem = null;
                    }
                    else if(i > 0 && this.vertices[(i - 1)*this.columnas + j].healingItem != null)
                    {
                        if(this.vertices[i*this.columnas + j].bullet.Hit())
                        {
                            this.vertices[i*this.columnas + j].bullet = null;
                        }
                        this.vertices[(i - 1)*this.columnas + j].healingItem.Destroy(true);
                        this.vertices[(i - 1)*this.columnas + j].healingItem = null;
                    }
                }
            }
        }
        for(let i = 0; i < this.columnas; i++)
        {
            this.vertices[(this.filas - 1)*this.columnas + i].bullet = null;
        }
    }
    getClosestToPointer()
    {
        let dist = this.game.world.width * 200;
        let vert = 0;
        for(let i = 0; i < this.columnas; i++)
        {
            let d = this.vertices[(this.filas-1)*this.columnas + i].x - this.game.input.mousePointer.worldX;
            if(d < 0)
            {
                d *= -1;
            }
            if(d < dist)
            {
                dist = d;
                vert = i;
            }
        }
        return vert;
    }
    closeBranch()
    {
        let r = Phaser.Math.between(0, this.columnas - 1);
        while(!this.vertices[r].open)
        {
            r = Phaser.Math.between(0, this.columnas - 1);
        }
        this.vertices[r].open = false;
        let cross = this.game.add.sprite(this.vertices[r].x, this.vertices[r].y - 20, 'cross');
        cross.anchor.x = 0.5;
        cross.anchor.y = 0.5;
        cross.scale.setTo(0.2, 0.2);
        setTimeout(this.openBranch.bind(this), 15000, r, cross);
    }
    openBranch(i, gameobject)
    {
        this.vertices[i].open = true;
        gameobject.destroy();
    }
    piercingBullets()
    {
        this.bulletAmount += 5;
        this.bullethp = 3;
        this.bulletText = game.add.text(GAME_STAGE_WIDTH/3, GAME_STAGE_HEIGHT - 100,
            "Piercing bullets: " + this.bulletAmount, {
                font: 'Silkscreen',
                fontSize: '32px',
                fill: '#0bf'
        });
    }
    ClearAll()
    {
        for(let i = 0; i < this.filas; i++)
        {
            for(let j = 0; j < this.columnas; j++)
            {
                for(let e = 0; e < this.vertices[i*this.columnas + j].enemy.length; e++)
                {
                    this.vertices[i*this.columnas + j].enemy[e].DestroyAlt();
                }
                this.vertices[i*this.columnas + j].enemy = [];
            }
        }
    }
    swapEnemy2Positions()
    {
        for(let i = this.filas - 1; i >= 0; i--)
        {
            for(let j = this.columnas - 1; j >= 0; j--)
            {
                for(let e = this.vertices[i * this.columnas + j].enemy.length - 1; e >= 0; e--)
                {
                    if(this.vertices[i * this.columnas + j].enemy[e].type == 2)
                    {
                        if(Phaser.Math.random() > 0.5)
                        {
                            let pos = [];
                            if(j > 0)
                            {
                                pos.push(-1);
                            }
                            if( j < this.columnas - 1)
                            {
                                pos.push(1);
                            }
                            let r = pos[Phaser.Math.between(0, pos.length - 1)];
                            this.vertices[i * this.columnas + j + r].enemy.unshift(this.vertices[i * this.columnas + j].enemy[e]);
                            this.vertices[i * this.columnas + j].enemy.splice(e, 1);
                            this.vertices[i * this.columnas + j + r].enemy[0].setPosition(this.vertices[i * this.columnas + j + r].x, this.vertices[i * this.columnas + j + r].y);
                        }
                    }
                }
            }
        }
    }
}
class Vertice
{
    open = true;
    x = undefined;
    y = undefined;
    branch = [];
    enemy = [];
    bullet = null;
    healingItem = null;
    powerUp = null;
    enemyBullet = null;
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}