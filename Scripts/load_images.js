var i = 0;
function LoadImage(src) {
    var img = new Image();
    img.src = src;
    i++;
    img.onload = function(){
        i--;
        if (i == 0) {
            LoadComplete();
        }
    };
    return img;
}

function LoadComplete(){
    globalTracert.add_message('Load complete');

}

