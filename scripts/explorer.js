function addFile(path, data){
	localforage.getItem('apps', function (err, value) {
		value.set(path, data);
		localforage.setItem('apps', value, function (err) {filesUpdate();});
	});
}
function removeFile(path){
	localforage.getItem('apps', function (err, value) {
		value.delete(path);
		localforage.setItem('apps', value, function (err) {alert('Файл удален');filesUpdate();});
	});
}
function seeFile(path){
	let appTypes = new Map([
	['png', 'foto'],
	['jpg', 'foto'],
	['jpeg', 'foto'],
	['svg', 'foto'],
	['gif', 'foto'],
	['mp4', 'video'],
	['ogv', 'video'],
	['webm', 'video'],
	['mp3', 'audio'],
	['ogg', 'audio'],
	['wav', 'audio']
	]);
	let fileType = path.split('.').pop();
	fileType = appTypes.get(fileType);
	localforage.getItem('apps', function (err, value) {
		base64 = value.get(path);
		windowFlush('explorer');
		switch (fileType){
			case 'foto':
				insertWindow('explorer', '<img src="'+base64+'">');
				break;
			case 'video':
				insertWindow('explorer', '<video width=700 autoplay controls src="'+base64+'">');
				break;
			case 'audio':
				insertWindow('explorer', '<audio autoplay controls src="'+base64+'">');
				break;
		}
		insertWindow('explorer', '<div><button onclick="filesUpdate()">Выход</button></div>');
	});
}
function filesUpdate(){
	windowFlush('explorer');
	localforage.getItem('apps', function (err, val) {
		val.forEach((value, key, map) => {
			if (key.split('.').pop() == 'jxe' && key.split('/')[1] == 'apps'){
				let appID = key.split('/').pop().split('.')[0];
				app = key.split('.jxe')[0].split('/').pop();
				insertWindow('explorer',`<div style='display: flex;'><div style='border: solid 2px; margin-top: 10px; padding: 5px; width: 8000px' onclick='openWindow("${appID}");'>${key} | Приложение</div>
<div style='border: solid 2px; margin-top: 10px; padding: 5px;' onclick='removeApp("${appID}"); filesUpdate()'>Удалить</div></div>`);
			} else {
				insertWindow('explorer',
`<div style='display: flex;'><div style='border: solid 2px; margin-top: 10px; padding: 5px; width: 8000px' onclick='seeFile("${key}");'>${key}</div>
<div style='border: solid 2px; margin-top: 10px; padding: 5px;' onclick='removeFile("${key}");'>Удалить</div></div>`);
			}
		});
	});
}
function iconsUpdate(){
	let shortcuts = document.getElementById('externalApps');
	shortcuts.innerHTML='';
	localforage.getItem('apps', function (err, val) {
		val.forEach((value, key, map) => {
			if (key.split('.').pop() == 'jxe' && key.split('/')[1] == 'apps'){
				shortcuts.innerHTML += key;
			}
		});
	});
}