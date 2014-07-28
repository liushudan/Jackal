/*
Некоторые концепции:
1. Все координаты возвращаются и передаются в виде объекта со свойствами x,y
2. Локальные координаты - координаты относительно левого верхнего угла канваса
*/

/*********************F I E L D*************************/
/*Само игровое поле. Состоит из Тайлов*/
function Field(){
    var self = this;
    this.x = 10; // Координаты левого верхнего угла поля (!!!пока не работает)
    this.y = 10;
    this.grid = new Array();//Grid - сетка из тайлов. Каждый тайл - узел сетки. Tile()
    this.grid_sprites = ['Images/tile-jungle-grass(64).jpg','Images/jackal-meadow.jpg']; // Набор спрайтов для сетки поля
    this.grid_types = [
        [0,1,1,1,1,1,1,1,1,1,0],
        [1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1],
        [0,1,1,1,1,1,1,1,1,1,0]
    ];
    this.load_complete = true; //Пока идет загрузка ресурсов, устанавливается в false
    this.mouse_on_tile = false; //Запоминаем над каким тайлом курсор мыши. Реализуем события onMouseOver, onMouseOut
    this.units = []; //Список юнитов на поле
    this.goto_tiles = []; //Тайлы на которые можно переместиться
    //Загружка ресурсов (картинок)
    this.load_resources = function(){
        self.load_complete = false;
        var i = 0;

        function LoadImage(src) {
            self.grid_sprites = [];
            var img = new Image();
            img.src = src;
            i++;
            img.onload = function(){
                i--;
                self.grid_sprites[i]=img;
                if (i == 0) {
                    LoadComplete();
                }
            };
            return img;

        function LoadComplete(){
            self.load_complete = true;
            output.wtLog('Load Complete');
            self.createGrid();
        }
        }
        self.grid_sprites.map(LoadImage);
    };

//        var img = new Image();
//        img.src = 'Images/tile-jungle-grass(64).jpg';
//
//        img.onload = function(){
//            //Создаем виртуальный канвас
//            var surf = document.createElement('canvas');
//
//            //Подготавливаем изображение спрайта на вирт.канвасе
//            ctx_surf = surf.getContext("2d");
//            ctx_surf.fillStyle = '#00f'; // blue
//            ctx_surf.strokeStyle = '#f00'; // red
//            ctx_surf.lineWidth = 4;
//            // Draw some rectangles.
//            ctx_surf.drawImage(img, 0, 0);
//            ctx_surf.strokeRect(0, 0, img.width, img.height);
//            self.grid_sprites[0] = surf;
//            var img1 = new Image();
//            img1.src = 'Images/jackal-meadow.jpg';
//            img1.onload = function(){
//                self.grid_sprites[1] = img1;
//                self.createGrid()
//            };

//        };
//
//
//
//    };
    this.load_resources();
//    while (!self.load_complete){
//    }

    this.createGrid = function(){
        for (var i = 0; i < self.grid_types.length; i++) {
            self.grid[i] = new Array();
            for (var j = 0; j < self.grid_types[0].length; j++){
                if (self.grid_types[i][j] == 0){
                    var new_tile = null;
                    output.wtLog('Null');
                }
                else var new_tile = new Tile(i,j,self.grid_types[i][j],self.grid_sprites[0], self.grid_sprites[1], self);
                self.grid[i][j] = new_tile;
            }
        }
    };

    //Добавляем нового Юнита на поле
    this.addUnit = function(i,j,team){
        var newUnit = new Unit(i,j,team, self);
        self.units.push(newUnit);
    };

    //Обработка событий
    // e - событие; mouseXY - объект с локальными координатами мыши
    this.event = function(e, mouseXY){
        if (e.type == 'Click'){
            for (var i = 0; i < self.grid.length; i++) {
                for (var j = 0; j < self.grid[0].length; j++){
                    if (self.grid[i][j] == null) continue;
                    if (self.grid[i][j].rect.collide_point(mouseXY)){
                        //fixme: ниже блок идиотского временного кода. Исправить!
                        if (i == self.units[0].i && j == self.units[0].j ){
                            self.goto_tiles = [];
                            self.grid[i][j].event({type:'unitSelect'}, mouseXY);
                            output.wtDVar("lenght: ", self.goto_tiles.length);
                            }else{

                            for (var k = 0; k < self.goto_tiles.length; k++){
                                if (self.goto_tiles[k].i == i && self.goto_tiles[k].j == j){
                                    self.units[0].moveTo(i,j);
                                    self.grid[i][j].flip();
                                    self.goto_tiles = [];
                                }
                            }
                        }
//                        self.grid[i][j].event(e, mouseXY);
                    }
                }
            }
        }//if
        // Обрабатывая событие mouseMove создаетм/посылаем собственные события onMouseOver и on<ouseOut
        // для всех тайлов поля
        else if (e.type == 'mouseMove'){
            var mouse_on_tiles = false;
            for (var i = 0; i < self.grid.length; i++) {
                for (var j = 0; j < self.grid[0].length; j++){
                    if (self.grid[i][j] == null) continue;
                    if (self.grid[i][j].rect.collide_point(mouseXY)){
                        if (self.grid[i][j] != self.mouse_on_tile){
                            self.grid[i][j].event({type:'onMouseOver'},mouseXY);//fixme: Объект события имеет только один атрибут

                            if (self.mouse_on_tile){
                                self.mouse_on_tile.event({type:'onMouseOut'},mouseXY);//fixme: Объект события имеет только один атрибут
                            }
                            self.mouse_on_tile = self.grid[i][j];
                        }

                        mouse_on_tiles = true;
                        break;
                    }
                }
            }
            if (!mouse_on_tiles){
                if (self.mouse_on_tile){
                    self.mouse_on_tile.event({type:'onMouseOut'},mouseXY)
                }
                self.mouse_on_tile = false;
            }
        }else{
        }

    };

    this.render = function(){
//        alert(this.grid_types.length)
        for (var i = 0; i < self.grid.length; i++) {
            for (var j = 0; j < self.grid[0].length; j++){
                if (self.grid[i][j] == null) continue;
                self.grid[i][j].render();
//                var img = self.grid_sprites[self.grid[i][j].type];
//                var x = self.x + self.grid[i][j].get_pos().x;
//                var y = self.y + self.grid[i][j].get_pos().y;
//
//
//                context.drawImage(img,x,y);
            }
        }
        for (var i = 0; i < self.units.length; i++) {
            self.units[i].render();
        }
    }

}/**************end   F I E L D   end********************/
