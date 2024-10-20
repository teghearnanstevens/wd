
const themeSelector = document.getElementById('theme-selector');

themeSelector.addEventListener('change', changeTheme);

function changeTheme() {
   
    const selectedTheme = themeSelector.value;

    const body = document.body;
    const logo = document.querySelector('.footer img');

    if (selectedTheme === 'dark') {
    
        body.classList.add('dark');
        
        logo.src = 'byui-logo_black.png';
    } else {
        
        body.classList.remove('dark');
       
        logo.src = 'byui-logo_blue.webp';
    }
}