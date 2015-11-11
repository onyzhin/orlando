<div class="windowScreen">
	<div class="container">
		<div class="windowScreen-left">
			<div class="mainheading">особенности<br> противопожарных окон</div>
			<div class="windowScreen-image"><img src="images/window-image.png" alt="" /></div>
			<div class="quote quote-right">
				<h4>При заказе<br>противопожарных <br>окон фурнитура</h4>
				<h5><em>ПОДАРОК</em></h5>
			</div>
		</div>
		<div class="windowScreen-right">
			<? partial('form2'); ?>
		</div>		
		<div class="countdown-area">
			<div class="countdown-title">До конца акции:</div>
			<div id="countdown"></div>
		</div>
		<script>
		var newYear = new Date(); 
		newYear = new Date(newYear.getFullYear() + 1, 1 - 1, 1); 
		$('#countdown').countdown({until: newYear}); 
		</script>
	</div>
</div>