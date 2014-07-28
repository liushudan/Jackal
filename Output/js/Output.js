//ver 0.0.1
//Кратко о том как пользоватся.

//"Открывать при новых событиях" работает так. Если чекбокс активен панель будет открыватся каждый раз когда
// будут появлятся новые логи или динамические переменные.

//Кладём в корень проекта.
//В HTML: <script src="Output/js/Output.js"></script>
//var output = new Output(); объявляем в целевом скрипте.

//wtDVar - watch Dynamic Variable.
//Output.wtDVar("имя переменной", значение);
//ex: Output.wtDVar("x", x);

//wtLog - watch Log;
//Output.wtLog("Сообщение для вывода в лог");

var variablesBorder;
var DynamicVars = new Object();
var ArrayOfMessage = new Array();
var oldDVLenght = Object.keys(DynamicVars).length;
var oldAoMLenght = ArrayOfMessage.length;
var variables;
var logs;

window.onload = function(){
    document.body.appendChild(closePriorityBox);
    document.body.appendChild(infoBar);
};

var infoBar = document.createElement("div");
infoBar.id = 'infoBar';

var closePriorityBox = document.createElement("div");
closePriorityBox.id = 'closePriorityBox';
closePriorityBox.innerHTML = "<div style='padding-left: 5px; text-align: left;'>Открывать при <br> новых событиях:</div>";


var mainThread = setInterval(function(){
    try{
        variables.innerHTML = '';
        logs.innerHTML = '';
    }
    catch (error){}
    if((Object.keys(DynamicVars).length != oldDVLenght || ArrayOfMessage.length != oldAoMLenght) && document.getElementById("closePrioritySetter").checked){
        infoBar.style.bottom = "0px"
    }
    for(var vr in DynamicVars){
        var variable = document.createElement("div");
        variable.className = "variable";

        var variableName = document.createElement("div");
        variableName.className = "variableName";
        variableName.innerHTML = vr;
        variable.appendChild(variableName);

        var variableMining = document.createElement("div");
        variableMining.className = "variableMining";
        variableMining.innerHTML = DynamicVars[vr];
        variable.appendChild(variableMining);

//            var clr = document.createElement("input");
//            clr.className = "clr";
//            clr.type = "button";
//            clr.value = "X";
//            clr.onclick = function() {
//                clearInterval(mainThread);
//                delete DynamicVars[vr];
//            };
//            variable.appendChild(clr);
//
        var clr = document.createElement("div");
        clr.className = "clr";
        clr.onclick = function(){
            delete DynamicVars[vr];
        };
        clr.innerHTML = "X";
        variable.appendChild(clr);
        variables.appendChild(variable);
        variables.appendChild(variable);
    }
    for(var ms in ArrayOfMessage){
        var log = document.createElement("div");
        log.innerHTML = ArrayOfMessage[ms];
        logs.appendChild(log);
    }
    oldDVLenght = Object.keys(DynamicVars).length;
    oldAoMLenght = ArrayOfMessage.length;}, 500);

function Output(){
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'Output/css/Output.css';
//    link.href = 'css/Output.css';
    head.appendChild(link);

    var closePrioritySetter = document.createElement('input');
    closePrioritySetter.id = "closePrioritySetter";
    closePrioritySetter.type = 'checkbox';
    closePrioritySetter.checked = true;
    closePriorityBox.appendChild(closePrioritySetter);


    var switcher = document.createElement("div");
    switcher.id = "switcher";
    switcher.onclick = function(){
        if(infoBar.style.bottom == "0px"){
            infoBar.style.bottom = "-185px";
        }
        else{
            infoBar.style.bottom = "0px";
        }
    };
    infoBar.appendChild(switcher);

    variablesBorder = document.createElement("div");
    variablesBorder.id = "variablesBorder";
    infoBar.appendChild(variablesBorder);

    var varText = document.createElement("div");
    varText.id = "varText";
    varText.innerHTML = "Переменные";
    variablesBorder.appendChild(varText);

    variables = document.createElement("div");
    variables.id = "variables";
    variablesBorder.appendChild(variables);

    var logsBorder = document.createElement("div");
    logsBorder.id = "logsBorder";
    infoBar.appendChild(logsBorder);

    var logText = document.createElement("div");
    logText.id = "logText";
    logText.innerHTML = "Логи";
    logsBorder.appendChild(logText);

    logs = document.createElement("div");
    logs.id = "logs";
    logsBorder.appendChild(logs);

    this.wtDVar = function(newDVarName ,newDVar){
        DynamicVars[newDVarName] = newDVar;
    };

    this.wtLog = function(message){
        ArrayOfMessage.push(ArrayOfMessage.length + 1 + " " + message + "\n");
    };
}
