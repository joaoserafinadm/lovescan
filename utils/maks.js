export function maskName(number) {

	number = number?.replace(/\s/g, ''); //Não pode ter espaço
	return number;
}