  //icon
  var EVIcon = L.icon({
    iconUrl: 'static/map/images/EV2.png',
    iconSize: [36, 36],
    iconAnchor: [0,0]
  })

  // Creating map object
  var myMap = L.map("map-id", {
    center: [40.7128, -74.0059],
    zoom: 12
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Use this link to get the geojson data.
  // var geoData3 = "/static/map/data/stations.csv"
  var geoData4 = "/static/map/data/stations.geojson"

  //Promise to take in user's current location
  var geolocation = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => { resolve(position.coords) },
      error => { reject(error) }
    )
  }).catch(error => error)

  //Promise to load in the data
  var allFiles = Promise.all([d3.json(geoData4),geolocation])
  allFiles.then(function(dataList) {
    createMarkers(dataList[0]);
    coords = dataList[1];
    myMap.panTo(new L.LatLng(coords.latitude, coords.longitude))
  });
 
  //Create markers and marker cluster group based on the data
  function createMarkers(chargingStations) {
    var EVstations = chargingStations.features
    Data = EVstations
    ;
    var Markers = L.markerClusterGroup();
    for (var index = 0; index < EVstations.length; index++) {
      var station = EVstations[index];
      var coordinate = station.geometry.coordinates
      Markers.addLayer(L.marker([coordinate[1], coordinate[0]], {icon: EVIcon})
      .bindPopup("Name: " + station.properties["Station Name"] +
       "<br>Access Days Time: " + station.properties["Access Days Time"] +
       "<br>Type: " + station.properties["Group with Access Code"])
       
       );
    }
    //Add Markers
    myMap.addLayer(Markers);
  }

