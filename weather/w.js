$( document ).ready(function() {
	
	$("#button").click(function(e) {
		e.preventDefault();
		var city = $("#cityfield").val();
		console.log("City Field: "+city);
		$("#dispcity").text(city);
		var state = "UT";
		getWeather(city, state);
	});

	$("#cityfield").keyup(function() {
		console.log("Key Up");
		$("#suggestionspan").text($("#cityfield").val());
		var url = "http://52.11.184.202:80/getcity?q=";
		url += $("#cityfield").val();
		$.getJSON(url, function(data) {
			var everything = "<ul>";
			$.each(data, function(i,item) {
				everything += "<li> " + data[i].city+"</li>";
			});
			everything += "</ul>";
			$("#suggestionspan").html(everything);
			//    console.log(data);
			//    console.log("got " + data[0].city);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.log("FAIL");
			console.log("Status:" + textStatus);
			console.log("content: " + jqXHR.responseText);
		})
		.done(function() {
			console.log("DONE");
		});
	});
	
	function getWeather(City, State) {
		console.log("GetWeather("+City+", "+State+")");
		var myurl = "https://api.wunderground.com/api/c22c84faca326c9f/geolookup/conditions/q/"+State+"/"+City+".json"
		console.log(myurl);
		$.ajax({
			url : myurl,
			dataType : "jsonp",
			success : function(data) {
			//List:
			//	Location: --
			//  Temperature: --
			//  Weather: --
				var location = data['location']['city'];
				var temp_string = data['current_observation']['feelslike_string'];
				var current_weather = data['current_observation']['weather'];
				everything = "<ul>";
				everything += "<li>Location: " + location;
				everything += "<li>Temperature: " + temp_string;
				everything += "<li>Weather: " + current_weather;
				everything += "</ul>";
				$("#weather").html(everything);
			}
		});
	};
	var key = "c22c84faca326c9f";
});
