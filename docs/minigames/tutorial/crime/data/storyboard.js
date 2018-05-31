
// Storyboard
// Jean-Christophe Taveau
// Crazybiocomputing
// Feb 2015

"use strict";


var dialogs = {
'000' : {
  'ID'         : '000',
  'element'    : 'chat',
  'resources'  : 'detective_angry.svg',
  'html'       :  '<p>Hi!!...Need a coffee?</p><br></br>__button__',
  'widgets'     : [
      {
      'event'   : 'onclick',
      'type'    : 'button',
      'title'   : 'Next'
      }
  ],
  'goto'       : {'button':'00A'},
},
'00A' : {
  'ID'         : '00A',
  'element'    : 'chat',
  'people'     : 'girl',
  'html'     :
         '<p>In the previous chapter, we determined the overlaps (in dark blue, in the image, below) '+
         '... and now, we want to cut the dark blue regions, in order to extract the interesting parts of sequences (light blue) '+
         'and join them for the final assembly (in green)...</p>__button__',
  'widgets': [
    {
    'event'   : 'onclick',
    'type'    : 'button',
    'title'   : 'Next'
    }
  ],
  'goto'       : {'button':'001'},
},
'001' : {
  'ID'         : '001',
  'element'    : 'chat',
  'people'     : 'boy',
  'background' : 'background.png',
  'html'     :
         '<p>...In this case, Blast isn\'t very accurate...We need an exact pairwise local alignment tool like __select__ available in EMBOSS...</p>',
  'widgets': [
    {
    'id'      : 'tool',
    'event'   : 'onchange',
    'type'    : 'select',
    'options' : ['none','sixpack', 'wordcount', 'dottup', 'infoseq', 'needle', 'compseq', 'water', 'primersearch' ],
    'title'   : ''
    }
  ],
  'goto'       : {'none':'back','sixpack':'back','wordcount':'back','dottup':'back','infoseq':'back','needle':'back','compseq':'back','water':'004','primersearch':'back'},
},

'back' : {
  'ID'         : 'back',
  'element'    : 'chat',
  'people'     : 'previous',
  'html'       : '<p>__html__ __back__ </p>',
  'widgets'    : [
    {
    'type'  : 'back',
    'event' : 'onclick',
    'title' : 'Back'
    },
    {
    'type'  : 'html',
    'event' : '',
    'title' : ['Hmmm....problem with your mouse/keyboard?<br></br>',
               'Are you serious?....<br></br>',
               'Ohhh no!!<br></br>',
               'Wrong answer, no neuron available??<br></br>',
               'Aaarrrrghhh!! @#!!...<br></br>',
               'I can\'t believe it ?!?...<br></br>'
              ]
    }
  ],
  'goto'       : {},
},

'004' : {
  'ID'         : '004',
  'element'    : 'chat',
  'people'     : 'girl',
  'background' : '',
  'html'     :
         '<p>... Good!! <b>water</b> is what we need. Now, to assemble the five reads, you have to compute the complementary sequence for the required reads with '+
         '__text__ </p> __submit__</p>',
  'widgets': [
    {
    'id'      : 'tool2',
    'type'    : 'text',
    'event'   : 'none',
    'title'   : 'EMBOSS Tool?',
    'answer'  : 'revseq',
    },
    {
    'type'    : 'submit',
    'event'   : 'onclick',
    'title'   : 'Next'
    },
  ],
  'goto'       : {'0':'back','1':'006'},
},

'005' : {
  'ID'         : '005',
  'element'    : 'chat',
  'people'     : 'girl',
  'background' : '',
  'html'       :
         '<ul>'+
         '<li>Read#1 <b>Reverse</b>: From 1 To 540</li>'+
         '<li>Read#5 <b>Forward</b>: From <b>103</b> To <b>504</b></li>'+
         '<li>Read#3 <b>Reverse</b>: From <b>157</b> To <b>408</b></li>'+
         '<li>Read#2 <b>Forward</b>: From <b>55</b> To <b>444</b></li>'+
         '<li>Read#4 <b>Forward</b>: From <b>148</b> To <b>567</b></li>'+
         '</ul>'+
         '<p>Congratulations!!! Now, extract these regions with an EMBOSS Tool, and with your favourite text editor, '+
         'concatenate them to build the assembly in FASTA format.</p>'+
         '<p>The secret word corresponds to the length of the assembly followed by the extension <b>.php</b></p>',
  'widgets'    : [],
  'goto'       : {},
},

'006' : {
  'ID'         : '006',
  'element'    : 'chat',
  'people'     : 'boy',
  'background' : 'background.png',
  'html'     :
         '<p>From the results obtained with <b>water</b>, indicate the extracted regions in order to merge them later...'+
         '<ul><li>Read#1 __select__: From 1 To 540</li></ul>__submit__',
  'widgets': [
    {
    'id'      : 'q1',
    'event'   : '',
    'type'    : 'select',
    'options' : [' ','Forward','Reverse'],
    'answer'  : 'Reverse',
    'title'   : ''
    },
    {
    'event'   : 'onclick',
    'type'    : 'submit',
    'title'   : 'Next'
    },

  ],
  'goto'       : {'0':'back','1':'007'},
},

'007' : {
  'ID'         : '007',
  'element'    : 'chat',
  'people'     : 'boy',
  'background' : '',
  'html'     :
         '<p>From the results obtained with <b>water</b>, indicate the extracted regions in order to merge them later...'+
         '<ul>'+
         '<li>Read#1 <b>Reverse</b>: From 1 To 540</li>'+
         '<li>Read#5 __select__: From __numeric__ To __numeric__</li>'+
         '</ul>__submit__',
  'widgets': [
    {
    'id'      : 'q1',
    'type'    : 'select',
    'options' : [' ','Forward','Reverse'],
    'answer'  : 'Forward',
    },
    {
    'id'      : 'q2',
    'type'    : 'numeric',
    'title'   : '0',
    'answer'  : 103,
    },
    {
    'id'      : 'q3',
    'type'    : 'numeric',
    'title'   : '0',
    'answer'  : 504,
    },
    {
    'event'   : 'onclick',
    'type'    : 'submit',
    'title'   : 'Next'
    },

  ],
  'goto'       : {'0':'back','1':'back','2':'back','3':'008'},
},


'008' : {
  'ID'         : '008',
  'element'    : 'chat',
  'people'     : 'boy',
  'background' : '',
  'html'     :
         '<p>From the results obtained with <b>water</b>, indicate the extracted regions in order to merge them later...'+
         '<ul>'+
         '<li>Read#1 <b>Reverse</b>: From 1 To 540</li>'+
         '<li>Read#5 <b>Forward</b>: From <b>103</b> To <b>504</b></li>'+
         '<li>Read#3 __select__: From __numeric__ To __numeric__</li>'+
         '</ul>__submit__',
  'widgets': [
    {
    'id'      : 'q1',
    'type'    : 'select',
    'options' : [' ','Forward','Reverse'],
    'answer'  : 'Reverse',
    },
    {
    'id'      : 'q2',
    'type'    : 'numeric',
    'title'   : '0',
    'answer'  : 157,
    },
    {
    'id'      : 'q3',
    'type'    : 'numeric',
    'title'   : '0',
    'answer'  : 408,
    },
    {
    'event'   : 'onclick',
    'type'    : 'submit',
    'title'   : 'Next'
    },

  ],
  'goto'       : {'0':'back','1':'back','2':'back','3':'009'},
},

'009' : {
  'ID'         : '009',
  'element'    : 'chat',
  'people'     : 'boy',
  'background' : '',
  'html'     :
         '<p>From the results obtained with <b>water</b>, indicate the extracted regions in order to merge them later...'+
         '<ul>'+
         '<li>Read#1 <b>Reverse</b>: From 1 To 540</li>'+
         '<li>Read#5 <b>Forward</b>: From <b>103</b> To <b>504</b></li>'+
         '<li>Read#3 <b>Reverse</b>: From <b>157</b> To <b>408</b></li>'+
         '<li>Read#2 __select__: From __numeric__ To __numeric__</li>'+
         '</ul>__submit__',
  'widgets': [
    {
    'id'      : 'q1',
    'type'    : 'select',
    'options' : [' ','Forward','Reverse'],
    'answer'  : 'Forward',
    },
    {
    'id'      : 'q2',
    'type'    : 'numeric',
    'title'   : '0',
    'answer'  : 55,
    },
    {
    'id'      : 'q3',
    'type'    : 'numeric',
    'title'   : '0',
    'answer'  : 444,
    },
    {
    'event'   : 'onclick',
    'type'    : 'submit',
    'title'   : 'Next'
    },

  ],
  'goto'       : {'0':'back','1':'back','2':'back','3':'010'},
},

'010' : {
  'ID'         : '010',
  'element'    : 'chat',
  'people'     : 'boy',
  'background' : '',
  'html'     :
         '<p>From the results obtained with <b>water</b>, indicate the extracted regions in order to merge them later...'+
         '<ul>'+
         '<li>Read#1 <b>Reverse</b>: From 1 To 540</li>'+
         '<li>Read#5 <b>Forward</b>: From <b>103</b> To <b>504</b></li>'+
         '<li>Read#3 <b>Reverse</b>: From <b>157</b> To <b>408</b></li>'+
         '<li>Read#2 <b>Forward</b>: From <b>55</b> To <b>444</b></li>'+
         '<li>Read#4 __select__: From __numeric__ To __numeric__</li>'+
         '</ul>__submit__',
  'widgets': [
    {
    'id'      : 'q1',
    'type'    : 'select',
    'options' : [' ','Forward','Reverse'],
    'answer'  : 'Forward',
    },
    {
    'id'      : 'q2',
    'type'    : 'numeric',
    'title'   : '0',
    'answer'  : 148,
    },
    {
    'id'      : 'q3',
    'type'    : 'numeric',
    'title'   : '0',
    'answer'  : 567,
    },
    {
    'event'   : 'onclick',
    'type'    : 'submit',
    'title'   : 'Next'
    },

  ],
  'goto'       : {'0':'back','1':'back','2':'back','3':'005'},
},

}

