
let currentSkill = "";
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

const questions = {
  delegation: [
    { question: "You're overwhelmed with tasks. What do you do first?", answers: [
      { text: "Decide what I can delegate and to whom.", score: 1 },
      { text: "Do it all myself to stay in control.", score: 0 }
    ]},
    { question: "Someone makes a mistake on a delegated task. Your move?", answers: [
      { text: "Coach them and adjust approach.", score: 1 },
      { text: "Avoid delegating next time.", score: 0 }
    ]}
  ],
  ethics: [
    { question: "You witness unethical behavior. What's your response?", answers: [
      { text: "Report through appropriate channel.", score: 1 },
      { text: "Ignore it to avoid conflict.", score: 0 }
    ]}
  ],
  communication: [
    { question: "Best way to ensure communication clarity?", answers: [
      { text: "Use structured, concise language.", score: 1 },
      { text: "Hope the other person understands.", score: 0 }
    ]}
  ],
  timeManagement: [
    { question: "How do you prioritize your work?", answers: [
      { text: "By deadline and business impact.", score: 1 },
      { text: "Whichever task feels easiest.", score: 0 }
    ]}
  ],
  projectManagement: [
    { question: "What makes a project successful?", answers: [
      { text: "Clear scope and timely delivery.", score: 1 },
      { text: "Adjusting constantly without planning.", score: 0 }
    ]}
  ],
  problemSolving: [
    { question: "First step in solving a complex issue?", answers: [
      { text: "Define the root cause.", score: 1 },
      { text: "Guess a quick fix.", score: 0 }
    ]}
  ],
  python: [
    { question: "What does len([1, 2, 3]) return?", answers: [
      { text: "3", score: 1 },
      { text: "Error", score: 0 }
    ]}
  ],
  javascript: [
    { question: "Which declares a variable in ES6?", answers: [
      { text: "let x = 5;", score: 1 },
      { text: "variable x = 5;", score: 0 }
    ]}
  ],
  sql: [
    { question: "Purpose of SELECT * FROM users?", answers: [
      { text: "Get all records", score: 1 },
      { text: "Delete the table", score: 0 }
    ]}
  ],
  html: [
    { question: "Which tag is used to link pages?", answers: [
      { text: "<a>", score: 1 },
      { text: "<div>", score: 0 }
    ]}
  ],
  cybersecurity: [
    { question: "What is phishing?", answers: [
      { text: "A social engineering attack", score: 1 },
      { text: "A secure login method", score: 0 }
    ]}
  ],
  debugging: [
    { question: "Purpose of using a debugger?", answers: [
      { text: "Step through code and inspect variables", score: 1 },
      { text: "Randomly fix syntax", score: 0 }
    ]}
  ]
};

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
};
