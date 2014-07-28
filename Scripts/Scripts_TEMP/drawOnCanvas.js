$(document).ready( function(){
    init();
    creteTiles();
});
function init(){
//    alert('init1');
    var canvas = document.getElementById("c_one");
    var context = canvas.getContext("2d");
    alert(canvas);
    canvas.onmousedown = mouseDown;
    canvas.onmouseup = mouseUp;
    canvas.onmousemove = mouseMove;
    var test_cell = new Cell(canvas,100,150,50,60);
    canvas.cell = test_cell;
    test_cell.draw();
    return 1 //Успешно выполнено
}
function mouseDown(mouse_event){
    var mouseX = getCursorPosition(mouse_event, this)[0];
    var mouseY = getCursorPosition(mouse_event, this)[1];
    if (this.cell.onCell(mouseX,mouseY)){
        this.cell.drag = true;
    }
   // else{
        //$('#x').val('miss');
    //}

}
function mouseUp(mouse_event){
    this.cell.drag = false;
}
function mouseMove(mouse_event){
    var mouseX = getCursorPosition(mouse_event, this)[0];
    var mouseY = getCursorPosition(mouse_event, this)[1];
    if (this.cell.drag){
        this.cell.move_to(mouseX-this.cell.dx,mouseY-this.cell.dy);
    }

}

function clear(canvas){
    canvas.width = canvas.width; //Эта магия стирает содержимое канваса
}

// *********Прототип-Класс Tile **********//
function Cell(canvas,x,y,width,height){
    //alert('create Cell');
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.drag = false;
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

//*************************************//
function getCursorPosition(e, gCanvasElement) { //Возвращает координаты курсора относительно gCanvasElement
    var x;
    var y;
    if (e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
    }
    else {
        x = e.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }
    x -= gCanvasElement.offsetLeft;
    y -= gCanvasElement.offsetTop;

    return new Array(x,y);
}


function draw_grid(context) {
 	for (var x = 0.5; x < 500; x += 10) {
		context.moveTo(x, 0);
		context.lineTo(x, 375);
	}
	for (var y = 0.5; y < 375; y += 10) {
		context.moveTo(0, y);
		context.lineTo(500, y);
	}
	context.strokeStyle = "#eee";//Задаем стиль обводки
	context.stroke();//Обводим нарисованные линии

	context.beginPath();
	context.moveTo(0, 40);
	context.lineTo(240, 40);
	context.moveTo(260, 40);
	context.lineTo(500, 40);
	context.moveTo(495, 35);
	context.lineTo(500, 40);
	context.lineTo(495, 45);
	context.moveTo(60, 0);
	context.lineTo(60, 153);
	context.moveTo(60, 173);
	context.lineTo(60, 375);
	context.moveTo(65, 370);
	context.lineTo(60, 375);
	context.lineTo(55, 370);
	context.strokeStyle = "#000";
	context.stroke();
	context.font = "bold 12px sans-serif";
	context.fillText("x", 248, 43);
	context.fillText("y", 58, 165);
	context.textBaseline = "top";
	context.fillText("( 0 , 0 )", 8, 5);
	context.textAlign = "right";
	context.textBaseline = "bottom";
	context.fillText("( 500 , 375 )", 492, 370);

}