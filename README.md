# Generalized Rock-Paper-Scissors with HMAC

This project implements a generalized version of the Rock-Paper-Scissors game. It allows for an arbitrary odd number of moves, with support for custom moves provided as command line arguments. The game uses HMAC (based on SHA-256) to ensure fairness, proving that the computer's move is not changed after the user makes theirs.

## Features

- Supports any odd number of moves greater than or equal to 3 (e.g., Rock-Paper-Scissors, Rock-Paper-Scissors-Lizard-Spock, etc.).
- Uses a cryptographically secure random key (256-bit) to generate HMAC for the computer's move.
- Displays HMAC before the user makes their move to ensure fairness.
- Validates input to ensure correct number of unique moves.
- Generates a help table showing which moves win, lose, or draw.
- User-friendly error messages for invalid input.
  
## How It Works

1. The game accepts an odd number of non-repeating moves as command line arguments (e.g., `rock`, `paper`, `scissors`).
2. A cryptographically secure key is generated, and the HMAC of the computer's move is calculated and displayed.
3. The user selects their move from a list.
4. After the user makes their move, the computer's move, HMAC key, and result are displayed.
5. The user can verify the fairness of the computer's move by calculating the HMAC with the provided key and comparing it to the initial HMAC.

## Prerequisites

- **Node.js** (if using the JavaScript version)

## Running the Game

To start the game, run the script from the terminal with at least 3 non-repeating, odd-numbered moves. For example:

```bash
node game.js rock paper scissors
```

### Example Usage

```bash
$ node game.js rock paper scissors
HMAC: 9ED68097B2D5D9A968E85BD7094C75D00F96680DC43CDD6918168A8F50DE8507
Available moves:
1 - rock
2 - paper
3 - scissors
0 - exit
? - help
Enter your move: 2
Your move: paper
Computer move: rock
You win!
HMAC key: BD9BE48334BB9C5EC263953DA54727F707E95544739FCE7359C267E734E380A2
```

### Menu Options

- **1, 2, ..., N**: Select the corresponding move.
- **0**: Exit the game.
- **?**: Display the help table showing which moves win or lose.

### Help Table Example

For 5 moves (`rock paper scissors lizard Spock`), the help table will look like this:

```
          | rock    | paper   | scissors| lizard  | Spock   |
-------------------------------------------------------------
rock      | Draw    | Lose    | Win     | Win     | Lose    |
paper     | Win     | Draw    | Lose    | Lose    | Win     |
scissors  | Lose    | Win     | Draw    | Win     | Lose    |
lizard    | Lose    | Win     | Lose    | Draw    | Win     |
Spock     | Win     | Lose    | Win     | Lose    | Draw    |
```

## Error Handling

If the input is invalid (even number of moves, repeated moves, or fewer than 3 moves), the game will display an appropriate error message. Example error message:

```bash
Error: You must provide at least 3 non-repeating moves, and the number of moves must be odd.
Example: node game.js rock paper scissors
```

## Code Structure

This project follows an object-oriented approach and is organized into four main classes:

1. **Game**: Manages the game logic, including user input, determining the winner, and displaying results.
2. **HMACGenerator**: Responsible for generating a cryptographically secure key and computing the HMAC using SHA-256.
3. **MoveValidator**: Validates the command-line arguments to ensure they are correct (odd number of non-repeating moves).
4. **HelpTable**: Generates and displays the help table in an ASCII format, showing which moves win, lose, or draw.

## Running Tests

You can test the game by passing different sets of command line arguments. Example:

```bash
# Test with 3 moves
node game.js rock paper scissors

# Test with 5 moves
node game.js rock paper scissors lizard Spock

# Test with invalid parameters (e.g., even number of moves)
node game.js rock paper
```

## Video Demonstration

A video demonstrating the game’s functionality can be found here:
[Video Link](https://youtu.be/a1kLYvUVVOU)

