

// Generate a four-digit code
let code = Math.floor(1000.0 + Math.random()* 8999.0);
let codeString = code.toString().split('').reduce( (accu,char) => accu + ' ' + char,'');
console.log(code,codeString);

// Create the sprite generating the secret code...
let unlock = createSprite({
  id: 33,
  class: "sprite", 
  description: "Generator", 
  display: {
    position: [300,225],
    width: 215,
    height: 74,
    text: {
      content: [
        '<span class="dark">',
        `[ ${codeString} ]</span>`
      ],
      style: {
        display: "none",
        padding: "10px",
        animation: "fadein 15s"
      }
    }
  }
});


// Add it in CRAZYBIOGAME
CRAZYBIOGAME.deferred[unlock.id] = unlock;
CRAZYBIOGAME.deferred['code'] = code;

