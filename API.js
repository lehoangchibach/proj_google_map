// import axios from "axios";
// axios.defaults.baseURL = "http://myurl";
// axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

var axios = require("axios");
async function placesNearBy(props) {
    const { lat, lng, rad, type } = props;
    let result;
    var config = {
        method: "get",
        url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyAGxWVe08IBXqAiz2q4dgbZ8d2AJjXXfls",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            mode: "no-cors"
        }
    };

    // await axios(config)
    axios
        .get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=${rad}&type=${type}&keyword=cruise&key=AIzaSyAGxWVe08IBXqAiz2q4dgbZ8d2AJjXXfls`
        )
        .then(function (response) {
            console.log(response.data.results);
            result = filterResult(response.data);
            console.log(result);
        })
        .catch(function (error) {
            console.log(error);
        });
    return result;
}

function filterResult(data) {
    data = data.results;
    let result = data.filter(
        (restaurants) =>
            restaurants.business_status == "OPERATIONAL" &&
            restaurants.rating >= 4.5
    );
    return result;
}
