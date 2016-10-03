export const ERROR_REQUIRED_FIELD = 'Campo necesario';
export const ERROR_EMAIL = 'No es un email válido';
export const ERROR_RESPONSE_EMPTY = 'No response returned from fetch';
export const ERROR_RESPONSE_NOT_JSON = 'Problemas con la conexión del servidor';
export const ERROR_PASS_NOT_EQUAL = 'Las contraseñas no coinciden';
export const ERROR_PASS_SHORT = 'Contraseña muy corta(minimo 8 caracteres)';
export const CARGANDO_IMAGEN = 'Cargando imágenes';
export const SUCCES_CREATE_ANIMAL = 'Nuevo animal creado con exito';
export const GALLERY_LOAD_ERROR = 'Ocurrio un error con las imagenes, puede que no todas las imagenes hayan sido agregadas a la galeria';
export const GALLERY_ADD_IMAGEN = (cantImgs) => {
                                    return 'Se agregaron '+ cantImgs +' nuevas fotos a la galeria';
                                  };
export const ERROR_LESS_DATE = 'Debe ser menor o igual a la fecha actual';
export const ERROR_GREATER_DATE = (dateMsg) => {
                                    return `Debe ser mayor a la fecha de ${dateMsg}`;
                                  };
export const SUCCES_CREATE_EVENT = 'Nuevo evento creado con exito';
export const REMOVE_IMAGE_MESSAGE = 'Estás seguro que desea borrar esta imagen?';
export const REMOVE_IMAGE_TITLE = 'BORRAR IMAGEN';
