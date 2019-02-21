/*
 *  crazybioGame: CrazyBioComputing Game Engine
 *  Copyright (C) 2015-2018  Jean-Christophe Taveau.
 *
 *  This file is part of crazybioGame
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with crazybioGame.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * Authors:
 * Jean-Christophe Taveau
 */


'use strict';

// Version **WITHOUT** d3.js
function drawCircles(circles,width,height) {

  let svg = createBasicSVG('background_svg',width,height);
  svg.setAttributeNS(null,'width',width);
  svg.setAttributeNS(null,'height',height);
  //div.appendChild(svg);
  // svg.style.width = width + 'px';
  // svg.style.backgroundColor = '#233';
  let background = document.createElementNS(NS,'rect');
  background.setAttributeNS(null,'width','100%');
  background.setAttributeNS(null,'height','100%');
  background.setAttributeNS(null,'fill','#233');
  svg.appendChild(background);
  
  let objs = document.createElementNS(NS,'g');
  svg.appendChild(objs);
  
  let colors = ['#F00','#0F0','#2AC1A6'];
  for (let c of circles) {
    let shape = document.createElementNS(NS,'circle');
    shape.setAttributeNS(null,'cx',c.x);
    shape.setAttributeNS(null,'cy',c.y);
    shape.setAttributeNS(null,'r',c.r);
    shape.setAttributeNS(null, 'fill', colors[c.color]);
    objs.appendChild(shape);
  }
  
  return svg;

}

// Version **WITH** d3.js
function drawD3Circles(dataCircles,width,height) {

  const colors = ['#F00','#0F0','#2AC1A6'];
  
  // Create detached <svg> element.
  const detachedSVG = d3.create('svg');

  // Manipulate detached element.
  detachedSVG
    .attr('width', width)
    .attr('height', height)
    .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('fill','#223');

  // Bind data. Append sub-elements (also not attached to DOM).
  let circles = detachedSVG
    .append('g')
    .selectAll('circle')
    .data(dataCircles)
    .enter()
    .append('circle');

  let circlesAttributes = circles
    .attr('cx', (c) => c.x )
    .attr('cy', (c) => c.y )
    .attr('r', (c) => c.r)
    .style('fill', (c) => colors[c.color] );
  
  // Return element to DOM.
  return detachedSVG.node();
}

/*
 * Setup
 */
function setup(width,height,num) {

  const dist = (x0,y0,x1,y1) => Math.sqrt( (x0 - x1)**2 +(y0 - y1)**2 );
  
  let circles = [],
      circle = {},
      overlapping = false,
      protection = 10000,
      counter = [0,0,0];

  // Inspired from Greg Smith
  // https://codepen.io/grsmith/pen/zNGPoX
  // Brute force method continues until # of circles target is reached
  // or until the protection value is reached
  while (circles.length < num && counter.reduce( (sum,col) => sum + col,0) < protection) {
    circle = {
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 25 + 10,
      color: Math.floor(Math.random() * 3)
    };
    overlapping = false;
    
    // check that it is not overlapping with any existing circle
    // another brute force approach
    for (let i = 0; i < circles.length; i++) {
      var existing = circles[i];
      var d = dist(circle.x, circle.y, existing.x, existing.y)
      if (d < circle.r + existing.r) {
        // They are overlapping
        overlapping = true;
        // do not add to array
        break;
      }
    }
    
    // add valid circles to array
    if (!overlapping) {
      circles.push(circle);
      counter[circle.color]++;
    }
  }
  
  console.log(counter);
  CRAZYBIOGAME.deferred['red']  = counter[0];
  CRAZYBIOGAME.deferred['green']= counter[1];
  CRAZYBIOGAME.deferred['blue'] = counter[2];
  CRAZYBIOGAME.deferred['code'] = counter[0]+counter[1]+counter[2];
  
  // circles array is complete
  // draw canvas once
  return drawCircles(circles,width,height);
}


// Main 

// Step #1 - Random answer
let numCircles = Math.random()*20 + 5;
let canvasWidth = 400;
let canvasHeight = 400;
let id = 10;
let download_id = 15;

// Create SVG image
let imagesvg = setup(canvasWidth,canvasHeight,numCircles);

// Create deferred node for game graph
console.log('create DEFERRED');
CRAZYBIOGAME.deferred[id] = createSprite({
  id: id,
  class: 'sprite', 
  description: 'Circles',
  display: {
    width: canvasWidth,
    height: canvasHeight,
    position: [10,10],
    graphics: {
      element: imagesvg
    }
  },
  action: {
  }
});

let svgString = new XMLSerializer().serializeToString(imagesvg);

CRAZYBIOGAME.deferred[download_id] = createMachineDownload({
  id: download_id,
  class: 'machine.download', 
  description: 'Circles Download',
  display: {
    width: 80,
    height: 80,
    position: [170,170],
    target: {
      data: ['C', 40, 40, 40]
    }
  },
  features: {
    download: `deferred:svg2jpeg:${svgString}`,
  }
});
  

