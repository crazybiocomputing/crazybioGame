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

// Create a four-digit code randomly

let alphabet = [
  {value: 1,path: './assets/one.png', width: 78, height: 110},
  {value: 2,path: './assets/two.png', width: 88, height: 110},
  {value: 4,path: './assets/three.png', width: 81, height: 110},
  {value: 9,path: './assets/four.png', width: 78, height: 110}
];

let code = Array.from({length:4}, (v) => alphabet[Math.floor(Math.random()*4.0)]);
let codenumber = code.reduce( (final,digit,i)=> final + 10**(3-i)*digit.value,0);

// Create the digits as objects in the scene...
code.forEach ( (digit,index) => {
  CRAZYBIOGAME.deferred[25 + index] = createSprite({
    id: 25 + index,
    class: "sprite", 
    description: "Digit",
    display: {
      width: digit.width,
      height: digit.height,
      position: [250 + 80*index,180],
      graphics: {
        path: digit.path,
        style: {
          display:'none'
        }
      }
    },
    action: {
      ondisplay: {
        del_nodes: [10 + index]
      }
    }
  });
});

CRAZYBIOGAME.deferred[2] = createLockNumerical({
  id : 2,
  class: "machine.lockNumerical", 
  description: "Exit Lock", 
  display: {
    position: [680,20],
    width: 100,
    height: 100,
    graphics: {
      path: "../../assets/lock_symbol.png",
      focus: ["C", 50, 50, 50]
    }
  },
  features: {
    exit: 'deferred:code'
  }
});

CRAZYBIOGAME.deferred['code'] = codenumber;


