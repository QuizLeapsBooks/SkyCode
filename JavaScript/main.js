document.getElementById('myButton1').addEventListener('click', function() {
    window.location.href = 'https://quizleapsbooks.github.io/SkyCode/templates/profile.html';
});
document.getElementById('myButton2').addEventListener('click', function() {
    window.location.href = 'https://quizleapsbooks.github.io/SkyCode/templates/dashboard.html';
});
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey && e.key === 'c') || (e.ctrlKey && e.key === 'x') || (e.ctrlKey && e.key === 'v') || (e.ctrlKey && e.key === 'u') || (e.ctrlKey && e.key === 's')) {
        e.preventDefault();
    }
});