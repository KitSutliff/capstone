
import './App.css';
import React, { useRef, useEffect, useState }from "react";
// import * as d3 from 'd3';
import { select } from "d3";

// const data = [35, 30, 45, 60, 30];

function App() {
  const [data, setData] = useState([35, 30, 45, 60, 30]);
  const svgRef = useRef();
  useEffect(() => {
    console.log(svgRef);
    const svg = select(svgRef.current)
    svg.selectAll("circle")
    .data(data)
    .join(
      enter => enter.append("circle"),
      update => update.attr("class", "updated"),
      exit => exit.remove() 
    );
  },[data]);
  return (
    <React.Fragment>
      <svg ref={svgRef}></svg>
      <br />
      <button onClick={() => setData(data.map(value => value + 5))}>
        Update data
      </button>
    </React.Fragment>
  );
}

export default App;

////Loose bits////

/* <div className="App">
<svg width = "960" height = "500"></svg></div>   */