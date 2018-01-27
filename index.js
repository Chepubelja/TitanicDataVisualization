import { select, selectAll, csv, min, max, extent, scaleLinear } from "d3";

const width = 1290;
const height = 625;


csv("./data/data.csv", function (data) {
    select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    console.log(data);
    
    let shots = select("svg")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "shot")
        // .attr("transform", function (d) {
        //     return "translate("
        //     scalerY(d.y)
        //     ','
        //     scalerX(d.x)
        //     ")";
        // })

        .attr("fill", function (d) {
            return colors[d.Cluster];
        })

        .on("mouseover", function (d) {
            select(this).raise()
                .append("text")
                .attr("class", "word")
                .attr("fill", "red")
                .text(d.word);
        })

        .on("mouseout", function (d) {
            selectAll("text.word").remove();
        });

    shots.append("circle")
        .attr("r", 4)
        .attr("cursor", "pointer")
});