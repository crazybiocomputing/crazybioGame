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
const triggerAction = (event,node) => {
  console.log(event);
  console.log(node.target.then);
  switch(node.target.if) {
  case 'click': 
    if (node.target.then.new_nodes !== undefined) {
      showNodes(node.target.then.new_nodes);
    }
    if (node.target.then.del_nodes !== undefined) {
      hideNodes(node.target.then.del_nodes);
    }
    
  }
}

/**
 * Display/Show objects in the scene
 *
 * @param {array} nodelist - List of Objects
 * @author Jean-Christophe Taveau
 */
const showNodes = (nodelist) => {
  nodelist.forEach( id => {
    let node = CRAZYBIOGAME.graph.nodeList.filter( (n) => n.id === id)[0];
    node.element.style.display = 'block';
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
    let node = CRAZYBIOGAME.graph.nodeList.filter( (n) => n.id === id)[0];
    node.element.style.display = 'none';
  })
}

/**
 * Create a popup
 *
 * @author Charlotte GONCALVES FRASCO and Hans SCHRIEKE and P WINTRINGER
 */


const createPopUp = (props,name) => {


  let modal = document.createElement('div');
  modal.id = name;
  modal.className = 'modal';
  //modal.style.display = "none";

  // modal-content
  let modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  // modal-header
  let modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';
  modalHeader.textContent = props.features.popup.title;

  modalContent.appendChild(modalHeader);

  // modal-body
  let modalBody = document.createElement('div');
  modalBody.className = 'modal-body';
  modalBody.innerHTML = props.features.popup.content;

  modalContent.appendChild(modalBody);

  // modal-footer
  let modalFooter = document.createElement('div');
  modalFooter.className = 'modal-footer';
  modalContent.appendChild(modalFooter);

  // TODO For each button, add it :
  // Example:
  // <span class="grab"><i class="far fa-hand-paper fa-2x"></i></span>

  if (props.class === "machine.download"){
    let dldButton = document.createElement('a');
    dldButton.className = 'download-button';
    dldButton.href = 'javascript:void(0)';
    dldButton.innerHTML = '<i class="fas fa-download fa-2x"></i>';
    modalFooter.appendChild(dldButton);
  }
  
  else if (props.class === "machine.display"){
    let img = document.createElement('img');
    img.className = 'image';
    img.src = props.features.popup.graphics.path;
    modalBody.appendChild(img);
  }
  
  else if (props.class === "machine.form"){
    //to debug
    /*
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
    */
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

  modal.appendChild(modalContent);

  let link = document.createElement('a');
  link.className = 'close'+ name;
  link.href = 'javascript:void(0)';
  link.innerHTML = '<i class="far fa-window-close fa-2x"></i>';
  modalFooter.appendChild(link);



 let root = document.getElementById('game');
 root.appendChild(modal);
}
