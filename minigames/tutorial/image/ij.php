<?php
	require('../../phpCrazy/cookie_check_crazybio.inc.php');
?>

<?php
	include('../../phpCrazy/header.inc.php');
?>

<script type="text/javascript">

function doIt() {
console.log("do it");
}

function clickIt(e) {
  text=document.getElementById("moove").innerHTML;
  console.log(e.clientX+" "+e.clientY+" "+text.indexOf("0234"));
console.log("image location "+document.getElementById("background").offsetLeft+" "+document.getElementById("background").offsetTop);
  var xx = e.clientX - document.getElementById("background").offsetLeft;
  if (e.clientY > 520 && xx > 545 && xx < 660 && text.indexOf("2078") == -1)
    text+='<div  style="position:relative;top:-400px;left:-300px;"><div class="dragclass" style="height:1px;width:1px;top:0px;left:0px;background-color:#ff0000;color:#ffffff"><img src="plasma2078_ij.png"></div></div>';
  else if (e.clientY > 520 && xx > 30 && xx < 148 &&  text.indexOf("0234") == -1)
    text+='<div  style="position:relative;top:-500px;left:-200px;"><div class="dragclass" style="height:1px;width:1px;top:0px;left:0px;background-color:#ff0000;color:#ffffff"><img src="plasma0234_ij.png"></div></div>';
  else if (e.clientY > 520 && xx > 159 && xx < 276 &&  text.indexOf("9009") == -1)
    text+='<div  style="position:relative;top:-480px;left:50px;"><div class="dragclass" style="height:1px;width:1px;top:0px;left:0px;background-color:#ff0000;color:#ffffff"><img src="plasma9009_ij.png"></div></div>';
  else if (e.clientY > 520 && xx > 288 && xx < 406 &&  text.indexOf("7043") == -1)
    text+='<div  style="position:relative;top:-350px;left:0px;"><div class="dragclass" style="height:1px;width:1px;top:0px;left:0px;background-color:#ff0000;color:#ffffff"><img src="plasma7043_ij.png"></div></div>';
  else if (e.clientY > 520 && xx > 415 && xx < 534 &&  text.indexOf("5492") == -1)
    text+='<div  style="position:relative;top:-520px;left:-340px;"><div class="dragclass" style="height:1px;width:1px;top:0px;left:0px;background-color:#ff0000;color:#ffffff"><img src="plasma5492_ij.png"></div></div>';

  document.getElementById("moove").innerHTML=text;
}


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
<img id="background" src="background_new.png" onClick=" clickIt(event);">
<div id ="moove">
</div>
</center>

</div>
</div>

<?php
	include('../../phpCrazy/footer.inc.php');
?>
