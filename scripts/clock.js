function clockUpdate() {
	console.log('updating');
	var now = new Date().toLocaleString("ru", {month:'long',day:'numeric',weekday:'long',hour:'numeric',minute:'numeric',second:'numeric'}).split(', ');
	document.getElementsByClassName('hours')[0].innerHTML = now[2].split(':')[0];
	document.getElementsByClassName('minuts')[0].innerHTML = now[2].split(':')[1];
	document.getElementById('seconds').innerHTML = now[2].split(':')[2];
	document.getElementById('weekday').innerHTML = now[0];
	document.getElementById('monthday').innerHTML = now[1];
}
clockUpdate();
setInterval(clockUpdate, 1000);