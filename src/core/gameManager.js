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
  constructor(topic) {
    this.levels;
    this.topic = topic;
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
      // Get the previous solved game
      let crazybiolevels = (localStorage.getItem('crazybiolevels_' + this.topic)) ? localStorage.getItem('crazybiolevels_' + this.topic) : '00';
      console.log(crazybiolevels);
      let section = document.getElementById('levels');
      this.levels.slice(1).forEach ( (level) => {
        let title=document.createElement('h2');
        title.innerHTML = `<span>${this.topic.charAt(0).toUpperCase() + this.topic.slice(1)} #${level.level} &mdash; ${level.title} ${level.history}</span>`;
        let container = document.createElement('div');
        container.appendChild(title);
        let table = document.createElement('ul');
        container.appendChild(table);
        section.appendChild(container);
        level.games.forEach( (game,index) => {
          let i = (level.level - 1 ) * 2;
          let solvedgame = parseInt(crazybiolevels.slice(i,i + 2),16) & 2**index;
          /* HACK
          console.log(
            crazybiolevels,
            level.level,
            index,
            solvedgame,
            (crazybiolevels & (crazybiolevels & (15 << 4*(level.level-1)))).toString(2),
            (15 << 4*(level.level-1)).toString(2)
          );
          */
          let item = document.createElement('li');
          let link = document.createElement('a');
          link.href = `${game.path}/index.html?id=${game.id}&topic=${this.topic}&level=${level.level}&game=${index+1}&path=${game.path}`;
          let img = document.createElement('img');
          img.src= (solvedgame !== 0) ? `${game.path}/thumbnail.png` : "../assets/thumbnail_unknown.png";
          link.appendChild(img);
          item.appendChild(link);
          table.appendChild(item);
        });
      })
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
      // Extract topic at first position (level #0)
      let topic = data[0].topic;
      console.log('data ' + JSON.stringify(data));
      // Build the URL
      let level = data.filter( (lvl) => lvl.level === parseInt(level_id))[0];
      let game_index = game - 1;
      console.log(game_index);
      let next_url= '9999';         // Last game of level
      if (game_index !== level.games.length - 1) {
        let next_game = level.games[game_index + 1];
        next_url = `${next_game.path}/index.html?id=${next_game.id}&topic=${topic}&level=${level_id}&game=${game_index+2}`;
      }
      CRAZYBIOGAME.next_game = next_url;
      console.log(next_url);
    })
    .catch ( error => {
      alert(`Something went wrong - ${error}`) 
    });
  }
}



