<?php

	$ejs = new stdClass();
	$ejs -> name = "jeremias";
	$ejs -> surname = "geminiani";
	$nht = json_encode($ejs);

	echo $nht;
?>