var backgroundimage = {
	// 'number': null
// }

// backgroundimage.showBackgroundImage = function() {
// 	if (backgroundimage.number) {
// 		background.sendMessage({ requesttype: "backgroundNum", number: this.number });
// 	}else {
// 		backgroundimage.showBackgroundImage();
// 	}
}

backgroundimage.showBackgroundImage = function() {
	var backgroundNumber = Math.floor((Math.random() * 429) + 1);
	// this.number = backgroundNumber;
	background.sendMessage({ requesttype: "backgroundNum", number: backgroundNumber });
}