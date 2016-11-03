export const ERROR_AUTHENTICATION = 'Login incorrecto, por favor revise mail y/o contraseña';
export const ERROR_REQUIRED_FIELD = 'Campo necesario';
export const ERROR_EMAIL = 'No es un email válido';
export const ERROR_RESPONSE_EMPTY = 'No response returned from fetch';
export const ERROR_RESPONSE_NOT_JSON = 'Problemas con la conexión del servidor';
export const ERROR_PASS_NOT_EQUAL = 'Las contraseñas no coinciden';
export const ERROR_PASS_SHORT = 'Contraseña muy corta(minimo 8 caracteres)';
export const CARGANDO_IMAGEN = 'Cargando imágenes';
export const SUCCES_CREATE_ANIMAL = 'Nuevo animal creado con exito';
export const GALLERY_LOAD_ERROR = 'Ocurrió un error con las imagenes, puede que no todas las imagenes hayan sido agregadas a la galeria';
export const GALLERY_ADD_IMAGEN = (cantImgs) => {
                                    return 'Se agregaron '+ cantImgs +' nuevas fotos a la galeria';
                                  };
export const ERROR_LESS_DATE = 'Debe ser menor o igual a la fecha actual';
export const ERROR_GREATER_DATE = (dateMsg) => {
                                    return `Debe ser mayor a la fecha de ${dateMsg}`;
                                  };
export const SUCCES_CREATE_EVENT = 'Nuevo evento creado con éxito';
export const REMOVE_IMAGE_MESSAGE = '¿Está seguro que desea borrar esta imagen?';
export const REMOVE_IMAGE_TITLE = 'BORRAR IMAGEN';
export const ERROR_EMPTY_RACE = 'Raza no puede ser vacío';
export const ERROR_EMPTY_NAME = 'Nombre no puede ser vacío';
export const SELECCIONE_UN_ANIMAL = 'Debe seleccionar un animal para poder descargar su ficha';
export const REPORTE_CREADO = 'Se esta generando el reporte';
export const REPORTE_TERMINADO = 'El reporte ya esta listo';
export const REPORTE_YA_CREADO = 'El reporte ya existe en la lista de reportes';
export const FICHA_CREADO = 'Se esta generando la ficha para el animal';
export const FICHA_TERMINDA = 'Se ha terminado de realizar la ficha de un animal';
export const FICHA_YA_CREADA = 'Ya existe la ficha para este animal, vea la sección de reportes';
export const SUCCESS_CREATE_ADOPTER = 'Nuevo adoptante creado con exito';
export const SUCCESS_UPDATE_ADOPTER = 'El adoptante se ha modificado con exito';
export const ERROR_CI = 'No es una CI válida';
export const ERROR_PHONE = 'No es un teléfono válido';
export const ERROR_EMPTY_FULLNAME = 'Ingrese nombre y apellido';
export const ADD_BLACK_LIST_TITLE = 'AGREGAR ADOPTANTE A BLACKLIST';
export const ADD_BLACK_LIST_MESSAGE_QUESTION = '¿Estás seguro que deseas agregar este adoptante a la blacklist?';
export const ADD_BLACK_LIST_MESSAGE_HAVE_ANIMAL = '<br/>El Adoptante tiene animales en adopcion, estos se desvincularan al continuar con la accion';
export const ADD_BLACK_LIST_MESSAGE = (animalsSize) => {
    return `${ADD_BLACK_LIST_MESSAGE_QUESTION}${animalsSize ? ADD_BLACK_LIST_MESSAGE_HAVE_ANIMAL : ''}`;
  };
export const ADD_BLACK_LIST_SUCCES = 'Se ha agregado al adoptante a la lista negra';
export const SUCCESS_ADOPTION_ANIMAL = 'El animal fue adoptado con éxito';
export const SUCCESS_ADOPTION_ANIMALS = 'Los animales fueron adoptados con éxito';
export const ERROR_ADOPTION_ANIMAL = 'Ocurrió un error al adoptar los animales, puede que no todos los animales hayan sido adoptados';
export const ERROR_DATE_FILTER = 'Rango Invalido';

export const ERROR_STATISTIC_RANGE = 'El rango máximo es 3 meses';

export const ERROR_NOT_AUTHORIZED = 'No autorizado';
