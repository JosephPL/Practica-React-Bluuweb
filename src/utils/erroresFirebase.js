export const erroresFirebase = (code) => {
    switch(code){
        case 'auth/email-already-in-use':
          return 'Este correo ya esta registrado';
        case 'auth/invalid-email':
          return 'Formato email no valido';
        case 'auth/user-not-found':
          return 'El usuario no existe';
          case 'auth/wrong-password':
            return 'Contraseña incorrecta';
        default :
          return 'Ocurrio un error en el server';
      }
};