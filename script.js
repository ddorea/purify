// Função para animação de contadores
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const updateCounter = () => {
            const target = +counter.getAttribute('data-target');
            const current = +counter.innerText.replace(/\D/g, ''); // Remove caracteres não numéricos
            const increment = target / 100;

            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(updateCounter, 30);
            } else {
                // Verifica se o target é 25000 para adicionar o '+'
                if (target === 25000) {
                    counter.innerText = '+' + target;
                } else {
                    counter.innerText = target;
                }
            }
        };

        counter.style.opacity = "1";
        updateCounter();
    });
}

// Função para observar animações na rolagem
function scrollAnimations() {
    const elements = document.querySelectorAll('.fade-in, .counter-animated');
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    if (entry.target.classList.contains('counter-animated')) {
                        animateCounters();
                    }
                }
            });
        },
        { threshold: 0.5 }
    );

    elements.forEach(element => observer.observe(element));
}

// Função para verificar as respostas do quiz
function checkQuizAnswers(quizId) {
    const quiz = document.getElementById(quizId);
    const answers = quiz.querySelectorAll('input[type="radio"]');

    answers.forEach(answer => {
        answer.addEventListener('change', () => {
            // Remove a cor de fundo de todas as respostas dentro do mesmo quiz
            const allAnswers = quiz.querySelectorAll('input[type="radio"]');
            allAnswers.forEach(item => {
                item.parentElement.style.backgroundColor = '';
            });

            if (answer.checked) {
                const isCorrect = answer.getAttribute('data-correct') === 'true';
                if (isCorrect) {
                    answer.parentElement.style.backgroundColor = 'green';
                } else {
                    answer.parentElement.style.backgroundColor = 'red'; 
                }
            }
        });
    });
}

// Chama a função de inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    scrollAnimations();

    // Inicializa os quizzes para verificar as respostas
    const quizSections = document.querySelectorAll('.quiz-section');
    quizSections.forEach(quizSection => {
        const quizId = quizSection.id;
        checkQuizAnswers(quizId);
    });

    // Lida com o botão para mostrar ou esconder o quiz
    const quizButtons = document.querySelectorAll('.quiz-btn');
    quizButtons.forEach(button => {
        button.addEventListener('click', () => {
            const quizId = button.getAttribute('data-quiz-id');
            const quizSection = document.getElementById(quizId);

            // Alterna a visibilidade do quiz
            if (quizSection.style.display === "none" || quizSection.style.display === "") {
                quizSection.style.display = "block";
            } else {
                quizSection.style.display = "none";
            }
        });
    });
});
