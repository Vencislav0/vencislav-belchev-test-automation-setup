The bot automates Battleship using a Hunt-and-Destroy strategy:
Hunt Mode → Selects cells using a checkerboard pattern for efficiency.

Target Mode → Once a ship is hit, systematically attacks adjacent cells to sink it.

 Algorithm Flow:

 Game Initialization
Opens the Battleship game.
Waits for an opponent and sets up the game board.
Sends a chat message for interaction.


 Main Game Loop
Check for game-ending conditions (Win, Lose, Opponent Left).
Wait for the bot’s turn.

Choose Attack Strategy:
Hunt Mode → Select a random checkerboard cell.
Target Mode → Attack adjacent cells if a hit was detected.

Evaluate cell state:
"miss" → Continue hunting.
"hit" → Switch to Destroy Mode.
"done" → Ship sunk, return to Hunt Mode.
Repeat until the game ends.

Key Functions:
generateUniqueCell() (Hunt Mode)
Uses a checkerboard pattern until half the grid is explored, then switches to random selection.
Prevents duplicate clicks using a hash set which also makes it faster.

destroyShip() (Target Mode)
Systematically attacks right, left, down, up until the ship is sunk.
Resets to Hunt Mode once "done" is detected.
Effectively handles cases where hitting more than once and then missing by returning to the first hit state and trying a different direction.

The bot uses a checkerboard search for efficiency and systematic targeting when a ship is hit. It ensures optimized search, avoids redundant moves, and has a fallback random mode when needed. 