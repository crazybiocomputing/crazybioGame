

// Generate a four-digit code
let code = Math.floor(1000.0 + Math.random()* 8999.0);
let codeString = code.toString().split('').reduce( (accu,char) => accu + ' ' + char,'');
console.log(code,codeString);

// Create the corresponding sprite
let unlock = createSprite({
  id: 33,
  class: "sprite", 
  description: "Generator", 
  display: {
    position: [300,225],
    width: 215,
    height: 74,
    text: {
      content: ['<span style="padding:10px; text-decoration: none;font-family: Arial, Helvetica, sans-serif;',
        'font-size: 42px;font-weight: normal;color: white;background-color:black;">',
        `[ ${codeString} ]</span>`
      ],
      style: {
        display: "none",
        padding: "10px",
        animation: "fadein 60s"
      }
    }
  }
});

let lock = createLockNumerical({
  id : 44,
  class: "machine.lockNumerical", 
  description: "A lock symbol", 
  display: {
    position: [370,100],
    width: 70,
    height: 70,
    graphics: {
      path: "../../assets/lock_symbol.png",
      style: {
        "display": "none"
      }
    },
    target: {
      data : ["C",35,35,35]
    }
  },
  features: {
    exit: code
  }
});

// Add it in CRAZYBIOGAME
CRAZYBIOGAME.deferred[unlock.id] = unlock;
CRAZYBIOGAME.deferred[lock.id] = lock;

