/*!
jQuery Text Carousel v1.0 - 2013-04-17
(c) 2013 Ethan Heffler - ethanheffler.com
*/

(function($) {
    $.fn.textCarousel = function (options) {

        var settings = $.extend({
			'quotesShown' : 3,
		}, options);

        //toNumber = quotesShown;
	    var quotes = [];
	    var quoteRemainder;
        var quotesShown = settings.quotesShown;

	    //Dynamic Quote Carousel Example
	    if ($("#textCarousel").length) {
	        function textCarousel() {
	            var fromNumber = 0;
	            var toNumber;
	            var currentPageNumber = 1;

	            
	            $.ajax({
	                type: "GET",
	                url: "xml/quotes.xml",
	                dataType: "xml",
	                success: function (xml) {

                        //writes the html structure into the #textCarousel div
	                    var textCarouselLine1 = $("<div id='textCarouselContent'></div>");
	                    var textCarouselLine2 = $("<div id='textCarouselPager'><a href='javascript:void(0);' id='prevQuote'>< Previous</a> | Reviews page <span id='currentPage'></span> of <span id='totalPages'></span> | <a href='javascript:void(0);' id='nextQuote'>Next ></a></div>");
	                    $("#textCarousel").append(textCarouselLine1, textCarouselLine2);

	                    $(xml).find("textblock[Name=Quote]").each(function () {
	                        //takes the xml nodes and puts them into the array "quotes"
	                        quotes.push({
	                            value: $(this).text()
	                        });
	                    });

	                    if (quotes.length > quotesShown) {
	                        toNumber = quotesShown;
	                    } else {
	                        toNumber = quotes.length;
	                    }

	                    quoteLoop(fromNumber, toNumber, currentPageNumber, quotes);
	                }
	            });

	            //for loop to switch quotes
	            function quoteLoop(fromNumber, toNumber, currentPageNumber, quotes) {
	                for (var i = fromNumber; i < toNumber; i++) {
	                    $('#textCarouselContent').append(quotes[i].value)
	                    $('#textCarouselContent div.quote').fadeIn();
	                    $('#currentPage').html(currentPageNumber);
	                }

	                //Shows the total amount of pages of quotes
	                var slideTotal = Math.ceil(quotes.length / quotesShown);
	                document.getElementById("totalPages").innerHTML = slideTotal;

	                //if there are three quotes or less, hide quote navigation
	                if (quotes.length <= quotesShown) {
	                    $("#textCarouselPager").remove();
	                }

	                //gets the remainder if the amount of quotes is not divisible by 3
	                quoteRemainder = quotes.length % quotesShown;
	            }

	            //goes to next quote
	            $('#nextQuote').live("click", function () {

	                if (fromNumber >= (quotes.length - quotesShown)) {
	                    //stops increasing number when there are no more quotes
	                } else {
	                    //if the amount of quotes is not divisible by 3, dont add 3, add the remainder
	                    if (toNumber == (quotes.length - quoteRemainder)) {
	                        fromNumber += quotesShown;
	                        toNumber += quoteRemainder;
	                        currentPageNumber += 1;
	                        $('#textCarouselContent div.quote').remove();
	                        quoteLoop(fromNumber, toNumber, currentPageNumber, quotes);
	                        //if the amount of quotes is divisible by 3, add 3
	                    } else {
	                        fromNumber += quotesShown;
	                        toNumber += quotesShown;
	                        currentPageNumber += 1;
	                        $('#textCarouselContent div.quote').remove();
	                        quoteLoop(fromNumber, toNumber, currentPageNumber, quotes);
	                    }
	                }
	            });

	            //goes to previous quote
	            $('#prevQuote').live("click", function () {
	                if (fromNumber <= 0) {
	                    //stops increasing number when num hits zero
	                } else {
	                    //if the amount of quotes is not divisible by 3, dont subtract 3, subtract the remainder
	                    if (toNumber == quotes.length && quoteRemainder > 0) {
	                        fromNumber -= quotesShown;
	                        toNumber -= quoteRemainder;
	                        currentPageNumber -= 1;
	                        $('#textCarouselContent div.quote').remove();
	                        quoteLoop(fromNumber, toNumber, currentPageNumber, quotes);
	                        //if the amount of quotes is divisible by 3, subtract 3
	                    } else {
	                        fromNumber -= quotesShown;
	                        toNumber -= quotesShown;
	                        currentPageNumber -= 1;
	                        $('#textCarouselContent div.quote').remove();
	                        quoteLoop(fromNumber, toNumber, currentPageNumber, quotes);
	                    }
	                }
	            });
	        }
	        textCarousel();
	    }
	};
})(jQuery);
