document.addEventListener('DOMContentLoaded', () => {
    const storySection = document.getElementById('story-section');
    const quizSection = document.getElementById('quiz-section');
    const storyElement = document.getElementById('story');
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const timerElement = document.getElementById('timer');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const changeStoryBtn = document.getElementById('change-story-btn');

    const stories = [
        `Once upon a time, there was a man named Noah.

        Noah was a good and righteous man who always did what was right, and this pleased God.

        However, not everyone in the world was like Noah.
        One day, God looked down at the world and saw that the people were being very wicked and not taking care of the earth. God decided to do something about it.

        God told Noah to build a big boat called an ark and then gather two of every kind of animal, one male and one female, to bring with them onto the ark.

        God explained that he was going to send a great flood to cleanse the earth, and the ark would keep Noah, his family, and all the animals safe.

        Noah and his family toiled away for many years, working really hard to build the ark.

        They made sure to follow God’s instructions, and made the ark very strong. They also collected enough food for themselves and the animals, which they would need during the flood.

        Once the ark had been completed, Noah, his family and all the animals went inside.

        As soon as Noah and his family were safely in the ark, it began to rain. And then it rained and rained for forty days and forty nights.

        Eventually, the floodwater covered the entire world, but the ark floated on the water keeping them dry.

        Being cooped up in the ark like that, it must have felt as if the rain was going to last forever, but Noah and his family trusted God. They took care of the animals and waited for the rain to stop.

        After forty days, the rain did finally stop, and so Noah sent out a dove to try and find dry land. The dove quickly returned, but after seven days, the dove was sent out again. This time the dove came back with a freshly plucked olive leaf in its beak, which meant there must be dry land nearby.
        Noah and his family were so happy, they knew the flood was almost over.

        When God told them it was time to leave the ark, they opened the doors. Noah’s family and the animals stepped out onto dry land.

        They were happy and grateful to God for saving them.

        God then made a promise to Noah that He would never send such a big flood again.

        God put a beautiful rainbow in the sky as a sign of His promise. And from that day on, whenever it rains and a rainbow appears, people remember God’s love and faithfulness.`,
        
        `Once upon a time, there was a young shepherd boy named David. He was the youngest of his brothers, and while they went off to fight in the army, David stayed behind to tend to his father's sheep.

        One day, David's father sent him to bring food to his brothers at the battlefield. When David arrived, he saw the Israelites facing off against their enemies, the Philistines.

        The Philistines had a giant warrior named Goliath. He was over nine feet tall and wore a suit of armor that gleamed in the sun. Every day, Goliath would come forward and challenge the Israelites to send out a champion to fight him, but no one was brave enough.

        When David heard Goliath's challenge, he was filled with courage. He told King Saul that he would fight Goliath. At first, the king refused, but David insisted, saying that God had helped him protect his sheep from lions and bears, and God would help him defeat Goliath too.

        David went out to face Goliath with only his staff, a sling, and five smooth stones. Goliath laughed at the sight of this young boy coming to fight him with such simple weapons. But David was not afraid.

        As Goliath came forward, David took a stone, put it in his sling, and swung it with all his might. The stone flew through the air and struck Goliath right in the forehead. The giant fell to the ground, dead.

        The Israelites were overjoyed, and the Philistines ran away in fear. David became a hero that day, and eventually, he would become the king of Israel. This story reminds us that with faith and courage, even the smallest among us can overcome great challenges.`,

        `Once upon a time, there was a man named Daniel. He was a faithful servant of God and prayed to Him every day.

        Daniel lived in a kingdom ruled by King Darius. The king liked Daniel and planned to make him the leader of the entire kingdom. But this made the other officials jealous, and they wanted to get rid of Daniel.

        The officials tricked King Darius into making a law that said no one could pray to anyone except the king for thirty days. If anyone disobeyed, they would be thrown into a den of lions.

        Daniel knew about the law, but he continued to pray to God just as he always did. The officials caught Daniel praying and told the king. King Darius was sad because he liked Daniel, but he could not change the law.

        So, Daniel was thrown into the lions' den. The den was filled with hungry lions, and it seemed certain that Daniel would be eaten. But Daniel trusted in God, and God sent an angel to shut the mouths of the lions. They did not harm Daniel at all.

        The next morning, King Darius rushed to the lions' den and called out to Daniel. To his amazement, Daniel answered back. He was alive and unharmed!

        King Darius was overjoyed and ordered that Daniel be taken out of the den. He then made a new law that everyone in the kingdom should respect the God of Daniel, for He had saved Daniel from the lions. This story shows us the power of faith and trust in God, even in the face of great danger.`
    ];

    let currentStoryIndex = 0;

    const questions = [
        { question: "How many days and nights did it rain?", options: ["40", "20", "10", "7"], correct: 0 },
        { question: "What did Noah build?", options: ["Ark", "Temple", "House", "Ship"], correct: 0 },
        { question: "What did Noah send out to find dry land?", options: ["A dove", "A raven", "A falcon", "A parrot"], correct: 0 },
        { question: "What did the dove bring back to Noah?", options: ["An olive leaf", "A twig", "A flower", "A fruit"], correct: 0 },
        { question: "What sign did God give to Noah that He would not flood the earth again?", options: ["A rainbow", "A star", "A cloud", "A comet"], correct: 0 }
    ];

    let currentQuestionIndex = 0;
    let timer;
    let timeLeft = 30;

    function loadStory() {
        storyElement.textContent = stories[currentStoryIndex];
        storySection.style.display = 'block';
        quizSection.style.display = 'none';
        speakStory(stories[currentStoryIndex]);
    }

    function startQuiz() {
        storySection.style.display = 'none';
        quizSection.style.display = 'block';
        loadQuestion();
    }

    function loadQuestion() {
        clearInterval(timer);
        if (currentQuestionIndex < questions.length) {
            const questionData = questions[currentQuestionIndex];
            questionElement.textContent = questionData.question;
            optionsElement.innerHTML = '';
            questionData.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.textContent = option;
                button.addEventListener('click', () => checkAnswer(index));
                optionsElement.appendChild(button);
            });
            startTimer();
        } else {
            alert('Quiz Completed!');
            location.reload(); // Reload the page to start over
        }
    }

    function startTimer() {
        timeLeft = 30;
        timerElement.textContent = `Time left: ${timeLeft}s`;
        timer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `Time left: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert('Time is up!');
                nextQuestion();
            }
        }, 1000);
    }

    function checkAnswer(selectedIndex) {
        const correctIndex = questions[currentQuestionIndex].correct;
        if (selectedIndex === correctIndex) {
            alert('Correct!');
        } else {
            alert('Incorrect!');
        }
        nextQuestion();
    }

    function nextQuestion() {
        clearInterval(timer);
        currentQuestionIndex++;
        loadQuestion();
    }

    function changeStory() {
        currentStoryIndex = (currentStoryIndex + 1) % stories.length; // Cycle through the stories
        loadStory();
    }

    function speakStory(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-UK';
        window.speechSynthesis.speak(utterance);
    }

    startQuizBtn.addEventListener('click', startQuiz);
    nextQuestionBtn.addEventListener('click', nextQuestion);
    changeStoryBtn.addEventListener('click', changeStory); // Add event listener to change story button

    loadStory(); // Load the first story when the page loads
});
