/* eslint-disable */
function getParameterByName (name, url = window.location.href) {
	name = name.replace(/[\[\]]/g, '\\$&');
	let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
let tipo = getParameterByName('type');
if (tipo === 'botadded') {
	toastr.options = {
		'closeButton': true,
		'debug': false,
		'newestOnTop': false,
		'progressBar': true,
		'positionClass': 'toast-top-right',
		'preventDuplicates': false,
		'onclick': null,
		'showDuration': '300',
		'hideDuration': '1000',
		'timeOut': '5000',
		'extendedTimeOut': '1000',
		'showEasing': 'swing',
		'hideEasing': 'linear',
		'showMethod': 'fadeIn',
		'hideMethod': 'fadeOut'
	};
	toastr.success('O Bot foi adicionado a fila de espera!', 'Sucesso!');
}
else if (tipo === 'botedited') {
	toastr.options = {
		'closeButton': true,
		'debug': false,
		'newestOnTop': false,
		'progressBar': true,
		'positionClass': 'toast-top-right',
		'preventDuplicates': false,
		'onclick': null,
		'showDuration': '300',
		'hideDuration': '1000',
		'timeOut': '5000',
		'extendedTimeOut': '1000',
		'showEasing': 'swing',
		'hideEasing': 'linear',
		'showMethod': 'fadeIn',
		'hideMethod': 'fadeOut'
	};
	toastr.success('O Bot foi editado com sucesso!', 'Sucesso!');
}
else if (tipo === 'approved') {
	toastr.options = {
		'closeButton': true,
		'debug': false,
		'newestOnTop': false,
		'progressBar': true,
		'positionClass': 'toast-top-right',
		'preventDuplicates': false,
		'onclick': null,
		'showDuration': '300',
		'hideDuration': '1000',
		'timeOut': '5000',
		'extendedTimeOut': '1000',
		'showEasing': 'swing',
		'hideEasing': 'linear',
		'showMethod': 'fadeIn',
		'hideMethod': 'fadeOut'
	};
	toastr.success('O Bot foi aprovado com sucesso!', 'Sucesso!');
}
else if (tipo === 'edited') {
	toastr.options = {
		'closeButton': true,
		'debug': false,
		'newestOnTop': false,
		'progressBar': true,
		'positionClass': 'toast-top-right',
		'preventDuplicates': false,
		'onclick': null,
		'showDuration': '300',
		'hideDuration': '1000',
		'timeOut': '5000',
		'extendedTimeOut': '1000',
		'showEasing': 'swing',
		'hideEasing': 'linear',
		'showMethod': 'fadeIn',
		'hideMethod': 'fadeOut'
	};
	toastr.success('O Bot foi editado com sucesso!', 'Sucesso!');
}
else if (tipo === 'reproved') {
	toastr.options = {
		'closeButton': true,
		'debug': false,
		'newestOnTop': false,
		'progressBar': true,
		'positionClass': 'toast-top-right',
		'preventDuplicates': false,
		'onclick': null,
		'showDuration': '300',
		'hideDuration': '1000',
		'timeOut': '5000',
		'extendedTimeOut': '1000',
		'showEasing': 'swing',
		'hideEasing': 'linear',
		'showMethod': 'fadeIn',
		'hideMethod': 'fadeOut'
	};
	toastr.success('O Bot foi reprovado com sucesso!', 'Sucesso!');
}
else if (tipo === 'already') {
	toastr.options = {
		'closeButton': true,
		'debug': false,
		'newestOnTop': false,
		'progressBar': true,
		'positionClass': 'toast-top-right',
		'preventDuplicates': false,
		'onclick': null,
		'showDuration': '300',
		'hideDuration': '1000',
		'timeOut': '5000',
		'extendedTimeOut': '1000',
		'showEasing': 'swing',
		'hideEasing': 'linear',
		'showMethod': 'fadeIn',
		'hideMethod': 'fadeOut'
	};
	toastr.error('O Bot já se encontra em nosso sistema!', 'Erro!');
} else if (tipo === 'alderayvoted') {
	toastr.options = {
		'closeButton': true,
		'debug': false,
		'newestOnTop': false,
		'progressBar': true,
		'positionClass': 'toast-top-right',
		'preventDuplicates': false,
		'onclick': null,
		'showDuration': '300',
		'hideDuration': '1000',
		'timeOut': '5000',
		'extendedTimeOut': '1000',
		'showEasing': 'swing',
		'hideEasing': 'linear',
		'showMethod': 'fadeIn',
		'hideMethod': 'fadeOut'
	};
	toastr.error('Você já votou hoje, volte novamente amanhã!', 'Erro!');
} else if (tipo === 'voted') {
	toastr.options = {
		'closeButton': true,
		'debug': false,
		'newestOnTop': false,
		'progressBar': true,
		'positionClass': 'toast-top-right',
		'preventDuplicates': false,
		'onclick': null,
		'showDuration': '300',
		'hideDuration': '1000',
		'timeOut': '5000',
		'extendedTimeOut': '1000',
		'showEasing': 'swing',
		'hideEasing': 'linear',
		'showMethod': 'fadeIn',
		'hideMethod': 'fadeOut'
	};
	toastr.success('Você votou no bot!', 'Sucesso!');
} else if (tipo === 'generated') {
	toastr.options = {
		'closeButton': true,
		'debug': false,
		'newestOnTop': false,
		'progressBar': true,
		'positionClass': 'toast-top-right',
		'preventDuplicates': false,
		'onclick': null,
		'showDuration': '300',
		'hideDuration': '1000',
		'timeOut': '5000',
		'extendedTimeOut': '1000',
		'showEasing': 'swing',
		'hideEasing': 'linear',
		'showMethod': 'fadeIn',
		'hideMethod': 'fadeOut'
	};
	toastr.success('A Chave api foi gerada!', 'Sucesso!');
} else if (tipo === 'report') {
	toastr.options = {
		'closeButton': true,
		'debug': false,
		'newestOnTop': false,
		'progressBar': true,
		'positionClass': 'toast-top-right',
		'preventDuplicates': false,
		'onclick': null,
		'showDuration': '300',
		'hideDuration': '1000',
		'timeOut': '5000',
		'extendedTimeOut': '1000',
		'showEasing': 'swing',
		'hideEasing': 'linear',
		'showMethod': 'fadeIn',
		'hideMethod': 'fadeOut'
	};
	toastr.success('O Servidor foi reportado para nossa equipe!', 'Sucesso!');
} else if (tipo === 'editedsv') {
	toastr.options = {
		'closeButton': true,
		'debug': false,
		'newestOnTop': false,
		'progressBar': true,
		'positionClass': 'toast-top-right',
		'preventDuplicates': false,
		'onclick': null,
		'showDuration': '300',
		'hideDuration': '1000',
		'timeOut': '5000',
		'extendedTimeOut': '1000',
		'showEasing': 'swing',
		'hideEasing': 'linear',
		'showMethod': 'fadeIn',
		'hideMethod': 'fadeOut'
	};
	toastr.success('O Servidor foi editado!', 'Sucesso!');
}