var characters = {
  'detective': {
    'ID'        : 'detective',
    'resources' : 'face.jpg',
    'actions'   : [
      {event: 'explore', html : 'A tall man...'},
    ],
    'dialogs'   : {
      'are_you_serious' : dialogs['000']
    }
  },
  'girl': {

  },
  'anna': {

  }
}

var objects = {
  'electroshock_weapon' : {
    'ID'         : 'electroshock_weapon',
    'resources'  : 'taser.jpg',
    'actions'    : [
      {
        'event'  :'grab',
        'html'   :'You got it...',
        'trigger': 'hasElectroshockWeapon' // add flag
      }
    ]
  },
  'blue_bird' : {
    'ID'         : 'blue_bird',
    'resources'  : 'blueBird.jpg',
    'actions'    : [
      {
        'event':'grab',
        'html':'You are too slooowww...'
      },
      {
        'event':'explore',
        'html': ['This is a blue bird...','It\'s so peaceful','Don\'t try to harass it!?!']
      },
      {
        'event'    : 'combine',
        'with'     : 'ElectroshockWeapon',
        'html'     : [
          'You set the taser to \'Low\' and... __next__ ...shot the bird. __next__ Don\'t try to kill it. It\'s so beautiful...',
          'The bird is too fast for you. He flew away...'
          ],
        'trigger'  : 'isFrozen' // add flag
      },
    ]
  },
  'blue_bird_frozen' : {
    'ID'         : 'blue_bird_frozen',
    'resources'  : 'blueBirdFrozen.jpg',
    'actions'    : [
      {
        'event':'explore',
        'html': ['The blue bird is burnt and ... __next__ is made of a steel??? __next__ It\'s a robot !?!','Don\'t try to harass it!?!']
      },
      {
        'event'   :'use',
        'html'    : 'It\'s a robot. Under its wing, a button is hidden... You push it',
        'trigger' : 'openBird'  // add flag
      },
    ]
  }

}

