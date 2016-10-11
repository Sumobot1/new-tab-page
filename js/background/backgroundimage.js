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
	var backgroundNumber = Math.floor((Math.random() * background.theUserSettings['number-of-backgrounds']) + 1);
	backgroundimage.number = backgroundNumber;
	background.sendMessage({ requesttype: "backgroundNum", number: backgroundNumber });
};