//http://www.icndb.com/api/

define(function() {
    function showQuote(theQuote){
    	document.getElementById("mainQuote").innerHTML = theQuote;
    }

    return {
        showQuote: showQuote
    };
});
