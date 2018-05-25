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

class GameManager {
  constructor() {
    this.levels;
  }
  
  build(url) {
    fetch(url, {
      method: 'GET',
      headers: new Headers({'Content-Type': 'application/json'}),
      mode: 'cors',
      cache: 'default' 
      }
    )
    .then ( response => response.json() )
    .then( (data) => {
      this.levels = data;
      // Build the page web with links
      console.log(this.levels);
    })
    .catch ( error => {
      alert(`Something went wrong - ${error}`) 
    });
  }
  
  calcNextURL(bdd,level_id,game) {
    console.log(level_id,game);
    fetch(bdd, {
      method: 'GET',
      headers: new Headers({'Content-Type': 'application/json'}),
      mode: 'cors',
      cache: 'default' 
      }
    )
    .then ( response => response.json() )
    .then( (data) => {
      console.log('data ' + JSON.stringify(data));
      // Build the URL
      let level = data.filter( (lvl) => lvl.level === parseInt(level_id))[0];
      let game_index = game - 1;
      console.log(game_index);
      let next_url= '9999';         // Last game of level
      if (game_index !== level.games.length - 1) {
        let next_game = level.games[game_index + 1];
        next_url = `${next_game.path}/index.html?id=${next_game.id}&cat=${next_game.path}&level=${level_id}&game=${game_index+2}`;
      }
      CRAZYBIOGAME.next_game = next_url;
      console.log(next_url);
    })
    .catch ( error => {
      alert(`Something went wrong - ${error}`) 
    });
  }
}



