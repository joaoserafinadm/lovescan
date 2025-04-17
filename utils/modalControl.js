export function showModalBs(id) {

    var myModal = new bootstrap.Modal(document.getElementById(id))
    myModal?.show()
}

export function closeModal() {
    const handleCloseModalOnBack = (event) => {

        const backdrop = document.querySelectorAll('.modal-backdrop.show');
        const body = document.querySelector('.modal-open');


        if (backdrop && body) {
            event.preventDefault();
            for (let i = 0; i < backdrop.length; i++) {
                backdrop[i].remove()
                body.style.overflow = ''
            }

        }
    };

    // Adicionar o ouvinte de evento popstate
    window.addEventListener('popstate', handleCloseModalOnBack);

    // Remover o ouvinte de evento popstate ao desmontar o componente
    return () => {
        window.removeEventListener('popstate', handleCloseModalOnBack);
    };
}