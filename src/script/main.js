const burgerMenu = document.querySelector('.burger-menu');
const navList = document.querySelector('.header__nav-menu');
burgerMenu.addEventListener('click', e => {
    console.log(e.target);
    e.target.closest('.burger-menu').classList.toggle('burger-menu_active')
    if (burgerMenu.classList.contains('burger-menu_active')) {
        navList.classList.remove('hide')
    } else {
        navList.classList.add('hide')
    } 
})

