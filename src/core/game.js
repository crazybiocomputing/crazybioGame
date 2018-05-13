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
  "item": createItem,
  "machine": createMachine,
  "machine.download": createMachineDownload,
  //"machine.form": createForm,
  //"machine.formDragDrop": createFormDragDrop,
  //"machine.formDropDown": createFormDropDown,
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
  "sprite": createSprite,
  //"target": createTarget,
  "event": createPopUp
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
      return storyboard.map( (node, index, arr) => {
        // Collect the clickable areas of each child
        if (node.class === 'scene') {
          node.childNodes = []
          node.children.forEach( (childID) => {
            let child = arr.filter( (n) => childID === n.id )[0];
            // Add default properties
            child.parent = node.id;
            child.display = (child.display === undefined) ? {display: {visibility: false}} : child.display;
            child.display.parentWidth = node.display.graphics.width;
            child.display.parentHeight = node.display.graphics.height;
            child.display.visibility = (child.display.visibility === undefined) ? true : child.display.visibility;
            child.features = (child.features === undefined) ? [{click: ['C',0,0,-1]}] : child.features;
            child.display.click = (child.display.click === undefined) ? ['C',0,0,-1] : child.display.click;
            /*if (child.features !== undefined && child.features['click'] !== undefined) {
              node.childNodes.push(child);
            }
            else if (child.class === 'target') {
              // If no click features and is `target` then add rectangular area
              // TODO
              child.click = ['C',0,0,0];
            }
            */
            node.childNodes.push(child);
          })
        }
        return node;
      });
    };

    
    let game = {name: 'A game'};
    game.graph = storyboard;

    // Step #1- Preprocess 
    let graph = preprocess(storyboard);

    // Step #2- Create HTML5 and/or SVG Elements
    let root = document.getElementById('game');
    graph.filter( (node) => node.class === 'scene').forEach( scene => {
      console.log(scene.id);
      if (scene.id === 1) {
        root.style.maxWidth = `${scene.display.graphics.width}px`;
      }
      let func = creators[scene.class];
      if (func !== undefined) {
        let htmlscene = func(scene);
        root.appendChild(htmlscene);
        scene.childNodes.forEach( (node) => {
          console.log(node);
          let func = creators[node.class];
          if (func !== undefined) {
            htmlscene.appendChild(func(node));
          }
        });
// HACK        console.log(`Append child ${node.class}: ${JSON.stringify(node)}`);
      }
    });
    
    // Step #3: Add the events to link the scene(s) to the children/object(s)
    // TODO
    
    return game;
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
  
  /*
   * Get JSON with XMLHttpRequest
   */
  const getJSONviaXHR = (url) => {
    return new Promise( (resolve, reject) => {
      // https://developer.mozilla.org/fr/docs/Learn/JavaScript/Objects/JSON
      let request = new XMLHttpRequest();
      request.open('GET', filename);
      request.responseType = 'json';
      request.onload = function() {
        let status = request.status;
        if (status === 200) {
          resolve(request.response);
        }
        else {
          // ERROR
          reject(status);
        }
      };
      request.send();
    });
  };
  
  // Main
  return getJSON(filename)
    .then( (data) => parseGraph(data) );
}
