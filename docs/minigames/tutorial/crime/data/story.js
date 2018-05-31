// Story
// Jean-Christophe Taveau
// Crazybiocomputing
// Feb 2015


var path=[];

function initStory(first) {
  document.getElementById('the_game').style.height = Math.floor(document.body.clientWidth / 16.0 * 9.0) + 'px';
  document.getElementById('dialog').style.display = 'none';
  path.push( {
    'ID': first,
    'answers':[]
  });

  console.log('create...'+dialog.length);
  for (var d in dialog) {
    console.log('create...');
    var chat = new Dialog(dialog[d]);
    dialog[d.ID]= chat;
    console.log(chat);
    console.log(dialog[d.ID]);
  }
}


function checkAnswer(options) {
  var node = {};
  node.answers = [];
  node.ID = '_';

  switch (options.type) {
  case 'back':
    node.ID = path[path.length - 2].ID;
    break;
  case 'button':
    node.ID = dialog[options.ID].goto['button'];
    break;
  case 'select':
    answer = document.getElementById(options.element).value;
    node.ID = dialog[options.ID].goto[answer];
    node.answers.push(answer);
    break;
  case 'submit':
    var w = dialog[options.ID].widgets;
    var total = 0;
    for (var i=0; i < w.length; i++) {
      var answer = getAnswer(w[i]);
      if (answer[0] == 1) {
        node.answers.push(answer[1]);
      }
      total +=answer[0];
    }
    console.log('answer '+total);
    if (dialog[options.ID].goto[total] != undefined) {
      node.ID = dialog[options.ID].goto[total];
    }
    else {
      node.ID = dialog[options.ID].goto['0'];
      node.answers.push('wrong');
    }
    break;
  case 'value':
    answer = document.getElementById(options.element).value;
    node.ID = dialog[options.ID].goto[answer];
    node.answers.push(answer);
    console.log(answer + ' ' + next_node);
    break;
  default:
    alert('Wrong path');
  }

  if (node.ID != '_') {
    path.push(node );
  }

  updateDisplay(node.ID);

}

function getAnswer(widget) {
  var answer=0;
  var value;

  switch (widget.type) {
  case 'numeric':
    value = parseFloat(document.getElementById(widget.id).value);
    answer = ( value == widget.answer) ? 1 : 0;
    break;
  case 'select':
    value = document.getElementById(widget.id).value;
    answer = ( value === widget.answer) ? 1 : 0;
    break;
  case 'text':
    value = document.getElementById(widget.id).value;
    answer = ( value === widget.answer) ? 1 : 0;
    console.log(value + ' '+widget.answer+' '+answer);
    break;
  default:
    // Do nothing
  }

  return [answer,value];
}

function updateDisplay(ID) {
  // Background
  var background = '';
  if (scenes[ID].background != undefined && scenes[ID].background.length > 1) {
    background = createBackground(scenes[ID]);
  }
  document.getElementById('scene').innerHTML=background;

}

function sendMessage(type,ID) {
  console.log(type+' '+chat);
  console.log(dialog[ID]);
  switch (type) {
    case 'chat':
      dialog[ID].update();
      break;
  }
}

function createBackground(scene) {
  var svg='<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" id="svgBckgrnd">'+
          '<image width="1280" height="720" xlink:href="'+scene.background+'"></image>';
  for (var action of scene.actions) {
    console.log(action);
    svg += '<a xlink:href="javascript:void(0)" onclick="sendMessage(\''+action.action.event+'\',\''+action.action.ID+'\')">';
    if (action.area.length == 4) {
      svg+= '<rect x="'+action.area[0]+'" y="'+action.area[1]+'" fill="#fff" opacity="0.0" width="'+action.area[2]+'" height="'+action.area[3]+'" />';
    }
    else {
      svg+= '<polygon points="'+action.area.toString()+'" fill="#fff" opacity="0.0" />';
    }
    svg+='</a>';

  }
  svg+='</svg>';
  return svg;

}

function logpath() {
  var str='<ul>';
  for (var i in path) {
    str +=  '<li>'+path[i].ID + '[';
    for (var j in path[i].answers) {
      str += path[i].answers[j] +', ';
    }
    str += '] </li>';
  }
  str +='</ul>';
  document.getElementById('log').innerHTML = str;

}

/*********************
 *
 *
 *********************/
function Dialog(a_chat) {
  console.log('create');
  this.html    = a_chat.html    || '';
  this.widgets = a_chat.widgets || [];
  this.element = a_chat.element || null;
  this.people  = a_chat.people  || 'anna';
}


Dialog.prototype.update = function () {
  var button_html='';
  var str = this.html;
  for (var i = 0; i < dialog[ID].widgets.length; i++ ) {
    button_html = this.createWidget(ID,this.widgets[i]);
    str = str.replace(new RegExp('__'+this.widgets[i].type+'__'),button_html);
  }
  document.getElementById(this.element).innerHTML = str;

  // People
  var head = this.people;
  if (this.people === 'previous') {
    head = dialog[path[path.length - 2].ID ].people;
  }
  switch (head) {
  case 'boy':
    people = '<img src="anna.svg"></img></div>'
    break;
  case 'girl':
    people = '<div style="width:200px; overflow: hidden;"><img src="../../img/people.png"  style = "margin-left:-200px;" width="600px"></img></div>'
    break;
  case 'anna':
    people = '<div style="width:200px; overflow: hidden;"><img src="../../img/people.png"  style = "margin-left:-400px;" width="600px"></img></div>'
    break;
  }
  document.getElementById('people').innerHTML=people;


//DEBUG  logpath();
}

Dialog.prototype.createWidget = function (ID,widget) {
  var str='';
  switch (widget.type) {
  case 'back':
    str += '<a class="right_button" href="javascript:void(0)" ';
    str += widget.event+'="checkAnswer(';
    str += '{ID:\''+ID+'\',type:\'back\'}';
    str += ')">'+widget.title+'</a>';
    break;
  case 'button':
    str += '<a class="right_button" href="javascript:void(0)" ';
    str += widget.event+'="checkAnswer(';
    str += '{ID:\''+ID+'\',type:\'button\'}';
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
      str += widget.event+'="checkAnswer({ID:\''+ID+'\',type:\'select\',element:\''+widget.id+'\'})"';
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
    str += '{ID:\''+ID+'\',type:\'submit\'}';
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
