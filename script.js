const quizData = [
    {
        question: "What are the two main groups of animals Odyssey mentioned?",
        answers: {
            a: "Land animals and water animals",
            b: "Vertebrates and invertebrates",
            c: "Mammals and birds",
            d: "Fish and reptiles"
        },
        correctAnswer: "b",
        feedback: {
            correct: "Great job! Odyssey explained that animals can be divided into vertebrates (animals with backbones) and invertebrates (animals without backbones).",
            incorrect: "Not quite. Odyssey explained that animals can be divided into vertebrates (animals with backbones) and invertebrates (animals without backbones)."
        }
    },
    {
        question: "How many groups of vertebrates did Odyssey mention?",
        answers: {
            a: "Three",
            b: "Four",
            c: "Five",
            d: "Six"
        },
        correctAnswer: "c",
        feedback: {
            correct: "Correct! Odyssey mentioned five groups of vertebrates: fish, birds, mammals, reptiles, and amphibians.",
            incorrect: "Actually, Odyssey mentioned five groups of vertebrates: fish, birds, mammals, reptiles, and amphibians."
        }
    },
    {
        question: "What type of animal is the Blue Ridge Two-lined Salamander?",
        answers: {
            a: "Fish",
            b: "Reptile",
            c: "Mammal",
            d: "Amphibian"
        },
        correctAnswer: "d",
        feedback: {
            correct: "Well done! The Blue Ridge Two-lined Salamander is an amphibian.",
            incorrect: "The correct answer is amphibian. Salamanders are a type of amphibian."
        }
    },
    {
        question: "What process is constantly changing the shape of Lake Jocassee and its surroundings?",
        answers: {
            a: "Photosynthesis",
            b: "Erosion and deposition",
            c: "Hibernation",
            d: "Migration"
        },
        correctAnswer: "b",
        feedback: {
            correct: "Excellent! The process of erosion and deposition is constantly changing the shape of the lake and its surroundings.",
            incorrect: "Not quite. The process of erosion and deposition is constantly changing the shape of the lake and its surroundings."
        }
    },
    {
        question: "When was Lake Jocassee created?",
        answers: {
            a: "1953",
            b: "1963",
            c: "1973",
            d: "1983"
        },
        correctAnswer: "c",
        feedback: {
            correct: "That's right! Lake Jocassee was created in 1973 by flooding the Jocassee Valley.",
            incorrect: "Actually, Lake Jocassee was created in 1973 by flooding the Jocassee Valley."
        }
    }
];

function buildQuiz() {
    const output = [];

    quizData.forEach((questionData, questionNumber) => {
        const answers = [];

        for (letter in questionData.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} : ${questionData.answers[letter]}
                </label>`
            );
        }

        output.push(
            `<div class="question-container">
                <div class="question">
                    <h2>Question ${questionNumber + 1}</h2>
                    <p>${questionData.question}</p>
                </div>
                <div class="answers">${answers.join('')}</div>
                <div class="feedback" id="feedback${questionNumber}"></div>
            </div>`
        );
    });

    quizElement.innerHTML = output.join('');

    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', handleAnswerSelection);
    });
}

function handleAnswerSelection(e) {
    const selectedAnswer = e.target;
    const questionNumber = parseInt(selectedAnswer.name.replace('question', ''));
    const isCorrect = selectedAnswer.value === quizData[questionNumber].correctAnswer;

    const feedbackElement = document.getElementById(`feedback${questionNumber}`);
    feedbackElement.textContent = isCorrect ? quizData[questionNumber].feedback.correct : quizData[questionNumber].feedback.incorrect;
    feedbackElement.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;

    document.querySelectorAll(`input[name="question${questionNumber}"]`).forEach(radio => {
        radio.disabled = true;
    });

    updateResults();
}

function updateResults() {
    let numCorrect = 0;
    quizData.forEach((_, questionNumber) => {
        const selectedAnswer = document.querySelector(`input[name="question${questionNumber}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === quizData[questionNumber].correctAnswer) {
            numCorrect++;
        }
    });

    resultsElement.textContent = `You've answered ${numCorrect} out of ${quizData.length} questions correctly!`;
}

const quizElement = document.getElementById('quiz');
const resultsElement = document.getElementById('results');

buildQuiz();
