var timeanddate = {

};

timeanddate.updateTime = function () {
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        if (minutes < 10){
            minutes = "0" + minutes;
        }
        var partOfDay;
        if(hours > 11){ 
            if (hours < 18){
                partOfDay = "afternoon";
            }else{
                partOfDay = "evening"
            }
            hours -=12;
        } else {
            partOfDay = "morning"
            if (hours === 0){
                hours = 12;
            }
        }
        var v = hours + ":" + minutes;  
        console.log("Current Time: ", v);
        background.sendMessage({requesttype: "updatedTime", newTime: v, newPartOfDay: partOfDay});
        var self = this;
        setTimeout(function(){console.log("Updating Time ");self.updateTime()},1000);
    };