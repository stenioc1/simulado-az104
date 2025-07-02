
const questions = [
  {
    id: 1,
    text: "Your company has several departments. Each department has a number of virtual machines (VMs)...",
    options: ["A. Create Azure Management Groups", "B. Create a resource group", "C. Assign tags", "D. Modify settings"],
    answer: 2,
    explanation: "By assigning tags, you can organize resources by department, environment, etc."
  },
  {
    id: 2,
    text: "You want to implement an Azure AD conditional access policy...",
    options: ["A. Yes", "B. No"],
    answer: 1,
    explanation: "Accessing MFA settings isn't enough to target Global Admins specifically."
  },
  {
    id: 3,
    text: "Deploy Ubuntu VM and include a trusted CA. What command to use?",
    options: ["A. New-AzureRmVm", "B. New-AzVM", "C. Create-AzVM", "D. az vm create"],
    answer: 3,
    explanation: "Use cloud-init with 'az vm create' to inject configuration."
  }
];

let current = 0;
let timer;
let timeLeft = 30 * 60;

const container = document.getElementById('quiz-container');
const submitBtn = document.getElementById('submit-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const results = document.getElementById('results');
const scoreEl = document.getElementById('score');
const explanations = document.getElementById('explanations');
const timerEl = document.getElementById('timer');

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = formatTime(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timer);
      submitQuiz();
    }
  }, 1000);
}

function renderQuestion(index) {
  container.innerHTML = '';
  const q = questions[index];
  const qDiv = document.createElement('div');
  qDiv.classList.add('p-4', 'bg-white', 'rounded', 'shadow');

  const qTitle = document.createElement('p');
  qTitle.classList.add('font-semibold');
  qTitle.textContent = `Q${index + 1}: ${q.text}`;
  qDiv.appendChild(qTitle);

  q.options.forEach((opt, i) => {
    const label = document.createElement('label');
    label.classList.add('block', 'mt-2');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `question-${q.id}`;
    input.value = i;
    input.classList.add('mr-2');

    if (localStorage.getItem(`q${q.id}`) == i) input.checked = True;

    input.addEventListener('change', () => {
      localStorage.setItem(`q${q.id}`, i);
    });

    label.appendChild(input);
    label.appendChild(document.createTextNode(opt));
    qDiv.appendChild(label);
  });

  container.appendChild(qDiv);
}

function submitQuiz() {
  let correct = 0;
  explanations.innerHTML = '';

  questions.forEach(q => {
    const saved = localStorage.getItem(`q${q.id}`);
    const userAnswer = saved !== null ? parseInt(saved) : -1;
    if (userAnswer === q.answer) correct++;

    const explanation = document.createElement('div');
    explanation.classList.add('bg-gray-50', 'p-3', 'rounded', 'border');
    explanation.innerHTML = `
      <strong>Pergunta:</strong> ${q.text}<br>
      <strong>Sua resposta:</strong> ${userAnswer >= 0 ? q.options[userAnswer] : 'Nenhuma'}<br>
      <strong>Correta:</strong> ${q.options[q.answer]}<br>
      <strong>Explicação:</strong> ${q.explanation}
    `;
    explanations.appendChild(explanation);
  });

  scoreEl.textContent = `Você acertou ${correct} de ${questions.length} questões.`;
  results.classList.remove('hidden');
  clearInterval(timer);
}

submitBtn.addEventListener('click', submitQuiz);
nextBtn.addEventListener('click', () => {
  if (current < questions.length - 1) {
    current++;
    renderQuestion(current);
  }
});
prevBtn.addEventListener('click', () => {
  if (current > 0) {
    current--;
    renderQuestion(current);
  }
});

renderQuestion(current);
startTimer();
