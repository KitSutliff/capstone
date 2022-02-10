import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from "d3";

// const book1Citations = {"kit":{"book": "2010", "book2": "2011"}, "mat":{"other book": "2011"}}
// const book2Citations = {"kit":{"book": "2010"}, "pam":{"another book": "2009"}}

const list1 = ["a", "b", "c", "d", "e", "f", "g", "h", "i"]
const list2 = ["a", "b", "c", "d", "j", "k", "l", "m", "n", "o", "p", "q"]

//data formatting function start here

// function test(testArr1, testArr2) {
//   for(let i = 0; i < companies.length; i++) {
//     if (testArr1[i]){
//       in testArr2

// }

function listShares(list1, list2){

    let list1Uniques = []
    let list2Uniques = []
    let listShared = []

    //for item in  in list1:
    
    for(let i = 0; i < list1.length; i++) {

        //if item in list2:

        if (list2.includes(list1[i])) {
            //add item to listShared
            listShared.push(list1[i])
        }
        else {
            list1Uniques.push(list1[i])
        };
    };

    for(let i = 0; i < list2.length; i++) {

        if (!list1.includes(list2[i])) {
            list2Uniques.push(list2[i])
        }
    }

    return [list1Uniques.length,list2Uniques.length,listShared.length];
};

//data formatting function end

const mcguffin = listShares(list1, list2)

function App() {
  const [data, setData] = useState(mcguffin);
  const svgRef = useRef();

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);

    // scales
    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, 300])
      .padding(0.5);

    const yScale = scaleLinear().domain([0, 150]).range([150, 0]);

    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      .range(["green", "orange", "red"])
      .clamp(true);

    // create x-axis
    const xAxis = axisBottom(xScale).ticks(data.length);
    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);

    // create y-axis
    const yAxis = axisRight(yScale);
    svg
      .select(".y-axis")
      .style("transform", "translateX(300px)")
      .call(yAxis);

    // draw the bars
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -150)
      .attr("width", xScale.bandwidth())
      .on("mouseenter", (event, value) => {
        // events have changed in d3 v6:
        // https://observablehq.com/@d3/d3v6-migration-guide#events
        const index = svg.selectAll(".bar").nodes().indexOf(event.target);
        svg
          .selectAll(".tooltip")
          .data([value])
          .join((enter) => enter.append("text").attr("y", yScale(value) - 4))
          .attr("class", "tooltip")
          .text(value)
          .attr("x", xScale(index) + xScale.bandwidth() / 2)
          .attr("text-anchor", "middle")
          .transition()
          .attr("y", yScale(value) - 8)
          .attr("opacity", 1);
      })
      .on("mouseleave", () => svg.select(".tooltip").remove())
      .transition()
      .attr("fill", colorScale)
      .attr("height", (value) => 150 - yScale(value));
  }, [data]);

  return (
    <React.Fragment>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <button onClick={() => setData(data.map((value) => value + 5))}>
        Update data
      </button>
      <button onClick={() => setData(data.filter((value) => value < 35))}>
        Filter data
      </button>
      <button
        onClick={() => setData([...data, Math.round(Math.random() * 100)])}
      >
        Add data
      </button>
    </React.Fragment>
  );
}

export default App;
