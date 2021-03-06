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


const creators = {
  "composite": createComposite,
  "deferred": createDeferred,
  "game": createGame,
  "item": createItem,
  "machine": createMachine,
  "machine.connector": createMachineConnector,
  "machine.download": createMachineDownload,
  "machine.form": createForm,
  "machine.formDragDrop": createFormDragDrop,
  "machine.formDropDown": createFormDropDown,
  "machine.tile": createMachineTile,
  "machine.lockKeypad": createLockKeypad,
  "machine.lockDigit[1]": createLockDigit(1),
  "machine.lockDigit[2]": createLockDigit(2),
  "machine.lockDigit[3]": createLockDigit(3),
  "machine.lockDigit[4]": createLockDigit(4),
  "machine.lockDigit[5]": createLockDigit(5),
  "machine.lockDigit[6]": createLockDigit(6),
  "machine.lockDigit[7]": createLockDigit(7),
  "machine.lockDigit[8]": createLockDigit(8),
  "machine.lockDigit[9]": createLockDigit(9),
  "machine.lockText": createLockText,
  "machine.lockNumerical":  createLockNumerical,
  "machine.dialog": createMachineDialog,
  "scene": createScene,
  "scene.closeup": createScene,
  "sprite": createSprite,
  "switch": createSwitch
};


/**
* Create a game graph and corresponding HTML5 elements
* @class GameBuildergit pu
*
* @author Jean-Christophe Taveau
*/

class GameBuilder {

  constructor() {
    // this.graph = new Graph();
  }

  static create(json) {

    let _builder = new GameBuilder();

    // Step #1: Create a root node `Game`
    // Check node ID=0
    let id0 = json.filter( (obj) => obj.id === 0);
    console.log(id0);
    let props = {id:0,class:'game'};
    if (id0.length === 0) {
      props.description = 'Game root';
    }
    else {
      props.description = id0[0].description || 'Game Root';
      props.misc = id0[0];
    }

    // Step #2: Get children of game (aka scene, scene.closeup,etc.)
    let scenes = json.filter( (obj) => obj.class.includes('scene'));
    props.children = scenes.map( (s) => s.id);
    props.display = {
      width: scenes[0].display.width,
      height: scenes[0].display.height,
    }
    console.log(json);
    _builder.parse([props,...json]);

    return _builder;
  }

  /**
   * Parse storyboard and create various HTML5 Elements
   *
   * @author: Jean-Christophe Taveau

  parse(storyboard) {

    const hasItems = () => {
      return storyboard.some( (obj) => obj.class === 'item');
    }

    // Process storyboard
    const process = (storyboard) => {
      this.graph.nodeList = storyboard.map( (obj, index, arr) => {
        console.log(obj);
        let func = creators[obj.class];
        if (func !== undefined) {
          return func(obj);
        }
        return {};
      });
      console.log('nodeList');
      console.log(this.graph.nodeList);

      this.graph.root = this.graph.nodeList.filter( (node) => node.className === 'game' && node.id === 0)[0];
      this.graph.traverseFrom(this.graph.root);

      return this.graph;
    };

    const appendHTML = (node) => {
      console.log('appendHTML');
      console.log(node);
    }

    ///// M  a  i  n /////
    console.log('Parse/Build game');
    console.log(storyboard);
    // Step #0- Get Width and Height of game and create `div` game.
    let root_obj = storyboard.filter ( obj => obj.class === 'game')[0];
    CRAZYBIOGAME.width = root_obj.display.width;
    CRAZYBIOGAME.height = root_obj.display.height;
    console.log(root_obj);

    // Create HTML5 div for game
    let top = document.getElementById('main');
    let root = document.createElement('div');
    root.id = 'node_0';
    root.className = 'game';
    top.appendChild(root);

    // Step #1- Preprocess
    if (hasItems()) {
      let inventory = document.createElement('aside');
      inventory.appendChild(document.createElement('ul'));
      root.appendChild(inventory);
      console.log('create inventory');
      // Complete the `new_nodes` property if any
      // Collect all the ids and the items ids
      let sprites = storyboard.filter(obj => obj.id !== 0 && obj.class !== 'item');
      let items = storyboard.filter( obj => obj.class === 'item');
      items.forEach( item => {
        let modifier = item.id;
        // An item is a composite of a sprite and a invertoriable object
        // Create Sprite as child of Item
        storyboard.push({
          id : 1000 + item.id,
          class : 'sprite',
          description: item.description,
          display: item.display,
          action: item.action
        });

        for (let sprite of sprites) {
          // Update item props
          let new_nodeid = sprite.id + modifier;
          let new_nodes = sprites.filter( obj => obj.id === new_nodeid);
          if (new_nodes.length !== 0) {
            console.log(`The item ${modifier} interacts with the object ${sprite.id} ${sprite.class}\n`);
            console.log(new_nodes);
            // When a item is used, trigger the `onuse` action(s)
            sprite.action.onuse = {
              new_nodes: new_nodes.map( node => node.id),
              modifier: modifier
            }
          }
        }
      });
      console.log(sprites);
      console.log(items);
    }
    console.log(storyboard);

    // Step #2 - Create the graph and nodes
    CRAZYBIOGAME.graph = process(storyboard);

    // Step #3 - Post-process - create Accessory Elements (popup, etc.)
    let popup = document.createElement('div');
    popup.className = "modal";
    popup.id = 'popup';
    root.appendChild(popup);
    // TODO HACK
    let subSprites = document.querySelectorAll('div.item .sprite');
    console.log('INVENT. ',subSprites);

    // Step #4 - Finalize HTML5 and/or SVG Elements of this graph
    let scene_root = CRAZYBIOGAME.graph.root;
    root.style.maxWidth = `${CRAZYBIOGAME.width}px`;
    CRAZYBIOGAME.graph.traverse(scene_root,appendHTML);
  }
   */



