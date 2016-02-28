
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $wikiHeaderElem = $('wikipedia-header');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $('#street').val();
    var city = $('#city').val();
    var address = street + ', ' + city;
    var sizeParameter = '&size=900x600';
    var imgHTML = '<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?location=' + address + sizeParameter + '">';
    $body.append(imgHTML);

    // get ny times articles relating to address

    var nytURI = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + address + '&sort=newest&api-key=8050a6b5db4ee4114ff99440f71775be:6:74541255';

    $.getJSON( nytURI , function( data ) {
  		$nytHeaderElem.text('NY Times articles about: '  + city);
      var items = [];
      $.each( data.response.docs, function( key, val ) {
          var headline = val.headline.main;
          var articleURL = val.web_url;
          var articleSnippet = val.snippet;
          items.push( '<li><a href="' + articleURL + '">' + headline + '</a><p>' + articleSnippet + '</p></li>' );
      });

      $nytElem.append(items.join(""));

    }).fail( function(){
    	$nytHeaderElem.text('NY Times articles could not be loaded');
    });

    // get wikipedia articles relating to city
   	var wikipediaURI = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles='+ city + '&exintro=1&redirects=1&format=json&callback=wikiCallBack';
   	//var wikipediaURI = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles='+ city + '&rvprop=content&format=json';

    $.ajax({
    	url: wikipediaURI,
    	dataType: "jsonp",
    	jsonp: "callback",
    }).done(function(response) {

    	var pages = response.query.pages;
    	var noOfPages = pages.length;
    	for (var prop in pages) {
    		$wikiElem.append('<li><a href="https://en.wikipedia.org/wiki/' + pages[prop].title + '">' + pages[prop].title + '</a>' + pages[prop].extract );
			}
    }).fail(function() {
				$wikiHeaderElem.text('Wikipedia articles could not be loaded');	
			});

    return false;
};

$('#form-container').submit(loadData);
