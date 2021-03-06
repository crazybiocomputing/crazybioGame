#!/bin/bash

cat ./core/drawTools.js \
./core/node.js \
./core/composite.js  \
./core/sprite.js  \
./core/machine.js  \
./core/machineConnector.js  \
./core/form.js  \
./core/lock.js  \
./core/dialog.js \
./core/item.js  \
./core/deferred.js  \
./core/scene.js  \
./core/switch.js  \
./core/graph.js  \
./core/game.js \
./core/events.js \
./core/common.js \
./core/assetLoader.js \
./core/gameBuilder.js \
./core/gameManager.js > ../docs/javascripts/crazybiogames.js

sed -E 's/console.log\((.*)\);?//g' ../docs/javascripts/crazybiogames.js > ../docs/javascripts/crazybiogames.min.js

