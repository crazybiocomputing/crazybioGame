# Core JS classes, functions for the puzzle games

## common.js
Toolbox of various functions and global variable (_e.g._ CRAZYBIOGAME object).

## composite.js
Node with children like `scene`and `scene.closeup`.

## deferred.js
Node whose definition is located outside the JSON storyboard. Useful to generate exit code at each session, for example.

## events.js
Collection of functions dedicated to the events management

## form.js
TODO

## gameBuilder.js
Core class converting the JSON storyboard into a HTML5/CSS/JS web page.

## game.js
Root node of the game graph. The `game` must have the <kbd>id</kbd> 0.

## gameManager.js
Class used to manage the various games in a level

## graph.js
Class describing all the relations between nodes as a graph. Used by the `gameBuilder` for generating the web page.

## item.js
Node stored in the inventory.

## lock.js
Specific `machine` node to unlock/exit the game.

## machine.js
Node with user interaction (click and drag, etc.)

## node.js
Ancestor of all the nodes in the game graph.

## scene.js
Composite node. A storyboard must contain at least one `scene` at <kbd>id</kbd> 1.

## sprite.js
Basic node.
