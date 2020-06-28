const toggler = document.querySelector('.toggler')
const navLinks = document.querySelector('.nav-links')

toggler.addEventListener('click',(e)=>{
    console.log('click');
    navLinks.classList.toggle('active');
})
