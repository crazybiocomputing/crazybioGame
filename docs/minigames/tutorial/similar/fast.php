<?php
	require('../../phpCrazy/cookie_check_crazybio.inc.php');
?>
<?php
	include('../../phpCrazy/header.inc.php');
?>

  <link href='http://fonts.googleapis.com/css?family=Rock+Salt' rel='stylesheet' type='text/css'>
  <link href='http://fonts.googleapis.com/css?family=Coda' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Walter+Turncoat' rel='stylesheet' type='text/css'>


  <style>
.seq  ul {
    list-style-type:none;
    margin-left: auto;
    display:inline-block;
  }

.seq  ul li {
    display:inline-block;
    float:left;
    margin-left: 2px;
    height: 30px;
 }

.seq_org  ul {
    list-style-type:none;
    margin-left: auto;
    display:inline-block;
  }

.seq_org  ul li {
    display:inline-block;
    float:left;
    margin-left: 2px;
    height: 30px;
 }

  .color1 {
    background-color: #f00;
    width: 120px;
  }

  .color2 {
    background-color: #00f;
    width: 120px;
  }

  .color3 {
    background-color: #f0f;
    width: 120px;

  }

  .color4 {
    background-color: #0f0;
    width: 120px;
  }

  .color5 {
    background-color: #0ff;
    width: 120px;
  }

  .gray {
    background-color: #ccc;
    width: 120px;
  }

  .org {
    width: auto;
    background-color: #000;
    color: #fff;
    font-family: 'Rock Salt';
    font-size: 20px;
    padding: 4px 4px 16px 4px;
    vertical-align: middle;
    border-radius: 4px;
    margin-bottom: 20px;
  }



#countdown {
  float:left;
  margin: 25px;
  font-family: Arial;
  font-size: 100px;
  width:10%;
}
#database {
  float: left;
  margin-top: 60px;
  width:1024px;
  height:100px;
  overflow: hidden;
}

#arrows {
  margin: 60px;
  font-family: Arial;
  font-size: 80px;
}
#arrows a {
  text-decoration: none;
}

#dialog, #player {
  position: absolute;
  float: right;
  width: 80%;
  top: 45%;
  left: 10%;
  /*    height: 200px; */
  padding: 5px 5px 5px 5px;
  margin: 20px;
  background-color: rgba(180,180,180,0.95);
  z-index: 2;
}

#people {
  float:right;
  width: 200px;
  margin: 0px;
  padding: 0px;
}

#people > img {
  width: 100%;
}

.chat {
  float:right;
  width:70%;
  border: 2px solid;
  border-radius: 10px;
  background-color: white;
  padding: 10px;
  font-family: 'Rock Salt', sans-serif;
  font-size:16px;
  line-height: 30px;
}
.chat p {
  padding: 0px;
  margin: 0px;
}

.right_button {
  float: right;
  text-decoration: none;
  padding: 0px 5px 2px;
  border: 1px solid #DDD;
  border-radius: 3px;
  background-clip: padding-box;
  background-color: #EEE;
  font-family: 'Coda', sans-serif;
  font-size: 16px;
  color: #666;
}

.seq {
/**  transform: translate(0px, -100px); **/
}

.animatedDown {
  animation-name: fadeInDown;
  animation-duration: 0.5s;
  transition-timing-function: ease-in;
  animation-fill-mode: both;
  animation-play-state: running;
/*  animation-iteration-count: infinite; */
  -webkit-animation-name: fadeInDown;
  -webkit-animation-duration: 0.5s;
  -webkit-transition-timing-function: ease-in;
  -webkit-animation-fill-mode: both;
  -webkit-animation-play-state: running;
/*  -webkit-animation-iteration-count: infinite; */
}

.animatedUp {
  animation-name: fadeInUp;
  animation-duration: 1s;
  transition-timing-function: ease-in;
  animation-fill-mode: both;
  animation-play-state: running;
/*  animation-iteration-count: infinite; */
  -webkit-animation-name: fadeInUp;
  -webkit-animation-duration: 1s;
  -webkit-transition-timing-function: ease-in;
  -webkit-animation-fill-mode: both;
  -webkit-animation-play-state: running;
/*  -webkit-animation-iteration-count: infinite; */
}


@keyframes fadeInDown {
    0% {
      transform: translate(0px, -100px);
    }

    100% {
      transform:  translate(0px, 0px);
    }
}

