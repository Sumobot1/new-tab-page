define(function() {
    function updateTime(currentTime, currentPartOfDay, userName) {
        //console.log("mainTime.updateTime: ", currentTime);
        //console.log("userName: "+userName);
        if (userName) {
            document.getElementById("mainGreeting").innerHTML = "Good " + currentPartOfDay + " " + userName;
            document.getElementById("userNameField").style.display = "none";
        }else{
            document.getElementById("mainGreeting").innerHTML = "Good " + currentPartOfDay + ", what's your name?";
            document.getElementById("userNameField").style.display = "block";
        }
        document.getElementById("mainTime").innerHTML = currentTime;

    };
    return {
        updateTime: updateTime
    };
});
