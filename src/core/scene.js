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
 * Create a new scene
 *
 * @author Jean-Christophe Taveau
 */
class Scene extends Composite {
  
  constructor(id,className,description) {
    super(id,className,description);
  };
  
  static create(props) {
    return new Scene(props.id,props.class,props.description)
      .append('section')
      .appendClose()
      .display(props.display)
      .children(props.children); // Pre-calculated in `preprocess` of game.js
      // .forEachChild(this.appendChild);
  }
  
  appendClose() {
    if (this.className === 'scene') {
      return this;
    }
    
    // Only for scene.closeup
    let self = this;
    
    let closeButton = document.createElement('a')
    closeButton.href="#close";
    closeButton.title="Back";
    closeButton.className ="close";
    closeButton.textContent='↶';
    closeButton.addEventListener('click', (e) => {
      self.element.style.display = 'none';
      e.stopPropagation();
    }, false);
    this.element.appendChild(closeButton);
    return this;
  }
  /**
   * ???
   * @obsolete
   *
   */
  appendChild(node) {
    console.log(node);
    let func = creators[child.class];
    if (func !== undefined) {
      this.element.appendChild(func(node));
    }
  }
  
  /**
   * Create a SVG Layer for grabbing the event(s)
   * @obsolete
   * @author Charlotte GONCALVES FRASCO
   */
  addSensitiveLayer() {
  
    const createCircle = (cx,cy,radius) => {
      let shape = document.createElementNS(NS,'circle');
      shape.setAttributeNS(null,'cx',cx+radius);
      shape.setAttributeNS(null,'cy',cy+radius);
      shape.setAttributeNS(null,'r',radius);
      shape.setAttributeNS(null,'opacity', '0.3');
      shape.setAttributeNS(null, 'fill', '#FFFFFF');
      return shape;
    }

    const createRectangle = (x,y,w,h) => {
      let shape = document.createElementNS(NS,'rect');
      shape.setAttributeNS(null,'x',x);
      shape.setAttributeNS(null,'y',y);
      shape.setAttributeNS(null,'width',w);
      shape.setAttributeNS(null,'height',h);
      shape.setAttributeNS(null,'opacity', '0.9');
      shape.setAttributeNS(null, 'fill', '#F0F0F0');
      return shape;
    }

    const createPolygon = (path) => {
      let shape = document.createElementNS(NS,'polygon');
      shape.setAttributeNS(null,'points',path);
      return shape;
    }
    
    const geometries = {'C': createCircle, 'R': createRectangle, 'P': createPolygon};
    
    // M a i n
    const NS = 'http://www.w3.org/2000/svg';
    
    let div = document.createElement('div');
    div.id = this.id;
    div.className = 'touch_layer';
    div.style.width = `${this.width}px`;
    div.height = `${this.height}px`;
    this.element.appendChild(div);
    
    let elementS = document.createElementNS(NS,'svg');
    // TODO BUG
    elementS.setAttributeNS(null, 'viewBox',`0 0 ${this.width} ${this.height}`);
    elementS.setAttributeNS(null, 'class', 'map');
    elementS.setAttributeNS(null,'width','100%');
    elementS.setAttributeNS(null,'height','100%');
    elementS.setAttributeNS(null,'preserveAspectRatio','xMinYMin meet');


    // Define clickable areas if any
    for (let child of this.childNodes){
      let elementG = document.createElementNS(NS,'g');
      elementG.setAttributeNS(null, 'class', 'hover_group');
      elementG.setAttributeNS(null, 'opacity', '0');
      elementG.setAttributeNS(null, 'id', `area_${child.id}`);

      let elementA = document.createElementNS(NS,'a');
      elementA.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'javascript:void(0)');
      elementA.setAttributeNS(null, 'id',`svg_${child.id}`);
      elementA.setAttributeNS(null, 'class', 'btn');

      let shape;
      console.log(child);
      if (child.geometry !== undefined) {
        shape = geometries[child.geometry.type](...child.geometry.data);
        elementA.appendChild(shape);
      }

      elementG.appendChild(elementA);
      elementS.appendChild(elementG);
    }

    div.appendChild(elementS);

  }
}


/**
 * Create a new scene
 *
 * @author Charlotte GONCALVES FRASCO
 */
const createScene = (props) => {

  let _scene = Scene.create(props);

  _scene.childNodes = [];

  console.log(_scene);
  
  return _scene;
};
