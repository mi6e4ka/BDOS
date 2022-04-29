cursor = document.getElementById('cursor')
container = document.getElementById('osContainer')

var oldX = cursor.style.left;
var oldY = cursor.style.top;
var offsetX = Math.round(container.getBoundingClientRect().left)
var offsetY = Math.round(container.getBoundingClientRect().top)

document.getElementById('osContainer').addEventListener('mousemove', e => {
  cursor.style.top = oldY;
  cursor.style.left = oldX;
  oldX = Number(oldX + e.movementX);
  oldY = Number(oldY + e.movementY);
});

container.onclick = (e) => {
  container.requestPointerLock();
  if (e.which = 1){
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent('click', true, true);
    cursor.style.display = 'none';
    document.elementFromPoint(oldX+offsetX, oldY+offsetY).dispatchEvent(clickEvent);
    cursor.style.display = 'block';
  }
}