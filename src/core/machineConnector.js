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
  connectable(props) {
    
    const getValue = (str) => {
      return props.features.values[parseInt(str.replace(/[^0-9]/g, ''),10)]
    }

    // Move over
    const moveover = (event) => {
      console.log('over');
      this.drawFunction(this.polyline,event.pageX, event.pageY);
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
      this.drawFunction(this.polyline,-1, -1);
      if (this.polyline.points.length === props.features.numVertices) {
        // Close
        console.log('This is the end...');
        console.log(this.polyline);
        document.querySelectorAll('.connector').forEach( (c) => {
          c.removeEventListener('click', movestart );
          c.addEventListener('mouseover', (e) => c.style.cursor = "not-allowed" );
        } );
        document.querySelector('svg').removeEventListener('mousemove', moveover,false);

      }
    }

    const movestart = (event) => {

      ///////// MAIN of `movestart` ///////// 

      console.log('start');
      // TODO Must be improved - All the parents up to `game`
      event.target.parentNode.style.zIndex = 1000;

      if (this.polyline === undefined) {
        this.polyline = {
          parent: event.target.parentNode,
          points: [{x: event.pageX,y:event.pageY,id: event.target.parentNode.id,value:getValue(event.target.parentNode.id)}],
          last: {
            x: 0.0,
            y:0.0,
            dx: event.target.parentNode.getBoundingClientRect().left,
            dy: event.target.parentNode.getBoundingClientRect().top,
            id:0
          }
        };
        console.log('Add mousemove');
      }

      // Activate mousemove
      document.querySelector('svg').addEventListener('mousemove', moveover,false);

      if (this.polyline.points[this.polyline.points.length - 1].id !== event.target.parentNode.id) {
        moveend(event);
      }

      this.drawFunction(this.polyline,event.pageX, event.pageY);

    }; // End of movestart

    // M A I N
    if (!flag) {
      return this;
    }
    

    // Create events

    let element = document.querySelector('svg');
    // element.addEventListener('click', (e) => console.log('svg'));
    element.connectable = flag;
    console.log(element);
    element.classList.add('connectable');
    document.querySelectorAll('.connector').forEach( (c) => {
      c.addEventListener('click', movestart );
      c.addEventListener('mouseover', (e) => c.style.cursor = "pointer" );
    } );
    return this;
  }
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
  let machine = Machine.create(props);
  machine.element.className = "machine connector";
  return machine;
};


