function toggleBoxColor(id, onColor, onTextColor) {
    const box = document.getElementById(id);
    const currentColor = getComputedStyle(box).backgroundColor;
    const isWhite = currentColor === 'rgb(255, 255, 255)';

    if (isWhite) {
        box.style.backgroundColor = onColor;
        box.style.color = onTextColor;
    } else {
        box.style.backgroundColor = 'white';
        box.style.color = 'black';
    }
}

function red() {
    toggleBoxColor('red', 'red', 'white');
}

function blue() {
    toggleBoxColor('blue', 'blue', 'white');
}

function green() {
    toggleBoxColor('green', 'green', 'white');
}

function yellow() {
    toggleBoxColor('yellow', 'yellow', 'black');
}

function greet(event) {
    if (event) {
        event.preventDefault();
    }

    const greet = document.getElementById('greet');
    const text = document.getElementById('name').value.trim();
    if (text.length === 0) {
        greet.innerHTML = 'Hello!';
        return;
    }
    greet.innerHTML = 'Hello, ' + text + '!';
}


