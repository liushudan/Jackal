/*********************R E C T*************************/
/*
Rect - прямоугольник спрайта
Служит для определения активной области объекта
*/
function Rect(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

} // Rect
//Проверка пересечения текущего ректа с переданным
    Rect.prototype.collide_rect = function(rect){
        //тут будет алгоритм пересечения
        return true
    };

    //Проверка пересечения текущего ректа с точкой
    Rect.prototype.collide_point = function(point){
        if (this.x < point.x &&
            this.x + this.width > point.x &&
            this.y < point.y &&
            this.y + this.height > point.y) {
            return true
        } else
            return false
    };

    Rect.prototype.moveTo = function(point){
        this.x = point.x;
        this.y = point.y;
    };
/*******************end R E C T end***********************/

/*
Тайл - Клетка игрового поля
*/
function Tile(i,j, type, back_img, front_img, field_link){
    this.i = i;
    this.j = j; //Позиция тайла в сетке поля
    this.type = type; //тип тайла
    this.field = field_link; //ссылка на игровое поле
    this.highlight = false; //если true - "подсвечиваем" тайл
    this.width = 64;
    this.height = 64; // Высота и ширина тайла
    this.images = new Array();
    this.images['back']=back_img;
    this.images['front']=front_img; //Картинки тайла (задняя и лицевая стороны)
    this.side = 'front'; //Отображаемая сторона тайла
    this.rect = new Rect(0, 0, this.width, this.height);
    this.rect.moveTo(this.get_pos());
    this.dir = 0; //положение тайла при вращении. 0 - нормальное, 1-на 90 градусов вправо, 2 - 180 вправо, 3 - 270 град.

}
    Tile.prototype.get_pos = function(){
    return pos = {
        x:this.i*this.width,
        y:this.j*this.height
    }
    };
    Tile.prototype.event = function(e, mouse){
        if (e.type == 'Click'){
            if (this.rect.collide_point(mouse)){
                this.flip();
            }
        }else if (e.type == 'onMouseOver'){
            this.highlight = true;
        }else if (e.type == 'onMouseOut'){
            this.highlight = false;
        }else if (e.type == 'unitSelect'){
            for(var i=(this.i ==0 ?0:-1); i <((this.i+1 == this.field.grid.length)?1:2); i++){
                for(j=(this.j ==0 ?0:-1); j < ((this.j+1 == this.field.grid[0].length)?1:2); j++){
                    if (this.field.grid[this.i+i][this.j+j] == null) continue;
                    this.field.grid[this.i+i][this.j+j].highlight = true;
                    this.field.goto_tiles.push(this.field.grid[this.i+i][this.j+j]);

                }
            }
        }else{
            output.wtLog("ERROR: unknown Event in Tile");
        }
    };
    Tile.prototype.render = function(){
        var pos = this.get_pos();
        var x = pos.x;
        var y = pos.y; //fixme: исправить: расположение тайла, не учитывает сдвиг самого поля
        if (this.highlight){
            var surf = document.createElement('canvas');
            //Подготавливаем изображение спрайта на вирт.канвасе
            ctx_surf = surf.getContext("2d");
//            ctx_surf.fillStyle = '#00f'; // blue
//            ctx_surf.strokeStyle = '#f00'; // red
//            ctx_surf.lineWidth = 4;
            // Draw some rectangles.
            ctx_surf.drawImage(this.images[this.side], 0, 0);
//            ctx_surf.strokeRect(0, 0, 20, 20);
            var idata = ctx_surf.getImageData(0,0,64,64);
            var data = idata.data;

            for(var i = 0; i < data.length; i+=4) {
                var r = data[i];
                var g = data[i+1];
                var b = data[i+2];

//                var brightness = (3*r+4*g+b)>>>3;
                var brightness = 50;
//                data[i] = (r+brightness > 255) ?255:r+brightness;
                data[i+1] = (g+brightness > 255) ?255:r+brightness;
//                data[i+2] = (b+brightness > 255) ?255:r+brightness;
            }
            idata.data = data;
            // Draw the pixels onto the visible canvas
            ctx_surf.putImageData(idata,0,0);
            var img = surf;
        }else{
            var img = this.images[this.side]
        }
        context.drawImage(img, x, y);
    };

    //Перевернуть тайл
    Tile.prototype.flip = function(){
        if (this.side == 'front')
        {
            this.side = 'back'
        }
//        else this.side = 'back';
    };

    Tile.prototype.__str__ = function(){
        return "tile ("+this.i+":"+this.j+")"
    };

    //Повернуть тайл по оси
    Tile.prototype.rotation = function(dir){
        dir = dit || 'left'; //Задаем значение по умолчанию
    if (dir == 'left'){//против часовой стрелки
        this.dir--;
        this.dir = (this.dir<0)?0:this.dir;
    }else if (dir == 'right'){
        this.dir++;
        this.dir = (this.dir>3)?0:this.dir;
    }else{
        output.wtLog('Error: unknown dir');
    }
    };
/*******************end T I L E end***********************/

function Arrow_Tile(){

}

