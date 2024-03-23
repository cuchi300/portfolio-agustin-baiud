document.addEventListener('DOMContentLoaded', function() {

    
    const form = {
        nombre: '',
        email: '',
        telefono: '',
        consulta: '',
        mensaje: ''
    }
    
    const inputNombre = document.querySelector('#nombre');
    const inputEmail = document.querySelector('#email');
    const inputTelefono = document.querySelector('#telefono');
    const inputConsulta = document.querySelector('#consulta');
    const inputMensaje = document.querySelector('#mensaje');

    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');

    const spinner = document.querySelector('#spinner');

    inputNombre.addEventListener('blur', validar);
    inputEmail.addEventListener('blur', validar);
    inputTelefono.addEventListener('blur', validar);
    inputConsulta.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();

        resetFormulario();
    })

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.remove('visually-hidden');

        setTimeout(() => {
            spinner.classList.add('visually-hidden');

            resetFormulario();

            const mensaje = document.createElement('P');
            mensaje.classList.add('text-center', 'text-white', 'bg-success', 'p-3', 'text-uppercase', 'rounded', 'mt-3');
            mensaje.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(mensaje);

            setInterval(() => {
                mensaje.remove();
            }, 3000);
        }, 3000);
    }



    function validar(e) {
        if(e.target.value.trim() === ''){
            mensajeAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            form[e.target.name] = '';
            comprobarFormulario();
            return;
        }
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mensajeAlerta('El email no es valido', e.target.parentElement);
            form[e.target.name] = '';
            return;
        }
        if(e.target.id === 'telefono' && !validarTelefono(e.target.value)) {
            mensajeAlerta('El telefono es incorrecto', e.target.parentElement);
            form[e.target.name] = '';
            return;
        }
        if(e.target.id === 'telefono' && e.target.value.length < 13){
            mensajeAlerta('El telefono tiene que tener mas de 9 Numeros', e.target.parentElement);
            form[e.target.name] = '';
            return;
        }

        limpiarAlerta(e.target.parentElement);

        form[e.target.name] = e.target.value.trim().toLowerCase();
        // console.log(form);

        comprobarFormulario();
    }


    function mensajeAlerta(mensaje, target) {
        // limpiar alerta
        limpiarAlerta(target);


        const error = document.createElement('P');
        error.classList.add('text-white', 'bg-danger', 'p-3', 'rounded', 'mt-3');
        error.textContent = mensaje;

        target.appendChild(error);
    }

    function limpiarAlerta(target) {
        
        const alerta = target.querySelector('.bg-danger');
        if(alerta){
            alerta.remove();
        } 
    }

    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const comprobar = regex.test(email);

        return comprobar;
    }

    function validarTelefono(telefono) {
        const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
        const validar = regex.test(telefono);

        return validar;
    }

    function comprobarFormulario() {
        // console.log(Object.values(form).includes(''));
        if( Object.values(form).includes('') ) {
            btnSubmit.classList.add('opacity-25');
            btnSubmit.disabled = true;
            return;
        } 
        btnSubmit.classList.remove('opacity-25');
        btnSubmit.disabled = false;

    }

    function resetFormulario() {
        form.nombre = '';
        form.email = '';
        form.telefono = '';
        form.consulta = '';
        form.mensaje = '';

        formulario.reset();

        comprobarFormulario();
    }
})