#!/bin/bash

cat ./core/node.js \
./core/machine.js  \
./core/form.js  \
./core/lock.js  \
./core/item.js  \
./core/composite.js  \
./core/sprite.js  \
./core/deferred.js  \
./core/scene.js  \
./core/graph.js  \
./core/game.js \
./core/events.js \
./core/common.js \
./core/gameBuilder.js \
./core/gameManager.js > ../docs/javascripts/crazybiogames.js

sed -E 's/console.log\((.*)\);?//g' ../docs/javascripts/crazybiogames.js > ../docs/javascripts/crazybiogames.min.js

