/*
 * Test of a scene
 */

 "use strict";

 const stripes = [
   {
     ID: 0,
     type: 'scene',
     children: [10,12,20,22,30,32,100],
     description: 'A room with a bookcase...'
     graphics:{
       path: ,
       elements: ,
       visibility: 'background',
     }
   },

   {
     ID: 10,
     type: 'item',
     children:[12],
     description: '3 books...',
   },

   {
     ID: 12,
     type : 'item',
     remove:[10],
     description: 'A piece of paper...'
     graphics:{
       path:'scribble/background.png',
       elements: ,
       visibility: 'foreground',
     }
   },

   {
     ID: 20,
     type: 'item',
     children:[22],
     description: 'A box with a piece of paper inside...',
   },

   {
     ID:22,
     type: 'item',
     remove:[20],
     description: 'A complicated code...',
     graphics:{
       path:'scribble/code.png',
       elements: ,
       visibility: 'foreground',
     }
   },

   {
     ID:30,
     type: 'item',
     children:[32],
     description: 'Unlocked safe...',
   },

   {
     ID:32,
     type: 'lock',
     description: '4-digit code',
     code: '4356'
     action:{
     remove: [22,30,12],
    }
   },

   {
     ID:100,
     type: 'exit', //or 'lock'
     remove: [30,32],
     description: 'A computer...',
     code: 'HAND',
     action:{
       output: 'next game',
     }
   },

 ]
