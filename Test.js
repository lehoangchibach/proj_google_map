var axios = require("axios");

axios
    .get(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyAGxWVe08IBXqAiz2q4dgbZ8d2AJjXXfls"
    )
    .then(function (response) {
        console.log(response.data.results);
    });
