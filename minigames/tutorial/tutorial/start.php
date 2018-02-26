<?php
session_start();
if (!isset($_SESSION['aide'])  )
$_SESSION['aide']=0;
?>

<?php
	require('../../phpCrazy/cookie_check_crazybio.inc.php');
?>
<?php
	include('../../phpCrazy/header.inc.php');
?>

<div id="page">
<div id="content">

<center>
<br />
<br />
<br />
<br />

<?php

if ($_SESSION['aide']==1) {
echo '<span style="padding:10px;text-decoration: none;text-transform: uppercase;font-family: Arial, Helvetica, sans-serif;font-size: 40px;font-weight: normal;color: #FFFFFF;background-color:black;">
[&nbsp;Y&nbsp;E&nbsp;S&nbsp;!&nbsp;]
</span> </p>';
echo '<p style="font-size: 150%"> Always a good idea to check the [ H E L P ]..&#9786;.<br /><br />';
echo 'The answer of this mini-game <br />is <br /><b>stunning.php</b> </p><br />';
echo '<p>What does it mean? <br />Actually, <i>stunning.php</i> is a partial URL that must overwrite the word <i>start.php</i> <br />in the textfield of your browser as shown below.<center>';

$uri=substr($_SERVER["REQUEST_URI"],1,strpos($_SERVER["REQUEST_URI"],"start.php")-1 );
echo '<span style="padding: 5px;border-color:gray;border-style:solid;border-width:1px;">'.$_SERVER["SERVER_NAME"].'/'.$uri.'<span style="font-weight: bold;background-color: #F78686">start.php</span>&nbsp;&nbsp;&nbsp;&nbsp;</span>';
echo '<p>replaced by</p>';

echo '<span style="padding: 5px;border-color:gray;border-style:solid;border-width:1px;">'.$_SERVER["SERVER_NAME"].'/'.$uri.'<span style="font-weight: bold;background-color: #01FF01">stunning.php</span>&nbsp;&nbsp;&nbsp;&nbsp;</span>';

}
else
echo '<span style="padding:10px;text-decoration: none;text-transform: uppercase;font-family: Arial, Helvetica, sans-serif;font-size: 40px;font-weight: normal;color: #FFFFFF;background-color:black;">
[&nbsp;H&nbsp;E&nbsp;L&nbsp;P&nbsp;]
</span> </p>';
?>

<center>

</div>
</div>

<?php
	include('../../phpCrazy/footer.inc.php');
?>
