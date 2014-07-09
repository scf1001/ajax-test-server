var http 	= require("http"),
	fs 		= require("fs"),
	url 	= require("url");

function onRequest(request, response) {
	var url_parts = url.parse(request.url, true),
		query = url_parts.query,
		filename = query.file,
		delay = query.delay;

	if (request.url === "/favicon.ico") { // Deal with favicon request
		response.writeHead(200, {"Content-Type": "image/x-icon"} );
		response.end();
		return;
	}
    
    fs.exists(filename, function(exists){
 		if(exists) {
			fs.readFile(filename, "utf8", function(err, data) {
				setTimeout(function() {
			    	response.writeHead(200, {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*"
						// "Access-Control-Allow-Origin": "http://127.0.0.1:9000"
					});

					response.write(data);
					response.end();
				}, delay);
			});
		} else {
			response.writeHead(404, {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			});

			response.write("File not found");
			response.end();
		}
	});
}

http.createServer(onRequest).listen(8888);

console.log("Server has started.");