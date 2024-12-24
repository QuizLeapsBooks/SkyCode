// Disable right-click context menu
document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    alert('Right-click is disabled!');
});

// Disable specific keyboard shortcuts
document.addEventListener('keydown', (event) => {
    // List of blocked key combinations
    const blockedKeys = [
        { ctrl: true, key: 's' },  // Ctrl+S (Save)
        { ctrl: true, key: 'u' },  // Ctrl+U (View Source)
        { ctrl: true, shift: true, key: 'i' }, // Ctrl+Shift+I (Dev Tools)
        { ctrl: true, shift: true, key: 'c' }, // Ctrl+Shift+C (Inspect Element)
        { ctrl: true, shift: true, key: 'j' }, // Ctrl+Shift+J (Console)
        { ctrl: true, key: 'p' },  // Ctrl+P (Print)
    ];

    // Check if the key combination matches any in the blocked list
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

    // Disable F12 (Dev Tools)
    if (event.key === 'F12') {
        event.preventDefault();
        alert('F12 is disabled!');
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'PrintScreen' || (event.ctrlKey && event.shiftKey && event.key === 'S')) {
        alert('Screenshots are discouraged!');
        document.body.style.filter = 'blur(10px)'; // Blur content
        setTimeout(() => {
            document.body.style.filter = 'none'; // Remove blur after 2 seconds
        }, 2000);
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'PrintScreen') {
        alert('Screenshots are disabled! Your actions may be monitored.');
        navigator.clipboard.writeText('Screenshots are not allowed!'); // Clear clipboard
    }
});
// Disable right-click context menu
document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    alert('Right-click is disabled!');
});

// Handle shortcut keys
document.addEventListener('keydown', (event) => {
    const isCtrlPressed = event.ctrlKey;

    // Define shortcut actions
    const shortcutActions = {
        '1': () => window.location.href = '/templates/html-compresser.html',
        '2': () => window.location.href = '/templates/css-compress.html',
        '3': () => window.location.href = '/templates/javascript-compress.html',
        '4': () => window.location.href = '/templates/python-compress.html',
        '5': () => window.location.href = '/templates/java-compress.html',
        '6': () => window.location.href = '/templates/c-compress.html',
        '7': () => window.location.href = '/templates/c++-compress.html',
        '8': () => window.location.href = '/templates/php-compress.html',
    };

    if (isCtrlPressed && shortcutActions[event.key]) {
        event.preventDefault(); // Prevent default browser actions
        shortcutActions[event.key](); // Trigger shortcut action
    }

    // Show modal with shortcut keys on Ctrl + H
    if (isCtrlPressed && event.key === 'h') {
        event.preventDefault();
        document.getElementById('shortcutModal').classList.add('show');
    }
});

// Close modal
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('shortcutModal').classList.remove('show');
});

window.addEventListener('resize', toggleWatermarkVisibility);

// Function to toggle watermark visibility based on screen size
function toggleWatermarkVisibility() {
  const watermark = document.getElementById('watermark');
  if (window.innerWidth > 768) {
    watermark.style.display = 'block'; // Show watermark on PC
  } else {
    watermark.style.display = 'none'; // Hide watermark on mobile
  }
}

// Initial call to set the correct state
toggleWatermarkVisibility();
