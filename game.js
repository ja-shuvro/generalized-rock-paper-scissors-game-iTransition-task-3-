const crypto = require("crypto");

class KeyGenerator {
  static generateKey() {
    return crypto.randomBytes(32).toString("hex"); // 256-bit key
  }
}

class HMACCalculator {
  static generateHMAC(key, message) {
    return crypto.createHmac("sha256", key).update(message).digest("hex");
  }
}

class GameRules {
  constructor(moves) {
    this.moves = moves;
    this.numMoves = moves.length;
  }

  determineWinner(userMoveIndex, computerMoveIndex) {
    const half = Math.floor(this.numMoves / 2);

    if (userMoveIndex === computerMoveIndex) {
      return "Draw";
    }

    // Determine win or lose based on circular logic
    if (
      (userMoveIndex - computerMoveIndex + this.numMoves) % this.numMoves <=
      half
    ) {
      return "You win!";
    } else {
      return "You lose!";
    }
  }

  getComputerMove() {
    const randomIndex = crypto.randomInt(this.numMoves);
    return { index: randomIndex, move: this.moves[randomIndex] };
  }
}

class HelpTable {
  constructor(moves) {
    this.moves = moves;
    this.numMoves = moves.length;
  }

  generateTable() {
    const table = [];
    const headers = [" "].concat(this.moves);

    table.push(headers);

    for (let i = 0; i < this.numMoves; i++) {
      const row = [this.moves[i]];

      for (let j = 0; j < this.numMoves; j++) {
        if (i === j) {
          row.push("Draw");
        } else if (
          (i - j + this.numMoves) % this.numMoves <=
          Math.floor(this.numMoves / 2)
        ) {
          row.push("Win");
        } else {
          row.push("Lose");
        }
      }
      table.push(row);
    }

    // Print the table
    table.forEach((row) => {
      console.log(row.join("\t"));
    });
  }
}

class RockPaperScissorsGame {
  constructor(moves) {
    if (
      moves.length < 3 ||
      moves.length % 2 === 0 ||
      new Set(moves).size !== moves.length
    ) {
      throw new Error(
        "Invalid input. Provide an odd number of at least 3 non-repeating moves."
      );
    }

    this.moves = moves;
    this.rules = new GameRules(moves);
    this.key = KeyGenerator.generateKey();
  }

  play() {
    const computerMove = this.rules.getComputerMove();
    const hmac = HMACCalculator.generateHMAC(this.key, computerMove.move);

    console.log(`HMAC: ${hmac}`);
    console.log("Available moves:");
    this.moves.forEach((move, index) => console.log(`${index + 1} - ${move}`));
    console.log("0 - exit");
    console.log("? - help");

    process.stdin.on("data", (input) => {
      const userInput = input.toString().trim();

      if (userInput === "0") {
        console.log("Exiting...");
        process.exit();
      } else if (userInput === "?") {
        const helpTable = new HelpTable(this.moves);
        helpTable.generateTable();
      } else {
        const userMoveIndex = parseInt(userInput, 10) - 1;

        if (
          isNaN(userMoveIndex) ||
          userMoveIndex < 0 ||
          userMoveIndex >= this.moves.length
        ) {
          console.log("Invalid input, please try again.");
        } else {
          console.log(`Your move: ${this.moves[userMoveIndex]}`);
          console.log(`Computer move: ${computerMove.move}`);
          const result = this.rules.determineWinner(
            userMoveIndex,
            computerMove.index
          );
          console.log(result);
          console.log(`HMAC key: ${this.key}`);
          process.exit();
        }
      }
    });
  }
}

// Command-line argument validation
const args = process.argv.slice(2);

if (
  args.length < 3 ||
  args.length % 2 === 0 ||
  new Set(args).size !== args.length
) {
  console.error(
    "Error: Provide an odd number of at least 3 non-repeating moves."
  );
  console.error("Example: node game.js rock paper scissors");
  process.exit(1);
}

// Start the game
const game = new RockPaperScissorsGame(args);
game.play();
