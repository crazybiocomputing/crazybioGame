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
 * Create a new `switch` object allowing the management of object in different states
 *
 * @author Jean-Christophe Taveau
 */
class Switch extends Composite {
  
  constructor(id,className,description) {
    super(id,className,description);
  };
  
  static create(props) {
    return new Switch(props.id,props.class,props.description)
      .append('div')
      .display(props.display)
      .children(props.children); 
  }

  display(displayProps) {
    // Get information from node to display...
    // TODO
    return this;
  }
}


/**
 * Create a new switch
 *
 * @author Jean-Christophe Taveau
 */
const createSwitch = (props) => {

  let _switch = Switch.create(props);

  _switch.childNodes = [];
  
  return _switch;
};
