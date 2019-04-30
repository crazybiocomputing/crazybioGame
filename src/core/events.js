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
 * Factory of action(s)
 *
 * @author Jean-Christophe Taveau
 */
const updateNodes = (eventType,node) => {
  if (node.actions[eventType].new_nodes !== undefined) {
    console.log('show nodes');
    showNodes(node.actions[eventType].new_nodes);
  }
  if (node.actions[eventType].del_nodes !== undefined) {
    hideNodes(node.actions[eventType].del_nodes);
  }
  if (node.actions[eventType].new_items !== undefined) {
      console.log('show items');
    showItems(node.actions[eventType].new_items);
  }
  if (node.actions[eventType].play !== undefined){
    let figure = document.getElementById(node.actions[eventType].play[0]);
    let video = figure.children[0];
    video.play();
  }
  if (node.actions[eventType].popup !== undefined) {
    displayPopup(node.actions[eventType].popup);
  }
}

/**
 * Factory of action(s)
 *
 * @author Jean-Christophe Taveau
 */
const triggerAction = (event,node) => {
  console.log(event);
  console.log(node);
  Object.keys(node.actions).forEach( (event) => {
    switch(event) {
    case 'onclick':
      if (CRAZYBIOGAME.useItem) {
        updateNodes('onuse',node);
      }
      else {
        updateNodes('onclick',node);
      }
      break;
    case 'onsuccess':
      updateNodes('onsuccess',node);
      break;
    case 'onended':
      updateNodes('onended',node);
    }
  });
}

/**
 * Display/Show objects in the scene
 *
 * @param {array} nodelist - List of Objects
 * @author Jean-Christophe Taveau
 */
const showItems = (nodelist) => {
  nodelist.forEach( id => {
    let node = CRAZYBIOGAME.graph.getNodeById(id);
    console.log(`show node #${id} ${node.element.className}`);
    document.getElementById(`item_${id}`).style.display = 'block';
    if (node.actions !== undefined && node.actions.ondisplay !== undefined) {
      updateNodes('ondisplay',node);
    }
  });
}

/**
 * Display/Show objects in the scene
 *
 * @param {array} nodelist - List of Objects
 * @author Jean-Christophe Taveau
 */
const showNodes = (nodelist) => {
  nodelist.forEach( id => {
    let node = CRAZYBIOGAME.graph.getNodeById(id);
    console.log(`show node #${id} ${node.element.className}`);
    node.element.style.display = 'block';
    if (node.actions !== undefined && node.actions.ondisplay !== undefined) {
      updateNodes('ondisplay',node);
    }
  });
}


/**
 * Hide objects in the scene
 *
 * @param {array} nodelist - List of Objects
 * @author Jean-Christophe Taveau
 */
const hideNodes = (nodelist) => {
  nodelist.forEach( id => {
    let node = CRAZYBIOGAME.graph.getNodeById(id);
    node.element.style.display = 'none';
  })
}

/**
 * Create a popup
 *
 * @author Charlotte GONCALVES FRASCO
 * @author Hans SCHRIEKE
 * @author Penelope WINTRINGER
 * @author Jean-Christophe Taveau
 */
