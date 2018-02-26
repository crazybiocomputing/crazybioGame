<?php
session_start();
$_SESSION['aide']=1;
?>

<?php
	include('../../phpCrazy/header_help.inc.php');
?>
<link href='http://fonts.googleapis.com/css?family=Rock+Salt' rel='stylesheet' type='text/css'>

<div id="page">
<div id="content">
<ul style="line-height:60px; list-style-type: none; ">
<li><span style="padding:10px;text-decoration: none;text-transform: uppercase;font-family: Arial, Helvetica, sans-serif;font-size: 14px;font-weight: normal;color: #FFFFFF;background-color:black;">
[ H o m e ]</span> <span style="font-family:'Rock Salt',cursive">Return to Home page</span></li>
<li><span style="padding:10px;text-decoration: none;text-transform: uppercase;font-family: Arial, Helvetica, sans-serif;font-size: 14px;font-weight: normal;color: #FFFFFF;background-color:black;">
[ H e l p ]</span> <span style="font-family:'Rock Salt',cursive">This help. Always a good place to get clues.</span></li>
<li><span style="padding:10px;text-decoration: none;text-transform: uppercase;font-family: Arial, Helvetica, sans-serif;font-size: 14px;font-weight: normal;color: #FFFFFF;background-color:black;">
[ C r a z y B i o c o m p u t i n g ]</span> <span style="font-family:'Rock Salt',cursive">History (Update, release...).</span></li>
<li><span style="padding:10px;text-decoration: none;text-transform: uppercase;font-family: Arial, Helvetica, sans-serif;font-size: 14px;font-weight: normal;color: #FFFFFF;background-color:black;">
[ B l o g ]</span> <span style="font-family:'Rock Salt',cursive">Course about Image Processing dedicated to ImageJ</span></li>
<li><span style="padding:10px;text-decoration: none;text-transform: uppercase;font-family: Arial, Helvetica, sans-serif;font-size: 14px;font-weight: normal;color: #FFFFFF;background-color:black;">
[ L e v e l # <?php echo $level;?> &mdash; g a m e # <?php echo $gameIndex;?> ]</span> <span style="font-family:'Rock Salt',cursive">Return to the mini-game.</span></li>
<li> <span style="padding:10px;text-decoration: none;text-transform: uppercase;font-family: Arial, Helvetica, sans-serif;font-size: 14px;font-weight: normal;color: #FFFFFF;background-color:black;">A r e y o u l o s t ?</span> <span style="font-family:'Rock Salt',cursive">See <a href="http://crazybiocomputing.blogspot.fr/2013/03/crazybiocomputing-mini-games.html">this introduction</a></span></li>
</ul>
</div>
</div>

<?php
	include('../../phpCrazy/footer.inc.php');
?>
</body>
</html>
