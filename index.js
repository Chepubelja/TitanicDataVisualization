let x_value, y_value;
d3.select("#select_x")
    .on("change", function () {
        x_value = d3.select("#select_y").property("value");
        console.log(x_value)
    });
d3.select("#select_y")
    .on("change", function () {
        y_value = d3.select("#select_y").property("value");
        console.log(y_value)
    });
// Set the dimensions of the canvas / graph
let margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

// Set the ranges
let x = d3.scale.linear().range([0, width]);
let y = d3.scale.linear().range([height, 0]);

// Define the axes
let xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

let yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Adds the svg canvas
let svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("data/data.csv", (error, data) => {

    // Range of the data

    x.domain([0, d3.max(data, d => d.Fare)]);
    y.domain([0, d3.max(data, d => d.Pclass)]);

    // Add the scatterplot
    svg.selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr({
            "r": 3.5,
            "stroke": "black",
            "stroke-width": 0.5,

            cx (d) {x(d.Fare)},
            cy (d) {y(d.Pclass)},
            fill (d) {d.Survived == 0 ? "black" : 'white'}
        });


    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
});