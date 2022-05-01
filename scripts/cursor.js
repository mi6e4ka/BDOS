cursor = document.getElementById('cursor')
container = document.getElementById('osContainer')

var oldX = cursor.style.left;
var oldY = cursor.style.top;
var offsetX = Math.round(container.getBoundingClientRect().left);
var offsetY = Math.round(container.getBoundingClientRect().top);
var oldOver = document;
var clickEvent = document.createEvent('MouseEvents');

document.getElementById('osContainer').addEventListener('mousemove', e => {
  async function move(){
    cursor.style.top = oldY;
    cursor.style.left = oldX;
    oldX = Number(oldX + e.movementX);
    oldY = Number(oldY + e.movementY);
  }
  move()
  async function update(){
    clickEvent.initEvent('mouseout', true, true);
    oldOver.dispatchEvent(clickEvent);
    clickEvent.initEvent('mouseover', true, true);
    newOver.dispatchEvent(clickEvent);
    //console.log('mouseover', newOver)
    //console.log('mouseout', oldOver)
    oldOver = newOver
  }
  newOver = document.elementFromPoint(oldX+offsetX, oldY+offsetY);
  if (newOver != oldOver && newOver.id != 'cursor.img') {update()}
});

container.onclick = (e) => {
  async function click(){
    container.requestPointerLock();
    cursor.style.display = 'block';
    if (e.which = 1){
      clickEvent.initEvent('click', true, true);
      cursor.style.display = 'none';
      document.elementFromPoint(oldX+offsetX, oldY+offsetY).dispatchEvent(clickEvent);
      cursor.style.display = 'block';
    }
  }
  click()
}

container.ondrag = (e) => {
  alert(123)
}