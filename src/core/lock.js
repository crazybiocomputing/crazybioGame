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
 * Lock displayed as a Text Field
 */
const createLockText = (props) => {
  let element = document.createElement('div');
  element.id = props.id;
  element.className = "lockText";
  
  // TODO
  
  return element;
};

/**
 * Lock displayed as a Numerical Field
 */
const createLockNumerical = (props) => {
  let element = document.createElement('div');
  element.id = props.id;
  element.className = "lockNumerical";
  
  // TODO
  
  return element;
};

/**
 * Lock displayed as a n-Digit Lock
 */
const createLockDigit = (nDigits) => (props) => {
  let element = document.createElement('div');
  element.id = props.id;
  element.className = "lockDigit";
  
  // TODO
  
  return element;
};

/**
 * Lock displayed as a keypad
 */
const createLockKeypad = (props) => {
  let element = document.createElement('div');
  element.id = props.id;
  element.className = "lockKeypad";
  
  // TODO
  
  return element;
};




