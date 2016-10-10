var timeanddate = {
    'timeInHours':-1,
    // 'time':null
};

timeanddate.updateTime = function () {
        var currentTime = new Date();
        var hours = currentTime.getHours();
        this.timeInHours = hours;
        var minutes = currentTime.getMinutes();
        if (minutes < 10){
            minutes = "0" + minutes;
        }
        var partOfDay;
        if(hours >= 12){ 
            if (hours < 18){
                partOfDay = "afternoon";
            }else{
                partOfDay = "evening";
            }if (hours >12){
                hours -=12;
            }
        } else {
            partOfDay = "morning";
            if (hours === 0){
                hours = 12;
            }
        }
        var v = hours + ":" + minutes;
        console.log("Current Time: ", v);
        // if (this.time != v){
        //     this.time = v;
        //     background.sendMessage({requesttype: "updatedTime", newTime: v, newPartOfDay: partOfDay, userName: background.theUserSettings['user-name']});
        //     background.forceUpdate();
        // } if(this.timeInHours != hours){
        //     this.timeInHours = hours;
        //     background.forceFullUpdate();
        // }
        background.sendMessage({requesttype: "updatedTime", newTime: v, newPartOfDay: partOfDay, userName: background.theUserSettings['user-name']});
        var self = this;
        setTimeout(function(){console.log("Updating Time ");self.updateTime()},1000);
    };