const displayPopup = (props) => {

  let modal = document.getElementById('popup');
  modal.style.display = 'block';

  // modal-content
  let modalContent = document.querySelector('.modal-content') || document.createElement('div');
  modalContent.className = 'modal-content';

  let closeButton = document.createElement('a')
  closeButton.href="#close";
  closeButton.title="Close";
  closeButton.className ="close";
  closeButton.textContent='×';
  closeButton.addEventListener('click', (e) => {
    modal.style.display = 'none';
    e.stopPropagation();
  }, false);
  modalContent.appendChild(closeButton);

  // modal-header ** MANDATORY **
  let modalHeader = document.querySelector('.modal-header') || document.createElement('div');
  modalHeader.className = 'modal-header';
  modalHeader.textContent = props.header;
  modalContent.appendChild(modalHeader);


  // modal-body
  let modalBody = document.querySelector('.modal-body') || document.createElement('div');
  modalBody.className = 'modal-body';
  while (modalBody.lastChild) {
    modalBody.removeChild(modalBody.lastChild);
  }
  if (props.contentDOM === undefined) {
    modalBody.innerHTML = (props.body !== undefined) ? props.body.join('') : '';
  }
  else {
    modalBody.appendChild(props.contentDOM);
  }
  modalContent.appendChild(modalBody);


  // modal-footer
  let modalFooter = document.querySelector('.modal-footer') || document.createElement('div');
  modalFooter.className = 'modal-footer';
  modalFooter.innerHTML = props.footer || '';
  modalContent.appendChild(modalFooter);



  modal.appendChild(modalContent);


/*
  // TODO For each button, add it :
  // Example:
  // <span class="grab"><i class="far fa-hand-paper fa-2x"></i></span>

  if (props.class === "machine.download"){
    let dwnldButton = document.createElement('a');
    dwnldButton.className = 'download-button';
    dwnldButton.href = 'javascript:void(0)';
    dwnldButton.innerHTML = '<i class="fas fa-download fa-2x"></i>';
    modalFooter.appendChild(dwnldButton);
  }

  else if (props.class === "machine.display"){
    let img = document.createElement('img');
    img.className = 'image';
    img.src = props.features.popup.graphics.path;
    modalBody.appendChild(img);
  }

  else if (props.class === "machine.form"){
    //to debug

    let myForm = document.createElement('form');
    myForm.onsubmit = validateForm();
    myForm.method = "post";
    let field = document.getElementsById("f1");
    field.type = "text";
    let field2 = document.getElementsById("f2");
    field2.type = "text";
    let buttonS = document.createElement('button');
    buttonS.textContent = 'OK';
    buttonS.type = "submit";

    myForm.appendChild(field);
    myForm.appendChild(field2);
    myForm.appendChild(buttonS);

    let holder = "...";
    let answer = `${props.exit}`;
    field.placeholder = holder;
    field2.placeholder = holder;

    function validateForm() {
      let x = document.forms["myForm"]["field"].value;
      let y =  document.forms["myForm"]["field2"].value;
      if (x == "" || y == "") {
          alert("All fields must be filled out.");
          return false;
      }
      if (x === answer && y === answer){
        alert(`${props.message}`);
      }
      else {
        alert("Try again");
      }
    }

    modalBody.appendChild(myForm);

  }

  else if (props.class === "machine.formDragDrop"){
    //prototype in machine.JS to c/p and modify
  }

  else if (props.class === "machine.formDropDown"){
    //prototype in machine.JS to c/p and modify
  }


  else if (props.class === "machine.lockNumerical"){
    let imglockNum = document.createElement('img');
    imglockNum.className = 'lock-image';
    imglockNum.src =  props.features.file;
    modalBody.appendChild(imglockNum);
    let lockNum = document.createElement('a');
    lockNum.className = 'lockNum-button';
    lockNum.href = 'javascript:void(0)';
    lockNum.innerHTML = '<i class="fas fa-unlock-alt"></i>';
    modalFooter.appendChild(lockNum);

  }

  else if (props.class === "machine.lockText"){
    // create the input
    let form = document.createElement('form');
    let submit = document.createElement('submit');
    let div = document.createElement('div');
    let input = document.createElement('input');
    input.id = 'lock-input';
    input.type = 'text';

    div.appendChild(input);
    div.appendChild(submit);
    form.appendChild(div);

    // setup the holder
    let holder = "";
    let answer = `${props.exit}`;
    if (!isNaN(answer) === true){
      holder = 'Input numbers';
    }
    else {
      holder = 'Input letters';
    }
    input.placeholder = holder;

    let submitbutton = document.createElement('button');
    submitbutton.id = 'button';
    submitbutton.textContent = "OK";
    submitbutton.type = "submit";

    submitbutton.onclick = function(){
      let val = document.getElementById('lock-input').value;
      if (val === `${props.exit}`){
        alert(`${props.message}`);
      }
      else {
        alert("Try again");
      }
    }

    modalBody.appendChild(form);
    submit.appendChild(submitbutton);

    let lockText = document.createElement('a');
    lockText.className = 'lockText-button';
    lockText.href = 'javascript:void(0)';
    modalFooter.appendChild(lockText);


}



  let link = document.createElement('a');
  link.className = 'close'+ name;
  link.href = 'javascript:void(0)';
  link.innerHTML = '<i class="far fa-window-close fa-2x"></i>';
  modalFooter.appendChild(link);



 let root = document.getElementById('game');
 root.appendChild(modal);
 */
}
