/*$(document).ready( function(){
    init();
});*/
function go(){
   init();
    /*globalTracert.add_array(new Array("fist el","second el","third el"));
    var test2dArray = [
        [0,0,0,1,1,1,0,0],
        [0,0,0,1,0,0,0,0],
        [0,0,0,1,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
    ];
    globalTracert.add_2dArray(test2dArray);*/

}function stop(){
    clearInterval(timer);
}

var x = 150;
var y = 150;
var dx = 2;
var dy = 4;
var canvas;
var context;
var WIDTH;
var HEIGHT;
var start_time;
var blue_man;
var timer;
var testField;
var globalTracert;

function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    WIDTH = canvas.offsetWidth;
    HEIGHT = canvas.offsetHeight;
    // with JQ
    //WIDTH = $("#canvas").width()
    //HEIGHT = $("#canvas").height()
    //return setInterval(draw, 20);
    globalTracert = new Tracert();
    canvas.onmousedown = mouseDown;
    testField = new Field();
    testField.render();
    blue_man = new Unit();
    start_time = new Date().getTime();
    timer = setInterval(draw, 20);
}

function draw() {
    clear();
    testField.render();
    var cur_time = new Date().getTime();
    var dt = cur_time - start_time;
    start_time = cur_time;
    blue_man.update(dt);
    context.drawImage(blue_man.get_frame(),10,10);

}
function mouseDown(event){
    globalTracert.add_message("Click")
}
/*
Тайл - Клетка игрового поля
*/
function Tile(i,j, type){
    this.i = i;
    this.j = j; //Позиция тайла в сетке поля
    this.type = type; //тип тайла
    this.width = 64;
    this.height = 64; // Высота и ширина тайла

    this.get_pos = function(){
        var pos = new Array();
        pos[0] = this.j*this.width;
        pos[1] = this.i*this.height;
        return pos
    }
    this.__str__ = function(){
        return "tile ("+this.i+":"+this.j+")"
    }

}
/*********************F I E L D*************************/
/*Само игровое поле. Состоит из Тайлов*/
function Field(w,h){
    this.w = w || 8; //Ширина поля в тайлах, 10 по умолчанию
    this.h = h || 6; //Высота поля в тайлах
    this.x = 10;
    this.y = 10; // Координаты левого верхнего угла поля
    this.grid = new Array();//Grid - сетка из тайлов. Каждый тайл - узел сетки. Tile()
    this.grid_sprites = new Array(); // Набор спрайтов для сетки поля
    this.grid_types = [
        [1,1,1,1,1,1,0,1],
        [0,1,0,1,0,0,0,0],
        [0,0,0,1,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,1]
    ];

    this.load_resources = function(){
        var img = new Image();
        img.src = 'Images/tile_rock01.jpg';
        this.grid_sprites[0] = img;
        var img = new Image();
        img.src = 'Images/tile_rock02.jpg';
        this.grid_sprites[1] = img;
    }
    this.load_resources();

    this.createGrid = function(){
        for (var i = 0; i < this.grid_types.length; i++) {
            this.grid[i] = new Array();
            for (var j = 0; j < this.grid_types[0].length; j++){
                var new_tile = new Tile(i,j,this.grid_types[i][j]);
                this.grid[i][j] = new_tile;
            }
        }
    }
    this.createGrid();
    globalTracert.add_2dArray(this.grid);

    this.render = function(){
        //alert(this.grid_types.length)
        for (var i = 0; i < this.grid_types.length; i++) {
            for (var j = 0; j < this.grid_types[0].length; j++){
                var img = this.grid_sprites[this.grid[i][j].type];
                var x = this.x + this.grid[i][j].get_pos()[0];
                var y = this.y + this.grid[i][j].get_pos()[1];
                //globalTracert.add_message(img);
                //globalTracert.add_message(x);
                //globalTracert.add_message(y);

                context.drawImage(img,x,y);
            }
        }
    }

}
/**************end   F I E L D   end********************/

/**********************U N I T**************************/
function Unit(){
    this.work_time = 0;
    this.frame = 0; //Номер текущего кадра анимации
    this.time = 200; //Время обновления нового кадра
    this.sprites = new Array();
    this.load_resources = function(){
        var img = new Image();
        img.src = 'Images/b_m_r01.png';
        this.sprites[0] = img;
        var img = new Image();
        img.src = 'Images/b_m_r02.png';
        this.sprites[1] = img;
        var img = new Image();
        img.src = 'Images/b_m_r03.png';
        this.sprites[2] = img;

        //img.onload = function(){
            //context.drawImage(blue_man[0],0,0);
            //context.drawImage(blue_man[1],50,0);
            //context.drawImage(blue_man[2],100,0);
        //}
    }
    this.load_resources();
    this.update = function(dt){
        $('#s1').val(dt);
        this.work_time += dt;
        // Считаем сколько кадров надо перелистнуть
        var skip_frame = Math.floor(this.work_time/this.time);
        $('#s2').val(this.work_time);
        $('#s3').val(skip_frame);
        //$('#time').val(skip_frame);
        if (skip_frame > 0){
            this.work_time = this.work_time%this.time;
            this.frame += skip_frame;
        }
        if (this.frame >= this.sprites.length){
            this.frame = 0;
        }
    }
    this.get_frame = function(){
        return this.sprites[this.frame]
    }

}//Unit
/********************** end U N I T end**************************/

function Tracert(){
    this.bar = $("#output");
    //alert(this.bar.attr("id"));
    //alert($("#output").attr("id"));

    this.messages = new Array();
    this.text = "I am ready...";

    this.clear = function(){
        this.messages = new Array();
        this.text = "";
        this.update();
    }

    this.add_message = function (new_message){
        this.messages[this.messages.length] = new_message;
        this.text = new_message + "\n" + this.text ;
        this.update();
    }
    this.add_array = function(new_array){
        //alert(new_array[2].length)
        for(var i=0; i< new_array.length; i++){
            try{
                var el_array = new_array[i].__str__()
            }catch(e) {
                var el_array = new_array[i]
            }
            //alert(el_array);
            this.messages[this.messages.length] = el_array;
            this.text += el_array + "\n";
        }
        this.update();
    }
    this.add_2dArray = function(new_2dArray){ //Добавляем двумерный массив
        for(var i=0; i< new_2dArray.length; i++){
            var string = "[";
            for(var j=0; j< new_2dArray[0].length; j++){
                try{
                    var el_array = new_2dArray[i][j].__str__()
                }catch(e) {
                    var el_array = new_2dArray[i][j]
                }
                string += el_array;
                //alert(string);
            }
            string += "]";
            this.messages[this.messages.length] = string;
            this.text += string + "\n";
        }
        this.update();
    }
    this.refresh_text = function(){
        for(var i=0; i< this.messages.length; i++){
            this.text += this.messages[i] + "\n";
        }
    }

    this.update = function(){
        //var area = $("#output");
           // scrollTop
        this.bar.val(this.text);
        //alert($("#output").attr("id"));
        //alert(this.bar.attr("id"));

        //area.setSelectionRange(0,0);
        //$("#output").focus();
        //$("#output").scrollTop = 10;
    }
}

function circle(x,y,r) {
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2, true);
    context.closePath();
    context.fill();
}

function rect(x,y,w,h) {
    context.beginPath();
    context.rect(x,y,w,h);
    context.closePath();
    context.fill();
}

function clear() {
    context.clearRect(0, 0, WIDTH, HEIGHT);
}
function clearTracert(){
    globalTracert.clear();
}
