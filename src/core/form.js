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

class Form extends Machine {
  constructor (id,className,description) {
    super(id,className,description);
  }
  
  static create(props) {
    let form =  new Form(props.id,props.class,props.description,props.parent)
    form.append('article')
      .display(props.display)
      .form(props.features)
      .action(props.action)
      .draggable(props.features.draggable)
      .exit(props.features.exit);

    return form;
  }
  
  /**
   * Create the 'form' of this machine.
   *
   * @author Jean-Christophe Taveau
   **/
  form(featuresProps) {
    // Set CSS style
    const setStyle = (element,props = {}) => {
      for (let key in props) {
        element.style[key] = props[key];
      }
    }
    
    // Get fields answers
    const getAnswers = (text) => {
      // #1: Extract the values between delimiters '@...@'
      let matches = text.match(/@(.+?)@/g);
      // #2: Store the answer(s)
      return matches.map( a_match => {
        let v = a_match.slice(1,-1).split(/[=:]/);
        console.log(v);
        // v[0] num(erical) or txt
        // v[1] value or deferred
        return (v[1] === 'deferred') ? CRAZYBIOGAME.deferred[v[2]] : v[1];
      });
      
    }
    
    // Step #0: Store some properties
    this.features.exit = featuresProps.exit || '';
    
    // Step #1: Create the HTML5 element(s) from features.form
    let sections = ['header','body','footer'];
    
    let form = this.element;
    form.className += ' form';
    setStyle(form,featuresProps.style.form);
    
    sections.forEach( (s) => {
      if (featuresProps.form[s] !== undefined) {
        let child = document.createElement(s);
        setStyle(child,featuresProps.style[s]);
        child.innerHTML = featuresProps.form[s].join('');
        // TODO Must be improved...
        if (s === 'body') {
          this.answers = getAnswers(child.innerHTML);
          child.innerHTML = child.innerHTML.replace(/@(.+?)@/g,'<input type="text" placeholder="0" size="4"></input>');
          console.log('regexp');
          let regex = /(\[\[(__(.+?)__)\]\])/g;
          let result = child.innerHTML;
          while ( (result = regex.exec(result)) ) {
              console.log(result);
              console.log(result.index);
          }
          regex = /\[\[(__(.+?)__)\]\]/g;

          // The same for buttons
          // TODO
          // <div class="buttongroup" style="float:right">
          // <button type="submit">OK</button>
          // <button type=\"reset\">Reset</button>
          // </div>
        }
        form.appendChild(child);
      }
    });

    // Step #2: Extract the buttons from the form
    // TODO
    const findDeep = (el,name) => {
      console.log(el);
      let found;
      if (el.className === name) {
        found = el;
      }
      else if (el.children !== undefined) {
        for (let child of Array.from(el.children)) {
          found = findDeep(child,name);
        }
      }
      return found;
    }
    
    let buttons = findDeep(this.element,'buttongroup');

    // Step #3: Add the actions 
    console.log(buttons);
    Array.from(buttons.children).forEach( button => {
      // Block draggable if any
      button.addEventListener('mousedown', ev => ev.stopPropagation(),false );
      button.dataset.parent = `node_${this.id}`;
      // Add event when click button(s)
      if (button.type === 'submit') {
        button.addEventListener('click', ev => {
          ev.stopPropagation();
          let values = Array.from(document.querySelectorAll(`#${ev.target.dataset.parent} input`)).map( (input) => input.value);
          console.log(values);
          console.log(this.answers);
          if (this.answers.every ( (answer,i) => answer === parseFloat(values[i]) ) === true) {
            triggerAction('onsuccess',this);
          }
        },true);
      }
    });
    console.log(buttons);
        
    return this;
  }
}

/**
 * Create a new `form` machine using a `GapFill` mode
 *
 * @author P. Wintringer
 * @author Jean-Christophe Taveau
 **/
const createForm = (props) => {
  let form = Form.create(props);
  return form;
  
  /*
    let element = document.createElement('div');
  element.id = props.id;
  element.className = "formgapfill";
  
  createPopUp(props,"gapfill");
  let modal = document.getElementById("gapfill");
  let closeB = document.getElementsByClassName('close'+"gapfill")[0];
  button.onclick = function() {
    modal.style.display = "block";
  }
  closeB.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  }
  let myForm = document.createElement('form');
  myForm.method = "post";
  myForm.onsubmit = return validateForm();
  let field = document.createElement('input');
  field.setAttribute('type',"text");
  let buttonS = document.createElement('input');
  buttonS.setAttribute('type',"submit");
  
function validateForm() {
    let var x = document.forms["myForm"].value;
    if (x == "") {
        alert("All fields must be input.");
        return false;
    }
 }*/

  //function download(url){
  //  window.location.href = url;
  //}
  //document.getElementById("machine").addEventListener("click",download(img.src));

};


/**
 * Create a new `form` machine using a `Drag and Drop` mode
 *
 * @author P.Wintringer
 */
const createFormDragDrop = (props) => {
  let element = document.createElement('div');
  element.id = props.id;
  element.className = "formDnd";
  
  createPopUp(props,"fdnd");
  let modal = document.getElementById("fdnd");
  let closeB = document.getElementsByClassName('close'+"fdnd")[0];
  button.onclick = function() {
    modal.style.display = "block";
  }
  closeB.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  }
  
  /*let tile = document.getElementByClassName('sprite'); // sprite as tiles
  let dropfield = document.createElement('div'); // tiles can only be dropped in fields
  dropfield.setAttribute('class','field');
  tile.setAttribute('draggable', true);
  tile.addEventListener('dragstart',drag_start);
  tile.addEventListener('dragend',drag_end);
  let const fields = document.getElementByClassName('field');
  for (let const fieldelem of fields){
    field.addEventListener('dragover',drag_over);
    field.addEventListener('drop',drop);
  }
  
  function drag_start(){
    this.className += " held";
    setTimeout(()=>this.className="invisible", 0);
  }
  
  function drag_end() {
    this.className -= " held";
    //this.className = 'sprite'; //if line above doesn't work
  }
  
  function drop(){
    this.className = "field"
    this.append(tile);
  }
  
  function drag_over(event) {
    event.preventDefault();
    return false;
  } */
  
  return element;
};


/**
 * Create a new `form` machine using a `Drop-down` mode
 *
 * @author P. Wintringer
 */
const createFormDropDown = (props) => {
  let element = document.createElement('div');
  element.id = props.id;
  element.className = "formDropdown";
  
  createPopUp(props,"dropdown");
  let modal = document.getElementById("dropdown");
  let closeB = document.getElementsByClassName('close'+"dropdown")[0];
  button.onclick = function() {
    modal.style.display = "block";
  }
  closeB.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  }
  
  /*let dropdown = element.createElement('button'); //creation of the drop down menu
  dropdown.id = ddm;
  dropdown.className = dropbtn;
  dropdown.onClick = unroll();
  
  let content = element.createElement('div');
  content.className = ddmcontent;
  //add line to fetch content of ddm
  content.display = block; //hidden unless clicked
  
  function unroll(){
    document.getElementById("ddm").classList.toggle("show");
  }
  
  window.onclick = function(event) { //
  if (!event.target.matches('.dropbtn')) {
    let dropdowns = document.getElementsByClassName("ddmcontent");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}*/

  return element;
};


