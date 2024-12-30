export const initMenu = () => {
    const dropdowns = document.querySelectorAll('.relative');

    dropdowns.forEach((dropdown) => {
        const submenu = dropdown.querySelector('.submenu');

        if (submenu) {
            dropdown.addEventListener('mouseenter', () => {
                submenu.style.display = 'block';
                setTimeout(() => {
                    submenu.style.opacity = '1';
                }, 10);
            });

            dropdown.addEventListener('mouseleave', () => {
                submenu.style.opacity = '0';
                setTimeout(() => {
                    submenu.style.display = 'none';
                }, 300);
            });
        }
    });
};
