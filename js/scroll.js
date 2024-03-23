document.addEventListener('scroll', () =>{
    bgMenuNegro();
    scrollEsconder();
})

// efecto colocar background negro al menu
function bgMenuNegro() {
    const header = document.querySelector('.header');
    const scrolling = window.scrollY;

    const move = 'all .3s';

    if(scrolling > 0){
        header.classList.add('shadow', 'header__dark');
        header.style.transition = move;
    } else{
        header.classList.remove('shadow', 'header__dark');
    }
}

// efecto esconder menu al hacer scroll en cualquier parte del documento
function scrollEsconder() {
    const navButton = document.getElementById('nav-button');
    const navBarToggle = document.getElementById('navbarToggle');
    const scrollWindow = window.scrollY;

    if(scrollWindow){
        navButton.classList.add('collapsed');
        navBarToggle.classList.remove('show');
    }
}