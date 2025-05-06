// Tab switching logic
const tabs = document.querySelectorAll('.tab-btn');
const htmlEditor = document.getElementById('html-code');
const cssEditor = document.getElementById('css-code');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        if (tab.dataset.tab === 'html') {
            htmlEditor.classList.remove('hidden');
            cssEditor.classList.add('hidden');
        } else if (tab.dataset.tab === 'css') {
            cssEditor.classList.remove('hidden');
            htmlEditor.classList.add('hidden');
        }
    });
});

// Run button logic
document.getElementById('run-btn').addEventListener('click', () => {
    const htmlContent = htmlEditor.value;
    const cssContent = `<style>${cssEditor.value}</style>`;
    const output = document.getElementById('output');

    output.srcdoc = `${cssContent}${htmlContent}`;
});
