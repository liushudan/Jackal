/*
Пока в этом файле будут все классы связанные с игровым персонажем.
 */
/*********************U N I T*************************/
/*Игровой персонаж...
*/
function Unit(i, j, team, field_link){
    this.i = i;
    this.j = j; // Позиция юнита в тайловой сетке поля
    this.team = team; // цвет/название команды
    if (this.team == 'black'){
        this.img = new Image();
        this.img.src = 'Images/unit_black_mini.png';
        this.img.onload = function(){
        }
    }
    this.field = field_link; //ссылка на игровое поле
}

    //Передвигает объект на тайл (i,j)
    Unit.prototype.moveTo = function(i, j){
        this.i = i;
        this.j = j;
    };

    Unit.prototype.get_pos = function(){
        return this.field.grid[this.i][this.j].get_pos();
    };

    Unit.prototype.event = function(e, mouse){
        if (e.type == 'Click'){
//            if (this.rect.collide_point(mouse)){
//                this.flip();
//            }
        }

    };
    Unit.prototype.render = function(){
        var pos = this.get_pos();
        var x = pos.x;
        var y = pos.y; //fixme: исправить: расположение тайла не учитывает сдвиг самого поля
        context.drawImage(this.img,x,y);
    };

/**************end   U N I T  end********************/