
function loadSkill(skillFile) {
  fetch(`./data/${skillFile}.json`)
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('certivue_results', JSON.stringify(data));
      window.location.href = 'results.html';
    })
    .catch(err => alert('Error loading skill file: ' + err));
}

function downloadCSV() {
  const data = JSON.parse(localStorage.getItem('certivue_results') || '[]');
  if (!data.length) return alert('No data to export.');

  let csv = 'Question,Answer A,Answer B,Answer C,Answer D,Correct\n';
  data.forEach(q => {
    const correct = q.answers.find(a => a.isCorrect)?.text || '';
    csv += `"${q.question}","${q.answers[0].text}","${q.answers[1].text}","${q.answers[2].text}","${q.answers[3].text}","${correct}"\n`;
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
