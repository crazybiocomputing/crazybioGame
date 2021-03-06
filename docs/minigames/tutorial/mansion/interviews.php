<?php
	require('../../phpCrazy/cookie_check_crazybio.inc.php');
?>
<?php
	include('../../phpCrazy/header.inc.php');
?>
<link href='http://fonts.googleapis.com/css?family=Walter+Turncoat' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Rock+Salt' rel='stylesheet' type='text/css'>

<style>
label {
  font-family: monospace;
  font-size:18px;
  color:#646464;";
}

input {
  font-size: 18px;
}


</style>

<script type="text/javascript">

var rooms={
'boudoir':'<p><b>Miss Pink</b> lit un magazine de mode tout en tenant un fer à cheval. Dans son sac à main, vous trouvez des clés, un téléphone mobile, un trèfle à quatre feuilles, une patte de lapin et une corde...</p><p>- <i>"Je suis très superstitueuse et ce manoir est réputé pour être hanté par le terrible pirate "The Black"... Je suis sûre que Lord Black a été victime de son fantôme..."</i>. Elle a l\'air terrifiée...</p><p><a href="javascript:room(\'map\')">Back to map</a></p>', 
'dinner':'<p>Personne n\'est dans la salle de réception ... et pas moyen de prendre un café </p><p><a href="javascript:room(\'map\')">Back to map</a></p>',
'kitchen':'<p><b>Prof. Violet</b> est dans la cuisine tenant une paire de tenailles. Un livre sur les serpents est posé sur la table de cuisine et un python dans un vivarium vous regarde d\'un air affamé!!! Un chandelier éclaire la pièce à moitié dans la pénombre... Il fait vraiment sinistre, ici.</p><p><i>"Ces animaux sont réellement fascinants, ne trouvez-vous pas?..."</i>. Hmmm... Il ne semble pas très perturbé par la mort de Lord Black.<p><a href="javascript:room(\'map\')">Back to map</a></p>',
'gallery':'<p><b>Colonel Yellow</b> avec son chien de chasse admire les trophées de Lord Black spécialement la baleine suspendue au plafond de l\'immense salle des Trophées. Après un échange de banalités, vous lui demandez ce qu\'il a dans ses poches: des clés, un smartphone dernier cri, des cartes de randonnée. Le Dr Watson trouve au fond du bateau un tuyau de plomb ... parfait, pour briser la nuque de Lord Black...</p><p><a href="javascript:room(\'map\')">Back to map</a></p><img src="gallery.png"  usemap="#gallery"></img>',
'hall':'Dans le Hall d\'entrée, vous rencontrez le  <b>Dr Green</b> avec sa trousse médicale en cuir de vachette contenant entre autres un stéthoscope, des antibiotiques et une clé à molette !?!...<i>"J\'ai crevé avec ma voiture ce matin ..."</i> explique t-il...</p><p><a href="javascript:room(\'map\')">Back to map</a></p>',
'map':'<p>Avec l\'aide du Dr. Watson, vous passez l\'après-midi à chercher les invités présents la nuit où Lord Black a été assassiné.</p><img src="map.png" usemap="#map"></img>',
'office':'Le bureau a été nettoyé...<b>Mrs White</b> avec son chat se regarde dans le miroir. Elle a dans son sac à main, la clé de sa chambre, un smartphone, un sac de croquettes pour chat et ... un poignard.</p><p><a href="javascript:room(\'map\')">Back to map</a></p><img src="office.png"  usemap="#office"></img>',
'saloon':'<p><b>Mrs Blue</b> est une vieille femme hautaine. Vous trouvez dans son cabas en peau de crocodile: des flacons de parfum français, un vieux modèle de téléphone , et... un revolver. Regardant avec surprise son arme à feu, elle réplique aussitôt <i>"Le monde est si dangereux de nos jours pour une vieille dame"</i>...</p><p><a href="javascript:room(\'map\')">Back to map</a></p>',
'restroom':'<p>Les toilettes semblent être le seul endroit dans le manoir où vous captez du réseau pour pouvoir appeler l\'inspecteur!!! Vous composez le numéro du <b>CrazyTownPolice Department</b>...</p><form action="interviews.php" method="post">'+
'<label>Qui est coupable? </label><input type="text" size="10" name="people" value=""></input><br>'+
'<label>La preuve de sa culpabilité est ...</label><input type="text" size="10" name="evidence" value=""></input><br>'+
'<input type="submit" name="OK" value="OK"></input>'+
'</form><p><a href="javascript:room(\'map\')">Back to map</a></p>'
}

function room(name) {
  document.getElementById("view").innerHTML=rooms[name];
}


</script>

<div id="page">
<div id="content">
 <p style="font-family: 'Walter Turncoat', cursive;font-size:30px">C&nbsp;h&nbsp;a&nbsp;p&nbsp;i&nbsp;t&nbsp;r&nbsp;e&nbsp;&nbsp;&nbsp;4: Interrogatoires</p>
<div id="myform" style="width:700px;margin:auto;font-size : 20px; font-family :  arial,sans serif;">

<center>
<?php

if (isset($_POST['OK']) ) {
  $id1=strpos(strtoupper($_POST['people']), 'PINK');
  $id2=strpos(strtoupper($_POST['evidence']), 'LAPIN');


  if ($id1!== false && $id2!==false && $id3!==false)   {
    echo '<p><a title="Click on \'yes\'" style="text-decoration:none" href="guilty.php">Bravo!!! Cette technique de bioinformatique est appelé le code barre ADN (ou DNA barcoding). Elle permet de trouver l\'espèce d\'échantillons d\'origine animale".</a></p>';
    exit;
  }
  else {
    echo '<p>M a u v a i s e &nbsp; r é p o n s e</p>' ;
  }
  unset($_POST['OK']);
}
else {
  $id1='?'; $id2=''; $id3='';
  $id4=''; $id5=''; $id6='';
  $id7=''; 
}

?>
</center>


<div id="view">
<p>Avec l'aide du Dr. Watson, vous passez l'après-midi à chercher les invités présents la nuit où Lord Black a été assassiné.</p>

<img src="map.png" alt="map" usemap="#map">
</div>

<br>


</div>

<MAP NAME="map">
<AREA shape="rect" coords="99,7,495,190" HREF="javascript:room('gallery')" ALT="collection" />
<AREA shape="rect" coords="7,99,104,189" HREF="javascript:room('hall')" ALT="collection" />
<AREA shape="rect" coords="100,311,405,490" HREF="javascript:room('dinner')" ALT="collection" />
<AREA shape="rect" coords="406,312,507,486" HREF="javascript:room('office')" ALT="collection" />
<AREA shape="rect" coords="508,313,607,486" HREF="javascript:room('boudoir')" ALT="collection" />
<AREA shape="rect" coords="607,312,694,490" HREF="javascript:room('saloon')" ALT="collection" />
<AREA shape="rect" coords="9,399,100,490" HREF="javascript:room('restroom')" ALT="collection" />
<AREA shape="poly" coords="496,6,600,6,602,97,693,98,693,194,496,192" HREF="javascript:room('kitchen')" ALT="collection" />
</MAP>
</div>
</div>

<?php
	include('../../phpCrazy/footer.inc.php');
?>
