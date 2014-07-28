/**
 * Created by koteg on 04.06.14.
 * Демонстрация Области видимости переменных
 */
var b = 14;
c = 10;
var d = 8;
$(document).ready( function(){
    var a = 15;
    var d = window.d + 9;
    var e = c + 9;
//    alert(a);
//    alert(b);
//    alert(c);
//    alert(d);
//    alert(e);
    alert(summ());

});

function summ(a,b){
    a = a || 10; //Задание аргумента по умолчанию
    b = b || 10;
    var res = a+b;
    return res
}