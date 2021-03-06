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

class Lock extends Machine {

  constructor (id,className,description) {
    super(id,className,description);
  }
  
  static create(props) {
    return new Lock(props.id,props.class,props.description,props.parent)
      .append('article')
      .display(props.display)
      .draggable(props.features.draggable)
      .exit(props.features.exit);
  }
}


/**
 * Lock displayed as a Text Field
 *
 * @author Charlotte GONCALVES FRASCO
 * @author Hans SCHRIEKE
 * @author Jean-Christophe Taveau
 */
const createLockText = (props) => {

  let lock = Lock.create(props);
  lock.element.className = "machine locktext";

  // TODO - New syntax of form
  let actionProps = {}
  actionProps.onclick = {};
  actionProps.onclick['popup'] = {
    header: 'Unlock the game...',
    body: [`Type the code... to unlock the game<br>@${this.exitCode}@__ok__ <br>` ],
    footer: 'Lock&nbsp;'
  };
  
  // create the popup content + events
  let container = document.createElement('div');
  container.id = 'lock-container';
  let paragraph = document.createElement('p'); paragraph.appendChild(document.createTextNode('Type the code... to unlock the game'));
  let input = document.createElement('input');
  input.id = 'lock-input';
  input.type = 'text';
  input.placeholder = 'Type the code';

  let submitbutton = document.createElement('button');
  submitbutton.id = 'button';
  submitbutton.textContent = "OK";
  submitbutton.type = "submit";

  submitbutton.onclick = () => {
    let val = document.getElementById('lock-input').value;
    console.log(val,lock.exitCode);
    nextGame(val,lock);
  }
  
  // Add all the elements
  container.appendChild(paragraph);
  container.appendChild(input);
  container.appendChild(submitbutton);
  actionProps.onclick.popup.contentDOM = container;
  lock.actionable(actionProps);
  
  return lock;
};

/**
 * Lock displayed as a Numerical Field
 * @author 
 */
const createLockNumerical = (props) => {
// TODO Add numerical checking onchange event
  return createLockText(props);
};


/**
 * Lock displayed as a n-Digit Lock
 */
const createLockDigit = (nDigits) => (props) => {
  let element = document.createElement('div');
  element.id = props.id;
  element.className = "lockDigit";

  // TODO

  return element;
};

/**
 * Lock displayed as a keypad
 */
const createLockKeypad = (props) => {
  let element = document.createElement('div');
  element.id = props.id;
  element.className = "lockKeypad";

  // TODO

  return element;
};

/**
 * Lock displayed as a numpad
 * @author P. Wintringer
 *
const createLockNumpad = (props) => {
  let form = document.createElement('form');
  let element = document.createElement('div');
  element.id = props.id;
  element.className = "lockNumpad";
  //let evt = document.createEvent("MouseEvents");
  //evt.initMouseEvent("click");
  let text = document.getElementById("textfield");
  let table = document.createElement('table');
  let button1 = document.createElement('input')
  button1.setAttribute('type','button');
  button1.setAttribute('value',1);
  button1.onClick = AddValueToTextField(value);
  table.appendChild(button1);
  let button2 = document.createElement('input');
  button2.setAttribute('type','button');
  button2.setAttribute('value',2);
  button2.onClick = AddValueToTextField(value);
  table.appendChild(button2);
  let button3 = document.createElement('input');
  button3.setAttribute('type','button');
  button3.setAttribute('value',3);
  button3.onClick = AddValueToTextField(value);
  table.appendChild(button3);
  let button4 = document.createElement('input');
  button4.setAttribute('type','button');
  button4.setAttribute('value',4);
  button4.onClick = AddValueToTextField(value);
  table.appendChild(button4);
  let button5 = document.createElement('input');
  button5.setAttribute('type','button');
  button5.setAttribute('value',5);
  button5.onClick = AddValueToTextField(value);
  table.appendChild(button5);
  let button6 = document.createElement('input');
  button6.setAttribute('type','button');
  button6.setAttribute('value',6);
  button6.onClick = AddValueToTextField(value);
  table.appendChild(button6);
  let button7 = document.createElement('input');
  button7.setAttribute('type','button');
  button7.setAttribute('value',7);
  button7.onClick = AddValueToTextField(value);
  table.appendChild(button7);
  let button8 = document.createElement('input');
  button8.setAttribute('type','button');
  button8.setAttribute('value',8);
  button8.onClick = AddValueToTextField(value);
  table.appendChild(button8);
  let button9 = document.createElement('input');
  button9.setAttribute('type','button');
  button9.setAttribute('value',9);
  button9.onClick = AddValueToTextField(value);
  table.appendChild(button9);
  let buttonC = document.createElement('input');
  buttonC.setAttribute('type','button');
  buttonC.setAttribute('value','C');
  buttonC.onClick = SupprValueInTextField();
  table.appendChild(buttonC);
  let button0 = document.createElement('input');
  button0.setAttribute('type','button');
  button0.setAttribute('value', 0);
  button0.onClick = AddValueToTextField(value);
  table.appendChild(button0);
  let buttonV = document.createElement('input');
  buttonV.setAttribute('value','V');
  buttonV.type = "submit";
  table.appendChild(buttonV);

  function AddValueToTextField(val)
    {document.getElementByID(text).value += val;}

  function SupprValueInTextField()
    {document.getElementByID(text).value -= 1;}

  return element;
};
*/