@keyframes fadeInUp {
    0% {
      transform: translate(0, 0px);
    }

    100% {
      transform:  translate(0, -100px);
    }
}

@-webkit-keyframes fadeInUp {
    0% {
      transform: translate(0, 0px);
    }

    100% {
      transform:  translate(0, -100px);
    }
}

@-webkit-keyframes fadeInDown {
    0% {
      transform: translate(0px, -100px);
    }

    100% {
      transform:  translate(0px, 0px);
    }
}
  </style>

  <script type="text/javascript" src="./sequences.js"></script>
  <script type="text/javascript" src="./chatting.js"></script>
  <script type="text/javascript" src="./dialog.js"></script>

  <script>
  var path = [];
  var indexes = [];
  var soluce = 3;
  var myTimer;
  var isCountdown = false;

  function up() {
    if (isCountdown) {

    var db = document.getElementById('database');
    db.innerHTML=sequences[sequence_active]+sequences[sequence_active+1];

    var elements = document.getElementsByClassName('seq');
    elements[0].classList.add('animatedUp');
    elements[1].classList.add('animatedUp');
    sequence_active++;

    if (sequence_active >= species.length - 1) {
      sequence_active = species.length - 3;
    }
    }
  }

  function down() {
    if (isCountdown) {
    var db = document.getElementById('database');
    db.innerHTML=sequences[sequence_active-1]+sequences[sequence_active];

    var elements = document.getElementsByClassName('seq');
    elements[0].classList.add('animatedDown');
    elements[1].classList.add('animatedDown');
    sequence_active--;
    if (sequence_active <= 0) {
      sequence_active = 1;
    }

    }
  }

  function countdown() {
    // set the date we're counting down to
    var timer = 60;
    console.log(timer);

    // get tag element
    var countdown = document.getElementById("countdown");

    // update the tag with id "countdown" every 1 second
    myTimer = setInterval(function () {
        // find the amount of "seconds" between now and target
        timer--;
        if (timer <0) {
          clearInterval(myTimer);
          // Open Dialog popup for results of search...
          document.getElementById('dialog').style.display = 'block';
          var endOfGame = new Dialog(dialog['100']);
          endOfGame.update();

        }
        else {
          // format countdown string + set tag value
          countdown.innerHTML = timer;
        }

    }, 1000);
  }

  function checkAnswer(options) {
    var node = {};
    node.answers = [];
    node.ID = '_';

    switch (options.type) {
    case 'back':
      node.ID = path[path.length - 2].ID;
      break;
    case 'button':
      if (dialog[options.ID].widgets[0].title === 'Go!!') {
        go();
      }
      else {
        console.log(dialog[options.ID]);
        var words = dialog[options.ID].widgets[0].trigger.split(/\s/);
        node.ID = words[1];
        console.log('next '+node.ID);
      }

      break;
    case 'select':
      answer = document.getElementById(options.element).value;
      node.ID = dialog[options.ID].goto[answer];
      node.answers.push(answer);
      break;
    case 'submit':
      var w = dialog[options.ID].widgets;
      var total = 0;
      for (var i=0; i < w.length; i++) {
        var answer = getAnswer(w[i]);
        if (answer[0] == 1) {
          node.answers.push(answer[1]);
        }
        total +=answer[0];
      }
      console.log('answer '+total);
      if (dialog[options.ID].goto[total] != undefined) {
        node.ID = dialog[options.ID].goto[total];
      }
      else {
        node.ID = dialog[options.ID].goto['0'];
        node.answers.push('wrong');
      }
      break;
    case 'value':
      answer = document.getElementById(options.element).value;
      node.ID = dialog[options.ID].goto[answer];
      node.answers.push(answer);
      console.log(answer + ' ' + next_node);
      break;
    default:
      alert('Wrong path');
    }

    if (node.ID != '_') {
      path.push(node );
    }
    var new_dialog = new Dialog(dialog[node.ID]);
    new_dialog.update();
  }

  function go() {
    countdown();
    isCountdown = true;
    // Close Dialog popup
    document.getElementById('dialog').style.display = 'none';
  }

  function stop() {
    // Stop timer
    clearInterval(myTimer);
    // Open Dialog popup for results of search...
    document.getElementById('dialog').style.display = 'block';
    console.log(sequence_active +' '+indexes[sequence_active]);
    console.log(species[indexes[sequence_active-1]]);
    if (species[indexes[sequence_active-1]] === "Balaenoptera physalus") {
      var stop_dialog = new Dialog(dialog['105']);
      stop_dialog.update();
    }
    else {
      var stop_dialog = new Dialog(dialog['106']);
      stop_dialog.update();
    }
  }

  function doIt() {
    var db = document.getElementById("database");
    var dbstr = '';
    var length = choices.length - 2;
    // First aka 'Beginning of Database'
    str='<div class="seq">';
    str+='<ul>';
    str+='<li class="gray">&nbsp;</li><li class="gray">&nbsp;</li><li class="gray">&nbsp;</li><li class="gray">&nbsp;</li><li class="gray">&nbsp;</li>';
    str+='<li class="org">'+species[0]+'</li>';
    str+='</ul>';
    str+='</div>';
    sequences.push(str);
    var sample = yes[Math.floor(Math.random()*yes.length)];
    var insert = 5+Math.floor(Math.random()*(species.length-20));
    for (i=1;i<species.length - 2;i++) {
      str='<div class="seq">';
      str+='<ul>';
      var index = Math.floor(Math.random()*length);
      console.log(i + " "+index +" color"+choices[index]);
      var colors = choices[index].split(',');
      if (i == insert) {
        colors = sample.split(',');
        index  = species.length - 1;
      }
      str+='<li class="color'+colors[0]+'">&nbsp;</li>';
      str+='<li class="color'+colors[1]+'">&nbsp;</li>';
      str+='<li class="color'+colors[2]+'">&nbsp;</li>';
      str+='<li class="color'+colors[3]+'">&nbsp;</li>';
      str+='<li class="color'+colors[4]+'">&nbsp;</li>';
      if (i != insert) {
        // Swap
        choices[index]=choices[length];
        length--;
        str+='<li class="org">'+species[i]+'</li>';
        indexes.push(i);

      }
      else {
        str+='<li class="org">'+species[species.length - 1]+'</li>';
        indexes.push(species.length - 1);
      }
      str+='</ul>';
      str+='</div>';
      sequences.push(str);
      dbstr+=str;
    }
    // Last aka 'End of Database'
    str='<div class="seq">';
    str+='<ul>';
    str+='<li class="gray">&nbsp;</li><li class="gray">&nbsp;</li><li class="gray">&nbsp;</li><li class="gray">&nbsp;</li><li class="gray">&nbsp;</li>';
    str+='<li class="org">'+species[species.length - 2]+'</li>';
    str+='</ul>';
    str+='</div>';
    sequences.push(str);
    // Last aka 'End of Database'
    str='<div class="seq">';
    str+='<ul>';
    str+='<li class="gray">&nbsp;</li><li class="gray">&nbsp;</li><li class="gray">&nbsp;</li><li class="gray">&nbsp;</li><li class="gray">&nbsp;</li>';
    str+='<li class="org">'+species[species.length - 2]+'</li>';
    str+='</ul>';
    str+='</div>';
    sequences.push(str);
 
//    db.innerHTML=dbstr;

    var intro = new Dialog(dialog['000']);
    intro.update();

  }
  </script>


