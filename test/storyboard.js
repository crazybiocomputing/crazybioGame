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

/*
 * Test of a scene
 */

 "use strict";

const officeRoom = [
  {
    ID: 0,
    type: 'scene',
    new_nodes: [11,21,35,42,67],
    description: 'A locked office ...', // For Debug only
    help: ['Hint #1','Hint #2','Hint #3'],
    graphics   : {
      path     : 'assets/background.png',
      elements  : ['background'],  // all the actors in the path.
      visibility: 'background',  // two actors visible: carpet and coin.
    }
  },
  {
    ID: 11,
    type: 'item',
    description: 'A key...', // For Debug only
    geometry: [301,590,22], // Only three values (X,Y,radius) -> Circle
    graphics   : {
      path     : 'assets/key.svg',
      elements  : ['background','box','box-top'],  // all the actors in the path.
      visibility: 'background,box,box-top',  // two actors visible: carpet and coin.
    }
  },
  {
    ID: 16,
    type: 'item',
    description: 'A 10cm long electrical wire...',
  },
  {
    ID: 21,
    new_nodes: [9372],
    type: 'lock',
    description: 'The exit door...', 
  },
  {
    ID: 25,
    type: 'cutscene',
    description: 'Well done, you have restored the electricity...', 
    del_nodes: [16,46,67,42],
    new_nodes: [48], // = 42 + modifer (+6)
    modifier: {type: 'source',value: 6} // Unused ???
  },
  {
    ID: 35,
    type: 'target',
    description: 'A locked cabinet',
    graphics   : {
      path     : 'assets/cabinet.svg',
      elements  : ['background','box','box-top'],  // all the actors in the path.
      visibility: 'background,box,box-top',  // two actors visible: carpet and coin.
    }
  },
  {
    ID: 42,
    type: 'target',
    description: ['A TV','...There is no electricity'], //  Multi-line description. Need to click again for the next one
    graphics   : {
      path     : 'assets/tv.svg',
      elements  : ['background'],  // all the actors in the path.
      visibility: 'background',  // two actors visible: carpet and coin.
    }
  },
  {
    ID: 46,
    type: 'target',
    new_nodes: [16],
    description: 'Unlocked Cabinet',
    remove:[11,35],
    actions   : [
      {
        'event'  :'explore',
        'html'   : ['An empty cabinet...','Maybe, need a better inspection'],
      }
    ],
    graphics   : {
      path     : 'assets/opencabinet.svg',
      elements  : ['background','box','box-top'],  // all the actors in the path.
      visibility: 'background,box,box-top',  // two actors visible: carpet and coin.
    }
  },
  {
    ID: 48,
    type: 'scene',
    description: 'The TV screen is on...',
    remove: [25,42],
    graphics   : {
      path     : 'assets/tv.svg',
      elements  : ['background','message'],  // all the actors in the path.
      visibility: 'background,message',  // two actors visible: carpet and coin.
    }
  },
  {
    ID: 67,
    type: 'target',
    description: ['A grid with pins...','I need a connector...'], // Multiple descriptions
        actions   : [
      {
        'event'  :'explore',
        'html'   : '???'
      }
    ],
    graphics   : {
      path     : 'assets/grid.svg',
      elements  : ['background'],  // all the actors in the path.
      visibility: 'background',  // two actors visible: carpet and coin.
    }
  },
  {
    ID: 83,
    type: 'machine',
    description: 'Connectors',
    modifier: {type: 'target',value: 9},
    graphics   : {
      path     : 'assets/grid.svg',
      elements  : ['background','wire'],  // all the actors in the path.
      visibility: 'background,wire',  // two actors visible: carpet and coin.
    }
  },
  {
    ID: 9372,
    type: 'exit', // A special lock
    description: 'Digital code',
    graphics   : {
      path     : 'assets/grid.svg',
      elements  : ['background','box','box-top'],  // all the actors in the path.
      visibility: 'background,box,box-top',  // two actors visible: carpet and coin.
    }
  }
  
];


