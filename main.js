
function loadSkill(skill) {
  fetch('data/' + skill + '.json')
    .then(res => res.json())
    .then(data => {
      let quiz = document.getElementById('quiz');
      quiz.innerHTML = '<h2>' + skill.toUpperCase() + '</h2>';
      let score = 0, count = 0;
      data.forEach((q, i) => {
        let div = document.createElement('div');
        div.innerHTML = `<p><strong>${q.question}</strong></p>`;
        q.answers.forEach(a => {
          let btn = document.createElement('button');
          btn.textContent = a.text;
          btn.onclick = () => {
            if (a.score === 1) btn.style.backgroundColor = "#28a745";
            else btn.style.backgroundColor = "#dc3545";
            count++;
            if (a.score === 1) score++;
            Array.from(btn.parentNode.querySelectorAll('button')).forEach(b => b.disabled = true);
            if (count === data.length) {
              let result = document.createElement('p');
              result.innerHTML = `You scored ${score} out of ${data.length}`;
              localStorage.setItem(skill, `${score}/${data.length}`);
              quiz.appendChild(result);
            }
          };
          div.appendChild(btn);
        });
        quiz.appendChild(div);
      });
    });
}
