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
  "machine.form": createForm,
  "machine.formDragDrop": createFormDragDrop,
  "machine.formDropDown": createFormDropDown,
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
  "target": createTarget
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
    let graph = storyboard;
    let game = {name: 'A game'};

    let root = document.getElementById('game');
    
    // First step: create all the HTML and/or SVG elements
    graph.forEach( node => {
      let func = creators[node.class];
      if (func !== undefined) {
        root.appendChild(func(node));
      }
      console.log(node);
    });
    
    // Second step: Add the events to link the scene(s) to the children/object(s)
    // TODO
  };
  
  /*
   * Get JSON with fetch(..)
   */
  const getJSON = (url) => {
    return fetch(url, {
      method: 'GET',
      headers: new Headers(),
      responseType: 'json',
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
  getJSON(filename)
    .then( (data) => parseGraph(data) );
}
