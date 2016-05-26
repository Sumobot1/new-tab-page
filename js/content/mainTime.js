define(function () {   
        function updateTime(currentTime) {
            console.log("mainTime.updateTime: ", currentTime);
            document.getElementById("mainTime").innerHTML = currentTime;
        };
     return {
     	updateTime: updateTime
    };
});