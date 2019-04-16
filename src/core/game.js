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
 * Create a Game Node
 * @class Game
 *
 * @author Jean-Christophe Taveau
 */
class Game extends Composite {
  
  constructor(id,className,description) {
    super(id,className,description);
    this.element = document.getElementById('node_0');
  };
  
  
  static create(props) {
    let _game = new Game(props.id,props.class,props.description)
      .append('main')
      .children(props.children);
    _game.childNodes = [];
    return _game;
  }
  
  append(htmlTag) {
    
    // let main = 
    // Create inventory
    // Create popup
    //
    this.element = document.createElement('div');
    main.appendChild(this.element); //div.appendChild()
  }
} // End of class Game


  
/**
 * Create a new game
 *
 * @author Jean-Christophe Taveau
 */
const createGame = (props) => {

  return Game.create(props);

};






