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
 * @author GONCALVES FRASCO Charlotte
 */

const createPopUp = (props) => {
  let modal = document.createElement('div');
  modal.id = 'modal';
  modal.className = 'modal';

  let modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  let modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';

  let span = document.createElement('span');
  span.className = 'close';
  //span.setAttributeNS(null, 'style', 'display : none');
  span.textContent = 'X';

  let textHeader = document.createElement('h2');
  textHeader.textContent = props.features.popup.title;

  modalHeader.appendChild(span);
  modalHeader.appendChild(textHeader);
  modalContent.appendChild(modalHeader);

  let modalBody = document.createElement('div');
  modalBody.className = 'modal-body';
  modalBody.textContent = props.features.popup.content;

  modalContent.appendChild(modalBody);

  let modalFooter = document.createElement('div');
  modalFooter.className = 'modal-footer';
  modalContent.appendChild(modalFooter);

  modal.appendChild(modalContent);
 
 let root = document.getElementById('game');
 root.appendChild(modal);
}
