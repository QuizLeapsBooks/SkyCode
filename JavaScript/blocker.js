// Disable right-click context menu
document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    alert('Right-click is disabled!');
});

// Disable specific keyboard shortcuts
document.addEventListener('keydown', (event) => {
    // List of blocked key combinations
    const blockedKeys = [
        { ctrl: true, key: 's' },  
        { ctrl: true, key: 'u' }, 
        { ctrl: true, shift: true, key: 'i' },
        { ctrl: true, shift: true, key: 'c' }, 
        { ctrl: true, shift: true, key: 'j' }, 
        { ctrl: true, key: 'p' },  
    ];

    for (const block of blockedKeys) {
        if (
            (block.ctrl && !event.ctrlKey) ||
            (block.shift && !event.shiftKey) ||
            (block.key && block.key !== event.key.toLowerCase())
        ) {
            continue;
        }
        event.preventDefault();
        alert('Shortcut is disabled due to security purpose .');
        return;
    }

    if (event.key === 'F12') {
        event.preventDefault();
        alert('F12 is disabled!');
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'PrintScreen' || (event.ctrlKey && event.shiftKey && event.key === 'S')) {
        alert('Screenshots are discouraged!');
        document.body.style.filter = 'blur(10px)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 2000);
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'PrintScreen') {
        alert('Screenshots are disabled! Your actions may be monitored.');
        navigator.clipboard.writeText('Screenshots are not allowed!'); // Clear clipboard
    }
});

document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    alert('Right-click is disabled!');
});

document.addEventListener('keydown', (event) => {
    const isCtrlPressed = event.ctrlKey;

    const shortcutActions = {
        '1': () => window.location.href = 'https://quizleapsbooks.github.io/SkyCode/templates/html-compresser.html',
        '2': () => window.location.href = 'https://quizleapsbooks.github.io/SkyCode/templates/css-compress.html',
        '3': () => window.location.href = 'https://quizleapsbooks.github.io/SkyCode/templates/javascript-compress.html',
        '4': () => window.location.href = 'https://quizleapsbooks.github.io/SkyCode/templates/python-compress.html',
        '5': () => window.location.href = 'https://quizleapsbooks.github.io/SkyCode/templates/java-compress.html',
        '6': () => window.location.href = 'https://quizleapsbooks.github.io/SkyCode/templates/c-compress.html',
        '7': () => window.location.href = 'https://quizleapsbooks.github.io/SkyCode/templates/c++-compress.html',
        '8': () => window.location.href = 'https://quizleapsbooks.github.io/SkyCode/templates/php-compress.html',
    };

    if (isCtrlPressed && shortcutActions[event.key]) {
        event.preventDefault();
        shortcutActions[event.key](); 
    }

    // Show modal with shortcut keys on Ctrl + H
    if (isCtrlPressed && event.key === 'h') {
        event.preventDefault();
        document.getElementById('shortcutModal').classList.add('show');
    }
});

document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('shortcutModal').classList.remove('show');
});

window.addEventListener('resize', toggleWatermarkVisibility);

function toggleWatermarkVisibility() {
  const watermark = document.getElementById('watermark');
  if (window.innerWidth > 768) {
    watermark.style.display = 'block';
  } else {
    watermark.style.display = 'none'; 
  }
}


toggleWatermarkVisibility();
