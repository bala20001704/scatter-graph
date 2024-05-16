import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import data from './scatterData.json';

const ScatterPlot = () => {
  const svgRef = useRef();
  const width = 600;
  const height = 550;
  const margin = {
    left: 50,
    right: 50,
    top: 50,
    bottom: 50
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const xExtent = d3.extent(data, d => d.x);
    const yExtent = d3.extent(data, d => d.y);

    const xScale = d3.scaleLinear()
      .domain([Math.min(0, xExtent[0]), Math.max(0, xExtent[1])])
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([Math.min(0, yExtent[0]), Math.max(0, yExtent[1])])
      .range([height - margin.bottom, margin.top]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis);

    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 5) 
      .style('fill', 'steelblue');

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - (margin.bottom / 2) + 20)
      .attr('text-anchor', 'middle')
      .text('X-Axis graph');

    svg.append('text')
      .attr('transform', `rotate(-90)`)
      .attr('x', -height / 2)
      .attr('y', margin.left / 2 - 9)
      .attr('text-anchor', 'middle')
      .text('Y-Axis graph');

  }, [data, width, height]);

  return (
    <div>
      <center>
        <h3 style={{ color: '#000000', fontFamily: 'Arial, sans-serif', fontSize: '45px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>Scatter Graph</h3>
        <svg ref={svgRef} width={width} height={height} style={{ margin: '5px', border: '2px solid black' }}></svg>
      </center>
    </div>
  );
}

export default ScatterPlot;
