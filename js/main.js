// write your JavaScript code here.
// feel free to change the pre-set attributes as you see fit

let margin = {
    top   : 60,
    left  : 50,
    right : 30,
    bottom: 35
  },
  width  = 500 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// your visualization
let svg = d3.select('#vis')
  .append('svg')
    .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
    .attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
    .style('background-color', '#ccc') // change the background color to light gray
    .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '));

let squareLabel = svg
  .append('text')
    .attr('x', '30%')
    .attr('y', '35%')
    .attr('text-anchor', 'middle')
    .text('A');

let circleLabel = svg
  .append('text')
    .attr('x', '70%')
    .attr('y', '35%')
    .attr('text-anchor', 'middle')
    .text('B');

let rect = svg
  .append('rect')// The square we want to click on
    .attr('x', '20%')
    .attr('y', '40%')
    .attr('width', '20%')
    .attr('height', '20%')
    .attr('fill', 'yellow');

let circle = svg
  .append('circle') // The circle we want to change color when the square is clicked
    .attr('cx', '70%')
    .attr('cy', '50%')
    .attr('r', '10%')
    .attr('fill', 'blue');

// Define custom events changeColor & changeColor2 using d3-dispatch.
// event names are changeColor & changeColor2
let dispatch = d3.dispatch("changeColor", "changeColor2");

// Using d3-dispatch, dispatch a custom changeColor event when the square is clicked.


function turnRed() {
  rect.
  on("click", function(){
    dispatch.apply("redCircle", circle, 
      circle    
      .transition()
      .delay(200)
      .duration(500)
      .style('fill', 'red'));
  })
};
dispatch.on("changeColor", turnRed);

// Register a callback using d3-dispatch that is triggered when a changeColor event is received. 
dispatch.call("changeColor");

// To turn the rectangle to green when clicking circle for twice. 
// The outter function is doubleClickToGreen which also set time out 
// The inner function is turnGreen contains how to turn rect -> green
function doubleClickToGreen(){
  circle.
  on('click', function() {
    setTimeout("turnGreen()", 100); 
  })
};

function turnGreen() {
  circle.
  on("click", function() {
    dispatch.apply("greenRect", rect, 
      rect    
      .transition()
      .delay(100)
      .duration(500)
      .style('fill', 'green'));
  })
};
// dispatch on event 
dispatch.on("changeColor2", doubleClickToGreen);

// dispatch call event 
dispatch.call("changeColor2");

