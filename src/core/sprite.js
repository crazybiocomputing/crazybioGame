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
 * Create a new generic sprite
 *
 * @author Jean-Christophe Taveau
 */
const createSprite = (props) => {
  let element = document.createElement('div');
  element.id = props.id;
  element.className = 'sprite';
  element.style.display = (props.display !== "undefined" && props.display.visibility) ? "inline-block" : "none";
  // TODO
  let img = document.createElement('img');
  img.src = props.display.graphics.path;
  img.src = props.display.graphics.path;
  element.style.left = `${props.display.graphics.position[0] || 0}px`;
  element.style.top = `${props.display.graphics.position[1] || 0}px`;
  element.appendChild(img);
  
  
  return element;
};
