<?php
	require('../../phpCrazy/cookie_check_crazybio.inc.php');
?>
<?php
	include('../../phpCrazy/header.inc.php');
?>

<link href='http://fonts.googleapis.com/css?family=Walter+Turncoat' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Rock+Salt' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Coda' rel='stylesheet' type='text/css'>




<style>

input {
  font-size: 18px;
  border: none;
  background-color: #ff0;
}

abbr {
  cursor: help;
  font-weight: bold;
  color: #f00;
}

#bubble {
  position:absolute;
  left:0px;
  top:0px;
  background-color:white;
  border: 1px solid;
  border-radius: 5px;
  padding: 10px;
  margin: 0px;
}


#dialog, #player {
  float: right;
  /*    height: 200px; */
  padding: 5px 5px 5px 5px;
  margin: 20px;
  background-color: rgba(52, 201, 85, 0.69);
  z-index: 2;
  position:relative;
  top: -200px;
  width: 95%;
}

#people {
  float:right;
  width: 150px;
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
  font-size:14px;
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


#comment {
  position: relative;
  border: solid 1px #000;
  font-size:10px;
  background-color: #ff0;
  top: -470px;
  left: 15%;
  width: 70%;
  padding-left: 15px;
}

#myVideo {
  position: relative;
  top: -760px;
  left: 25px;
}

</style>
<script type="text/javascript" src="chatting.js"></script>
<script type="text/javascript" src="dialog.js"></script>


<script type="text/javascript">

var path=[];


function doIt() {
  console.log('do it');
  var intro = new Dialog(dialog['000']);
  intro.update();
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


function showVideo() {
  document.getElementById('myVideo').style.display='block';
  document.getElementById('myVideoSource').addEventListener('ended', function(e) {
    alert('The End');
    document.getElementById('myVideo').style.display='none';
  });
}

function showSequences() {
  document.getElementById('comment').style.display='block';
}

</script>


<div id="page">
<div id="content">
 <p style="font-family: 'Walter Turncoat', cursive;font-size:30px">C&nbsp;h&nbsp;a&nbsp;p&nbsp;i&nbsp;t&nbsp;r&nbsp;e&nbsp;&nbsp;&nbsp;2: ADN et Sequençage....</p>

<div id="popup">
<img src="background.jpg" usemap="#exit">
</div>
    <div id="dialog">
      <div id="people"><img src="media/clara.png"></img></div>
      <div class="chat" id="chat"><p>...</p>
        </div>
    </div>

<div id="myVideo" style="display:none">
<video id="myVideoSource" controls="controls">
        <source type="video/mp4" src="http://content.dnalc.org/content/c15/15475/19_polymerase_chain_reaction.mp4"></video>
</div>
<div id="comment" style="display:none">
</div>

<MAP NAME="exit">
<AREA shape="POLY" coords="0,0,120,0,0,120" HREF="javascript:void(0)" onclick="javascript:myAlert(event,'Ce ne serait pas très polie de partir maintenant')" ALT="coffee" />
</MAP>


</div>
</div>



<?php
	include('../../phpCrazy/footer.inc.php');
?>
</body>
</html>
