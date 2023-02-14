// import React from "react";
// import { useJsApiLoader } from "@react-google-maps/api";

// function PlaceNearBy(props) {
//     const { isLoaded } = useJsApiLoader({
//         id: "google-map-script",
//         libraries: "places",
//         googleMapsApiKey: "AIzaSyAGxWVe08IBXqAiz2q4dgbZ8d2AJjXXfls"
//     });

//     const [map, setMap] = React.useState(null);

//     const onLoad = React.useCallback(function callback(map) {
//         const bounds = new window.google.maps.LatLngBounds(props.center);
//         map.fitBounds(bounds);
//         setMap(map);

//         var request = {
//             bounds: bounds,
//             radius: "1500",
//             type: ["restaurant"]
//         };

//         service = new window.google.maps.places.PlacesService(map);
//         service.nearbySearch(request, function callback(response, status) {
//             console.log(response, status);
//         });
//     }, []);

//     const onUnmount = React.useCallback(function callback(map) {
//         setMap(null);
//     }, []);
// }

// export default PlaceNearBy;
