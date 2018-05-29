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

const createDeferred = (props) => {
  let obj = CRAZYBIOGAME.deferred[props.id];
  // Update properties...
  obj.element.style.left = `${obj.topleft[0] / CRAZYBIOGAME.width * 100}%`;
  obj.element.style.top = `${obj.topleft[1] / CRAZYBIOGAME.height * 100}%`;
  obj.element.style.width = `${obj.width / CRAZYBIOGAME.width * 100}%`;
  obj.element.style.height = (obj.display.target === undefined) ? 'auto' : `${obj.height / CRAZYBIOGAME.height * 100}%`;
  console.log(obj);
  return obj;
}
