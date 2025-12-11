let currentIndex = 0;
let answers = new Array(questions.length).fill(null);
let finished = false;
let timerInterval = null;
let timeRemaining = 60;
let randomizedQuestions = [];
let questionIndexMap = {};
let studentName = ''; // Nombre del estudiante
let quizStartTime = null; // Hora de inicio del quiz
let questionTexts = []; // Textos originales de las preguntas

const correctSound = new Audio('correct.mp3');
correctSound.volume = 0.5;
const questionContainer = document.getElementById('question-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const finishBtn = document.getElementById('finish-btn');
const resultBox = document.getElementById('result');

// FUNCIONES DE HISTORIAL
function saveQuizAttempt(score, maxScore, percent, answersArray) {
  const attempt = {
    timestamp: new Date().toISOString(),
    score: score,
    maxScore: maxScore,
    percent: percent,
    answers: answersArray,
    duration: 60 - timeRemaining
  };
  let history = JSON.parse(localStorage.getItem('quizHistory')) || [];
  history.push(attempt);
  localStorage.setItem('quizHistory', JSON.stringify(history));
}

function getQuizHistory() {
  return JSON.parse(localStorage.getItem('quizHistory')) || [];
}

function clearQuizHistory() {
  localStorage.removeItem('quizHistory');
}

function displayQuizHistory() {
  const history = getQuizHistory();
  if (history.length === 0) {
    alert('No hay historial');
    return;
  }
  let html = '<div style="max-height: 70vh; overflow-y: auto;"><h2 style="color: #0066cc;">Historial</h2>';
  history.forEach((att, idx) => {
    const date = new Date(att.timestamp).toLocaleString('es-CO');
    html += `<div style="border-left: 4px solid #0066cc; padding: 15px; margin: 10px 0; background: #f8f9fa; border-radius: 4px;"><div style="font-weight: bold; color: #0066cc;">Intento ${idx + 1} - ${date}</div><div>Puntuacion: ${att.score} / ${att.maxScore} (${att.percent}%)</div><div>Tiempo: ${Math.floor(att.duration / 60)}:${(att.duration % 60).toString().padStart(2, '0')}</div></div>`;
  });
  html += '</div>';
  resultBox.innerHTML = html;
  resultBox.classList.remove('hidden');
}

// FUNCION DE ALEATORIZACION
function shuffleArray(array) {
  let arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function initializeRandomizedQuestions() {
  randomizedQuestions = shuffleArray(questions).map((q) => ({
    ...q,
    options: shuffleArray(q.options),
    originalCorrectIndex: q.correctIndex
  }));
  questionTexts = questions.map(q => q.text); // Guardar textos originales
}

// FUNCION DE BARRA DE PROGRESO
function renderProgressBar() {
  let progressHTML = '<div style="width: 100%; background: #e9ecef; border-radius: 8px; height: 30px; margin-bottom: 20px; overflow: hidden; box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);">';
  const progress = ((currentIndex + 1) / randomizedQuestions.length) * 100;
  const answered = answers.filter(a => a !== null).length;
  progressHTML += `<div style="background: linear-gradient(90deg, #0066cc, #004999); width: ${progress}%; height: 100%; transition: width 0.3s ease; display: flex; align-items: center; justify-content: center;"><span style="color: white; font-weight: bold; font-size: 12px;">${progress.toFixed(0)}%</span></div></div>`;
  progressHTML += `<div style="font-size: 14px; color: #666; margin-bottom: 15px;">Pregunta ${currentIndex + 1} de ${randomizedQuestions.length} | Respondidas: ${answered}</div>`;
  const container = document.getElementById('progress-bar');
  if (container) container.innerHTML = progressHTML;
}

function renderQuestion(index) {
  const q = randomizedQuestions[index];
  const card = document.createElement('div');
  card.className = 'question-card';
  const meta = document.createElement('div');
  meta.className = 'question-meta';
  meta.innerHTML = `<span class="question-number">Pregunta ${index + 1} de ${randomizedQuestions.length}</span><span class="question-score">${q.points} punto(s)</span>`;
  const text = document.createElement('p');
  text.className = 'question-text';
  text.innerHTML = q.text;
  const list = document.createElement('ul');
  list.className = 'options-list';
  const feedback = document.createElement('div');
  feedback.className = 'question-feedback hidden';
  
  q.options.forEach((opt, i) => {
    const li = document.createElement('li');
    li.className = 'option-item';
    const label = document.createElement('label');
    label.className = 'option-label';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `question-${q.id}`;
    input.className = 'option-input';
    input.value = i;
    input.disabled = finished;
    if (answers[index] === i) input.checked = true;
    input.addEventListener('change', () => {
      if (!finished) {
        answers[index] = i;
        renderProgressBar();
      }
    });
    const span = document.createElement('span');
    span.className = 'option-text';
    span.textContent = opt;
    label.appendChild(input);
    label.appendChild(span);
    li.appendChild(label);
    list.appendChild(li);
  });
  
  card.appendChild(meta);
  card.appendChild(text);
  card.appendChild(list);
  card.appendChild(feedback);
  questionContainer.innerHTML = '';
  questionContainer.appendChild(card);
  
  if (window.renderMathInElement) {
    window.renderMathInElement(card, {
      delimiters: [
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true }
      ],
      throwOnError: false
    });
  }
  
  updateControls();
  renderProgressBar();
}

function updateControls() {
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === randomizedQuestions.length - 1 || finished;
  finishBtn.disabled = finished;
}

function finishQuiz() {
  finished = true;
  clearInterval(timerInterval);
  let score = 0;
  const maxScore = randomizedQuestions.reduce((acc, q) => acc + q.points, 0);
  
  document.querySelectorAll('.option-input').forEach((inp) => (inp.disabled = true));
  
  randomizedQuestions.forEach((q, idx) => {
    const correctOption = q.options[q.originalCorrectIndex];
    const userAnswer = answers[idx];
    if (userAnswer !== null && q.options[userAnswer] === correctOption) {
      score += q.points;
    }
  });
  
  const percent = Math.round((score / maxScore) * 100);
  const good = percent >= 60;
  
  const currentQ = randomizedQuestions[currentIndex];
  const labels = document.querySelectorAll('.option-label');
  const correctOption = currentQ.options[currentQ.originalCorrectIndex];
  
  labels.forEach((label, i) => {
    if (currentQ.options[i] === correctOption) {
      label.classList.add('correct');
    } else if (answers[currentIndex] === i) {
      label.classList.add('incorrect');
    }
  });
  
  if (good) {
    correctSound.currentTime = 0;
    correctSound.play().catch(() => {});
  }
  
  saveQuizAttempt(score, maxScore, percent, answers);
  resultBox.classList.remove('hidden');
  resultBox.innerHTML = '<div id="report-content">' + generateReportHTML(score, maxScore, percent) + '</div>';
  updateControls();
}

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion(currentIndex);
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < randomizedQuestions.length - 1) {
    currentIndex++;
    renderQuestion(currentIndex);
  }
});

