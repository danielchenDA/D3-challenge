// @TODO: YOUR CODE HERE!
// Set Up chart
var svgWidth = 800
var svgHeight = 600;

var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

// append svg and group
var svg = d3.select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// import data
d3.csv("/assets/data/data.csv").then(function(data) {
  console.log(data);

  var abbr = data.map(state => state.abbr);
  var healthcare = data.map(state => Number(state.healthcare));
  var poverty = data.map(state => Number(state.poverty));

  // console.log(abbr);
  // console.log(healthcare);
  // console.log(poverty);

  // Scales
  var xScale = d3.scaleLinear()
    .domain([d3.min(poverty) - 1, d3.max(poverty)])
    .range([0, width]);

  var yScale = d3.scaleLinear()
    .domain([d3.min(healthcare) - 1, d3.max(healthcare)])
    .range([height, 0]);

  // create Axes
  var yAxis = d3.axisLeft(yScale);
  var xAxis = d3.axisBottom(xScale);

  // set x to the bottom
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);
  // set y to the y axis
  chartGroup.append("g")
    .call(yAxis);

  // x Axis label
  chartGroup.append("text")
    .attr("transform",
          "translate(" + (width/2) + " ," +
                         (height + margin.top - 10) + ")")
    .attr("text-anchor", "middle")
    .text("In Poverty (%)");

  // y Axis label
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height/2))
    .attr("dy", "1em")
    .attr("text-anchor", "middle")
    .text("Without Healthcare (%)");

  // create scatter plot
  chartGroup.append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.poverty))
    .attr("cy", d => yScale(d.healthcare))
    .attr("r", "12")
    .style("fill", "yellow");

  // add text inside circles
  chartGroup.append("g")
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("x", d => xScale(d.poverty) - 9)
    .attr("y", d => yScale(d.healthcare) + 5);

});
