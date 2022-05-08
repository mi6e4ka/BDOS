// ADD ondrag to virtmouse

cursor = document.getElementById('cursor')
container = document.getElementById('osContainer')

var oldX = cursor.style.left;
var oldY = cursor.style.top;
var offsetX = Math.round(container.getBoundingClientRect().left);
var offsetY = Math.round(container.getBoundingClientRect().top);
var oldOver = document;
var clickEvent = document.createEvent('MouseEvents');
var mouseLock = false;
var enableVirtMouse = true; // IMPORTANT -- ADD TO SETINGS

if(enableVirtMouse){
  cursor.style.display = 'block';
}

function virMouseDown(key){
    if (key = 1){
      clickEvent.initEvent('click', true, true);
      cursor.style.display = 'none';
      document.elementFromPoint(oldX+offsetX, oldY+offsetY).dispatchEvent(clickEvent);
      cursor.style.display = 'block';
    }
}

document.addEventListener('pointerlockchange', () => {
  if(document.pointerLockElement){
    mouseLock=true;
  } else {
    mouseLock=false;
  }
}); // проверка захвата мыши

document.getElementById('osContainer').addEventListener('mousemove', e => {
  if (mouseLock){
    async function move(){
      preX = Number(oldX + e.movementX);
      preY = Number(oldY + e.movementY);
      if (preX > 0 && preX <= container.clientWidth){
        oldX = Number(oldX + e.movementX);
        cursor.style.left = oldX;
      } else if (preX < 0){
        oldX = 0;
        cursor.style.left = 0;
      } else if (preX > container.clientWidth){
        oldX = container.clientWidth;
        cursor.style.left = container.clientWidth;
      }
      if (preY > 0 && preY <= container.clientHeight){
        oldY = Number(oldY + e.movementY);
        cursor.style.top = oldY;
      } else if (preY < 0){
        oldY = 0;
        cursor.style.top = 0;
      } else if (preY > container.clientHeight){
        oldY = container.clientHeight;
        cursor.style.top = container.clientHeight;
      }
    }
    move()
    async function update(){
      clickEvent.initEvent('mouseout', true, true);
      oldOver.dispatchEvent(clickEvent);
      clickEvent.initEvent('mouseover', true, true);
      newOver.dispatchEvent(clickEvent);
      oldOver = newOver
    }
    newOver = document.elementFromPoint(oldX+offsetX, oldY+offsetY);
    if (newOver != oldOver && newOver.id != 'cursor.img') {update()}
  }
});

container.onclick = (e) => {
  if (!mouseLock && enableVirtMouse){
    container.requestPointerLock();
    cursor.style.display = 'block';
  } else if (enableVirtMouse) {
    async function click(){
      virMouseDown(e.which);
    }
    click()
  }
}