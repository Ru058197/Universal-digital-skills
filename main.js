
function getParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function startTimer() {
  sessionStorage.setItem('quiz_start', Date.now());
}

function loadQuiz() {
  const skill = getParam('skill');
  if (!skill) return;

  if (localStorage.getItem('attempt_' + skill)) {
    document.body.innerHTML = '<main><h1>You have already completed this quiz.</h1></main>';
    return;
  }

  fetch('./data/' + skill + '_questions_certivue.json')
    .then(res => res.json())
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

function displayResults() {
  const resultObj = JSON.parse(localStorage.getItem('certivue_results'));
  if (!resultObj) return;

  const { skill, results, timeSpent } = resultObj;
  const container = document.getElementById('summary');
  const correctCount = results.filter(r => r.isCorrect).length;

  const score = document.createElement('p');
  score.innerHTML = `<strong>Skill:</strong> ${skill.toUpperCase()}<br>
    <strong>Correct:</strong> ${correctCount} / ${results.length}<br>
    <strong>Time Taken:</strong> ${Math.round(timeSpent / 1000)} seconds`;
  container.appendChild(score);

  results.forEach((r, i) => {
    const block = document.createElement('div');
    block.className = 'question-block';
    const q = document.createElement('h3');
    q.textContent = 'Q' + (i + 1) + ': ' + r.question;
    const a = document.createElement('p');
    a.innerHTML = `<strong>Your Answer:</strong> ${r.selected}<br><strong>Correct Answer:</strong> ${r.correct}`;
    if (r.isCorrect) a.style.color = 'green';
    else a.style.color = 'red';
    block.appendChild(q);
    block.appendChild(a);
    container.appendChild(block);
  });
}

function downloadCSV() {
  const resultObj = JSON.parse(localStorage.getItem('certivue_results'));
  if (!resultObj) return alert('No data to export.');
  let csv = 'Question,Selected Answer,Correct Answer,Correct?
';
  resultObj.results.forEach(r => {
    csv += `"${r.question.replace(/"/g, '""')}","${r.selected}","${r.correct}",${r.isCorrect}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'certivue_results.csv';
  a.click();
}

function downloadJSON() {
  const data = localStorage.getItem('certivue_results');
  if (!data) return alert('No data to export.');
  const blob = new Blob([data], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'certivue_results.json';
  a.click();
}

if (window.location.pathname.includes('quiz.html')) loadQuiz();
if (window.location.pathname.includes('results.html')) displayResults();
