[
    {
    "id": 1,
    "class": "scene",
    "description": "A scene",
    "display": {
      "graphics": {
        "path": "assets/background.png",
        "width": 800,
        "height": 432
      }
    },
    "children": [2,3,4,63]
  },
  {
    "id": 2,
    "class": "machine.form.gapfill",
    "description": "GapFill Form Machine",
    "display": {
      "click": ["C", 140, 130, 80]
    },
    "features": {
      "file": "assets/secret.tif",
      "popup": {
        "event": "onclick",
        "content": [
          "<p>What do I put here ?</p>"
        ],
        "title": "GapFill Form Machine"
      }
    }
  },
  {
    "id": 3,
    "class": "machine.form.dragndrop",
    "description": "DragnDrop Form Machine",
    "display": {
      "click": ["C", 140, 130, 80]
    },
    "features": {
      "popup": {
        "event": "onclick",
        "content": [
          "<p>What do I put here ?</p>"
        ],
        "title": "Drag n' Drop Form Machine"
      }
    }
  },
  {
    "id": 4,
    "class": "machine.form.dropdown",
    "description": "DropDown Form Machine",
    "display": {
      "click": ["C", 140, 130, 80]
    },
    "features": {
      "popup": {
        "event": "onclick",
        "content": [
          "<p>What do I put here ?</p>"
        ],
        "title": "DropDown Form Machine"
      }
    }
  },
    {
    "id": 63,
    "class": "machine.lockNumPad",
    "description": "Exit lock",
    "display": {
      "click": ["C", 500, 130, 80]
    },
    "features": {
      "area" : ["R", 2 , 250, 30, 50],
      "popup": {
        "event": "onclick",
        "content": [
          "<p>Type the code... to exit</p>"
        ],
        "title": "A digital lock with a keypad..."
      }
    },
            "exit": 1243,
      "message": [
        "Congratulations!! Click on the button to go to the next game."
      ],
    },
]
