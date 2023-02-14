function GetLocation(props){
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

    const successCallback = (position) => {
        console.log(position);
        alert(`You are at ${position.coords.latitude} ${position.coords.longitude}`)
        props.setCenter({
          lat: position.coords.latitude, 
          lng: position.coords.longitude
        })
      };
      
    const errorCallback = (error) => {
      console.log(error);
    };
    
    function getLocation(){
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options)
    }

    return (
      <div className="printLocation">
        <button onClick={getLocation}>Get your location</button>
      </div>
    )
      
}
export default GetLocation

