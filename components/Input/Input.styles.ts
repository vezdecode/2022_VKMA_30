function getAdditionalStyles(isDanger: boolean | undefined, isFocus: boolean | undefined): string {
	let classes = [];
	
	if(isDanger) {
		classes.push('border-2');
		classes.push('border-red');
	}

	if(isFocus) {
		classes.push('border-2');
		classes.push('border-staticPrimary');
	}

	return classes.join(' ');
}

export {
	getAdditionalStyles,
};
