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


class Machine extends Node {

  constructor (id,className,description) {
    super(id,className,description);
    // Specific of `machine`
    this.features = {};
  }
  
  /**
   * Static Constructor
   *
   */
  static create(props) {
    return new Machine(props.id,props.class,props.description,props.parent)
      .append('article')
      .display(props.display)
      .draggable(props.features.draggable)
      .action(props.action)
      .exit(props.features.exit);
  }

  /*
   * Features - Properties specific of the `machine`
   *
   * @author Jean-Christophe Taveau

  features(featuresProps) {
    // Various methods of machines
    let f = {exit: this.exit};
    Object.keys(featuresProps).forEach( (feat) => {
      f[feat].call(this,featuresProps[feat]);
    });
    return this;
  }
*/

  /**
   * exit - Properties specific of the `machine`
   *
   * @author Jean-Christophe Taveau
   */
  exit(value) {
    if (value === undefined) {
      return this;
    }
    console.log('exit code ' + value + ' ' );
    console.log(' '+value.slice(9));
    this.exitCode = (value.toString().includes('deferred')) ? CRAZYBIOGAME.deferred[value.slice(9)] : value;

    return this;
  }
  
  /**
   * Click and Drag Feature 
   *
   * @author Jean-Christophe Taveau
   */
  draggable(flag = false) {
    
    const dragstart = (event) => {
      // centers the tile at (pageX, pageY) coordinates
      const moveAt = (pageX, pageY) => {
        // console.log(orgX,orgY,pageX,pageY,dx,dy,' = ',pageX - orgX + dx,pageY - orgY + dy);
        dragged.style.left = pageX - orgX  + dx + 'px';
        dragged.style.top = pageY - orgY + dy + 'px';
      }

      const drag_over = (event) => {
        moveAt(event.pageX, event.pageY);
        event.preventDefault();
        return false;
      }
      
      const drag_end = (event) => {
        event.target.parentNode.style.zIndex = 1;
        document.querySelector('main').removeEventListener('mousemove', drag_over,false);
        dragged.removeEventListener('mouseup', drag_end,false);
      }
      
      // Main of `dragstart`
      let dragged = event.target.parentNode;
      
      let orgX = event.pageX;
      let orgY = event.pageY;
      // TODO Must be improved - All the parents up to `game`
      let dx = dragged.getBoundingClientRect().left - document.getElementById('node_0').getBoundingClientRect().left;
      let dy = dragged.getBoundingClientRect().top - document.getElementById('node_0').getBoundingClientRect().top;
      dragged.style.zIndex = 1000;

      moveAt(event.pageX, event.pageY);

      // Move the tile on mousemove
      document.querySelector('main').addEventListener('mousemove', drag_over);

      // Drop the tile, remove unneeded handlers
      document.querySelector('main').addEventListener('mouseup', drag_end);
    };

    // M A I N
    if (!flag) {
      return this;
    }
    
    this.element.draggable = false;
    this.element.className += ' movable';
    this.element.addEventListener('mousedown', dragstart,false); 
    this.element.addEventListener('dragstart', (e) => {e.preventDefault();return false},false); 
    this.element.addEventListener('dragover', (e) => {return false},false); 
    this.element.addEventListener('drop', (e) => false,false); 

    return this;
  }
} // End of class Machine


/**
 * Create a new generic machine
 * @author Hans SCHRIEKE
 *
 */
const createMachine = (props) => {
  let machine = Machine.create(props);
    
  return machine;
};


const svg2img = (svgString,format,width,height,container) => {

  console.log(svgString);
  let canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext("2d");
  let DOMURL = window.URL || window.webkitURL;
  let img = new Image();
  let blob = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
  let url = DOMURL.createObjectURL(blob);
  img.onload = function() {
      ctx.drawImage(img, 0, 0);
      var png = canvas.toDataURL(`image/${format}`);
      container.innerHTML = `
        <p>
          Click on the icon below to download the file and process 
          it with your favorite scientific software...<br>
          <center> 
            <a class="button" href="${png}" download="${CRAZYBIOGAME.gamepath}_image.${format}")/>
              <i class="fas fa-download fa-3x"></i>
            </a>
          </center>
        </p>`;
      DOMURL.revokeObjectURL(png);
  };
  img.src = url;
}


/**
 * Create a new `download` machine
 *
 * @author Hans SCHRIEKE 
 * @author Charlotte GONCALVES FRASCO
 *
 */
const createMachineDownload = (props) => {

  let machine = Machine.create(props);
  
  let element = machine.element;
  element.className = "machine download";
  
  let actionProps = {}
  actionProps.onclick = {};
  actionProps.onclick['popup'] = {
    header: 'Download...',
    body: [''],
    footer: 'Download '
  };
  
  // create the 'form'
  let container = document.createElement('div');
  container.id = 'lock-container';

  
  if (props.features.download.includes('deferred')) {
    let [result,format] = /:svg2(\w+):/.exec(props.features.download);
    console.log(result,result.index,result.length,format);
    let index = props.features.download.indexOf(result) + result.length;
    let svg = props.features.download.slice(index);
    let w = parseInt(/width=\s*\s*\"(\d+)/g.exec(svg)[1]);
    let h = parseInt(/height\s*=\s*\"(\d+)/.exec(svg)[1]);
    svg2img(svg,format,w,h,container);
  }
  else {
    let paragraph = document.createElement('p');
    paragraph.innerHTML = 
      `Click on the icon below to download the file and process 
      it with your favorite scientific software...<br>
      <center> <a class="button" href="${props.features.download}" download="${props.features.download}">
      <i class="fas fa-download fa-3x"></i></a></center>`;
    // Add all the elements
    container.appendChild(paragraph);
  }

  actionProps.onclick.popup.contentDOM = container;
  machine.action(actionProps);

  return machine;
};


/**
 * Create a Tile machine
 *
 * @author Jean-Christophe Taveau
 *
 */
const createMachineTile = (props) => {
  if (props.features === undefined) {
    props.features = {draggable: true};
  }
  let machine = Machine.create(props);
  machine.element.className = "machine tile";
  return machine;
};


