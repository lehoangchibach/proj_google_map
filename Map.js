import React, { useEffect, useState } from "react";
import {
    GoogleMap,
    useJsApiLoader,
    StandaloneSearchBox
} from "@react-google-maps/api";

const containerStyle = {
    width: "400px",
    height: "400px"
};

const libraries = ["places"];
let service;
let searchBox;

function Map(props) {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        libraries: libraries,
        googleMapsApiKey: "AIzaSyAGxWVe08IBXqAiz2q4dgbZ8d2AJjXXfls"
    });

    const [map, setMap] = React.useState(null);
    const [initialized, setInitialized] = useState(false);
    const center = props.center;
    let places = {};

    const onLoad = React.useCallback(function callback(map) {
        console.log("onLoad");
        let bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);

        service = new window.google.maps.places.PlacesService(map);
        setInitialized(true);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        console.log("onUnmount");
        setMap(null);
    }, []);

    const onCenterChanged = React.useCallback(
        async function callback(map) {
            console.log("onCenterChanged");
            places = await findNewPlace(initialized, center);
        },
        [center]
    );

    function onLoadSearchBox(ref) {
        searchBox = ref;
    }

    function onPlacesChanged() {
        console.log("onPlacesChanged", searchBox);
        const data = searchBox.getPlaces();
        if (data == null || data.length == 0) {
            return;
        }
        props.setCenter({
            lat: data[0].geometry.location.lat(),
            lng: data[0].geometry.location.lng()
        });
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onCenterChanged={onCenterChanged}
        >
            {/* Child components, such as markers, info windows, etc. */}
            <StandaloneSearchBox
                onLoad={onLoadSearchBox}
                onPlacesChanged={onPlacesChanged}
            >
                <input
                    type="text"
                    placeholder="Customized your placeholder"
                    style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                        width: `240px`,
                        height: `32px`,
                        padding: `0 12px`,
                        borderRadius: `3px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `14px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                        position: "absolute",
                        left: "50%",
                        marginLeft: "-120px"
                    }}
                />
            </StandaloneSearchBox>
        </GoogleMap>
    ) : (
        <></>
    );
}

function filterResult(data) {
    if (data === null) {
        return null;
    }
    let result = data.filter(
        (restaurants) =>
            restaurants.business_status == "OPERATIONAL" &&
            restaurants.rating >= 4.5
    );
    return result;
}

async function findNewPlace(initialized, center) {
    let result;
    // const timeOut = 5000;
    if (initialized) {
        var request = {
            location: new window.google.maps.LatLng(center),
            radius: 50000,
            pagetoken: 60
        };
        await service.nearbySearch(
            request,
            function callback(response, status) {
                console.log(response);
                console.log("pagetoken", response.next_page_token, status);
                result = filterAllPlaces(response);
                console.log(result);
            }
        );
    }
}

function filterAllPlaces(data) {
    console.log("data", data);
    let result = {
        bakery: [],
        cafe: [],
        interest: [],
        restaurant: []
    };
    data.forEach((element) => {
        if (element.types == null) {
            return;
        }
        let types = element.types;
        if (types.includes("bakery")) {
            result.bakery.push(element);
        }
        if (types.includes("cafe")) {
            result.cafe.push(element);
        }
        if (types.includes("restaurant")) {
            result.restaurant.push(element);
        }
        if (checkPOI(types)) {
            result.interest.push(element);
        }
    });
    return result;
}

function checkPOI(type) {
    const poi = [
        "amusement_park",
        "aquarium",
        "art_gallery",
        "bowling_alley",
        "campground",
        "casino",
        "movie_theater",
        "museum",
        "shopping_mall",
        "spa",
        "tourist_attraction",
        "zoo",
        "point_of_interest"
    ];
    for (const i in poi) {
        if (type.includes(i)) {
            return true;
        }
    }
    return false;
}
export default Map;
