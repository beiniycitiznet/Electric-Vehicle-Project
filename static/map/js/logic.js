// Creating map object
var myMap = L.map("map-id", {
    center: [40.7128, -74.0059],
    zoom: 11
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
  var geoData = "static/data/test.json";
  var geoData2 = "static/data/test2.json";
  var geoData3 = "static/data/stations.csv"
  var geoData4 = "static/data/stations.geojson"
  var lat = []
  var lon = []
  var allFiles = Promise.all([d3.json(geoData), d3.json(geoData2), d3.csv(geoData3),d3.json(geoData4)])
 
  var Data 
  allFiles.then(function(dataList) {
    console.log(dataList)
    L.geoJson(dataList[0]).addTo(myMap)
    L.geoJson(dataList[1], {style: {color: "#FF5733"}}).addTo(myMap)
    createMarkers(dataList[3])
    Data = dataList[3];
  });

  function createMarkers(chargingStations) {
    var EVstations = chargingStations.features;
    var Markers = [];
    for (var index = 0; index < EVstations.length; index++) {
      var station = EVstations[index];
      var coordinate = station.geometry.coordinates

      var Marker = L.circleMarker([coordinate[1], coordinate[0]])
      Markers.push(Marker);
    }
    var markerLayer = L.layerGroup(Markers)
    markerLayer.addTo(myMap)
  }

