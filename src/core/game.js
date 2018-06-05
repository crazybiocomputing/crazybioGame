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


const creators = {
  "composite": createComposite,
  "deferred": createDeferred,
  "item": createItem,
  "machine": createMachine,
  "machine.download": createMachineDownload,
  "machine.form": createForm,
  "machine.formDragDrop": createFormDragDrop,
  "machine.formDropDown": createFormDropDown,
  "machine.tile": createMachineTile,
  "machine.lockKeypad": createLockKeypad,
  "machine.lockDigit[1]": createLockDigit(1),
  "machine.lockDigit[2]": createLockDigit(2),
  "machine.lockDigit[3]": createLockDigit(3),
  "machine.lockDigit[4]": createLockDigit(4),
  "machine.lockDigit[5]": createLockDigit(5),
  "machine.lockDigit[6]": createLockDigit(6),
  "machine.lockDigit[7]": createLockDigit(7),
  "machine.lockDigit[8]": createLockDigit(8),
  "machine.lockDigit[9]": createLockDigit(9),
  "machine.lockText": createLockText,
  "machine.lockNumerical":  createLockNumerical,
  "scene": createScene,
  "sprite": createSprite

};

/**
 * Create a new game from a JSON storyboard
 *
 * @author: Jean-Christophe Taveau
 */
const newGame = (filename) => {
  /*
   * Parse storyboard and create various HTML5 Elements
   */
  const parseGraph = (storyboard) => {
  
    // Preprocess storyboard
    const preprocess = (storyboard) => {
      let graph = new Graph();
      graph.nodeList = storyboard.map( (obj, index, arr) => {
        console.log(obj);
        if (obj.class === 'item') {
          hasItems = true;
        }
        let func = creators[obj.class];
        if (func !== undefined) {
          return func(obj);
        }
        return {};
      });
      console.log('nodeList');
      console.log(graph.nodeList);

      graph.root = graph.nodeList.filter( (node) => node.className === 'scene' && node.id === 1)[0];
      graph.traverseFrom(graph.root);
      
      return graph;
    };

    const appendHTML = (node) => {
      node.ancestor.getHTML().appendChild(node.getHTML());
    }
    
    /**** M  a  i  n ****/

    // Step #0- Get Width and Height of game
    let root_obj = storyboard.filter ( obj => obj.id === 1 && obj.class === 'scene')[0];
    CRAZYBIOGAME.width = root_obj.display.width;
    CRAZYBIOGAME.height = root_obj.display.height;
     
    // Step #1- Preprocess 
    let hasItems = false;
    CRAZYBIOGAME.graph = preprocess(storyboard);

    // Step #2 - create Accessory Elements (popup, inventory, etc.)
    let root = document.getElementById('game');
    root.inventory = document.createElement('aside');
    root.appendChild(CRAZYBIOGAME.graph.root.getHTML());
    let popup = document.createElement('div');
    popup.className = "modal";
    popup.id = 'popup';
    root.appendChild(popup);
    if (hasItems) {
      let inventory = document.createElement('aside');
      root.prepend(inventory);
      CRAZYBIOGAME.graph.inventory = root;
    }
    // Step #3 - Create HTML5 and/or SVG Elements of this graph
    let scene_root = CRAZYBIOGAME.graph.root;
    root.style.maxWidth = `${CRAZYBIOGAME.width}px`;
    CRAZYBIOGAME.graph.traverse(scene_root,appendHTML);
  };
  
  /*
   * Get JSON with fetch(..)
   */
  const getJSON = (url) => {
    return fetch(url, {
      method: 'GET',
      headers: new Headers({'Content-Type': 'application/json'}),
      mode: 'cors',
      cache: 'default' 
      }
    )
    .then ( response => response.json() )
    .catch ( error => {
      alert(`Something went wrong - ${error}`) 
    })
  };
  
   
  // Main
  
  return getJSON(filename)
    .then( (data) => parseGraph(data) );
}
