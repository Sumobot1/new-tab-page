var timeanddate = {

};

timeanddate.updateTime = function () {
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        //var seconds = currentTime.getSeconds();
        if (minutes < 10){
            minutes = "0" + minutes;
        }
/*        if (seconds < 10){
            seconds = "0" + seconds;
        }*/
        var partOfDay;
        if(hours > 11){
            partOfDay = "PM";
            hours -=12;
        } else {
            partOfDay = "AM"
            if (hours === 0){
                hours = 12;
            }
        }
        var v = hours + ":" + minutes;  /* + ":" + seconds + " "*/
        console.log("Current Time: ", v);
        background.sendMessage({requesttype: "updatedTime", newTime: v, newPartOfDay: partOfDay});
        var self = this;
        setTimeout(function(){console.log("Updating Time ");self.updateTime()},1000);
    };