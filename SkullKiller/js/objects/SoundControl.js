
class SoundControl
{
    //sound list
    shoot;
    playerMove;
    click;
    damage;
    healthUp;
    win;
    trackA;
    whoosh;
    squish;
    glass;

    constructor(game){
        //we initialize all sounds

        this.shoot=game.add.audio('shoot');
        this.playerMove=game.add.audio('move');
        this.click=game.add.audio('click');
        this.damage=game.add.audio('damage');
        this.healthUp=game.add.audio('health');
        this.dead=game.add.audio('defeat');
        this.win=game.add.audio('victory');
        this.trackA=game.add.audio('trackA');
        this.whoosh = game.add.audio('whoosh');
        this.squish = game.add.audio('squish');
        this.glass = game.add.audio('glass');
    }

    PlayEffect(i){
        if(musicPlay==true){
            switch(i){
                case 0:
                    this.shoot.play();
                    break;
                case 1:
                    this.click.play();
                    break;
                case 2:
                    this.damage.play();
                    break;
                case 3:
                    this.healthUp.play();
                    break;
                case 4:
                    this.dead.play();
                    break;
                case 5:
                    this.win.play();
                    break;
                case 6:
                    this.playerMove.play();
                    break;
                case 7:
                    this.whoosh.play();
                    break;
                case 8:
                    this.squish.play();
                    break;
                case 9:
                    this.glass.play();
                    break;
                default: this.shoot.play();
            }
        }
    }

    PlayMusic(){
        this.trackA.play();
    }
    PauseMusic(){
        this.trackA.pause();
    }
}