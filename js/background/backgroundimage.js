var backgroundimage = {
	'number': null
};

backgroundimage.showBackgroundImage = function() {
	if (backgroundimage.number) {
		background.sendMessage({ requesttype: "backgroundNum", number: backgroundimage.number });
	}else {
		backgroundimage.showTheBackgroundImage();
	}
};

backgroundimage.showTheBackgroundImage = function() {
	var backgroundNumber = Math.floor((Math.random() * 429) + 1);
	backgroundimage.number = backgroundNumber;
	background.sendMessage({ requesttype: "backgroundNum", number: backgroundNumber });
};