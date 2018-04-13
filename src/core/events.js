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
 * Create a popup
 *
 * @author TODO
 */

 const NS = 'http://www.w3.org/2000/svg';

const createPopUp = (props) => {
  let modal = createElement('div');
  modal.setAttributeNS(null, 'id', props.id);
  modal.setAttributeNS(null,'class','modal');
  modal.setAttributeNS(null,'style', 'display : block');

  let modalContent = createElement('div');
  modalContent.setAttributeNS(null, 'class','modal-content');

  let modalHeader = createElement('div');
  modalHeader.setAttributeNS(null, 'class','modal-header');

  let span = createElement('span');
  span.setAttributeNS(null, 'class', 'close');
  span.setAttributeNS(null, 'style', 'display : none');
  span.textContent('X');

  let textHeader = createElement('h2');
  textHeader.textContent(props.features.popup.title);

  modalHeader.appendChild(span);
  modalHeader.appendChild(textHeader);
  modalContent.appendChild(modalHeader);

  let modalBody = createElement('div');
  modalBody.setAttributeNS(null, 'class', 'modal-body');
  modal.textContent(props.features.popup.content);

  modalContent.appendchild(modalBody);

  let modalFooter = createElement('div');
  modalFooter.setAttributeNS(null, 'class', 'modal-footer');
  modalContent.appendChild(modalFooter);

  modal.appendChild(modalContent);

  const popup = (node) => {
    let root = document.getElementById('modal');
    // TODO

    return root;
  }
}
