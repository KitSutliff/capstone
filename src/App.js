import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from "d3";

//sample data

const list1 = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "q", "1", "2", "3"]
const list2 = ["a", "b", "c", "d", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t"]

const listLengths = [list1.length, list2.length]

//takes in two lists and returns them with all commmon elements removed from each
//and added to a third new list
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
        //add item to list1Uniques
        else {
            list1Uniques.push(list1[i])
        };
    };
    //for item in  in list2:
    for(let i = 0; i < list2.length; i++) {
        //if item not in list1:
        if (!list1.includes(list2[i])) {
            //add item to list2Uniques
            list2Uniques.push(list2[i])
        }
    }
    return [list1Uniques.length,list2Uniques.length,listShared.length];
};

// const mcguffin = listShares(list1, list2)

function App() {
  const [data, setData] = useState(listLengths);
  const svgRef = useRef();

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);

    // x and  scales
    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, 300])
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([0, 20])
      .range([150, 0]);

    // sets colors and color scales
    const colorScale = scaleLinear()
      .domain([3, 6, 15])
      .range(["red", "purple", "blue"])
      .clamp(true);

    // creates x-axis
    const xAxis = axisBottom(xScale).ticks(data.length);
    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);

    // creates y-axis
    const yAxis = axisRight(yScale);
    svg
      .select(".y-axis")
      .style("transform", "translateX(300px)")
      .call(yAxis);

    // draws the bars
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
      <button onClick={() => setData(listShares(list1, list2))}>
        Filter Shared
      </button>
      <button onClick={() => setData(listLengths)}>
        Reset data
      </button>
    </React.Fragment>
  );
}

export default App;