  /**
   * Preload assets
   *
   * @author
   */
  static preprocess(json) {

    // Pre-Load Assets
    let div_media=document.createElement("div");
    div_media.id="media";
    div_media.style.display="none";
    document.body.appendChild(div_media);

    let preloader = new AssetLoader(json);
    return preloader.preload().then( () => json);

  }

  /**
   * Build Scene Graph and DOM
   *
   * @author
   */
  static process(storyboard) {
    let graph = new Graph(storyboard);
    graph.build();
    CRAZYBIOGAME.graph = graph;
    return new Promise( (resolve,reject) => resolve(storyboard));
  }

  /**
   * ???
   *
   * @author
   */
  static postprocess(storyboard) {
    const hasItems = () => document.querySelectorAll('#inventory li').length > 0;

    document.getElementById("node_0").style.maxWidth = `${CRAZYBIOGAME.width}px`;

    document.getElementById("node_0").appendChild(inventory);
    

    //Max width of the game

    if (hasItems) {
      // Add events for items targets
      // Collect all the ids and the items ids
      let targets = CRAZYBIOGAME.graph.filterNodes(n => n.id !== 0 && !(n instanceof Item) ? n : undefined);
      let items = CRAZYBIOGAME.graph.filterNodes( n => n.className === 'item' ? n : undefined);
      items.forEach( item => {
        let modifier = item.id;
        for (let sprite of targets) {
          // Update item props
          let new_nodeid = sprite.id + modifier;
          let new_nodes = targets.filter( obj => obj.id === new_nodeid);
          if (new_nodes.length !== 0) {
            console.log(`The item ${modifier} interacts with the object ${sprite.id} ${sprite.className}\n`);
            // When a item is used, trigger the `onuse` action(s)
            sprite.actions.onuse = {
              new_nodes: new_nodes.map( node => node.id),
              modifier: modifier
            }
          }
        }
      });
    }
  }

} // End of class GameBuilder


/*
* common.js??
*/

const newGame = (filename) => {

  /*
  * Get JSON with fetch(..)
  */
  const getJSON = (url) => {
    return fetch(url, {
      method: 'GET',
      headers: new Headers({'Content-Type': 'application/json'}),
      mode: 'cors',
      cache: 'default'
    }
  )
  .then ( response => response.json() )
  .catch ( error => {
    alert(`Something went wrong - ${error}`)
  })};

  // Main
  return getJSON(filename)
    .then( (data) => {
      // GameBuilder.create(data)
      return GameBuilder.preprocess(data);
    })
    .then( (data) => {
      return GameBuilder.process(data);
    })
    .then( (data) => {
      return GameBuilder.postprocess(data);
    });
};

