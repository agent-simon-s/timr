/* JavaScript Document 
simon sutherland 2012-04-12 */
window.onload = function() {	

	var secRemain;
	var interval;
	var tDisp = document.getElementById("time");
	var cDisp = document.getElementById("count");
	var isSec = document.getElementById("inSec");
	var myChime = document.getElementById("chime");
	var myT;
	var myCount = 0;
	var stopButton = document.getElementById("stop");
	var startButton = document.getElementById("start");
	var setButton = document.getElementById("set");
	var resetButton = document.getElementById("reset");
	
	// FUNCTIONS
	function printFormatedTime() { //console.log('formatTime + write to page')	
		var mins = Math.floor(secRemain / 60); // turn seconds into mm:22;		
		var secs = secRemain - (mins * 60);	//console.log("mins ="+ mins);

		// add a leading zeroif sec < 10	
		if (secs < 10) {
			secs = "0"+ secs;
		}
		// add a leading zeroif sec < 10	
		if (mins < 10) {
			mins = "0"+ mins;
		}
			
		var theTime = mins.toString()  +":"+ secs; // conacinate with colon	
		tDisp.innerHTML = theTime; // hit the page
		//console.log("write "+theTime);
	}
		
	function incrementCount() {
		myCount++;
		if (myCount < 10) {
			myCount = "0"+ myCount;
		}
		cDisp.innerHTML = myCount;
		cDisp.style.color="#FFCC33";
	}
		
	function finish() { //console.log("finish");
		if (window.HTMLAudioElement) {
		  myChime.play(); 
		} else {
		 alert("done!");
		}
	}
		
	function setTmr() {	//console.log("SET:");
			tDisp.style.color="#666666";
			tDisp.innerHTML = "--:--";
			
			myT = document.getElementById("tUnit").value;	
			//check is number
			if(isNaN(myT)) {
				alert("Please enter a number!");
				return;
			}
			if (isSec.checked) {
			  secRemain = myT; //console.log("secRemain set to "+secRemain);
			} else  {
			  secRemain = (myT * 60) ; //console.log("secRemain set to "+secRemain);
			}		
			
			stopButton.className="on"; 
			startButton.className="off";
			
			printFormatedTime();
			tDisp.style.color="#ffffff";
	}  
	
	function tick() { //console.log('tick');	
			
		if(secRemain <= (myT / 3)) {
			//console.log("secRemain .33% "+secRemain);
			tDisp.style.color="#FFE79F"; 
		}
		if(secRemain <= (myT / 4)) {
			//console.log("secRemain .25% "+secRemain);
			tDisp.style.color="#FFDB6F"; //#FFE900
		}
		if(secRemain <= (myT / 6)) {
			//console.log("secRemain .16% "+secRemain);
			tDisp.style.color="#FFCB2F";// #FFA200  #FF4200  #ce6631";
		}
		if(secRemain <= (myT / 8)) {
			//console.log("secRemain .12% "+secRemain);
			tDisp.style.color="#FFBF00"; //#FFBF00  #BF0000
		}
		if(secRemain <= (myT / 10)) {
			//console.log("secRemain .10% "+secRemain);
			tDisp.style.color="#FFA200";
		}
		// call fn to format time
		printFormatedTime(); 

		if (secRemain === 0) { //console.log('stop @ zero');
			clearInterval(interval);
			tDisp.style.color="#BF0000";
			finish();
			incrementCount() ;	
			setTimeout(setTmr,1000); 
			return;
		}	
		//decriment remaining time
		secRemain--;
	}
		
	function startTmr() { //console.log("START:");		
			if (secRemain === undefined) {
				secRemain = myT; //console.log(secRemain);
				//console.log("secRemain="+secRemain);
			}
			clearInterval(interval);
			interval = setInterval(tick, 1000);		
			//document.getElementById("inputArea").style.display = "none";
	}
	
	function clearTmr() {//console.log("STOP: clear interval");
		clearInterval(interval);		
	}
	
	// LISTENERS
	startButton.onclick = function () {	
		startTmr();	
		stopButton.className="off"; 
		startButton.className="on";
	};
	stopButton.onclick = function () {
		clearTmr();
		stopButton.className="on";
		startButton.className="off";
	};	
	setButton.onclick = function () {
		setTmr();
	};
	resetButton.onclick = function () {
		cDisp.innerHTML = "00";
	};
	
	setTmr();
};