<div id="page">
<div id="content">
 <p style="font-family: 'Walter Turncoat', cursive;font-size:30px">C&nbsp;h&nbsp;a&nbsp;p&nbsp;i&nbsp;t&nbsp;r&nbsp;e&nbsp;&nbsp;&nbsp;3: Bioinformatique</p>

</div>
</div>

  <center>
    <div class="seq_org" style="width:1024px; height:200px;">
      <ul>
        <li class="color1">&nbsp;</li>
        <li class="color2">&nbsp;</li>
        <li class="color3">&nbsp;</li>
        <li class="org">Echantillon A</li>

      </ul>

    </div>
    <p style="font-family:'Rock Salt';font-size:40px">* Banque de données de séquences nucléiques *</p>
    <div id="countdown">60</div>
    <div id="database">
    </div>
    <div id="arrows">
      <a href="javascript:void(0)"  onclick="up();">&utrif;</a>
      <a href="javascript:void(0)"  onclick="down();">&dtrif;</a>
      <a href="javascript:void(0)"  onclick="stop();">&phone;</a>

    </div>
  </center>

    <div id="dialog">
      <div id="people"><img src="media/student_face.svg"></img></div>
      <div class="chat" id="chat">Bonjour, je m'appelle Jason, je suis étudiant en bioinformatique...<br></br>
        </div>
    </div>

<?php
	include('../../phpCrazy/footer.inc.php');
?>

