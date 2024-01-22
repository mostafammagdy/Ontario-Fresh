import React from 'react'

import * as d3 from "d3"

import styles from './styles.module.scss'

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

class PieChart extends React.Component {
  elemId = `elemId${[...Array(30)].map(() => Math.random().toString(36)[3]).join('')}`;
  renderFunc = () => null;

  componentDidMount() {
    const ID = this.elemId;
    const chartDiv = document.getElementById(ID);
    
    const ttsize = {width: 90, height: 70, padding: 10, arrow: 10, gap: 0, cornerRadius: 2};

    const margin = {top: 20, right: 20, bottom: 20, left: 20};
    const thickness = 40;

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
      const radius = Math.min(width, height) / 2;
  
      const arc = d3.arc()
        .innerRadius(radius - thickness)
        .outerRadius(radius);

      const pie = d3.pie()
        .value(d => d.count);
  
      const svg = d3.select(chartDiv).append("svg")
          .attr("style", "overflow: visible")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", `translate(${margin.left + width / 2}, ${margin.top + height / 2})`);
      
      const chart = svg.append('g');
      const labels = svg.append('g');
      
      const tts = [];
      
      chart.selectAll('path')
          .data(pie(data))
        .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', (d, i) => colours[i % colours.length])
          .on('mouseover', (d, i) => tts[i].attr('visibility', 'visible'))
          .on('mouseout', (d, i) => tts[i].attr('visibility', 'hidden'));

      labels.selectAll('.label')
          .data(pie(data))
        .enter()
          .append('g')
          .attr('pointer-events', 'none')
          .attr('class', '.label')
          .call(g => {
            g.select(function(d) { tts.push(d3.select(this)); });
            g.attr('visibility', 'hidden');
            g.attr('transform', d => {
              let [x, y] = arc.centroid(d);
              if (x > 0) {
                x += ttsize.arrow + ttsize.gap;
              } else {
                x -= ttsize.width + ttsize.arrow + ttsize.gap;
              }
              y -= ttsize.height / 2;
              return `translate(${Math.round(x)}, ${Math.round(y)})`;
            });
            g.append('rect')
              .attr('fill', '#364151')
              .attr('x', d => arc.centroid(d)[0] > 0 ? ttsize.gap + ttsize.arrow : 0)
              .attr('rx', ttsize.cornerRadius)
              .attr('ry', ttsize.cornerRadius)
              .attr('width', ttsize.width)
              .attr('height', ttsize.height);
            g.append('path')
              .attr('fill', '#364151')
              .attr('d', d => {
                const [x] = arc.centroid(d);
                let baseX, altX;
                const baseY = ttsize.height / 2 - ttsize.arrow;
                if (x > 0) {
                  baseX = ttsize.gap + ttsize.arrow;
                  altX = ttsize.gap;
                } else {
                  baseX = ttsize.width;
                  altX = baseX + ttsize.arrow;
                }
                return `M${baseX},${baseY}L${altX},${baseY + ttsize.arrow}L${baseX},${baseY + ttsize.arrow + ttsize.arrow}`;
              });
            const ttswitch = g.append('switch');
            const ttfo = ttswitch.append('foreignObject')
              .attr('requiredFeatures', 'http://www.w3.org/TR/SVG11/feature#Extensibility')
              .attr('x', d => (arc.centroid(d)[0] > 0 ? ttsize.gap + ttsize.arrow : 0) + ttsize.padding)
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
            ttcontent.html(d => `${Math.round(d.data.count/total * 1000) / 10}%<br>${d.data.label}`)
          })
          .attr('d', arc.centroid)
          .attr('fill', (d, i) => colours[i % colours.length]);
    }
    this.renderFunc();
    window.addEventListener("resize", this.renderFunc);
  }

  componentDidUpdate() {
    this.renderFunc();
  }

  render () {
    const {
      data
    } = this.props

    const ID = this.elemId;

    return (
      <div>
        <div id={ID} style={{height: 300}}>
        </div>
        <div className={styles.legend}>
          {
            data.map((d, i) => (
              <div className={styles.item} key={d.label}>
                <div className={styles.colour} style={{backgroundColor: colours[i]}}></div>
                <div className={styles.label}>{d.label}</div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default PieChart;