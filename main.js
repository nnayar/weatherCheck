/*

- Sign up for openweathermap.org and generate an API key.
- User either $.ajax or $.get to pull weather current data for London
- Print the temperature in console.
- Possible next steps
- 1: Display the temperature in the UI rather than the console
- 2: Display an icon or image depending on the current weather
- 3: add a form prompting user for the city.
- 4: add a toggle for switching between farenheit and celcius

*/

var app = {};

app.requestWeatherUrl = '';
app.weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
app.apiKey = 			'ff92dc4fbd3d54073cbf1865d62fa3df';

app.createItem = function( temp ){
	var source =  $( '#item-template' ).html();
	var template = Handlebars.compile( source );
	var task = template( temp );

	$( '#favourites' ).append( task );
};

app.getWeatherData = function( cityName ){

	app.requestWeatherUrl = app.weatherUrl + cityName + '&APPID=' + app.apiKey;
	console.log("URL being requested", app.requestWeatherUrl);
	var temp = {};

	$.ajax({
		url: app.requestWeatherUrl,
		success: function( response ){
			temp.city = cityName;
			temp.avgTemp = Math.round( response.main.temp-273 );
			temp.minTemp = Math.round( response.main.temp_min-273 );
			temp.maxTemp = Math.round( response.main.temp_max-273 );
			temp.weatherFeelsLike = '';
			console.log(temp.avgTemp, temp.minTemp, temp.maxTemp);
			app.createItem( temp );
		}
	});
};


app.getWeather = function() {
	event.preventDefault();
	$cityName = $( '#cityInput').val();
	app.getWeatherData( $cityName );
	$( '#cityInput' ).focus().val( '' );
};

app.init = function () {
	$( '.get-city-weather' ).on( 'submit', app.getWeather );
};

$(document).ready( app.init );
