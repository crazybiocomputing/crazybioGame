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


class MachineConnector extends Machine {

  constructor (id,className,description) {
    super(id,className,description);
    this.drawFunction = DrawTools.drawPolyline;
    this.polyline;
    this.canvas;
  }
  
  /**
   * Static Constructor
   *
   */
  static create(props) {
    return new MachineConnector(props.id,props.class,props.description,props.parent)
      .append('article')
      .display(props.display)
      .actionable(props.action)
      .connectable(props.features)
      .exit(props.features.exit);
  }

  /**
   * Connectable Feature 
   *
   * @author Jean-Christophe Taveau
   */
  connectable(propsFeatures) {
    
    const getValue = (str) => {
      return propsFeatures.connectable.values[parseInt(str.replace(/[^0-9]/g, ''),10)]
    }

    // Move over
    const moveover = (event) => {
      console.log('over',event.pageX,event.pageY,event.clientX,event.clientY);
      this.drawFunction(this.canvas,this.polyline,event.pageX, event.pageY);
      event.preventDefault();
      return false;
    }

    // Move Click - End of Move
    const moveend = (event) => {
      event.target.parentNode.style.zIndex = 1;
      //this.polyline.parent.removeEventListener('mouseup', move_end,false);
      this.polyline.points.push({
        x: this.polyline.last.x,
        y: this.polyline.last.y,
        id: event.target.parentNode.id,
        value: getValue(event.target.parentNode.id)
      });
      this.drawFunction(this.canvas,this.polyline,-1, -1);
      if (this.polyline.points.length === propsFeatures.connectable.numVertices) {
        // Close all stuff
        console.log('This is the end...');
        console.log(this.polyline);
        document.querySelectorAll('.connector').forEach( (c) => {
          c.removeEventListener('click', movestart );
          c.addEventListener('mouseover', (e) => c.style.cursor = "not-allowed" );
        } );
        document.querySelector(`#node_${this.id} svg`).removeEventListener('mousemove', moveover,false);

        // Trigger Action!! ... Reset if it fails.
        let total = this.polyline.points.reduce ( (sum,p) => sum + p.value,0);
        console.log(`${total} === ${propsFeatures.connectable.exit}`);
        if (propsFeatures.connectable.exit === total) {
          triggerAction('onexit',this);
        }
        else {
          // Reset machine...
          // TODO
          this.polyline = undefined;
        }
      }
    }

    const movestart = (event) => {

      ///////// MAIN of `movestart` ///////// 

      event.target.parentNode.style.zIndex = 1000;
      let rectangle = document.getElementById(`node_${this.id}`).getBoundingClientRect();

      if (this.polyline === undefined) {
        this.polyline = {
          parent: event.target.parentNode,
          points: [
            {
              x: event.clientX - rectangle.left,
              y: event.clientY - rectangle.top,
              id: event.target.parentNode.id,
              value:getValue(event.target.parentNode.id)
            }
          ],
          last: {
            x: 0.0,
            y:0.0,
            id:0
          },
          offsetX: rectangle.left,
          offsetY: rectangle.top
        };
        console.log('Add mousemove');
        console.log(this.polyline);
      }

      // Activate mousemove
      document.querySelector(`#node_${this.id} svg`).addEventListener('mousemove', moveover,false);

      if (this.polyline.points[this.polyline.points.length - 1].id !== event.target.parentNode.id) {
        moveend(event);
      }

      this.drawFunction(this.canvas,this.polyline,event.clientX, event.clientY);

    }; // End of movestart

    // M A I N
    console.log('CONNECT. start');
    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'layer';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.getContext('2d').canvas.width = this.width;
    this.canvas.getContext('2d').canvas.height = this.height;
    this.element.appendChild(this.canvas);
    // Create events on buttons/connectors
    let _svg = this.element.firstChild;
    _svg.classList.add('connectable');
    _svg.querySelectorAll('.connector').forEach( (c) => {
      c.addEventListener('click', movestart );
      c.addEventListener('mouseover', (e) => c.style.cursor = "pointer" );
    } );
    return this;
  }

}
/**
 * Create a Connectable machine
 *
 * @author Jean-Christophe Taveau
 *
 */
const createMachineConnector = (props) => {
  if (props.features === undefined) {
    props.features = {draggable: true};
  }
  let machine = MachineConnector.create(props);
  machine.element.className = "machine connector";
  return machine;
};


