import {select} from 'd3';

const svg = select('svg');
svg.style('background-color', 'red');



/////////////CIRCLE TEST//////

// svg.append('circle');

// circle.attr('r', 200);

// circle.attr('cx', 500/2);

// circle.attr('cy', 500/2);

//////////////////BAR CHART////////////////////

// import {
//     select,
//     csv,
//     scaleLinear,
//     max,
//     scaleBand,
//     axisLeft,
//     axisBottom,
//     format
// } from 'd3';
// // import { max } from 'moment';

// const svg = select('svg');

// const width = +svg.attr('width');
// const height = +svg.attr('height');

// const render = data => {

//     const xValue = d => d.population;
//     const yValue = d => d. country;
//     const margin = { top: 50, right: 40, bottom:77, left:180 };
//     const innerWidth = width - margin.left - margin.right;
//     const innerHeight = height - margin.top - margin.bottom;
    
//     const xScale = scaleLinear()
//         .domain([0, max(data, xValue)])
//         .range([0, innerWidth]);

//     const yScale = scaleBand()
//         .domain(data.map(yValue))
//         .range([o, innerHeight])
//         .padding(0.1);

//     const g = svg.append('g')
//         .attr('transform', 'translate(${margin.left},${margin.top})');

// g.append('g').call(axisLeft(yScale));
// g.append('g').call(axisBottom(xScale))
//     .attr('transform', 'translate(0, ${innerHeight})');


//     g.selectAll('rect').data(data) 
//         .enter().append('rect')
//             .atter('y', d => yScale(yValue(d)))
//             .attr('height', yScale.bandwidth());
// };

// csv('data.csv').then(data => {
//     data.forEach(d => {
//         d.population = +d.population * 1000;
//     });
// })

