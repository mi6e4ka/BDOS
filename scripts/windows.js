openWindows = new Map();
openM = false;

function dragWindow(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  let timeoutArea = document.addEventListener('mouseover', isHover);
	window.mouseOver = false;
	function isHover(e) {
		window.mouseOver = e.target.tagName === 'DIV';
	};
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
	if (e.which == 3){
		return
	}
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
	document.onmousemove = elementDrag;
  }

  function elementDrag(e, mouseOver) {
    e = e || window.event;
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    if (window.mouseOver) {
	    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
	    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    } else {
    	closeDragElement();
    }
  }

  function closeDragElement() {
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
window.addEventListener("mouseup", function(e){
    if ( event.target.id != 'barMenu' && event.target.id != 'menuIcon' && document.getElementById('barMenu').classList.contains("active")) {
		document.getElementById('barMenu').classList.remove("active");
    };
});