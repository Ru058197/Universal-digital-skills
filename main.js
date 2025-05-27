
function loadSkill(skill) {
  fetch("data/" + skill + ".json")
    .then(res => res.json())
    .then(data => {
      const quiz = document.getElementById("quiz");
      quiz.innerHTML = "<h2>" + skill + "</h2>";
      let score = 0, count = 0;
      data.forEach((q, i) => {
        let div = document.createElement("div");
        div.innerHTML = "<p><strong>" + q.question + "</strong></p>";
        q.answers.forEach(a => {
          const btn = document.createElement("button");
          btn.textContent = a.text;
          btn.onclick = () => {
            if (btn.disabled) return;
            if (a.score === 1) {
              btn.style.backgroundColor = "#28a745";
              score++;
            } else {
              btn.style.backgroundColor = "#dc3545";
            }
            count++;
            [...btn.parentNode.querySelectorAll("button")].forEach(b => b.disabled = true);
            if (count === data.length) {
              const result = document.createElement("p");
              result.innerHTML = "<strong>Score:</strong> " + score + " / " + data.length;
              localStorage.setItem(skill, score + "/" + data.length);
              quiz.appendChild(result);
            }
          };
          div.appendChild(btn);
        });
        quiz.appendChild(div);
      });
    });
}
