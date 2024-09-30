const startButton = document.getElementById('startButton');
const targetDiv = document.getElementById('targetDiv');

function display() {
  setTimeout(() => {
    startButton.remove();
    targetDiv.classList.add('active');
  }, 1000);
}

startButton.addEventListener('click', display);
