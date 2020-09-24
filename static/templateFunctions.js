document.onload = function () {
    d3.csv('persistenceOutput.csv', d3.autoType).then(function (data) {
    d3.select("body")
    .selectAll("div")
    .data(data)
    .enter()
    .append("div")
    .style("width", function(d) { return d.amount * 40 + "px"; })
    .style("height", "15px");
});
};


