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
 * Common code for the engine
 *
 *
 */
 
const categories = {
  "scene": {
    type: "scene", 
    code: 1
  },
  "item": {
    type: "item", 
    code: 2
  },
  "machine": {
    type: "machine", 
    code: 4
  },
  "machine.download": {
    type: "machine.download", 
    code: 8
  },
  "machine.lockKeypad": {
    type: "machine.lockKeypad", 
    code: 16
  },
  "machine.lockDigit[1]": {
    type: "machine.lockDigit[1]", 
    code: 32
  },
  "machine.lockDigit[2]": {
    type: "machine.lockDigit[2]", 
    code: 33
  },
  "machine.lockDigit[3]": {type: "machine.lockDigit[3]", code: 34},
  "machine.lockDigit[4]": {type: "machine.lockDigit[4]", code: 35},
  "machine.lockDigit[5]": {type: "machine.lockDigit[5]", code: 36},
  "machine.lockDigit[6]": {type: "machine.lockDigit[6]", code: 37},
  "machine.lockDigit[7]": {type: "machine.lockDigit[7]", code: 38},
  "machine.lockDigit[8]": {type: "machine.lockDigit[8]", code: 39},
  "machine.lockDigit[9]": {type: "machine.lockDigit[9]", code: 40},
  "machine.lockText": {
    type: "machine.lockText", 
    code: 64
  },
  "machine.lockNumerical": {
    type: "machine.lockNumerical", 
    code: 128
  },
  "machine.form": {
    type: "machine.form", 
    code: 256
  },
  "machine.formDragDrop": {type: "machine.formDragDrop", code: 257},
  "machine.formDropDown": {type: "machine.formDropDown", code: 258},
  "target": {type: "target", code: 512},
  "sprite": {type: "sprite", code: 1024}
};



