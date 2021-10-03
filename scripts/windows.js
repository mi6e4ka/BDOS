openWindows = new Map();
openM = false;
function dragWindow(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  console.log(document.getElementById(elmnt.id + "header"));
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
	if (e.which == 3){
		return
	}
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
	document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function closeWindow(window){
	openWindows.delete(window);
	document.getElementById(window).style.display='none';
	updateBar();
}

function openWindow(window){
	if (!openWindows.has(window)){
		document.getElementById(window).style.top='';
		document.getElementById(window).style.left='';
	}
	openWindows.set(window, 1);
	document.getElementById(window).style.display='block';
	dragWindow(document.getElementById(window));
	updateBar();
}
function minimizWindow(window){
	openWindows.set(window, 0);
	document.getElementById(window).style.display='none';
	updateBar();
}
function updateBar(){
	mL = document.getElementById('minEl');
	mL.innerHTML = '';
	openWindows.forEach(function(item, i, arr){
		op = 1;
		if (item == 0){
			op = 0.5;
		}
		mL.innerHTML += `<div class='minIcon' style='background-image: url(assets/icons/console.png);opacity: ${op}' onclick='openWindow("${i}")'></div>`;
	});
}
function openMenu(){
	document.getElementById('barMenu').classList.toggle("active");
}

document.onmouseup = function(e){
    if ( event.target.id != 'barMenu' && event.target.id != 'menuIcon' && document.getElementById('barMenu').classList.contains("active")) {
		document.getElementById('barMenu').classList.remove("active");
    };
};