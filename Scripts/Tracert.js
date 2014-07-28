/*********************Tracert************************
 * Криво-косой класс для вывода отладочных сообщений
 * Пока работает через одно место -(
 * Нужно как-нить доделать!
 * *************************************************/
/*
Пример html-кода для окна:
<form>
    tracert:<br><textarea rows="10" cols="45" id="tracert">loading...</textarea>
    <input type="button" onclick="clearTracert()" value="Clear">
</form>
 */
 function Tracert(textarea_id){
    this.bar = $("#"+textarea_id);
    this.clear = function(){
        this.messages = new Array();
        this.text = "";
        this.update();
    };

    this.add_message = function (new_message){
        this.messages[this.messages.length] = new_message;
        this.text = new_message + "\n" + this.text ;
        this.update();
    };
    this.add_array = function(new_array){
//        alert(new_array[2].length)
        if (new_array.length == 0){
            this.text = 'Array is empty' + "\n"+this.text;
        }else{
            for(var i=0; i< new_array.length; i++){
                try{
                    var el_array = new_array[i].__str__()
                }catch(e) {
                    var el_array = new_array[i]
                }
    //            alert(el_array);
    //            this.messages[this.messages.length] = el_array;
                this.text = el_array + "\n"+this.text;
            }
        }
        this.update();
    };
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
                //alert(string
            }
            string += "]";
            this.messages[this.messages.length] = string;
            this.text = string + "\n"+this.text;
        }
        this.update();
    };
    this.refresh_text = function(){
        for(var i=0; i< this.messages.length; i++){
            this.text += this.messages[i] + "\n";
        }
    };

    this.update = function(){
        this.bar.val(this.text);
    };

    this.messages = new Array();
    this.text = "I am ready...";
    this.update();
}
function clearTracert(){
//    alert("click");
    globalTracert.clear();
}