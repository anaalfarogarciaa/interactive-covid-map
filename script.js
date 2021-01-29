let myMap;
let canvas;
let mappa = new Mappa('Leaflet');
let data, curData;
let colors;
let curStyle;

// Store all tile map styles
let styles = ['https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', 'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png'];

// Lets put all our map options in a single object
let options = {
  lat: 40.030497, 
  lng: -101.428547,
  zoom: 4.4
};

function preload(){
  data = loadTable('statesData.csv', 'csv', 'header');
}

function setup() { 

  canvas = createCanvas(windowWidth-50,windowHeight-200);
  // Get get user input for color theme
  // input = prompt("Choose map style (Type Number):\n1: Normal\n2: Dark\n3: Watercolor");

  // curStyle = prompt("Choose data to display (Type Exact Text):\n1: Confirmed\n2: Recovered\n3: Deaths");

  // options.style = styles[input-1];
  options.style = styles[0];

  // Create a tile map with the options declared
  myMap = mappa.tileMap(options); 
  myMap.overlay(canvas);

  colors = {
    confirmed: color(33, 83, 100),
    recovered: color(124, 100, 100),
    deaths: color(347, 100, 96)
  };


}

function draw(){
  // Draw text boxes to change style or data
  // curStyle = createInput()
  // curStyle.position(20, 80);
  // curStyle.size(50);
  // console.log(curStyle.value());
  // clear();
  // var salinas = myMap.latLngToPixel(36.677180, -121.658263);
  // ellipse(salinas.x, salinas.y, 20, 20);
  myMap.onChange(drawPosition);
  // textSize(28);
	// fill(0, 102, 153);
  // text("TITLE", 50, 10, 350, 80);

}

function drawPosition(){
  clear();

  for(var i = 0; i < data.getRowCount(); i++){

    var latitude = Number(data.getString(i, 'Lat'));
    var longitude = Number(data.getString(i, 'Long_'));

    if(myMap.map.getBounds().contains({lat: latitude, lng:longitude})){
      var pos = myMap.latLngToPixel(latitude, longitude);
      var size = data.getString(i, curData);
      size = map(size, 558, 458121, 1, 25) + myMap.zoom();
      noStroke();
     	fill(244, 170, 78);
      ellipse(pos.x, pos.y, size, size);

    }
  }
  
}
    
  
    
     

