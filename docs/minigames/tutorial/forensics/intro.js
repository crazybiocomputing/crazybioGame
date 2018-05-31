var data=['<div style="position:absolute;background:url(\'clipboard.svg\');background-size:650px;width:650px;height:850px;"><form style="position:relative;margin:150px 0px 0px 60px;width:450px;font-family:\'Rock Salt\',cursive;font-size:20px;" action="myforensics_lab.php" method="post">DNA Barcode is a unique pattern of <input type="text" name="a1" size="8" value="',
'"> sequence specific of a living thing. In this technique, short, highly variable regions are of interest. The sequences are extracted from genomes located in <input type="text" size="10"  name="a2" value="',
'"> for animals and <input type="text" size="10" name="a3" value="',
'"> for plants. These sequences must be amplified with <input type="text" size="25"  name="a4" value="',
'">. For animals, a region of the gene named <input type="text"  name="a5" value="',
'"> is studied...<br><input style="float:right" type="submit" name="OK" value="OK"></input></div></form>'
];

var emptybubble={'x':0,'y':0};
var girl=[
'I received the samples from the police...',
'Four samples come from animals and the tooth is human...',
'Don\'t know...',
'Yeees, that can solve my problem.',
'We need more details and know which gene to amplify and sequence ...',
'You want a coffee?<br>I\'m sorry, I have no coin',
'If you think you can solve my problem,<br>please read my clipboard and answer the questions.'
];
var girlbubble={'x':-150,'y':-100};

var boy=[
'Hmmmm...',
'And ? ...',
'Interesting! what can we do with the animal samples?',
'Maybe DNA barcoding can work...',
'We need to extract DNA and sequence some genes...',
'Hey you!<br>What are you waiting for?',
'Are you listening to us?<br> Do you have any idea about Sandy\'s problem?'
];
var boybubble={'x':-10,'y':-80};

var  statusboy=0;
var  statusgirl=0;

function dialog(ev,who) {
  console.log(statusboy +" "+ statusgirl);
  if (who=='clipboard') {
    if (statusgirl==6) {
      document.getElementById('bubble').innerHTML='';
      document.getElementById('bubble').style.left='0px';
      document.getElementById('bubble').style.top='0px';
      document.getElementById('popup').innerHTML=data;
    }
    else
      myAlert(ev,'Hmmm... It\'s not very polite to read<br> her clipboard without her permission.',emptybubble);
  }
  else if (who=='girl') {
    myAlert(ev,girl[statusgirl],girlbubble);
    if (statusboy < (statusgirl+1) )
      statusboy++;
    if (statusboy > 6)
      statusboy=6;
  }
  else if (who=='boy') {
    myAlert(ev,boy[statusboy],boybubble);
    if (statusboy > statusgirl)
      statusgirl++;
    if (statusgirl > 6)
      statusgirl=6;
  }
}


function myAlert(ev,text,guy) {
  ev = ev || window.event();
  console.log('myAlert '+text+' '+ev.clientX+' '+ev.clientY);
  var bubble = document.getElementById('bubble');
  bubble.innerHTML='<p>'+text+'</p>';
  bubble.style.left= (ev.clientX + guy['x']) + 'px';
  bubble.style.top = (ev.clientY + guy['y']) + 'px';
}

function toClipboard(a1,a2,a3,a4,a5) {
      document.getElementById('bubble').innerHTML='';
      document.getElementById('bubble').style.left='0px';
      document.getElementById('bubble').style.top='0px';
      document.getElementById('popup').innerHTML=data[0]+a1+data[1]+a2+data[2]+a3+data[3]+a4+data[4]+a5+data[5];
}

function doIt() {
  // do nothing
}


