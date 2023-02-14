import GetLocation from "./GetLocation";
import Map from "./Map";
import { useState, useEffect } from "react";
function App() {
    const [center, setCenter] = useState({
        lat: 41.8827,
        lng: -87.623303
    });

    return (
        <div className="App">
            <h1>This is my app!</h1>
            <GetLocation center={center} setCenter={setCenter} />
            <Map center={center} setCenter={setCenter} />
        </div>
    );
}

export default App;
