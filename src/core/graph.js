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

class Graph {
  constructor() {
    this.root;
    this.nodeList = [];
  }
  
  traverseFrom(a_node) {
    let children;
    let ancestor;
    if (a_node.hasChildren()) {
      if (a_node.childrenID !== undefined) {
        children = a_node.childrenID;
        ancestor = a_node;
      }
      else if (a_node.target.then.new_nodes !== undefined) {
        children = a_node.target.then.new_nodes;
        ancestor = a_node.ancestor;
        console.log(`target.then... id ${a_node.id} ${a_node.ancestor.id}`);
      }
    }
    else {
      return;
    }

    for (let id of children) {
      console.log(`id ${id} ${ancestor.id}`);
      let nodeChild = this.nodeList.filter( (node) => node.id === id)[0];
      ancestor.childNodes.push(nodeChild);
      nodeChild.ancestor = ancestor;
      this.traverseFrom(nodeChild);
    }
  }
  
  traverse(a_node,func) {
    if (a_node.hasChildNodes()) {
      for (let nodeChild of a_node.childNodes) {
        func(nodeChild);
        this.traverse(nodeChild);
      }
    }
  }
}
