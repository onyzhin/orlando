function cssReload(){
	var object={};
	var timer=0;

	// function that generates css links object map;
	initObject();
	function initObject(){

		//defining current document folder
		var folder=document.location.pathname.split('/');
		if (folder[folder.length-1].indexOf(".")>=0)
			folder.splice(0,folder.length-1);
		folder=folder.join('/');
		
		//running through all css links to generate object map
		$($(document)[0].styleSheets).each(function(){

			//filtering style tag & links without href
			if (typeof this.href!='string') return;
			
			//generate random id for each object;
			var id='id'+Math.floor(Math.random()*(1-1000000)+1000000);

			//making dummie "a" object to get valid css link
			var a=document.createElement('a');
			a.href=this.href;
	
			//return if link is from other server
			if (a.host!=document.location.host) return;

			//assign id to css link for future access
			$(this.ownerNode).attr('id',id);

			//trimming folder to get pure css path
			var cfolder = a.pathname.indexOf(folder)>=0 ? a.pathname.substr(folder.length) : a.pathname;
			console.log(folder,a.pathname);
			//generate new item in object map
			object[id]={
				link : cfolder[0]=='/' ? cfolder.substr(1) : cfolder,
				lastupdate : 0,
			}
		})
	}

	// function that reloads css file depends on id
	function reloadfile(id){
		//generating random code
		var code=Math.random()+'1';
		code=code.substr(2);
		//making clone of current css link 
		var css=$('#'+id); 	
		var css2=css.clone();
		css2.attr('href','');
		css.after(css2);
		//adding new href with random code to prevent browser cache
		css2.attr('href','/'+object[id].link+'?code='+code);
		//removing old css link wiht little timeout to prevent site from "blinking"
		setTimeout(function(){
			css.remove();
		},100)
	};
	//checking for file changes on server side
	setInterval(function(){
		$.ajax({
			url:'lastmodified',
			type : 'POST',
			data : {
				input : object
			},
			dataType : 'JSON',
			success : function(data){
				$(data).each(function(){
					// reload file if server modify time bigger than last client modify time.
					if (this.time>object[this.id].lastupdate){
						object[this.id].lastupdate=this.time;
						reloadfile(this.id);
					}
				})
			}
		})
	},300)
}
$(document).ready(function(){
	cssReload();
})