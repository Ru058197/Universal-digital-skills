
function getParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function startTimer() {
  sessionStorage.setItem('quiz_start', Date.now());
}

function loadQuiz() {
  const skill = getParam('skill');
  if (!skill) {
    alert('No skill selected.');
    return;
  }

  if (localStorage.getItem('attempt_' + skill)) {
    document.body.innerHTML = '<main><h1>You have already completed this quiz.</h1></main>';
    return;
  }

  fetch('./data/' + skill + '_questions_certivue.json')
    .then(res => {
      if (!res.ok) throw new Error('File not found');
      return res.json();
    })
    .then(data => {
      document.getElementById('quiz-title').textContent = skill.replace('_', ' ').toUpperCase();
      const form = document.getElementById('quiz-form');
      form.innerHTML = '';
      data.forEach((q, i) => {
        const block = document.createElement('div');
        block.className = 'question-block';
        const question = document.createElement('h3');
        question.textContent = 'Q' + (i + 1) + ': ' + q.question;
        block.appendChild(question);
        q.answers.forEach((a, j) => {
          const label = document.createElement('label');
          label.innerHTML = `<input type="radio" name="q${i}" value="${j}"> ${a.text}`;
          block.appendChild(label);
          block.appendChild(document.createElement('br'));
        });
        form.appendChild(block);
      });
      form.setAttribute('data-skill', skill);
      sessionStorage.setItem('quiz_data', JSON.stringify(data));
      startTimer();
    })
    .catch(err => {
      document.getElementById('quiz-title').textContent = 'Error loading quiz.';
      console.error(err);
    });
}

function submitQuiz() {
  const form = document.getElementById('quiz-form');
  const skill = form.getAttribute('data-skill');
  const data = JSON.parse(sessionStorage.getItem('quiz_data') || '[]');
  const results = [];

  for (let i = 0; i < data.length; i++) {
    const selected = form.querySelector('input[name="q' + i + '"]:checked');
    if (!selected) {
      alert('Please answer all questions before submitting.');
      return;
    }
    results.push({
      question: data[i].question,
      correct: data[i].answers.find(a => a.isCorrect).text,
      selected: data[i].answers[selected.value].text,
      isCorrect: data[i].answers[selected.value].isCorrect
    });
  }

  const timeSpent = Date.now() - parseInt(sessionStorage.getItem('quiz_start'));
  localStorage.setItem('certivue_results', JSON.stringify({ skill, results, timeSpent }));
  localStorage.setItem('attempt_' + skill, 'true');
  window.location.href = 'results.html';
}

if (window.location.pathname.includes('quiz.html')) loadQuiz();
