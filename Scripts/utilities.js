/*
Различные вспомогательные функции
 */

 /*
 Принимает событие с абсолютными координатами и ссылку на канвас,
 возвращает объект с относительными координатами (относительно канваса)
  */
function getCursorPosition(e, gCanvasElement) {
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
    var mouseXY = {
        x:x,
        y:y
    };

    return mouseXY;
}

//Наследование на Классах
function extend(Child, Parent) {
    var F = function() { };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
}