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
<img src="background.jpg" />
<div style="position:relative;top:-350px;left:-150px;">
<div class="dragclass" style="height:1px;width:1px;top:0px;left:0px;background-color:#ff0000;color:#ffffff"><img width="400" src="firefox_3_mini.jpg" /></div>
</div>
<div style="position:relative;top:-370px;left:-250px;">
<div class="dragclass" style="height:1px;width:1px;top:0px;left:0px;background-color:#ff0000;color:#ffffff"><img src="thunar_mini.jpg" /></div>
</div>

</center>
</div></div>

<?php
	include('../../phpCrazy/footer.inc.php');
?>
