// Perform a GET request to the query URL
// d3.json("refinedData.json", function(data) {

// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map('map').setView([37.8, -96], 4);

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


function style(feature) {
return {
        fillColor: getColor(feature.properties.Total_Type_Count),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
};
}

function getColor(d) {
        return d > 6 ? '#800026' :
               d > 5 ? '#BD0026' :
               d > 4 ? '#E31A1C' :
               d > 3 ? '#FC4E2A' :
               d > 2 ? '#FD8D3C' :
               d > 1 ? '#FEB24C' :
                        '#FED976' ;
};

      
var geojson;
      
function highlightFeature(e) {
        var layer = e.target;
      
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
      
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
      
        info.update(layer.feature.properties);
}
      
function zoomToFeature(e) {
        myMap.fitBounds(e.target.getBounds());
}
      
// var popup = L.popup();

// function onMapClick(e) {
//         popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(myMap);
// }



function onEachFeature(feature, layer) {
        layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                // click: zoomToFeature
        });
}
      
function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
}
      
      
geojson = L.geoJson(statesData, {
        style: style,
        onEachFeature: onEachFeature
}).bindPopup(function (layer){
        return layer.feature.properties.Incentive_Description;
},{maxHeight: 100},).addTo(myMap);


      
      
var info = L.control();
      
info.onAdd = function (myMap) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
};
      
// method that we will use to update the control based on feature properties passed
info.update = function (props) {
        this._div.innerHTML = '<h4>State Incentive Programs</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.Specific_Count
        : 'Hover over a state');
};
      
info.addTo(myMap);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5, 6],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);

// });

