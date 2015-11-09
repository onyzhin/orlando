<?
	$partials = array();
	$path =$_SERVER['DOCUMENT_ROOT'].'/partials';
	if ($handle = opendir($path)) {
	    while (false !== ($file = readdir($handle))) { 
	        $partials[] = $file;
	    }
	closedir($handle); 
	}
	foreach($partials as $part):
		if(strpos($part,'.php')!== false){
			$name = str_replace('.php','',$part);
			echo '<div class="partialName">'.$name.'</div>';
			include '/partials/'.$part; 
		}
	endforeach;?>