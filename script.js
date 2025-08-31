

document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    let fontSize = 16; // tamanho em px
	
    // aumentar fonte
    window.increaseFont = () => {
        fontSize += 2;
        root.style.fontSize = `${fontSize}px`;
    };

    // diminuir fonte
    window.decreaseFont = () => {
        if (fontSize > 12) {
            fontSize -= 2;
            root.style.fontSize = `${fontSize}px`;
        }
    };
	
});