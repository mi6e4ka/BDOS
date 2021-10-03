function startCode(enter, result){
	function output(val){
		document.getElementById('coderesult').value += '\nPython JS > ' + val.toString() + '\n';
	}
	enter = enter.value
	enter = enter.replace(/print/gi, 'output');
	enter = enter.replace(/while /gi, 'while (');
	enter = enter.replace(/if /gi, 'if (');
	enter = enter.replace(/else:/gi, 'else{');
	enter = enter.replace(/:/gi, '){');
	enter = enter.replace(/ and /gi, '&&');
	enter = enter.replace(/ or /gi, '||');
	enter += '\n';
	tab = false;
	enter_s = enter.split('\n');
	for (i in enter_s){
		console.log(tab)
		if (enter_s[i].indexOf('    ') != -1 || enter_s[i].indexOf('\t') != -1){
			tab = true;
		}
		if (tab && (enter_s[i].indexOf('    ') == -1 || enter_s[i].indexOf('\t') == -1)){ 
			tab = false;
			enter_s[i] = '}' + enter_s[i];
		}
	}
	enter = '';
	for (i in enter_s){
		enter += enter_s[i] + '\n';
	}
	console.log(enter);
	eval(enter);
	document.getElementById('coderesult').scrollTop = document.getElementById('coderesult').scrollHeight - document.getElementById('coderesult').clientHeight;
}

document.addEventListener( 'keydown', function( event ){

	if( 'TEXTAREA' !== event.target.tagName )
		return

	// not tab
	if( event.code !== 'Tab' )
		return

	event.preventDefault()

	// Opera, FireFox, Chrome
	let textarea     = event.target
	let selStart     = textarea.selectionStart
	let selEnd       = textarea.selectionEnd
	let before       = textarea.value.substring( 0, selStart )
	let slection     = textarea.value.substring( selStart, selEnd )
	let after        = textarea.value.substr( selEnd )
	let slection_new = ''

	// remove TAB indent
	if( event.shiftKey ){

		// fix selection
		let selectBefore = before.substr( before.lastIndexOf( '\n' ) + 1 )
		let isfix = /^\s/.test( selectBefore )
		if( isfix ){
			let fixed_selStart = selStart - selectBefore.length
			before   = textarea.value.substring( 0, fixed_selStart )
			slection = textarea.value.substring( fixed_selStart, selEnd )
		}

		let once = false 
		slection_new = slection.replace( /^(\t|[ ]{2,4})/gm, ( mm )=>{

			if( isfix && ! once ){
				once = true // do it once - for first line only
				selStart -= mm.length
			}

			selEnd -= mm.length
			return ''
		})
	}
	// add TAB indent
	else {
		selStart++

		// has selection
		if( slection.trim() ){
			slection_new = slection.replace( /^/gm, ()=>{
				selEnd++
				return '\t'
			})
		}
		else {
			slection_new = '\t'
			selEnd++
		}
	}

	textarea.value = before + slection_new + after

	// cursor
	textarea.setSelectionRange( selStart, selEnd )
});