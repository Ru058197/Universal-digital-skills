function loadSkill(skillFile) {
  fetch(`./data/${skillFile}.json`)
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('certivue_results', JSON.stringify(data));
      window.location.href = 'results.html';
    })
    .catch(err => alert('Error loading skill file: ' + err));
}
function displayResults() {
  const data = JSON.parse(localStorage.getItem('certivue_results') || '[]');
  if (!data.length) {
    document.getElementById('summary').innerHTML = '<p>No results loaded.</p>';
    return;
  }
  const container = document.getElementById('summary');
  container.innerHTML = '';
  let score = 0;
  data.forEach((q, i) => {
    const block = document.createElement('div');
    block.className = 'question-block';
    const questionText = document.createElement('h3');
    questionText.textContent = `Q${i + 1}: ${q.question}`;
    const correct = q.answers.find(a => a.isCorrect)?.text;
    if (correct) score++;
    const answerList = document.createElement('ul');
    q.answers.forEach(ans => {
      const li = document.createElement('li');
      li.textContent = ans.text;
      if (ans.isCorrect) li.style.fontWeight = 'bold';
      answerList.appendChild(li);
    });
    block.appendChild(questionText);
    block.appendChild(answerList);
    container.appendChild(block);
  });
  const scoreDisplay = document.createElement('p');
  scoreDisplay.innerHTML = `<strong>Total Questions:</strong> ${data.length} | <strong>Correct:</strong> ${score}`;
  container.prepend(scoreDisplay);
}
function downloadCSV() {
  const data = JSON.parse(localStorage.getItem('certivue_results') || '[]');
  if (!data.length) return alert('No data to export.');
  let csv = 'Question,Correct Answer\n';
  data.forEach(q => {
    const correct = q.answers.find(a => a.isCorrect)?.text || '';
    csv += `"${q.question.replace(/"/g, '""')}","${correct.replace(/"/g, '""')}"\n`;
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
if (window.location.pathname.includes('results.html')) displayResults();