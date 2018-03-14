/*
 * Test of a scene
 */

 "use strict";

 const clickanddrag = [
   {
     ID: 0,
     type: 'scene',
     children: [],
     description: 'A room...'
     graphic:{
       path: ,
       visibility: background,
     }
   },

   {
     ID: 10,
     type: 'item',
     children: [12,22],
     decription: 'A cabinet',
   },

   {
     ID: 12,
     type: 'item',
     description: 'An open drawer with something inside...',
   },

   {
     ID: 22,
     type: 'item',
     remove: [10,12]
     description: 'scissors',
     action:{
       remove: [42,62],
     }
   },

   {
     ID: 42,
     type: 'target',
     description: 'left-side curtain',
   }

   {
     ID: 62,
     type: 'target',
     description: 'right-side curtain',
   }

   {
     ID:100,
     type: 'exit', //or 'lock'
     description: 'A computer...',
     code: 'allright',
     action:{
       output: 'next game',
     }
   }
 ]
