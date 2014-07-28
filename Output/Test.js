var i = 0;
var output;

output = new Output();

setInterval(function(){
    output.wtDVar("i",i);
    output.wtLog("Это сообщение пишется каждую секунду");
    i++;
    console.log(i);
}, 1000);