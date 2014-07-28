//$(document).ready( function(){
//    if (init() != 1){
//        alert('Ошибка запуска');
//    }
//});
function creteTiles(){
    alert(canvas);

//    var canvas = document.getElementById("c_two");
//    var context = canvas.getContext("2d");
//    canvas.onmousedown = mouseDown;
//    canvas.onmouseup = mouseUp;
//    canvas.onmousemove = mouseMove;
//    var test_cell = new Tile(canvas,100,150,50,60);
//    canvas.cell = test_cell;
//    test_cell.draw();
    return 1 //Успешно выполнено
}

function Tile(canvas,x,y,width,height){
    if (arguments.length <5){
        this.x = 0;
        this.y = 0;
        this.width = 30;
        this.height = 40;
    }
    else{
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    this.draw = function(){ //Отрисовывает данную ячейку на её канвасе
        clear(this.canvas);
        this.context.fillStyle = '#00f'; // blue
        this.context.strokeStyle = '#f00'; // red
        //this.parent.lineWidth = 4;
        this.context.fillRect(this.x, this.y,this.width,this.height);
    }
    this.onCell = function(x,y){ //Возвращает True - если (x,y) внутри Rect ячейки
        if ((x>this.x && x<this.x+this.width)&&(y>this.y && y<this.y+this.height)){
            this.dx = x- this.x;
            this.dy = y- this.y;
            //alert('dx = '+this.dx+'dy = '+this.dy);

            return 1;
        }
        else{
            return 0;
        }
    }

    this.move = function(dx, dy){
        this.x += dx;
        this.y += dy;
    }
    this.move_to = function(new_x, new_y){
        if (arguments.length==2){
            this.x = new_x;
            this.y = new_y;
        }
        else{
            this.x = new_x[0];
            this.y = new_x[1];
        }
    this.draw();

    }

    this.getRect = function(){
        //alert('x in method = '+this.x);
        var rect = new Array(this.x, this.y, this.width, this.height);
        return rect;
    }
}