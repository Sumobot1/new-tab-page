var timeanddate = {

};

timeanddate.updateTime = function () {
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var seconds = currentTime.getSeconds();
        if (minutes < 10){
            minutes = "0" + minutes;
        }
        if (seconds < 10){
            seconds = "0" + seconds;
        }
        var v = hours + ":" + minutes + ":" + seconds + " ";
        if(hours > 11){
            v+="PM";
        } else {
            v+="AM"
        }
        console.log("Current Time: ", v);
        background.sendMessage({requesttype: "updatedTime", time: v});
        var self = this;
        setTimeout(function(){console.log("Updating Time ");self.updateTime()},1000);
    };