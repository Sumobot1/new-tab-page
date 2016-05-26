define(function () {
   
        function getHello() {
            return 'Hello World';
        };
        function printstuff(msg){
        	console.log(msg);
        };
     return {
     	getHello: getHello,
     	printstuff: printstuff
    };
});

