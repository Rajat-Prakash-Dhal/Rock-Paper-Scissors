// Game state management
class RockPaperScissors {
    constructor() {
        // Initialize game state
        this.playerScore = 0;
        this.computerScore = 0;
        this.choices = ['rock', 'paper', 'scissors'];
        this.choiceEmojis = {
            rock: '🪨',
            paper: '📄',
            scissors: '✂️'
        };
        
        // Get DOM elements
        this.playerScoreElement = document.getElementById('playerScore');
        this.computerScoreElement = document.getElementById('computerScore');
        this.roundDisplay = document.getElementById('roundDisplay');
        this.playerChoiceElement = document.getElementById('playerChoice');
        this.computerChoiceElement = document.getElementById('computerChoice');
        this.resultMessageElement = document.getElementById('resultMessage');
        this.resetBtn = document.getElementById('resetBtn');
        this.choiceButtons = document.querySelectorAll('.choice-btn');

        this.initializeEventListeners();
    }

    // Set up event listeners for all interactive elements
    initializeEventListeners() {
        // Add click listeners to choice buttons
        this.choiceButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const playerChoice = e.currentTarget.dataset.choice;
                this.playRound(playerChoice);
            });
        });

        // Add click listener to reset button
        this.resetBtn.addEventListener('click', () => {
            this.resetGame();
        });

        // Add keyboard support for accessibility
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case '1':
                case 'r':
                case 'R':
                    this.playRound('rock');
                    break;
                case '2':
                case 'p':
                case 'P':
                    this.playRound('paper');
                    break;
                case '3':
                case 's':
                case 'S':
                    this.playRound('scissors');
                    break;
                case ' ':
                case 'Enter':
                    if (e.target === this.resetBtn) {
                        this.resetGame();
                    }
                    break;
            }
        });
    }

    // Generate random computer choice
    getComputerChoice() {
        const randomIndex = Math.floor(Math.random() * this.choices.length);
        return this.choices[randomIndex];
    }

    // Determine winner based on game rules
    determineWinner(playerChoice, computerChoice) {
        // Check for tie
        if (playerChoice === computerChoice) {
            return 'tie';
        }

        // Check winning conditions for player
        const winConditions = {
            rock: 'scissors',     // Rock crushes Scissors
            paper: 'rock',        // Paper covers Rock
            scissors: 'paper'     // Scissors cuts Paper
        };

        if (winConditions[playerChoice] === computerChoice) {
            return 'player';
        } else {
            return 'computer';
        }
    }

    // Update score display with animation
    updateScore(winner) {
        if (winner === 'player') {
            this.playerScore++;
            this.playerScoreElement.textContent = this.playerScore;
            this.playerScoreElement.classList.add('score-update');
            setTimeout(() => {
                this.playerScoreElement.classList.remove('score-update');
            }, 400);
        } else if (winner === 'computer') {
            this.computerScore++;
            this.computerScoreElement.textContent = this.computerScore;
            this.computerScoreElement.classList.add('score-update');
            setTimeout(() => {
                this.computerScoreElement.classList.remove('score-update');
            }, 400);
        }
    }

    // Display round result with animations
    displayResult(playerChoice, computerChoice, winner) {
        // Show the round display
        this.roundDisplay.classList.remove('hidden');

        // Reset animations by removing and re-adding elements
        this.playerChoiceElement.style.animation = 'none';
        this.computerChoiceElement.style.animation = 'none';
        this.resultMessageElement.style.animation = 'none';

        // Set choices with slight delay for animation
        setTimeout(() => {
            this.playerChoiceElement.textContent = this.choiceEmojis[playerChoice];
            this.playerChoiceElement.style.animation = 'fadeInScale 0.5s ease forwards';
        }, 100);

        setTimeout(() => {
            this.computerChoiceElement.textContent = this.choiceEmojis[computerChoice];
            this.computerChoiceElement.style.animation = 'fadeInScale 0.5s ease forwards';
        }, 300);

        // Set result message with appropriate styling
        let message, className;
        switch (winner) {
            case 'player':
                message = '🎉 You Win!';
                className = 'result-win';
                break;
            case 'computer':
                message = '💻 Computer Wins!';
                className = 'result-lose';
                break;
            case 'tie':
                message = '🤝 It\'s a Tie!';
                className = 'result-tie';
                break;
        }

        setTimeout(() => {
            this.resultMessageElement.textContent = message;
            this.resultMessageElement.className = `result-message ${className}`;
            this.resultMessageElement.style.animation = 'slideInFade 0.5s ease forwards';
        }, 500);
    }

    // Main game logic - play a round
    playRound(playerChoice) {
        // Disable buttons temporarily to prevent rapid clicking
        this.choiceButtons.forEach(btn => btn.style.pointerEvents = 'none');

        // Generate computer choice
        const computerChoice = this.getComputerChoice();

        // Determine winner
        const winner = this.determineWinner(playerChoice, computerChoice);

        // Update score if there's a winner
        this.updateScore(winner);

        // Display result
        this.displayResult(playerChoice, computerChoice, winner);

        // Re-enable buttons after animation completes
        setTimeout(() => {
            this.choiceButtons.forEach(btn => btn.style.pointerEvents = 'auto');
        }, 1000);
    }

    // Reset game to initial state
    resetGame() {
        // Reset scores
        this.playerScore = 0;
        this.computerScore = 0;

        // Update score display
        this.playerScoreElement.textContent = '0';
        this.computerScoreElement.textContent = '0';

        // Hide round display
        this.roundDisplay.classList.add('hidden');

        // Clear choices and result
        this.playerChoiceElement.textContent = '';
        this.computerChoiceElement.textContent = '';
        this.resultMessageElement.textContent = '';

        // Add visual feedback for reset
        this.resetBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.resetBtn.style.transform = '';
        }, 150);

        console.log('Game reset successfully');
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new RockPaperScissors();
    console.log('Rock Paper Scissors game initialized');
});

