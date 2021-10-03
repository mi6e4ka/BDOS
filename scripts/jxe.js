localforage.getItem('apps', function (err, val) {
	val.forEach((value, key, map) => {
		eval(value);
		document.getElementById('barMenu').innerHTML += `<span class='menuElement' onclick='openWindow("${appID}")'>${key} -> ${appID}</span><br><br>`;
	});
});

function addFile(path, data){
	localforage.getItem('apps', function (err, value) {
		localforage.setItem('apps', value.set(path, data), function (err) {});
	});
}

function createWindow(appName, title, titleIcon='assets/icons/console.png', appColor='white'){
	document.getElementById('windows').innerHTML+=`
<div id='`+appName+`' class='window' style=''>
	<div id='`+appName+`header' class='header'>
		<div class='window-img' style='background-image: url(`+titleIcon+`)'></div>
		&nbsp;&nbsp;&nbsp;`+title+`&nbsp;
		<div onmousedown="closeWindow('`+appName+`')" onmouseout="this.style.background='white'" onmouseover="this.style.background='red'" class='close-window'>&nbsp;✖&nbsp;</div>
		<div onmousedown="minimizWindow('`+appName+`')" onmouseout="this.style.background='white'" onmouseover="this.style.background='#cacaca'" class='minimiz-window'>&nbsp;-&nbsp;</div>
	</div>
	<div class='winbody' id='`+appName+`body' style='position: absolute; background: `+appColor+`'>
	</div>
</div>	
`;
}
function createApp(appName, appText, iconUrl='assets/icons/console.png'){
	appID = appName;
	document.getElementById('shortcuts').innerHTML+=`
		<span class='icon' onclick='openWindow("`+appName+`")'>
			<div class='icon-img' style='background-image: url(`+iconUrl+`)'></div>
			<span class='icon-text'>`+appText+`.jxe</span>
		</span>
		<br>
`
}

//-- Добавление в программу --//
function insertWindow(appName, html){
	document.getElementById(appName+'body').innerHTML+=html;
}
function createButton(appName, id, text='Кнопка', f='push(id)', x=0, y=0){
	insertWindow(appName,`<button id=${id+appName} style="position: absolute; top: ${y}; left: ${x}" onclick='${f}'>${text}</button>`);
	console.log(`<button id=${id+appName} style="position: absolute; top: ${y}; left: ${x}" onclick='${f}'>${text}</button>`);
}
function createLable(appName, id, text='Тут надпись', x=0, y=0){
	insertWindow(appName,`<span id=${id+appName} style="position: absolute; top: ${y}; left: ${x}">${text}</span>`);
}
function createImage(appName, id, imageUrl, w, x, y){
	insertWindow(appName,`<img id=${id+appName} width='${w}' src='${imageUrl}' style="position: absolute; top: ${y}; left: ${x}"></img>`);
}
// -- //
function updateElement(appName, id, text='', f='', imageUrl='', w='', x=0, y=0, type){
	switch(type){
		case 'lable':
			
			break;
		case 'image':
			
			break;
		case 'button':
			
			break;
	}
}

//createApp('testApp', 'testapp');
//createWindow('testApp','Заголовок (Размер пространства 800x400)');
//insertWindow('testApp','Этот текст был добавлен при помощи функции inseertWindow');
//createLable('testApp', 1, 'Этот текст был добавлен при помощи функции createLable', 50, 30);
//createButton('testApp', 2, 'Нажми', 'alert("Эта кнопка была добавленна при помощи функции createButton")', 30, 80);
//createLable('testApp', 3, "<a href='https://yandex.ru'>Полная документация</a>", 30, 300);
createApp('jxeInstaller', 'Установщик пакетов');
createWindow('jxeInstaller','Выбирите jxe файл для устоновки');
insertWindow('jxeInstaller','<input type="file" onchange="installApp(this)" accept=".jxe">');
//localforage.clear();

localforage.getItem('apps', function (err, value) {
	if (value == null){
		localforage.setItem('apps', new Map(), function (err) {});
		}
});

function installApp(input) {
  let file = input.files[0];
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function() {
    eval(reader.result);
	let path = '/apps/'+file.name;
	addFile(path, reader.result);
	document.getElementById('barMenu').innerHTML += `<span class='menuElement' onclick='openWindow("${appID}")'>${path} -> ${appID}</span><br><br>`;
  };
}

//function update(){
//	localforage.getItem('apps', function (err, value) {console.log(value)});
//}
//setInterval(update, 1000)
//	localforage.getItem('apps', function (err, value) {alert(value)});
//  localforage.clear();