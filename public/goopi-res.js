getTimeFrameFormat = function(dec){
    // convert time in decimal format to ss:ff format for display
    var ss=String(dec).match(/(\d+)(\.\d+)?/);
    if(!ss) {
        return;
    } 
    
    if(!ss[2]) {
        ss[2]=0;
    }

    ss[2]=parseInt(ss[2]*100);

    var f=parseInt(ss[1])>=10?ss[1]:"0"+ss[1];
    var s=parseInt(ss[2])>=10?ss[2]:"0"+ss[2];

    return f+":"+s;
};

getElementByClass = function(matchClass) {
    var res=[];
    var elems = document.getElementsByTagName('*'), i;
    for (i in elems) {
        if((' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ') > -1) {
            res.push(elems[i]);
        }
    }
    return res;
};

addClass = function(el, cn) {
    var c0 = (" " + el.className + " ").replace(/\s+/g, " "),
        c1 = (" " + cn + " ").replace(/\s+/g, " ");
    if (c0.indexOf(c1) < 0) {
        el.className = (c0 + c1).replace(/\s+/g, " ").replace(/^ | $/g, "");
    }
}

removeClass = function(el, cn) {
    var c0 = (" " + el.className + " ").replace(/\s+/g, " "),
        c1 = (" " + cn + " ").replace(/\s+/g, " ");
    if (c0.indexOf(c1) >= 0) {
        el.className = c0.replace(c1, " ").replace(/\s+/g, " ").replace(/^ | $/g, "");
    }
}

is_array = function(unknown) {
    return Object.prototype.toString.call( unknown ) === '[object Array]';
} 