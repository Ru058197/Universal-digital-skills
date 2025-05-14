
const questions = {
  delegation: [
    { question: "How do you assign tasks?", answers: [{ text: "Strategically", score: 1 }, { text: "Randomly", score: 0 }] }
  ],
  ethics: [
    { question: "How do you handle ethical dilemmas?", answers: [{ text: "Follow principles", score: 1 }, { text: "Look the other way", score: 0 }] }
  ],
  communication: [
    { question: "What’s key to great communication?", answers: [{ text: "Clarity", score: 1 }, { text: "Guesswork", score: 0 }] }
  ],
  timeManagement: [
    { question: "How do you prioritize tasks?", answers: [{ text: "By impact and urgency", score: 1 }, { text: "At random", score: 0 }] }
  ],
  projectManagement: [
    { question: "What defines successful project management?", answers: [{ text: "Planning and delivery", score: 1 }, { text: "Guessing", score: 0 }] }
  ],
  problemSolving: [
    { question: "How do you solve problems?", answers: [{ text: "Structured thinking", score: 1 }, { text: "Panic", score: 0 }] }
  ],
  python: [
    { question: "What does 'len([1,2,3])' return?", answers: [{ text: "3", score: 1 }, { text: "Error", score: 0 }] }
  ],
  javascript: [
    { question: "Which is a valid way to declare a variable?", answers: [{ text: "let x = 5;", score: 1 }, { text: "var: x;", score: 0 }] }
  ],
  sql: [
    { question: "What does SELECT * FROM table do?", answers: [{ text: "Returns all columns", score: 1 }, { text: "Deletes all data", score: 0 }] }
  ],
  html: [
    { question: "Which tag creates a hyperlink?", answers: [{ text: "<a>", score: 1 }, { text: "<link>", score: 0 }] }
  ],
  cybersecurity: [
    { question: "What is phishing?", answers: [{ text: "A type of social engineering", score: 1 }, { text: "An antivirus tool", score: 0 }] }
  ],
  debugging: [
    { question: "What is the purpose of a debugger?", answers: [{ text: "To step through code", score: 1 }, { text: "To delete bugs", score: 0 }] }
  ]
};

let currentSkillQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

const questionSection = document.getElementById("question-section");
const questionText = document.getElementById("question-text");
const answerOptions = document.getElementById("answer-options");
const nextBtn = document.getElementById("next-btn");
const resultSection = document.getElementById("result-section");
const resultDescription = document.getElementById("result-description");
const downloadLink = document.getElementById("download-results");

function startSkill(skill) {
  document.getElementById("skill-select").style.display = "none";
  questionSection.style.display = "block";
  currentQuestionIndex = 0;
  score = 0;

  currentSkillQuestions = questions[skill];
  showQuestion();
}

function showQuestion() {
  const current = currentSkillQuestions[currentQuestionIndex];
  questionText.innerText = current.question;
  answerOptions.innerHTML = "";
  current.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.innerText = answer.text;
    btn.addEventListener("click", () => selectAnswer(answer.score));
    answerOptions.appendChild(btn);
  });
}

function selectAnswer(answerScore) {
  score += answerScore;
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  nextBtn.style.display = "none";
  if (currentQuestionIndex < currentSkillQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionSection.style.display = "none";
  resultSection.style.display = "block";

  const resultText = score >= currentSkillQuestions.length * 0.7
    ? "You demonstrated strong understanding of this skill."
    : "You may benefit from more development in this skill.";

  resultDescription.innerText = resultText;

  const blob = new Blob([resultText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = "certivue-results.txt";
}
