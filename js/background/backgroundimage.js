var backgroundimage = {
	
}

backgroundimage.showBackgroundImage = function() {
	var backgroundNumber = Math.floor((Math.random() * 429) + 1);
	background.sendMessage({ requesttype: "backgroundNum", number: backgroundNumber });
}