var canvas, context;    //Сам канвас и его контекст
var out_x, out_y;       //Окна для вывода координат х,у
var testField, testUnit;          //Тестовое игровое поле
var output = new Output(); // отладочное окно

// Точка входа
$(document).ready( function(){
    init();
    creteField();
});

function rotation(ar, on, dir){
    dir = dir || 'left'; //Задаем значение по умолчанию
    var temp_ar = ar.slice();
    if (dir == 'left'){//против часовой стрелки
        var f = temp_ar.splice(0,on);
        temp_ar.push(f);
    }else if (dir == 'right'){
        var f = temp_ar.splice(temp_ar.length-on,temp_ar.length-1);
        temp_ar.unshift(f);
    }else{
        output.wtLog('Error: unknown dir');
    }

    return temp_ar;
}

// Инициализация объектов и ресурсов
function init(){
//    alert('init');
    canvas = document.getElementById("c_one");
    context = canvas.getContext("2d");
    out_x = document.getElementById("x");
    out_y = document.getElementById("y");
    out_x.value =10;
    canvas.onmousedown = mouseDown;
//    canvas.onmouseup = mouseUp;
    canvas.onmousemove = mouseMove;
    timer = setInterval(draw, 20);
//    var keys = Object.keys(window);
    var arrows = [0,0,0,0,1,0,0,1];
    output.wtLog(arrows);
//    disp(arrows, 2, 'right');
//    output.wtLog(arrows);
//    output.wtLog(disp(arrows, 2, 'right'));
    return 1 //Успешно выполнено
}

//Создание игрового полядвоичные числа
function creteField(){
//    alert(canvas);
    testField = new Field();
    $(canvas).on('Click', testField.event); //Подписываем объект на событие
    $(canvas).on('mouseMove', testField.event); //Подписываем объект на событие
    testField.addUnit(2,2,'black');
    return 1
}

//Отрисовка объектов
function draw() {
    clear();
    testField.render();
//    var cur_time = new Date().getTime();
//    var dt = cur_time - start_time;
//    start_time = cur_time;
//    blue_man.update(dt);
//    context.drawImage(blue_man.get_frame(),10,10);

}
function clear() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function mouseDown(mouse_event){
    mouse_event.preventDefault(); //предотвращает действие по умолчанию
    var mouseXY = getCursorPosition(mouse_event, canvas);
    $(canvas).trigger('Click', [mouseXY]); //Создаем событие Click
//    globalTracert.add_message("mouse click");
//    if (this.cell.onCell(mouseX,mouseY)){
//        this.cell.drag = true;
//    }
   // else{
        //$('#x').val('miss');
    //}
    out_x.value = mouseXY.x;
    out_y.value = mouseXY.y;

}
function mouseUp(mouse_event){
    this.cell.drag = false;
}
function mouseMove(mouse_event){
    var mouseXY = getCursorPosition(mouse_event, canvas);
    $(canvas).trigger('mouseMove', [mouseXY]); //Создаем событие Click
//    globalTracert.add_message(mouse_event.type);
//    if (this.cell.drag){
//        this.cell.move_to(mouseX-this.cell.dx,mouseY-this.cell.dy);
//    }

}

