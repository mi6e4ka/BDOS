let loader = document.getElementById('loader');
window.onload = function() {
    loader.style.display = 'none'
};
loader.innerHTML = 'WebOS ' + build_version + ' by mi6e4ka'
loader.innerHTML += '<br>[INFO] system startup'
function loadInfo(info) {
	loader.innerHTML += '<br>[INFO] ' + info;
}