/*
 *  crazybioGE: CrazyBioComputing Game Engine
 *  Copyright (C) 2015  Jean-Christophe Taveau.
 *
 *  This file is part of crazybioGE
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
 *  along with crazybioGE.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * Authors:
 * Jean-Christophe Taveau
 */



'use strict';


/*********************
 * @class Dialog
 *
 *********************/
function Dialog(a_chat) {
  console.log('create');
  this.ID      = a_chat.ID;
  this.html    = a_chat.html    || '';
  this.widgets = a_chat.widgets || [];
  this.element = a_chat.element || null;
  this.people  = a_chat.people  || 'anna';
}


Dialog.prototype.update = function () {
  var button_html='';
  var str = this.html;
  console.log(this.ID);
  for (var i = 0; i < dialog[this.ID].widgets.length; i++ ) {
    button_html = this.createWidget(this.widgets[i]);
    str = str.replace(new RegExp('__'+this.widgets[i].type+'__'),button_html);
  }
  document.getElementById(this.element).innerHTML = str;

  // People
  var head = this.people;
  if (this.people === 'previous') {
    head = dialog[path[path.length - 2].ID ].people;
  }
  str='';
  switch (head) {
  case 'boy':
    str = '<img src="media/student_face.svg"></img></div>'
    break;
  case 'girl':
    str = '<div style="width:200px; overflow: hidden;"><img src="media/people.png"  style = "margin-left:-200px;" width="600px"></img></div>'
    break;
  case 'anna':
    str = '<div style="width:200px; overflow: hidden;"><img src="media/people.png"  style = "margin-left:-400px;" width="600px"></img></div>'
    break;
  }
  document.getElementById('people').innerHTML=str;


//DEBUG  logpath();
}

Dialog.prototype.createWidget = function (widget) {
  var str='';
  switch (widget.type) {
  case 'back':
    str += '<a class="right_button" href="javascript:void(0)" ';
    str += widget.event+'="checkAnswer(';
    str += '{ID:\''+this.ID+'\',type:\'back\'}';
    str += ')">'+widget.title+'</a>';
    break;
  case 'button':
    str += '<a class="right_button" href="javascript:void(0)" ';
    str += widget.event+'="checkAnswer(';
    str += '{ID:\''+this.ID+'\',type:\'button\'}';
    str += ')">'+widget.title+'</a>';
    break;
  case 'html':
    // Display message randomly
    str = widget.title[Math.floor(Math.random() * widget.title.length)];
    break;
  case 'numeric':
    str = '<input type="text" id="'+widget.id+'"  size="8" value="'+widget.title+'" onkeyup="this.value=this.value.replace(/[^\\d.]/,\'\')"></input>';
    break;
  case 'select':
    str = '<select id="'+widget.id+'" ';
    if (widget.event !== undefined) {
      str += widget.event+'="checkAnswer({ID:\''+this.ID+'\',type:\'select\',element:\''+widget.id+'\'})"';
    }
    str +='>';
    for (var i =0; i < widget.options.length; i++) {
      str += '<option value="'+widget.options[i]+'">'+widget.options[i]+'</option>';
    }
    str +='</select>';
    break;
  case 'submit':
    str += '<a class="right_button" href="javascript:void(0)" ';
    str += widget.event+'="checkAnswer(';
    str += '{ID:\''+this.ID+'\',type:\'submit\'}';
    str += ')">'+widget.title+'</a>';
    break;
  case 'text':
    str = '<input type="text" id="'+widget.id+'" size="8" value="'+widget.title+'"></input>';
    break;
  case 'value':
    break;
  default:
    // Do nothing
  }

  return str;
}


