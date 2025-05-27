
function loadSkill(skill) {
  fetch('data/' + skill + '.json')
    .then(res => res.json())
    .then(data => {
      let container = document.getElementById('quiz');
      container.innerHTML = '';
      data.forEach((q, i) => {
        let qEl = document.createElement('div');
        qEl.innerHTML = `<p>${q.question}</p>`;
        q.answers.forEach(a => {
          let btn = document.createElement('button');
          btn.textContent = a.text;
          btn.onclick = () => {
            alert(a.score === 1 ? 'Correct!' : 'Try again.');
            if (i === data.length - 1) {
              localStorage.setItem(skill, 'Completed');
            }
          };
          qEl.appendChild(btn);
        });
        container.appendChild(qEl);
      });
    });
}
