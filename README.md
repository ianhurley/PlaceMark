ReadMe

Name : Ian Hurley

Student Number: 20099695

Brief description of WebApp:

PlaceMark - Points of interest
Wild Swimming is a placemark application designed to manage and organise the users swim spots.  

How to use/ what to expect:

On Signup a user can login to create swimlists by Region and further categorise by Body of Water. Swim spots are identified by name, county, and latitude and longitude co-ordinates which trigger current weather conditions along with interactive location map.

Known bugs/problems:

FIXED (spelling error) :The create multiple swimlist api test not working, references an axios port issue 'Error: connect ECONNREFUSED ::1:80'
Issue connecting weather-util with .env api-key. API key hardcoded in list-spot which is not ideal.
Map feature not showing on Render site.
API tests fail when fixtures.js url changed to Render, despite additional latency.

Sources/ References:

Inspired by the book 'The Art of Wild Swimming - Ireland'
Embedding location map: https://leafletjs.com/examples/quick-start/ https://medium.com/@nargessmi87/how-to-embede-open-street-map-in-a-webpage-like-google-maps-8968fdad7fe4
Openweather tutorial: https://www.youtube.com/watch?v=GXrDEA3SIOQ
Fetch API: https://www.visualcrossing.com/resources/documentation/weather-api/how-to-load-weather-data-in-javascript/
