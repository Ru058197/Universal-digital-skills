
let currentScore = 0;
let totalQuestions = 0;
let answered = 0;

function loadSkill(skill) {
  fetch('data/' + skill + '.json')
    .then(res => res.json())
    .then(data => {
      currentScore = 0;
      answered = 0;
      totalQuestions = data.length;

      const container = document.getElementById('quiz');
      container.innerHTML = '<h2>' + skill.charAt(0).toUpperCase() + skill.slice(1) + ' Assessment</h2>';

      data.forEach((q, i) => {
        let qEl = document.createElement('div');
        qEl.innerHTML = `<p><strong>Q${i + 1}:</strong> ${q.question}</p>`;

        q.answers.forEach((a, j) => {
          let btn = document.createElement('button');
          btn.textContent = a.text;
          btn.onclick = () => {
            if (btn.disabled) return;

            if (a.score === 1) {
              currentScore++;
              btn.style.backgroundColor = "#28a745";
            } else {
              btn.style.backgroundColor = "#dc3545";
            }

            answered++;
            Array.from(btn.parentElement.querySelectorAll("button")).forEach(b => b.disabled = true);

            if (answered === totalQuestions) {
              const result = document.createElement('div');
              result.className = "result";
              result.innerHTML = `<p><strong>Result:</strong> You got ${currentScore} out of ${totalQuestions} correct.</p>`;
              localStorage.setItem(skill, currentScore + '/' + totalQuestions);
              container.appendChild(result);
            }
          };
          qEl.appendChild(btn);
        });

        container.appendChild(qEl);
      });
    });
}
