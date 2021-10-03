async function loadFile(file){
	let a = await getBase64(file.files[0]);
	alert(a);
	addFile('/downloads/'+file.files[0].name, a);
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

createApp('jxeInstaller', 'Установщик пакетов');
createWindow('jxeInstaller','Выбирите jxe файл для устоновки');
insertWindow('jxeInstaller','<input type="file" onchange="installAppFile(this)" accept=".jxe">');

createApp('explorer', 'Проводник');
createWindow('explorer', 'Проводник');

createApp('fileLoader', 'Загрузчик файлов');
createWindow('fileLoader', 'Выбирите файл для загрузки');
insertWindow('fileLoader','<input type="file" onchange="loadFile(this)">');

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
			installApp(value, key.split('/').pop());
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