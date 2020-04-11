console.log('Client side javascript file is loaded!')
if ("geolocation" in navigator) {
   console.log("OK")
 } else {
   alert("I'm sorry, but geolocation services are not supported by your browser.");
 }