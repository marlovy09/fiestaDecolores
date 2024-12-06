const title = document.getElementById('party-title');
const colorPista = document.getElementById('color-pista');
const addColorButton = document.getElementById('add-color');
const resetButton = document.getElementById('reset-pista');
const popularColor = document.getElementById('popular-color');
const soundEffect = document.getElementById('sound-effect');

// Lista de sonidos
const sounds = ['sonidos/aplausos.mp3', 'sonidos/campanas.mp3'];

let colorVotes = {};
let timer;

// Función para agregar un nuevo color
function addColor() {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const colorBox = document.createElement('div');
  colorBox.classList.add('color-box');
  colorBox.style.backgroundColor = randomColor;
  colorBox.dataset.color = randomColor;

  // Evento para iluminar título, reproducir sonido y contar votos
  colorBox.addEventListener('click', () => {
    title.style.color = randomColor; // Cambia el color del título

    // Selecciona un sonido aleatorio
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    soundEffect.src = randomSound; //
    soundEffect.currentTime = 0; //
    soundEffect.play(); // Reproduce el sonido

    // Contar votos
    colorVotes[randomColor] = (colorVotes[randomColor] || 0) + 1;
    updatePopularColor();

    resetTimer();
  });

  colorPista.appendChild(colorBox);
}

// Actualizar el color más popular
function updatePopularColor() {
  const maxColor = Object.keys(colorVotes).reduce((a, b) => colorVotes[a] > colorVotes[b] ? a : b, 'Ninguno');
  popularColor.textContent = `Color más popular: ${maxColor}`;
}

// Reiniciar la pista
function resetPista() {
  colorPista.innerHTML = '';
  colorVotes = {};
  title.style.color = '#333';
  updatePopularColor();
}

// Configurar el temporizador de inactividad
function resetTimer() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    alert('¡Inactividad detectada! Reiniciando la pista...');
    resetPista();
  }, 10000);
}

// Eventos
addColorButton.addEventListener('click', () => {
  addColor();
  resetTimer();
});

resetButton.addEventListener('click', resetPista);

// Inicializar
resetTimer();
