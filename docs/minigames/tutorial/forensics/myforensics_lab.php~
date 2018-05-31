<?php
	include('../../phpCrazy/header_help.inc.php');
?>

<link href='http://fonts.googleapis.com/css?family=Walter+Turncoat' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Rock+Salt' rel='stylesheet' type='text/css'>

<style>

input {
  font-size: 18px;
  border: none;
  background-color: #ff0;
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

#bubble p {
  margin:0px;
  padding: 0px;
  font-size: 14px;
}

</style>
<script type="text/javascript" src="intro.js"></script>


<div id="page">
<div id="content">
 <p style="font-family: 'Walter Turncoat', cursive;font-size:30px">C&nbsp;h&nbsp;a&nbsp;p&nbsp;t&nbsp;e&nbsp;r&nbsp;&nbsp;&nbsp;1: Back to the crazyBio Lab....</p>
<div id="myform" style="width:700px;margin:auto;font-size : 20px; font-family :  arial,sans serif;">

<?php

if (isset($_POST['OK']) ) {
  $id1=trim(strtoupper($_POST['a1']));
  $id2=trim(strtoupper($_POST['a2']));
  $id3=trim(strtoupper($_POST['a3']));
  $id4=preg_split("/\s+/",trim(strtoupper($_POST['a4'])) );
  $id5=preg_split("/\s+/",trim(strtoupper($_POST['a5'])) );


  $score=0;
  if ($id1=='DNA') {
    $score =1;
    echo '<p style="font-size : 40px;">&#x2605;';
    $id1='DNA';
  }
  else {
    echo '<p style="font-size : 40px;">&#x2606;';
    $id1='RNA/DNA?';
  }

  if ($id2=='MITOCHONDRION') {
    $score +=2;
    echo '&#x2605;';
    $id2='Mitochondrion';
  }
  else {
    echo '&#x2606;';
    $id2='?';
  }


  if ($id3=='CHLOROPLAST' || $id3=='CHLOROPLASTS') {
    $score +=4;
    echo '&#x2605;';
    $id3='Chloroplast';
  }
  else {
    echo '&#x2606;';
    $id3='?';
  }

  $local_score=0;
  for ($i=0;$i<count($id4);$i++) {
    if ($id4[$i]=='POLYMERASE')
      $local_score |=2;
    elseif ($id4[$i]=='CHAIN')
      $local_score |=4;
    elseif ($id4[$i]=='REACTION')
      $local_score |=8;
  }

  if ($local_score==14) {
    echo '&#x2605;';
    $score +=8;
    $id4='Polymerase Chain Reaction';
  }
  elseif (trim(strtoupper($_POST['a4']))=='PCR') {
    echo '&#x2606;';
    $id4='Use the whole name';
  }
  else {
    echo '&#x2606;';
    $id4='?';
  }

  $local_score=0;
  for ($i=0;$i<count($id5);$i++) {
    if ($id5[$i]=='CYTOCHROME')
      $local_score |=2;
    elseif ($id5[$i]=='OXIDASE')
      $local_score |=4;
  }

  if ($local_score==6) {
    echo '&#x2605;';
    $id5='Cytochrome C Oxidase I';
    $score +=16;
  }
  else {
    echo '&#x2606;';
    $id5='?';
  }

  if ($score==31)   
    echo '<span style="font-size:24px"><a title="Click on \'yes\'" style="text-decoration:none" href="coffin.php">Yeeess!!!</a></span></p>';
  else
    echo '<span style="font-size:20px"> W r o n g &nbsp; a n s w e r.<a href="javascript:void(0)" onclick="javascript:toClipboard(\''.$id1.'\',\''.$id2.'\',\''.$id3.'\',\''.$id4.'\',\''.$id5.'\');"> Return to the clipboard</a></span></p>' ;
}
else {
  $id1='RNA/DNA?';$id2='';$id3='';$id4='';$id5='';
}


?>
<div id="popup">
<p>During a coffee break</p>
<img src="background2.png" usemap="#coffee">
</div>
<div id="bubble"></div>


<MAP NAME="coffee">
<AREA shape="RECT" coords="194,321,275,356" HREF="javascript:void(0)" onclick="javascript:myAlert(event,'The carpet is not a fountain of coins!!!',emptybubble)" ALT="coffee" />
<AREA shape="POLY" coords="306,236,342,252,316,264,276,247" HREF="javascript:void(0)" onclick="javascript:dialog(event,'clipboard')" ALT="coffee" />
<AREA shape="POLY" coords="291,123,292,185,328,209,320,221,302,218,294,236,261,256,256,225,195,212,256,144,266,120" HREF="javascript:void(0)" onclick="javascript:dialog(event,'girl')" ALT="coffee" />
<AREA shape="POLY" coords="474,154,476,186,516,224,519,290,388,290,388,290,438,153,457,150" HREF="javascript:void(0)" onclick="javascript:dialog(event,'boy')" ALT="coffee" />
<AREA shape="POLY" coords="516,198,608,214,630,192,654,1,533,1" HREF="javascript:void(0)" onclick="javascript:myAlert(event,'Too much coffee isn\'t good for your temper',emptybubble);" ALT="coffee" />
</MAP>

</div>


</div>
</div>



<?php
	include('../../phpCrazy/footer.inc.php');
?>
</body>
</html>