(function() {
  console.log('scene officeRoom');
  
  var dialogs = {
  '000' : {
    'html'  : [
      '__player__ Hi!',
      '__people__ Hi! ... Hmm I\'m tired... Need a coffee but I\'ve lost my last coin',
    ]
  },
  '010' : {
    'html'  : [
      '__player__ A coffee for you',
      '__people__ Thanks a lot...',
    ]
  }

}



var geometries = [
      {
        'ID'       : 'student',
        /* x="512.85712" y="42.857143" width="177.1429" height="321.42859"  */
        'geometry' : [512,42,177,321], // Only four values -> Rectangle
      },
      {
        'ID'       : 'coffee',
        // More than four values -> Polygon
        'geometry' : ['m',796.29607,262.46217, 45.161,12.06056, -3.03046,41.41625, -43.43656,-12.12183],
      },
      {
        'ID'       : "coffee_slot",
        'geometry' : ['m',865.70073,183.10392, 20.20305,5.05076, -4.04061,60.60916, -19.1929,-5.05077],

      },
      {
        'ID'       : 'coffee_machine',
        // More than four values -> Polygon
        'geometry' : ['m',784,81,77,16,-7,175, -74,-20],
      },
      {
        'ID'       : 'carpet',
        /* sodipodi:cx="301.02545" cy="590.7005" rx="22.223356" ry="22.223356" */
        'geometry' : [301,590,22], // Only three values (X,Y,radius) -> Circle
      },
      /**
      {
        'ID'       : 'box1',
        'geometry' : [535,500,150,150], // Only four values (X,Y,W,H) -> Rectangle
      },
      **/
      {
        'ID'       : 'sofa',
        // More than four values -> Polygon
        'geometry' : [
          'm',
          76.771593,376.54813,
          240.416307,-88.89342,
          115.15739,48.48732,
          2.0203,78.7919,
          -240.4163,96.97465,
          -113.137086,-48.48733
        ]
      },
      {
        'ID'       : 'box1',
        // More than four values -> Polygon
        'geometry' : [
          'm',
          1036.4165,429.07607,
          29.2944,-16.66752,
          35.8605,11.61675,
          -4.0407,23.23351,
          -28.2842,15.15229,
          -36.3655,-12.62691
        ]
      },
      {
        'ID'       : 'box2',
        // More than four values -> Polygon
        'geometry' : [
          'm',
          1121.2693,338.66741,
          31.3148,-16.66751,
          36.8705,12.6269,
          -3.5355,24.24366,
          -27.7792,13.13199,
          -37.8807,-10.6066
        ]
      },
      {
        'ID'       : 'box3',
        // More than four values -> Polygon
        'geometry' : [
          'm',
          1074.2972,223.51002,
          2.0203,0.50508,
          45.4569,9.09138,
          -4.0406,42.4264,
          -29.2944,15.15229,
          -37.8808,-9.59645,
          5.0508,-46.46701
        ]
      },
      {
        'ID'         : 'box4',
        // More than four values -> Polygon
        'geometry'   : [
          'm',
          1126.8252,196.74098,
          32.8299,-14.14213,
          44.9518,11.11167,
          -5.0508,37.37565,
          -31.3147,14.64721,
          -44.9518,-11.11168
        ]
      },
      {
        'ID'       : 'window',
        // More than four values -> Polygon
        'geometry' : [
          'M',
          5.7142853,50,
          212.85714,2.8571425,
          410,2.8571425,
          417.14286,180,
          4.2857143,311.42857
        ]
      },
      {
        'ID'       : 'table',
        'display'  : 'none',
        // More than four values -> Polygon
        'geometry' : ['M',250,501.42857, 472.85714,407.14286, 611.42857,464.28571, 384.28571,565.71429]
      }

    ];

    var exits = [
      {
        'ID'       : 'exit',
        // More than four values -> Polygon
        'geometry' : ['M',1077.1429,642.85714,1270,524.28571,-1.4286,121.42858]
      }

    ];

]


//
// End of scene `officeRoom`
//
