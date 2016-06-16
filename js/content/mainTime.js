define(function () {   
        function updateTime(currentTime, currentPartOfDay) {
            //console.log("mainTime.updateTime: ", currentTime);
            document.getElementById("mainTime").innerHTML = currentTime;
            var partOfDay = document.createElement("div");
            partOfDay.innerHTML = currentPartOfDay;
            partOfDay.classList.add("partOfDay");
            document.getElementById("mainTime").appendChild(partOfDay);

        };
     return {
     	updateTime: updateTime
    };
});