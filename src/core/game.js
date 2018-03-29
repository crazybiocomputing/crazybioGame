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
 * Create a new game from a JSON storyboard
 *
 *
 */

const newGame = (filename) => {

  /*
   * Parse storyboard and create various HTML5 Element
   */
  const parseGraph = (storyboard) => {
    let graph = storyboard;
    let game = {name: 'A game'};

    let root = document.getElementById('game');
    for (let node of graph) {
      //TODO
      if (node.class === 'scene') {
        createScene(node);
        root.appendChild(createScene);
      }
      console.log(node);
    }
  };
  
  /*
   * Get JSON
   */
  const getJSON = (url) => {
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
    .then( 
      (data) => parseGraph(data), 
      (status) => alert(`Something went wrong - ${status}`) 
    );
}
