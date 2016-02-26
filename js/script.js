
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var street = $('#street').val();
    var city = $('#city').val();
    var locationParameter = street + ', ' + city;
    var sizeParameter = '&size=900x600';
    var imgHTML = '<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?location=' + locationParameter + sizeParameter + '">';
    $body.append(imgHTML);

    return false;
};

$('#form-container').submit(loadData);
