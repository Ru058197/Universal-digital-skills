
const questions = {
  delegation: [
    { question: "You're overwhelmed with tasks. What do you do first?", answers: [
      { text: "Decide what I can delegate and to whom.", score: 1 },
      { text: "Do it all myself to stay in control.", score: 0 }
    ]},
    { question: "Someone on your team makes a mistake on a task you delegated. What’s your reaction?", answers: [
      { text: "Coach them to learn from it.", score: 1 },
      { text: "Take it back and fix it myself.", score: 0 }
    ]}
  ],
  ethics: [
    { question: "You see a coworker take credit for someone else's work. What do you do?", answers: [
      { text: "Raise it privately or with a supervisor.", score: 1 },
      { text: "Stay out of it — not my problem.", score: 0 }
    ]}
  ],
  communication: [
    { question: "What’s key to great communication?", answers: [
      { text: "Clarity", score: 1 },
      { text: "Guesswork", score: 0 }
    ]}
  ],
  timeManagement: [
    { question: "How do you prioritize tasks?", answers: [
      { text: "By impact and urgency", score: 1 },
      { text: "At random", score: 0 }
    ]}
  ],
  projectManagement: [
    { question: "What defines successful project management?", answers: [
      { text: "Planning and delivery", score: 1 },
      { text: "Guessing", score: 0 }
    ]}
  ],
  problemSolving: [
    { question: "How do you solve problems?", answers: [
      { text: "Structured thinking", score: 1 },
      { text: "Panic", score: 0 }
    ]}
  ],
  python: [
    { question: "What does 'len([1,2,3])' return?", answers: [
      { text: "3", score: 1 },
      { text: "Error", score: 0 }
    ]}
  ],
  javascript: [
    { question: "Which is a valid way to declare a variable?", answers: [
      { text: "let x = 5;", score: 1 },
      { text: "var: x;", score: 0 }
    ]}
  ],
  sql: [
    { question: "What does SELECT * FROM table do?", answers: [
      { text: "Returns all columns", score: 1 },
      { text: "Deletes all data", score: 0 }
    ]}
  ],
  html: [
    { question: "Which tag creates a hyperlink?", answers: [
      { text: "<a>", score: 1 },
      { text: "<link>", score: 0 }
    ]}
  ],
  cybersecurity: [
    { question: "What is phishing?", answers: [
      { text: "A type of social engineering", score: 1 },
      { text: "An antivirus tool", score: 0 }
    ]}
  ],
  debugging: [
    { question: "What is the purpose of a debugger?", answers: [
      { text: "To step through code", score: 1 },
      { text: "To delete bugs", score: 0 }
    ]}
  ]
};

let currentSkill = "";
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

function startSkill(skill) {
  currentSkill = skill;
  currentQuestions = questions[skill];
  currentQuestionIndex = 0;
  score = 0;

  document.getElementById("skill-select").style.display = "none";
  document.getElementById("question-section").style.display = "block";
  document.getElementById("result-section").style.display = "none";

  showQuestion();
}

function showQuestion() {
  const question = currentQuestions[currentQuestionIndex];
  document.getElementById("question-text").innerText = question.question;
  document.getElementById("progress").innerText = 
    "Question " + (currentQuestionIndex + 1) + " of " + currentQuestions.length;

  const answerOptions = document.getElementById("answer-options");
  answerOptions.innerHTML = "";
  question.answers.forEach((a) => {
    const btn = document.createElement("button");
    btn.innerText = a.text;
    btn.onclick = () => selectAnswer(a.score);
    answerOptions.appendChild(btn);
  });
}

function selectAnswer(scoreValue) {
  score += scoreValue;
  document.getElementById("next-btn").style.display = "block";
}

document.getElementById("next-btn").onclick = () => {
  currentQuestionIndex++;
  document.getElementById("next-btn").style.display = "none";

  if (currentQuestionIndex < currentQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  document.getElementById("question-section").style.display = "none";
  document.getElementById("result-section").style.display = "block";

  const passed = score >= currentQuestions.length * 0.7;
  const resultText = passed
    ? "You demonstrated strong understanding of this skill."
    : "You may benefit from more development in this skill.";

  document.getElementById("result-description").innerText = resultText;

  const blob = new Blob([resultText], { type: "text/plain" });
  const downloadLink = document.getElementById("download-results");
  downloadLink.href = URL.createObjectURL(blob);

  const stored = JSON.parse(localStorage.getItem("certivueResults") || "[]");
  stored.push({
    skill: currentSkill,
    score: score + "/" + currentQuestions.length,
    date: new Date().toLocaleString()
  });
  localStorage.setItem("certivueResults", JSON.stringify(stored));
}
