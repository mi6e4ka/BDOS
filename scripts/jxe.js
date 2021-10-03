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
<span id='${appID}icon' class='icon' onclick='openWindow("${appName}")'>
	<div class='icon-img' style='background-image: url(${iconUrl})'></div>
	<span class='icon-text'>${appText}.jxe</span>
<br>
</span>
`
}

function removeApp(appName){
	document.getElementById(appName).remove();
	document.getElementById(appName+'icon').remove();
	document.getElementById(appName+'link').remove();
	removeFile(`/apps/${appName}.jxe`);
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

function installAppFile(input){
	let file = input.files[0];
	let reader = new FileReader();
	reader.readAsText(file);
	reader.onload = function() {
		installApp(reader.result, file.name);
	};
}

function installApp(file, name) {
	eval(file);
	let path = '/apps/'+name;
	addFile(path, file);
	document.getElementById('barMenu').innerHTML += `<div id='${appID}link'><span class='menuElement' 
	onclick='openWindow("${appID}")'>${path} -> ${appID}</span><br><br></div>`;
}
function windowFlush(appName){
	document.getElementById(appName+'body').innerHTML = '';
	return true;
}