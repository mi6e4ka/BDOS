cursor = document.getElementById('cursor')
var oldX = cursor.style.left;
var oldY = cursor.style.top;
document.getElementById('osContainer').addEventListener('mousemove', e => {
  cursor.style.top = oldY;
  cursor.style.left = oldX;
  oldX = Number(oldX + e.movementX / 1);
  oldY = Number(oldY + e.movementY / 1);
});
container = document.getElementById('osContainer')
container.onclick = () => {container.requestPointerLock();}