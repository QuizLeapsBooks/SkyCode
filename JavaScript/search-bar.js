document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    const menuCards = document.querySelectorAll('.menu-card');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();

        menuCards.forEach(card => {
            const cardText = card.querySelector('.menu-info h3').textContent.toLowerCase();

            if (cardText.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