var effects = {
  'hasElectroshockWeapon': {
    'event': 'inventory',
  },
  'isFrozen': {
    'event': 'inventory',
  },
  'openBird': {
    'event'     : 'video',
    'resources' : 'openBird.mp4'
  },
}


var scenes = {
  'S000' : {
    ID         : 'S000',
    background : 'manoir1280x720.jpg',
    characters : [
      {
        'ID'       : 'detective',
        'geometry' : [535,500,150,150], // Only four values -> Rectangle
        'targets'  : [characters['detective'] ],
      },
    ],
    objects    : [
      {
        'ID'       : 'tree',
        'geometry' : [535,500,150], // Only three values (X,Y,radius) -> Circle
        'targets'  : [objects['tree'] ],
      },
      {
        'ID'       : 'batteries',
        'geometry' : [535,500,150,150], // Only four values (X,Y,W,H) -> Rectangle
        'targets'  : {'action':'dialog','target':'000'},
      },
      {
        'ID'       : 'blue_bird',
        // More than four values -> Polygon
        'geometry' : [100,100,200,300,100,100],
        /**
         *  if (status.indexOf(isFrozen) != -1 ) {
         *    target = objects['blue_bird_frozen'];
         *  }
         *  else {
         *    target = objects['blue_bird'];
         *  }
          **/
        'condition': ['isFrozen',objects['blue_bird_frozen'],objects['blue_bird'] ]
      }
    ],
    exits     : [

    ],

  }
}

console.log(scenes['S000'].objects[2].condition[1]);
console.log(objects['detective'].actions[1]);

//
// End of storyboard
//
