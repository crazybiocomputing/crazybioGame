<?php
	require('../../phpCrazy/cookie_check_crazybio.inc.php');
?>
<?php
	include('../../phpCrazy/header.inc.php');
?>
<link href='http://fonts.googleapis.com/css?family=Walter+Turncoat' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Rock+Salt' rel='stylesheet' type='text/css'>

<style>

.content {
  width: 100%;
  margin: auto;
}

label {
  font-family: monospace;
  font-size:18px;
  color:#646464;";
}

input {
  font-size: 18px;
}

#dialog, #player {
  float: right;
  /*    height: 200px; */
  padding: 5px 5px 5px 5px;
  margin: 20px;
  background-color: rgba(180,180,180,0.95);
  z-index: 2;
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

#comment {
  position: relative;
  border: solid 1px #000;
  font-family: 'Rock Salt';
  font-size:14px;
  background-color: #ff0;
  top: -440px;
  left: 15%;
  width: 50%;
}

</style>

<script type="text/javascript">
var sample=0;

function room(v) {
  switch (v) {
  case 1: myAlert('Hmmm!! un échantillon intéressant. On dirait des cheveux');sample|=2;break;
  case 2: myAlert('Oui!! Une dent ... peut-être perdue dans un corps à corps');sample|=32;break;
  case 3: myAlert('Oui... Hmmm... on dirait des ongles ou ... des écailles, va savoir');sample|=8;break;
  case 4: myAlert('Le corps était ici ...');break;
  case 5: myAlert('Rien d\'intéressant.');break;
  case 6: myAlert('Nooon!! Seulement de la poussière');break;
  case 7: myAlert('RAS. C\'est vraiment difficile...');break;
  case 8: myAlert('Hmmm, je ne sais pas trop ce que c\'est mais je le prends... On ne sait jamais');sample|=4;break;
  case 9: myAlert('Enfin!!! on dirait une touffe de poils');sample|=16;break;
  case 10:

    if (sample==62) {
      myAlert('J\'ai assez d\'échantillons... Je peux retourner au labo faire mes expériences...');
    }
    else {
      myAlert('Je ne veux pas retourner au labo maintenant, il y a peut-être d\'autres échantillons à collecter...');
    }
    break;
  }
  var sampleHTML='<img src="sample0.png"><br>';
  if ((sample&2)==2)
    sampleHTML+='<img src="sampleA.png"><br>';
  if ((sample&4)==4)
    sampleHTML+='<img src="sampleB.png"><br>';
  if ((sample&8)==8)
    sampleHTML+='<img src="sampleC.png"><br>';
  if ((sample&16)==16)
    sampleHTML+='<img src="sampleD.png"><br>';
  if ((sample&32)==32)
    sampleHTML+='<img src="sampleE.png">';
  document.getElementById('samples').innerHTML=sampleHTML;

}

function myAlert(message) {
  document.getElementById('comment').innerHTML = '<p>'+message+'</p>';
}

</script>

<div id="page">
<div id="content">
 <p style="font-family: 'Walter Turncoat', cursive;font-size:30px">C&nbsp;h&nbsp;a&nbsp;p&nbsp;i&nbsp;t&nbsp;r&nbsp;e&nbsp;&nbsp;&nbsp;1: Scène de Crime</p>
<div id="myform" style="width:950px;margin:auto;font-size : 20px; font-family :  arial,sans serif;">
    <div id="dialog">
      <div id="people"><img src="media/anna.svg"></img></div>
      <div class="chat" id="chat">Bonjour, je m'appelle Anna et je fais un stage dans le service de police scientifique du CTPD (CrazyTown Police Departement). Je dois travailler sur ma 1ère affaire: <b>Lord Black</b> a été assassiné dans la nuit... Je dois chercher des échantillons pour analyser les ADNs...</p>
        </div>
    </div>

<div id="samples" style="float:left"><img src="sample0.png"><br></div>
<div style="margin:auto">
<img src="background.png" width="700px" usemap="#room"></img>
</div>
<div id ="comment">
</div>

<MAP NAME="room">
<AREA shape="rect" coords="206,202,246,216" HREF="javascript:room(1)" ALT="collection" />
<AREA shape="rect" coords="517,238,532,251" HREF="javascript:room(2)" ALT="collection" />
<AREA shape="rect" coords="294,408,306,416" HREF="javascript:room(3)" ALT="collection" />
<AREA shape="poly" coords="476,269,491,270,489,319,450,316,424,356,440,394,396,418,385,402,414,388,400,345,354,413,340,403,406,300,357,306,348,292,430,288" HREF="javascript:room(4)" ALT="collection" />
<AREA shape="rect" coords="136,387,168,416" HREF="javascript:room(5)" ALT="collection" />
<AREA shape="rect" coords="489,375,502,392" HREF="javascript:room(6)" ALT="collection" />
<AREA shape="rect" coords="304,224,356,248" HREF="javascript:room(7)" ALT="collection" />
<AREA shape="rect" coords="162,263,174,318" HREF="javascript:room(8)" ALT="collection" />
<AREA shape="rect" coords="272,160,294,168" HREF="javascript:room(9)" ALT="collection" />
<AREA shape="poly" coords="554,160,583,166,598,151,605,190,570,214,575,194,543,189" HREF="javascript:room(10)" ALT="collection" />

</MAP>
<br>


</div>


</div>
</div>

<?php
	include('../../phpCrazy/footer.inc.php');
?>
