d3.json("samples.json", function(error, data) {
    var nest = d3.nest()
      .key(function(d) {
        return d.date;
      })
      .map(data);
  
      rect.filter(function(d) {
        return ("$" + d) in nest;
      })
      .attr("fill", function(d) { 
        return color(nest[("$" + d)][0].open);
      })
  });

  // Create the Trace
  var data = [{
    type: 'bar',
    x: [20, 14, 23],
    y: ['giraffes', 'orangutans', 'monkeys'],
    orientation: 'h'
  }];
  
  Plotly.newPlot('myDiv', data);
  // Create the data array for the plot
var data = [trace1];

// Define the plot layout
var layout = {
  title: "Samples",
  xaxis: { title: "otu_ids" },
  yaxis: { title: "sample_values" }
};

// This function is called when a dropdown menu item is selected
function updatePlotly() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");

// Plot the chart to a div tag with id "bar-plot"
Plotly.newPlot("bar-plot", data, layout);