import React from 'react'

import * as d3 from 'd3'

const colours = [
  '#004f2d',
  '#0a8754',
  '#0fb06e',
  '#679289',
  '#9cc69b',
  '#aae4a9',
  '#aef9cc',
  '#58e891',
  '#4cba78',
  '#d8e9df'
]

function wrap (text, width) {

  text.each(function() {

    var breakChars = ['/', '&', '-'],
      text = d3.select(this),
      textContent = text.text(),
      spanContent;

    breakChars.forEach(char => {
      // Add a space after each break char for the function to use to determine line breaks
      textContent = textContent.replace(char, char + ' ');
    });

    var words = textContent.split(/\s+/),
      line = [],
      lineNumber = 0,
      lineHeight = 1.1, // ems
      x = text.attr('x') || 0,
      y = text.attr('y'),
      dy = parseFloat(text.attr('dy') || 0),
      tspan = text.text(null).append('tspan').attr('x', x).attr('y', y).attr('dy', dy + 'em');

    words.forEach(word => { // eslint-disable-line no-cond-assign
      line.push(word);
      tspan.text(line.join(' '));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        spanContent = line.join(' ');
        breakChars.forEach(char => {
          // Remove spaces trailing breakChars that were added above
          spanContent = spanContent.replace(char + ' ', char);
        });
        tspan.text(spanContent);
        line = [word];
        tspan = text.append('tspan').attr('x', x).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
      }
    });
  });

}

class BarChart extends React.Component {
  elemId = `elemId${[...Array(30)].map(() => Math.random().toString(36)[3]).join('')}`;
  renderFunc = () => null;

  componentDidMount() {
    const ID = this.elemId;
    const chartDiv = document.getElementById(ID);
    
    const ttsize = {width: 90, height: 70, padding: 10, arrow: 10, gap: 5, cornerRadius: 2};

    const margin = {top: 20, right: 20, bottom: 60, left: 50};

    this.renderFunc = () => {
      const {
        data
      } = this.props;

      const total = data.reduce((total, d) => total + d.count, 0);
      
      while (chartDiv.firstChild) {
        chartDiv.removeChild(chartDiv.firstChild);
      }

      const width = chartDiv.clientWidth - margin.left - margin.right;
      const height = chartDiv.clientHeight - margin.top - margin.bottom;
  
      const xScale = d3.scaleBand().range([0, width]).padding(0.55);
      const yScale = d3.scaleLinear().range([height, 0]);
  
      const svg = d3.select(chartDiv).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", `translate(${margin.left}, ${margin.top})`);
      
      xScale.domain(data.map(d => d.label));
      const max = d3.max(data, d => d.count) * 1.3;
      const step = Math.pow(10, Math.round(Math.log10(max)) - 1);
      yScale.domain([0, Math.ceil(Math.ceil(max/step)*step)]);
      
      svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call((g) => {
          g.call(d3.axisBottom(xScale).tickSize(0).tickPadding(15));
          g.selectAll(".tick text").attr('font-size', '14px').attr('fill', '#364151').attr('font-weight', '300').call(wrap, xScale.step() * 0.8);
          g.select('.domain').attr("stroke", "#aaa").attr("stroke-dasharray", "2.8,3.5");
        });
  
      svg.append('g')
        .call((g) => {
          g.call(d3.axisLeft(yScale).tickSize(0).tickPadding(6).tickSizeInner(-width));
          g.select('.domain').remove();
          g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#dedede").attr("stroke-dasharray", "2.8,3.5");
          g.select(".tick:first-of-type line").remove();
          g.selectAll(".tick text").attr('font-size', '14px').attr('fill', '#364151').attr('font-weight', '300');
        });
      
      svg.selectAll('bar')
          .data(data)
        .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', d => xScale(d.label))
          .attr('width', xScale.bandwidth())
          .attr('y', d => yScale(d.count))
          .attr('height', d => height - yScale(d.count))
          .attr('fill', (d, i) => colours[i % colours.length])
          .on('mouseover', function (d) {
            const bar = d3.select(this);
            ttg
              .attr('transform', `translate(${Math.round(+bar.attr('x') + +bar.attr('width') / 2 - ttsize.width / 2)}, ${Math.round(bar.attr('y') - ttsize.height - ttsize.arrow - ttsize.gap)})`)
              .attr('visibility', 'visible');
            ttcontent.html(`${Math.round(d.count/total * 1000) / 10}%<br>${d.label}`);
          })
          .on('mouseout', function (d) {
            ttg.attr('visibility', 'hidden');
          });
    
      const ttg = svg.append('g')
        .attr('visibility', 'hidden');
      ttg.append('rect')
        .attr('fill', '#364151')
        .attr('rx', ttsize.cornerRadius)
        .attr('ry', ttsize.cornerRadius)
        .attr('width', ttsize.width)
        .attr('height', ttsize.height);
      ttg.append('path')
        .attr('fill', '#364151')
        .attr('d', `M${ttsize.width / 2 - ttsize.arrow},${ttsize.height}L${ttsize.width / 2},${ttsize.height + ttsize.arrow}L${ttsize.width / 2 + ttsize.arrow},${ttsize.height}`);
      const ttswitch = ttg.append('switch');
      const ttfo = ttswitch.append('foreignObject')
        .attr('requiredFeatures', 'http://www.w3.org/TR/SVG11/feature#Extensibility')
        .attr('x', ttsize.padding)
        .attr('y', 0)
        .attr('width', ttsize.width - ttsize.padding * 2)
        .attr('height', ttsize.height);
      const ttcontent = ttfo.append('xhtml:div')
          .attr('style', 'display: flex; align-items: center; width: 100%; height: 100%;')
        .append('div')
          .attr('style', `line-height: 16px; color: white; font-size: 12px; letter-spacing: -0.02em;`);
      const ttfb = ttswitch.append('g');
      ttfb.append('text').text('Tooptips not');
      ttfb.append('text').text('supported in');
      ttfb.append('text').text('your browser');

    }
    this.renderFunc();
    window.addEventListener("resize", this.renderFunc);
  }

  componentDidUpdate() {
    this.renderFunc();
  }

  render () {
    return (
      <div id={this.elemId} style={{height: 400}}>
      </div>
    )
  }
}

export default BarChart