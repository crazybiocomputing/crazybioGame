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
 * Common stuff for the engine
 *
 *
 */
 
const categories = [
  {type: "item", code: 1},
  {type: "machine", code: 2},
  {type: "machine.download", code: 4},
  {type: "machine.form", code: 8},
  {type: "machine.lockDigit[1]", code: 16},
  {type: "machine.lockDigit[2]", code: 32},
  {type: "machine.lockDigit[3]", code: 64},
  {type: "machine.lockDigit[4]", code: 128},
  {type: "machine.lockDigit[5]", code: 256},
  {type: "machine.lockDigit[6]", code: 512},
  {type: "scene", code: 20},
  {type: "sprite", code: 25},
  {type: "target", code: 30}

];



