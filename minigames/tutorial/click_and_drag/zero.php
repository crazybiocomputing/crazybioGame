<?php
	require('../../phpCrazy/cookie_check_crazybio.inc.php');
?>

<?php
	include('../../phpCrazy/header.inc.php');
?>

<script type="text/javascript">

//Drag and Drop script - http://www.btinternet.com/~kurt.grigg/javascript

if  (document.getElementById){

(function(){

//Stop Opera selecting anything whilst dragging.
if (window.opera){
document.write("<input type='hidden' id='Q' value=' '>");
}

var n = 500;
var dragok = false;
var y,x,d,dy,dx;

function move(e){
if (!e) e = window.event;
 if (dragok){
  d.style.left = dx + e.clientX - x + "px";
  d.style.top  = dy + e.clientY - y + "px";
  return false;
 }
}

function down(e){
if (!e) e = window.event;
var temp = (typeof e.target != "undefined")?e.target:e.srcElement;
if (temp.tagName != "HTML"|"BODY" && temp.className != "dragclass"){
 temp = (typeof temp.parentNode != "undefined")?temp.parentNode:temp.parentElement;
 }
if (temp.className == "dragclass"){
 if (window.opera){
  document.getElementById("Q").focus();
 }
 dragok = true;
 temp.style.zIndex = n++;
 d = temp;
 dx = parseInt(temp.style.left+0);
 dy = parseInt(temp.style.top+0);
 x = e.clientX;
 y = e.clientY;
 document.onmousemove = move;
 return false;
 }
}

function up(){
dragok = false;
document.onmousemove = null;
}

document.onmousedown = down;
document.onmouseup = up;

})();
}//End.

</script>

<div id="page">
<div id="content">

<center>  
<img src="congratulations_secret.jpg" width="690" height="480" />
<div style="position:relative;top:-480px;left:-344px;">
<div class="dragclass" style="height:1px;width:1px;top:0px;left:0px;background-color:#ff0000;color:#ffffff"><img src="congratulations_0.jpg" /></div>
<div class="dragclass" style="height:1px;width:1px;top:-1px;left:335px;background-color:#ff0000;color:#ffffff"><img src="congratulations_1.jpg" /></div>

</div>
</center>

</div>
</div>

<?php
	include('../../phpCrazy/footer.inc.php');
?>


<!--

<?php

	require('../../phpCrazy/cookie_check_crazybio.inc.php');

	session_start();
	if (!isset($_SESSION['help']) )
		$_SESSION['help'] = 1;
	if ($_GET['action'] == "help")
	{
		if ($_SESSION['help'] == 2)
			header("location: help_1.php"); // HTTP/1.1
		elseif ($_SESSION['help'] == 3)
			header("location: help_137.php"); // HTTP/1.1
		elseif ($_SESSION['help'] == 4)
			header("location: help_157.php"); // HTTP/1.1
	}
	


?>
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">
<html>
<head>
<meta name="robots" content="none" />
<script Language="Javascript" src="../scripts/page.js">
</script>
<title>CrazyBioComputing: Level #<?php echo $level;?> - Mini-game #<?php echo $gameIndex;?></title>
<style type="text/css">
html,body {
background-color : white; 
font-size : 100%; 
font-family :  arial,sans serif; 
color : black; 
background-color : white; 
}

</style>

</head>

<body>
 
<table>
	<tr>
		<td>
			<p>Your first training mini-game!!!
			<ul>
			<li>There is no instruction to solve the CrazyBioComputing mini-games, you have to find out yourself what to do.</li>
			<li>Do not stay in front of your screen, try to interact with the image... </li>
			</ul>
			</td>
	</tr>
<?php
	if ($_SESSION['help']==1)
	{
		$_SESSION['help']++;
		echo '<tr><td><a href="zero.php?action=help">Need more help ?</a></td></tr>'; 
	}
	elseif ($_SESSION['help']==2)
	{
		$_SESSION['help']++;
		echo '<tr><td><a href="help_137.php?action=help">And now ?</a></td></tr>'; 
	}
	elseif ($_SESSION['help']==3)
	{
		$_SESSION['help']=1;
			echo '<tr><td><a href="help_157.php?action=help">I found it, but...</a></td></tr>'; 
	}
?>
</table>

<center>
<table>
	<tr>
		<td>
			<table>
			<tr>
			<td>
			</td>
			<td>
				<applet archive = "crazy.jar" codebase = "./" code="Zero.class" width=690  height=480 >
				</applet>
			</td>
			</tr>
			</table>
		</td>
	</tr>

</table>

</center>
</body>
</html>

!>
