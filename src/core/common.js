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

/**
 * Common code for the engine
 *
 *
 */
 
/* Global Variable */
let CRAZYBIOGAME = {
  name: 'A crazyBioComputing Game',
  level: 0,
  game: 0,
  gamepath: '',
  topic: 'none',
  next_game: -1,
  useItem: false,
  deferred: {}
};

const categories = {
  "scene": {
    type: "scene", 
    code: 1
  },
  "item": {
    type: "item", 
    code: 2
  },
  "machine": {
    type: "machine", 
    code: 4
  },
  "machine.download": {
    type: "machine.download", 
    code: 8
  },
  "machine.lockKeypad": {
    type: "machine.lockKeypad", 
    code: 16
  },
  "machine.lockDigit[1]": {
    type: "machine.lockDigit[1]", 
    code: 32
  },
  "machine.lockDigit[2]": {
    type: "machine.lockDigit[2]", 
    code: 33
  },
  "machine.lockDigit[3]": {type: "machine.lockDigit[3]", code: 34},
  "machine.lockDigit[4]": {type: "machine.lockDigit[4]", code: 35},
  "machine.lockDigit[5]": {type: "machine.lockDigit[5]", code: 36},
  "machine.lockDigit[6]": {type: "machine.lockDigit[6]", code: 37},
  "machine.lockDigit[7]": {type: "machine.lockDigit[7]", code: 38},
  "machine.lockDigit[8]": {type: "machine.lockDigit[8]", code: 39},
  "machine.lockDigit[9]": {type: "machine.lockDigit[9]", code: 40},
  "machine.lockText": {
    type: "machine.lockText", 
    code: 64
  },
  "machine.lockNumerical": {
    type: "machine.lockNumerical", 
    code: 128
  },
  "machine.form": {
    type: "machine.form", 
    code: 256
  },
  "machine.formDragDrop": {type: "machine.formDragDrop", code: 257},
  "machine.formDropDown": {type: "machine.formDropDown", code: 258},
  "target": {type: "target", code: 512},
  "sprite": {type: "sprite", code: 1024}
};

const NS = 'http://www.w3.org/2000/svg';
    
/**
 * Create a SVG Layer for grabbing the event(s)
 * 
 * @author Charlotte GONCALVES FRASCO
 */
const createBasicSVG = (id,w,h) => {
  // M a i n

    let svg = document.createElementNS(NS,'svg');
    // TODO BUG
    svg.setAttributeNS(null, 'viewBox',`0 0 ${w} ${h}`);
    svg.setAttributeNS(null, 'class', 'map');
    svg.setAttributeNS(null,'preserveAspectRatio','xMinYMin meet');
    
    return svg;
}

const appendImage = (image_path,id, svg) => {
  let image = document.createElementNS(NS,'image');
  image.setAttributeNS(null,'width','100%');
  image.setAttributeNS(null,'height','100%');
  image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', image_path);
  svg.appendChild(image);
  return svg;
};

const appendSensitive = (id, geom) => {

  const createCircle = (cx,cy,radius) => {
    let shape = document.createElementNS(NS,'circle');
    shape.setAttributeNS(null,'cx',radius);
    shape.setAttributeNS(null,'cy',radius);
    shape.setAttributeNS(null,'r',radius);
    shape.setAttributeNS(null,'opacity', '0.9');
    shape.setAttributeNS(null, 'fill', '#F0F0F0');
    return shape;
  }

  const createRectangle = (x,y,w,h) => {
    let shape = document.createElementNS(NS,'rect');
    shape.setAttributeNS(null,'x',0);
    shape.setAttributeNS(null,'y',0);
    shape.setAttributeNS(null,'width',w);
    shape.setAttributeNS(null,'height',h);
    shape.setAttributeNS(null,'opacity', '0.9');
    shape.setAttributeNS(null, 'fill', '#F0F0F0');
    return shape;
  }

  const createPolygon = (path) => {
    let shape = document.createElementNS(NS,'path');
    shape.setAttributeNS(null,'d',path);
    return shape;
  }
  
  const geometries = {'C': createCircle, 'R': createRectangle, 'P': createPolygon};
  
  // Define clickable areas if any
  let group = document.createElementNS(NS,'g');
  group.setAttributeNS(null, 'class', 'hover_group');
  group.setAttributeNS(null, 'opacity', '0');
  group.setAttributeNS(null, 'id', `area_${id}`);

  let link = document.createElementNS(NS,'a');
  link.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'javascript:void(0)');
  link.setAttributeNS(null, 'id',`link_${id}`);
  link.setAttributeNS(null, 'class', 'target');
  
  let shape = geometries[geom.type](...geom.data);
  shape.dataset.objectid = id;
  link.appendChild(shape);

  group.appendChild(link);
  return group;
};


