
function loadSkill(skill) {
  fetch('data/' + skill + '.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('quiz');
      container.innerHTML = '<h2>' + skill.toUpperCase() + '</h2>';
      let score = 0;
      let answered = 0;
      data.forEach((q, i) => {
        const div = document.createElement('div');
        div.innerHTML = `<p><strong>${q.question}</strong></p>`;
        q.answers.forEach(a => {
          const btn = document.createElement('button');
          btn.textContent = a.text;
          btn.onclick = () => {
            if (btn.disabled) return;
            if (a.score === 1) {
              score++;
              btn.style.backgroundColor = "#28a745";
            } else {
              btn.style.backgroundColor = "#dc3545";
            }
            answered++;
            [...btn.parentNode.querySelectorAll('button')].forEach(b => b.disabled = true);
            if (answered === data.length) {
              const result = document.createElement('div');
              result.innerHTML = `<p>You scored ${score} out of ${data.length}</p>`;
              container.appendChild(result);
              localStorage.setItem(skill, `${score}/${data.length}`);
            }
          };
          div.appendChild(btn);
        });
        container.appendChild(div);
      });
    });
}
