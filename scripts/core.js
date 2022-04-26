async function loadFile(file){
	let base64 = await getBase64(file.files[0]);
	addFile('/downloads/'+file.files[0].name, base64);
	alert('Файл загружен!');
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function cleaner() {
	localforage.clear();
	createFileSystem();
	return 'clean done';
}

createApp('jxeInstaller', 'Установщик пакетов', 'assets/icons/jxe-installer.png');
createWindow('jxeInstaller','Выбирите jxe файл для устоновки', 'assets/icons/jxe-installer.png');
insertWindow('jxeInstaller','<input type="file" onchange="installAppFile(this)" accept=".jxe">');

createApp('explorer', 'Проводник', 'assets/icons/explorer.png');
createWindow('explorer', 'Проводник', 'assets/icons/explorer.png');

createApp('fileLoader', 'Загрузчик файлов', 'assets/icons/load-file.png');
createWindow('fileLoader', 'Выбирите файл для загрузки', 'assets/icons/load-file.png');
insertWindow('fileLoader','<input type="file" onchange="loadFile(this)">');

/*
Full add in new BETA

createApp('console', 'Терминал')
createWindow('console', 'Терминал', appColor = 'black')
*/

function createFileSystem(){
	localforage.getItem('apps', function (err, value) {
		if (value == null){
			localforage.setItem('apps', new Map(), function (err) {});
		}
	});
}
createFileSystem();

function debugFiles(){
	localforage.getItem('apps', function (err, value) {console.log(value)});
}

loadInfo('initialising apps');
localforage.getItem('apps', function (err, val) {
	val.forEach((value, key, map) => {
		if (key.split('.').pop() == 'jxe'){
			installApp(value);
		}
	});
});

function get(url){
	var request = new XMLHttpRequest();
	request.open('GET', url);
	request.responseType = 'text';

	request.onload = function() {
	  return request.response;
	};

	request.send();
}

filesUpdate()