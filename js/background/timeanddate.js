var timeanddate = {
    'timeInHours':-1,
    'time':null,
    'partOfDay':null,
    'day':null
};

timeanddate.updateTheTime = function () {
        var currentTime = new Date();
        var thehours = currentTime.getHours();
        var hours = thehours;
        var minutes = currentTime.getMinutes();
        var day = currentTime.getDay();

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
        if(this.timeInHours != thehours || this.day != day){
            this.timeInHours = thehours;
            this.day = day;
            this.time = v;
            this.partOfDay = partOfDay;
            background.forceFullUpdate();
        }else if (this.time != v){
            this.time = v;
            this.partOfDay = partOfDay;
            background.sendMessage({requesttype: "updatedTime", newTime: v, newPartOfDay: partOfDay, userName: background.theUserSettings['user-name']});
            background.forceUpdate();
        }
        var self = this;
        setTimeout(function(){console.log("Updating Time ");self.updateTheTime()},1000);
    };

timeanddate.updateTime = function() {
    if (this.time) {
        background.sendMessage({requesttype: "updatedTime", newTime: this.time, newPartOfDay: this.partOfDay, userName: background.theUserSettings['user-name']});
    }else {
        this.updateTheTime();
    }
}