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

const fs = require('fs');


const checker = (err,storyboard) => {
  // M A I N
  if (err) {
    throw err;
  }

  console.log('1. Check JSON...');
  // Parse JSON File
  let graph = JSON.parse(storyboard);
  if (graph.error) {
    throw graph.error;
  }

  console.log('2. Check each object in the storyboard...');
  let id_one = false;
  let id_zero = false;
  let all_ids = [];
  for (let node of graph) {
    // Mandatory Properties: `id`, `class`
    let err = (node.hasOwnProperty('id') && node.hasOwnProperty('class')) ? true : false;

    // Check unicity and specific IDs
    // ID=0 is reserved to the game engine
    // ID=1 is mandatory (default scene)
    if (node.id === 1 && node.class === "scene") { 
      id_one = true;
    }
    if (node.id === 0) {
      id_zero = true ;
    }
    // An ID MUST be unique
    if (all_ids.includes(node.id)) {
      throw `\x1b[41m ERR: Duplicate IDs for 'id' = ${node.id} \x1b[0m.\nThe 'id' must be a unique number`;
    }
    else {
      all_ids.push(node.id);
    }
    // Check missing properties depending of class

  }
  if (id_zero === true) {
    throw '\x1b[41m ERR: An object is defined by an ID of 0 (zero)\x1b[0m.\nThis is a reserved ID used by the game engine.\nPlease, use another id';
  }
  
  if (id_one === false) {
    throw '\x1b[41m ERR: No object with `id` equal to 1 \x1b[0m.\nA `scene` must have an `id` equal to 1 because this is the game entry point.\nPlease, modify your storyboard.json';
  }

  // Check assets
  console.log('3. Check avaibility of assets...');

  // Minify JSON
  console.log('4. Minify storyboard...');
  for (let node of graph) {
    // Join all the String in a single one
    if (node.layout !== undefined && node.layout.content !== undefined) {
      node.layout.content = node.layout.content.join('');
    }
    // Replace String class by code class
    
    // Encode exit property
  }
  
  // Create new clean JSON storyboard
  let cleanGraph = JSON.stringify(graph);
  console.log(cleanGraph.replace('\n',''));
};

/**
 * Helper for building the storyboard
 *
 * 1. Check if the JSON storyboard is correct.
 * 2. Check the availability of all the assets
 * 3. Improve the JSON by encoding objects types
 * 4. Minify JSON by removing unnecessary properties in JSON
 *
 * @author Jean-Christophe Taveau
 */
const gameChecker = (filename) => {
  fs.readFile(filename, 'utf8', checker );
}


// print process.argv
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

// M A I N
gameChecker(process.argv[2]);



