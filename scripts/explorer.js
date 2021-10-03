function addFile(path, data){
	localforage.getItem('apps', function (err, value) {
		value.set(path, data);
		localforage.setItem('apps', value, function (err) {filesUpdate();});
	});
}
function removeFile(path){
	localforage.getItem('apps', function (err, value) {
		value.delete(path);
		localforage.setItem('apps', value, function (err) {filesUpdate();});
	});
}
function filesUpdate(){
	windowFlush('explorer');
	localforage.getItem('apps', function (err, val) {
		val.forEach((value, key, map) => {
			if (key.split('.').pop() == 'jxe' && key.split('/')[1] == 'apps'){
				app = key.split('.jxe')[0].split('/').pop();
				insertWindow('explorer',`<a href=# onclick='removeApp("${app}"); filesUpdate()'>${key}</a><br>`);
			} else {
				insertWindow('explorer',`<a href=# onclick='removeFile("${key}"); filesUpdate()'>${key}</a><br>`);
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