const createSensitiveLayer = (id,w,h,geom) => {
  const createCircle = (cx,cy,radius) => {
    let shape = document.createElementNS(NS,'circle');
    shape.setAttributeNS(null,'cx',cx);
    shape.setAttributeNS(null,'cy',cy);
    shape.setAttributeNS(null,'r',radius);
    shape.setAttributeNS(null,'opacity', '0.9');
    shape.setAttributeNS(null, 'fill', '#F0F0F0');
    return shape;
  }

  const createRectangle = (x,y,w,h) => {
    let shape = document.createElementNS(NS,'rect');
    shape.setAttributeNS(null,'x',0);
    shape.setAttributeNS(null,'y',0);
    shape.setAttributeNS(null,'width',w);
    shape.setAttributeNS(null,'height',h);
    shape.setAttributeNS(null,'opacity', '0.9');
    shape.setAttributeNS(null, 'fill', '#F0F0F0');
    return shape;
  }

  const createPolygon = (path) => {
    let shape = document.createElementNS(NS,'path');
    shape.setAttributeNS(null,'d',path);
    return shape;
  }
  
  const geometries = {'C': createCircle, 'R': createRectangle, 'P': createPolygon};
  
  // M a i n
  const NS = 'http://www.w3.org/2000/svg';
  
  let svg = document.createElementNS(NS,'svg');
  svg.setAttributeNS(null, 'viewBox',`0 0 ${w} ${h}`);
  svg.setAttributeNS(null, 'class', 'map');
  svg.setAttributeNS(null,'preserveAspectRatio','xMinYMin meet');

  // Define clickable areas if any
  svg.appendChild(appendSensitive(id,geom));
  
  return svg;
}


const createHeader = () => {
  let url = new URL(window.location.href);
  let id = url.searchParams.get("id");
  let level = url.searchParams.get("level");
  let topic = url.searchParams.get("topic");
  let game = url.searchParams.get("game");
  let gamepath = url.searchParams.get("path");
  let next_id = url.searchParams.get("next");
  // Add Title
  let title = document.createElement('title');
  title.textContent = `Game #${game} - Level #${level}`;
  document.head.prepend(title);
  // Add banner
  document.querySelector('#banner').innerHTML = `
    <ul>
    <li><a href="../index.html">[ H o m e ]</a></li>
    <li><a href="history.html">&mdash; c&nbsp;&nbsp;r&nbsp;&nbsp;a&nbsp;&nbsp;z&nbsp;&nbsp;y&nbsp;&nbsp;b&nbsp;&nbsp;i&nbsp;&nbsp;o
&nbsp;&nbsp;c&nbsp;&nbsp;o&nbsp;&nbsp;m&nbsp;&nbsp;p&nbsp;&nbsp;u&nbsp;&nbsp;t&nbsp;&nbsp;i&nbsp;&nbsp;n&nbsp;&nbsp;g  &mdash;</a></li>
    <li><a href="#">[ L e v e l # ${level} &mdash; g a m e # ${game} ]</a></li>
    </ul>`;
    
  // Some storage...
  CRAZYBIOGAME.level = parseInt(level);
  CRAZYBIOGAME.game = parseInt(game);
  CRAZYBIOGAME.gamepath = gamepath.toLowerCase();
  CRAZYBIOGAME.topic = topic.toLowerCase();
  let mgr = new GameManager();
  mgr.calcNextURL('../levels.json',level,game);
}

CRAZYBIOGAME.init = () => {
  createHeader();
}

const nextGameById = (val,node_id) => {
  let node = CRAZYBIOGAME.graph.nodeList.filter( (node) => node.id === node_id)[0];
  nextGame(val,node);
}


const nextGame = (val,node) => {
  console.log(val,node.exitCode);
  if (val === node.exitCode.toString()) {
    // Update crazybiolevels localstorage
    let crazybiolevels = 2**(CRAZYBIOGAME.game - 1);
    let str = '';
    if (localStorage.getItem('crazybiolevels_' + CRAZYBIOGAME.topic)) {
      let i = (CRAZYBIOGAME.level - 1 ) * 2;
      let storage = localStorage.getItem('crazybiolevels_'+ CRAZYBIOGAME.topic);
      crazybiolevels += (i < storage.length) ? parseInt(storage.slice(i,i+2),16) : 0;

      console.log(crazybiolevels,CRAZYBIOGAME.level,CRAZYBIOGAME.game);

      str = storage.padEnd(2 * CRAZYBIOGAME.level,'0');
      let arr = str.split('');
      arr[2*(CRAZYBIOGAME.level - 1)] = crazybiolevels.toString(16).padStart(2,'0')[0];
      arr[2*(CRAZYBIOGAME.level - 1) + 1] = crazybiolevels.toString(16).padStart(2,'0')[1];
      str = arr.join('');
    }
    else {
      str = crazybiolevels.toString(16).padStart(2 * CRAZYBIOGAME.level,'0');
    }
    console.log('updated value',str);
    localStorage.setItem('crazybiolevels_' + CRAZYBIOGAME.topic,str);


    let html = (CRAZYBIOGAME.next_game !== '9999') ?
      `<p>Click on this <a class="exit" href="../${CRAZYBIOGAME.next_game}">button</a>to go to the next game...</p>` :
      `<p>End of this level !!! Return to <a class="exit" href="../index.html#level${CRAZYBIOGAME.level+1}">Home</a>...</p>`;
    displayPopup( {
      header: 'Congratulations !!!',
      body: [html],
      footer:  'You Win !!&nbsp;&nbsp;'
    });
  }
  else {
    alert("Wrong code. Try again");
  }
}


