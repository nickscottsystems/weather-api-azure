# Hello World Express Server

Simple Express server for local testing.

Run locally:

```
cd /workspaces/weather-api-azure
npm install
npm start
# then open http://localhost:3000
```

Wunderground endpoint
----------------------

This project exposes a `/wunderground` endpoint that accepts the Weather Underground upload format.

Note: the Weather Underground protocol typically uses an HTTP GET with query parameters (not a POST). The server accepts both, but the recommended way to send data is via GET.

Example `curl` (GET with query params):

```
curl -G \
	-H "User-Agent: WeatherUnderground/1.0" \
	--data-urlencode "PASS=MYPASS" \
	--data-urlencode "dateutc=now" \
	--data-urlencode "tempf=70.0" \
	--data-urlencode "humidity=45" \
	http://localhost:3000/wunderground
```

Example `curl` (legacy POST form-encoded still supported):

```
curl -X POST \
	-H "Content-Type: application/x-www-form-urlencoded" \
	-d "PASS=MYPASS&dateutc=now&tempf=70.0&humidity=45" \
	http://localhost:3000/wunderground
```

The server will log the received data (query params or body) to the console.

# weather-api-azure

Running as an Azure Function (Node)
---------------------------------

This repository also includes an Azure Functions HTTP-trigger implementation of the `/wunderground` endpoint located in the `wunderground` folder. Use Azure Functions if you plan to deploy to a Function App.

Requirements:
- Azure Functions Core Tools v4
- Node.js 18+

Run locally with the Functions host:

```bash
cd /workspaces/weather-api-azure
# install dependencies (if needed)
npm install

# start the Functions host (requires `func` to be installed)
func start
```

Sample GET (same as Weather Underground):

```bash
curl -G \
	-H "User-Agent: WeatherUnderground/1.0" \
	--data-urlencode "PASS=MYPASS" \
	--data-urlencode "dateutc=now" \
	--data-urlencode "tempf=70.0" \
	--data-urlencode "humidity=45" \
	http://localhost:7071/api/wunderground
```

Notes:
- `local.settings.json` is provided for local development and is ignored by git.
- The function logs incoming query params or POST body to the Functions host logs.