finishBtn.addEventListener('click', () => {
  finishQuiz();
});

function startTimer() {
  const timerElement = document.createElement('div');
  timerElement.id = 'timer';
  timerElement.style.cssText = 'position: fixed; top: 20px; right: 20px; font-size: 18px; font-weight: bold; color: #0066cc; background: white; padding: 10px 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); z-index: 1000;';
  document.body.appendChild(timerElement);
  
  timerInterval = setInterval(() => {
    timeRemaining--;
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerElement.textContent = `⏱️ ${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      finishQuiz();
    }
  }, 1000);
}

function generateDetailedSummary(score, maxScore, percent) {
  let html = '<div style="max-height: 70vh; overflow-y: auto;">';
  html += '<h2 style="color: #0066cc; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">Resumen Detallado</h2>';
  
  randomizedQuestions.forEach((q, idx) => {
    const userAnswer = answers[idx];
    const correctOption = q.options[q.originalCorrectIndex];
    const isCorrect = userAnswer !== null && q.options[userAnswer] === correctOption;
    const userText = userAnswer !== null ? q.options[userAnswer] : 'No respondida';
    const icon = isCorrect ? '✓' : '✗';
    const color = isCorrect ? '#28a745' : '#dc3545';
    const status = isCorrect ? 'CORRECTA' : 'INCORRECTA';
    
    html += '<div style="border-left: 4px solid ' + color + '; padding: 15px; margin: 10px 0; background: #f8f9fa; border-radius: 4px;">';
    html += '<div style="color: ' + color + '; font-weight: bold; font-size: 16px; margin-bottom: 10px;">' + icon + ' Q' + (idx + 1) + ' (' + q.points + 'pt) - ' + status + '</div>';
    html += '<div style="margin: 8px 0;"><strong>Tu respuesta:</strong> <span style="color: ' + color + ';">' + userText + '</span></div>';
    if (!isCorrect) {
      html += '<div style="margin: 8px 0;"><strong>Respuesta correcta:</strong> <span style="color: #28a745;">' + correctOption + '</span></div>';
    }
    html += '</div>';
  });
  
  html += '</div><div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 20px; border-top: 2px solid #0066cc;">';
  html += '<div style="font-size: 18px; font-weight: bold; color: #0066cc;">Puntuacion Final: ' + score + ' / ' + maxScore + ' (' + percent + '%)</div>';
  html += '</div>';
  
  return html;
}
// FUNCIONES PARA NOMBRE Y DESCARGA DE REPORTE
function showNameDialog() {
  let nameInput = prompt('Ingrese su nombre para registrar en el reporte:', 'Estudiante');
  if (nameInput !== null && nameInput.trim() !== '') {
    studentName = nameInput.trim();
  } else {
    studentName = 'Estudiante Anonimo';
  }
  quizStartTime = new Date();
}

function generateReportHTML(score, maxScore, percent) {
  const date = new Date().toLocaleDateString('es-CO');
  let reportHTML = '<div style="padding: 20px; font-family: Arial, sans-serif;">';
  reportHTML += '<h1 style="color: #0066cc; text-align: center;">REPORTE DE CALIFICACION DEL QUIZ</h1>';
  reportHTML += '<hr style="border: 2px solid #0066cc;">';
  reportHTML += '<p><strong>Nombre:</strong> ' + studentName + '</p>';
  reportHTML += '<p><strong>Fecha:</strong> ' + date + '</p>';
  reportHTML += '<p><strong>Puntuacion:</strong> ' + score + ' / ' + maxScore + ' (' + percent + '%)</p>';
  reportHTML += '<hr>';
  reportHTML += '<h2 style="color: #0066cc;">DETALLE DE RESPUESTAS</h2>';
  
  randomizedQuestions.forEach((q, idx) => {
    const userAnswer = answers[idx];
    const correctOption = q.options[q.originalCorrectIndex];
    const isCorrect = userAnswer !== null && q.options[userAnswer] === correctOption;
    const userText = userAnswer !== null ? q.options[userAnswer] : 'No respondida';
    const statusColor = isCorrect ? '#28a745' : '#dc3545';
    
    reportHTML += '<div style="margin: 15px 0; padding: 10px; border-left: 4px solid ' + statusColor + '; background: #f9f9f9;">';
    reportHTML += '<p><strong>Pregunta ' + (idx + 1) + ' (' + q.points + 'pts):</strong> ' + q.text + '</p>';
    reportHTML += '<p><strong>Tu respuesta:</strong> <span style="color: ' + statusColor + ';">' + userText + '</span></p>';
    if (!isCorrect) {
      reportHTML += '<p><strong>Respuesta correcta:</strong> <span style="color: #28a745;">' + correctOption + '</span></p>';
    }
    reportHTML += '</div>';
  });
  
  reportHTML += '<hr>';
  reportHTML += '<div style="background: #f0f0f0; padding: 15px; border-radius: 5px; text-align: center;">';
  reportHTML += '<h3 style="color: #0066cc;">Puntuacion Final: ' + score + ' / ' + maxScore + ' (' + percent + '%)</h3>';
  reportHTML += '</div>';
  reportHTML += '<div style="margin-top: 20px; text-align: center;">';
  reportHTML += '<button onclick="window.print()" style="padding: 10px 20px; margin: 5px; background: #0066cc; color: white; border: none; border-radius: 5px; cursor: pointer;">Imprimir</button>';
  reportHTML += '<button  style="padding: 10px 20px; margin: 5px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">Descargar PDF</button>';
  reportHTML += '</div></div>';
  
  return reportHTML;
}

function downloadReport() {
  const element = document.createElement('a');
  const reportDiv = document.querySelector('[id="report-content"]');
  if (reportDiv) {
    const htmlContent = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Reporte</title></head><body>' + reportDiv.innerHTML + '</body></html>';
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent));
    element.setAttribute('download', studentName + '_reporte_' + new Date().getTime() + '.html');
    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
window.addEventListener('DOMContentLoaded', () => {
  resultBox.classList.add('hidden');
  showNameDialog();
  initializeRandomizedQuestions();
  renderQuestion(currentIndex);
  startTimer();

window.escapeHtml = function(text) {
  const map = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'};
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
};

window.downloadReportPDF = function() {
  const score = document.querySelector('[data-score]') ? parseInt(document.querySelector('[data-score]').getAttribute('data-score')) : 0;
  const maxScore = document.querySelector('[data-maxscore]') ? parseInt(document.querySelector('[data-maxscore]').getAttribute('data-maxscore')) : 1;
  const percent = Math.round((score / maxScore) * 100);
  const date = new Date().toLocaleDateString('es-CO');
  
  let html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Reporte</title>';
  html += '<style>body{font-family:Arial;margin:20px;} h1{color:#0066cc;text-align:center;} h2{color:#0066cc;} hr{border:2px solid #0066cc;} .q{margin:15px 0;padding:10px;border-left:4px solid #0066cc;background:#f9f9f9;} .ok{color:green;font-weight:bold;} .bad{color:red;font-weight:bold;} .sum{text-align:center;margin-top:30px;font-size:18px;color:#0066cc;font-weight:bold;}</style>';
  html += '</head><body>';
  html += '<h1>REPORTE DE CALIFICACION DEL QUIZ</h1><hr>';
  html += '<p><b>Nombre:</b> ' + studentName + '</p>';
  html += '<p><b>Fecha:</b> ' + date + '</p>';
  html += '<p><b>Puntuacion:</b> ' + score + ' / ' + maxScore + ' (' + percent + '%)</p><hr>';
  html += '<h2>DETALLE DE RESPUESTAS</h2>';
  
  randomizedQuestions.forEach((q, idx) => {
    const userAnswer = answers[idx];
    const correctOption = q.options[q.originalCorrectIndex];
    const isCorrect = userAnswer !== null && q.options[userAnswer] === correctOption;
    const userText = userAnswer !== null ? q.options[userAnswer] : 'No respondida';
    const status = isCorrect ? '<span class="ok">CORRECTA</span>' : '<span class="bad">INCORRECTA</span>';
    
    html += '<div class="q">';
    html += '<b>Pregunta ' + (idx + 1) + ' (' + q.points + 'pts)</b><br/>';
     + '<br/>';
    html += '<b>Tu respuesta:</b> ' + userText + '<br/>';
    if (!isCorrect) {
      html += '<b>Respuesta correcta:</b> ' + correctOption + '<br/>';
    }
    html += '<b>Estado:</b> ' + status + '</div>';
  });
  
  html += '<div class="sum">PUNTUACION FINAL: ' + score + ' / ' + maxScore + ' (' + percent + '%)</div>';
  html += '</body></html>';
  
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(html));
  element.setAttribute('download', studentName + '_reporte_' + new Date().getTime() + '.html');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

});
