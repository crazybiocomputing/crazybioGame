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
 * @class Graph
 */
class Graph {

  /**
   * @constructor
   */
  constructor(storyboard) {
    this.storyboard = storyboard;
    this.root = this._createRoot();
  }

  /**
   * Build Scene graph from this storyboard
   *
   * @author Jean-Christophe Taveau
   */
  build() {
    this.traverseFrom(this.storyboard.filter( (node) => node.class === 'scene' && node.id === 1)[0],this.root);
  }

  /**
   * 
   */
  traverseFrom(a_node,parent) {
    let children;
    let ancestor;
    let gnode; // Node in the graph

    // Step #1 - Create graph node
    let func = creators[a_node.class];
    if (func !== undefined) {
      gnode = func(a_node);
      gnode.ancestor = parent;
      parent.childNodes.push(gnode);
      // HACK - Exception for `scene`
      let htmlParent = (gnode.className.includes('scene')) ? this.root : parent;
      htmlParent.element.appendChild(gnode.element);
    }
    // Step #2: Create children and traverse...
    if (gnode.hasChildren()) {
      // ???
      if (gnode.className.includes('scene') ) {
        children = a_node.childrenID; // ??
        gnode.ancestor = this.root;
      }
      if (gnode.childrenID !== undefined) {
        children = gnode.childrenID;
        ancestor = gnode;
      }
      else {
        console.log('Check if new_nodes in ' + a_node.id);
        Object.keys(gnode.actions).forEach( on_event => {
          if (gnode.actions[on_event].new_nodes !== undefined) {
            children = gnode.actions[on_event].new_nodes;
            ancestor = gnode.ancestor;
            console.log(`actions.then... id ${gnode.id} ${gnode.ancestor.id}`);
          }
        });
      }
    }
    else {
      return;
    }
    console.log(children);
    for (let id of children) {
      console.log(`id ${id} <-- ${ancestor.id}`);
      let child = this.storyboard.filter( (node) => node.id === id)[0];
      this.traverseFrom(child,gnode);
    }
  }

  traverse(a_node,func) {
    let result = func(a_node);
    if (result === undefined && a_node.hasChildNodes()) {
      for (let nodeChild of a_node.childNodes) {
        result = this.traverse(nodeChild,func);
        if (result !== undefined) {
          return result;
        }
      }
    }
    return result;
  }

  traverse2(a_node,func) {
    let array = [];
    let result = func(a_node);
    if (result !== undefined) {
      array.push(result);
    }
    if (a_node.hasChildNodes()) {
      for (let nodeChild of a_node.childNodes) {
        array = array.concat(this.traverse2(nodeChild,func) );
      }
    }
    return array;
  }

  /**
   * Get the node with this id
   *
   */
  getNodeById(id) {
    return this.traverse(this.root,Graph._getNodeById(id));
  }

  /**
   * Get the node with this id
   *
   */
  filterNodes(func) {
    return this.traverse2(this.root,func);
  }

  /*
   * Private
   */
  static _createNode(parent) {
    return function (a_node) {
      let func = creators[a_node.class];
      if (func !== undefined) {
        gnode = func(a_node);
        gnode.ancestor = a_node.parent;
        parent.childNodes.push(gnode);
        parent.element.appendChild(gnode.element);
      }
      return gnode;
    }
  }

  static _getNodeById(id) {
    return function(a_node) {
      return (a_node.id === id) ? a_node : undefined;
    }
  }

  /*
   * Private
   */
  _createRoot() {
    // Check node ID=0
    let id0 = this.storyboard.filter( (obj) => obj.id === 0);
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
    let scenes = this.storyboard.filter( (obj) => obj.class.includes('scene'));
    props.children = scenes.map( (s) => s.id);
    props.display = {
      width: scenes[0].display.width,
      height: scenes[0].display.height,
    }

    // Step #3 - Update global size
    CRAZYBIOGAME.width = props.display.width;
    CRAZYBIOGAME.height = props.display.height;
    console.log(props);

    // Step #4 - Create Game graph node
    return Game.create(props);
  }


}
