// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
function initAutocomplete() {
  

    //設定地圖中心在使用者位置
    navigator.geolocation.getCurrentPosition((pos) => {
        let lat = pos.coords.latitude;
        let long = pos.coords.longitude;
        localStorage.setItem("userlat",lat);
        localStorage.setItem("userlng",long);
    })
        const userlat = parseFloat(localStorage.getItem('userlat'));
        const userlng = parseFloat(localStorage.getItem('userlng'));
        const userpos = { lat: userlat, lng: userlng }
       
    const map = new google.maps.Map(document.getElementById("map"), {
      center: userpos,
      zoom: 13,
      mapTypeId: "roadmap",
    });
    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
  
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });
  
    let markers = [];
  
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }
      
      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];
  
      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();
  
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }
        
        // const icon = {
        //   url: place.icon,
        //   size: new google.maps.Size(71, 71),
        //   origin: new google.maps.Point(0, 0),
        //   anchor: new google.maps.Point(17, 34),
        //   scaledSize: new google.maps.Size(25, 25),
        // };
  
        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map,
            // icon,
            title: place.name,
            position: place.geometry.location,
          }),
        );



        // 地點google map url
        console.log(place.url)

        // 標記點座標經緯度
        console.log(
          "lat:"+place.geometry.location.lat()+" "+
          "lng:"+place.geometry.location.lng()
          )
        var pos = place.geometry.location
        Object.values(pos).forEach((e) =>{
          console.log( e() )
        })


        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }
  
  window.initAutocomplete = initAutocomplete;