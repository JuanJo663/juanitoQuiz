let currentIndex = 0;
let answers = new Array(questions.length).fill(null);
let finished = false;

const correctSound = new Audio("correct.mp3");
correctSound.volume = 0.5;

const questionContainer = document.getElementById("question-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const finishBtn = document.getElementById("finish-btn");
const resultBox = document.getElementById("result");

function renderQuestion(index) {
  const q = questions[index];

  const card = document.createElement("div");
  card.className = "question-card";

  const meta = document.createElement("div");
  meta.className = "question-meta";
  meta.innerHTML = `
    <span class="question-number">Question ${index + 1} of ${questions.length}</span>
    <span class="question-score">${q.points} point(s)</span>
  `;

  const text = document.createElement("p");
  text.className = "question-text";
  text.innerHTML = q.text;

  const list = document.createElement("ul");
  list.className = "options-list";

  const feedback = document.createElement("div");
  feedback.className = "question-feedback hidden";

  q.options.forEach((opt, i) => {
    const li = document.createElement("li");
    li.className = "option-item";

    const label = document.createElement("label");
    label.className = "option-label";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = `question-${q.id}`;
    input.className = "option-input";
    input.disabled = finished;
    if (answers[index] === i) input.checked = true;

    input.addEventListener("change", () => {
      if (!finished) {
        answers[index] = i;

        document
          .querySelectorAll(".option-label")
          .forEach(l => l.classList.remove("correct", "incorrect"));

        if (i === q.correctIndex) {
          label.classList.add("correct");
//           feedback.textContent = "\u2713 Correct! Well done.";
//           feedback.classList.remove("hidden");
          correctSound.currentTime = 0;
        } else {
          label.classList.add("incorrect");
//           feedback.textContent = "\u2717 Not quite. Try another option.";
//           feedback.classList.remove("hidden");
        }
      }
    });

    const span = document.createElement("span");
    span.className = "option-text";
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

  questionContainer.innerHTML = "";
  questionContainer.appendChild(card);

  if (window.renderMathInElement) {
    window.renderMathInElement(card, {
      delimiters: [
        { left: "\\(", right: "\\)", display: false },
        { left: "\\[", right: "\\]", display: true }
      ],
      throwOnError: false
    });
  }

  updateControls();
}

function updateControls() {
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === questions.length - 1 || finished;
  finishBtn.disabled = finished;
}

function finishQuiz() {
  finished = true;

  let score = 0;
  const maxScore = questions.reduce((acc, q) => acc + q.points, 0);

  document
    .querySelectorAll(".option-input")
    .forEach((inp) => (inp.disabled = true));

  questions.forEach((q, idx) => {
    if (answers[idx] === q.correctIndex) {
      score += q.points;
    }
  });

  const percent = Math.round((score / maxScore) * 100);
  const good = percent >= 60;

  const currentQ = questions[currentIndex];
  const labels = document.querySelectorAll(".option-label");

  labels.forEach((label, i) => {
    if (i === currentQ.correctIndex) {
      label.classList.add("correct");
    } else if (answers[currentIndex] === i) {
      label.classList.add("incorrect");
    }
  });

  if (good) {
    correctSound.currentTime = 0;
    correctSound.play().catch(() => {});
  }

  resultBox.classList.remove("hidden");
  resultBox.innerHTML = `
    <div>${good ? "🎉 Excellent work! You passed!" : "Keep practicing, you're making progress!"}</div>
    <div class="score ${good ? "good" : "bad"}">
      Score: ${score} / ${maxScore} (${percent}%)
    </div>
  `;

  updateControls();
}

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion(currentIndex);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < questions.length - 1) {
      const q = questions[currentIndex];
  const selectedAnswer = document.querySelector(`input[name="question-${currentIndex}"]:checked`);
  
  if (selectedAnswer) {
    if (parseInt(selectedAnswer.value) === q.correctIndex) {
      correctSound.currentTime = 0;
      correctSound.play().catch(() => {});
    } else {
      correctSound.currentTime = 0;
      correctSound.play().catch(() => {});
    }
      const feedback = document.querySelector(`.question-card:nth-child(${currentIndex + 1}) .question-feedback`);
  if (feedback) {
    if (parseInt(selectedAnswer.value) === q.correctIndex) {
      feedback.textContent = "\u2713 Correct! Well done.";
      feedback.classList.remove("incorrect");
      feedback.classList.add("correct");
    } else {
      feedback.textContent = "\u2717 Not quite. Try another option.";
      feedback.classList.remove("correct");
      feedback.classList.add("incorrect");
    }
    feedback.classList.remove("hidden");
  }
    answers[currentIndex] = parseInt(selectedAnswer.value);
  }
  
    currentIndex++;
    renderQuestion(currentIndex);
  }
});

finishBtn.addEventListener("click", () => {
  finishQuiz();
});

window.addEventListener("DOMContentLoaded", () => {
  resultBox.classList.add("hidden");
  renderQuestion(currentIndex);
});
