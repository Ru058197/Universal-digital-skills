
const questions = {
  delegation: [
    { question: "You’re overwhelmed with tasks. What do you do first?", answers: [{ text: "Decide what I can delegate and to whom.", score: 1 }, { text: "Do it all myself to stay in control.", score: 0 }] },
    { question: "You delegated a task and it failed. What now?", answers: [{ text: "Review the cause and coach them.", score: 1 }, { text: "Take it back and avoid delegating again.", score: 0 }] }
  ],
  ethics: [
    { question: "You discover a colleague is violating policy. Do you:", answers: [{ text: "Report it appropriately.", score: 1 }, { text: "Ignore it—it’s not your role.", score: 0 }] }
  ],
  communication: [
    { question: "Effective communication means:", answers: [{ text: "Clarity and listening", score: 1 }, { text: "Saying everything fast", score: 0 }] }
  ],
  timeManagement: [
    { question: "You’re assigned multiple tasks. What do you do?", answers: [{ text: "Prioritize by deadline and impact", score: 1 }, { text: "Do them as they come", score: 0 }] }
  ],
  projectManagement: [
    { question: "What defines project success?", answers: [{ text: "On time and within scope", score: 1 }, { text: "Delivered eventually", score: 0 }] }
  ],
  problemSolving: [
    { question: "Best first step in solving a problem?", answers: [{ text: "Understand the root cause", score: 1 }, { text: "Jump to solutions", score: 0 }] }
  ],
  python: [
    { question: "What does len([1, 2, 3]) return?", answers: [{ text: "3", score: 1 }, { text: "Error", score: 0 }] }
  ],
  javascript: [
    { question: "How do you declare a variable in ES6?", answers: [{ text: "let x = 5;", score: 1 }, { text: "variable x = 5;", score: 0 }] }
  ],
  sql: [
    { question: "Which SQL command retrieves data?", answers: [{ text: "SELECT", score: 1 }, { text: "REMOVE", score: 0 }] }
  ],
  html: [
    { question: "Which tag defines a hyperlink?", answers: [{ text: "<a>", score: 1 }, { text: "<link>", score: 0 }] }
  ],
  cybersecurity: [
    { question: "What is phishing?", answers: [{ text: "A form of social engineering", score: 1 }, { text: "Malware antivirus", score: 0 }] }
  ],
  debugging: [
    { question: "What does a debugger do?", answers: [{ text: "Helps find and fix issues", score: 1 }, { text: "Deletes old files", score: 0 }] }
  ]
};

let currentQuestions = [];
let currentSkill = "";
let currentIndex = 0;
let score = 0;

function startSkill(skill) {
  currentSkill = skill;
  currentQuestions = questions[skill];
  currentIndex = 0;
  score = 0;

  document.getElementById("skill-select").style.display = "none";
  document.getElementById("question-section").style.display = "block";
  showQuestion();
}

function showQuestion() {
  const q = currentQuestions[currentIndex];
  document.getElementById("question-text").innerText = q.question;
  const container = document.getElementById("answer-options");
  container.innerHTML = "";

  q.answers.forEach(a => {
    const btn = document.createElement("button");
    btn.innerText = a.text;
    btn.onclick = () => selectAnswer(a.score);
    container.appendChild(btn);
  });

  document.getElementById("progress").innerText = `Question ${currentIndex + 1} of ${currentQuestions.length}`;
}

function selectAnswer(scoreValue) {
  score += scoreValue;
  document.getElementById("next-btn").style.display = "block";
}

document.getElementById("next-btn").onclick = () => {
  currentIndex++;
  document.getElementById("next-btn").style.display = "none";

  if (currentIndex < currentQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  document.getElementById("question-section").style.display = "none";
  document.getElementById("result-section").style.display = "block";

  const passed = score >= currentQuestions.length * 0.7;
  const msg = passed
    ? "You demonstrated strong understanding of this skill."
    : "You may benefit from more development in this skill.";

  document.getElementById("result-description").innerText = msg;

  const blob = new Blob([msg], { type: "text/plain" });
  const link = document.getElementById("download-results");
  link.href = URL.createObjectURL(blob);

  // Save result to localStorage
  const results = JSON.parse(localStorage.getItem("certivueResults") || "[]");
  results.push({ skill: currentSkill, score: `${score}/${currentQuestions.length}`, date: new Date().toLocaleString() });
  localStorage.setItem("certivueResults", JSON.stringify(results));
}
