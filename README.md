# Puzzle Game

## Overview
This is a puzzle game built using only **HTML**, **CSS**, and **JavaScript**, without any frameworks. The game challenges players to correctly place elements on a randomly generated map while following specific placement rules. The objective is to complete the puzzle as quickly as possible.

## Features
### Mandatory Requirements:
- **Framework-Free Implementation**: The game is entirely built using an HTML file without any frameworks.
- **Good Practices Followed**: The solution avoids all bad practices mentioned in the project guidelines.

### Menu Features:
- **Main Menu:**
  - A **name input field** for entering the player’s name.
  - A **difficulty selection option**.
  - A **start button** to begin the game.
- **Navigation:**
  - Clicking the **"Start"** button takes the player to the game screen.
  - The **game rules** are accessible from the menu.

### Game Screen Features:
- **Player Name & Timer:**
  - The **entered player name** is displayed on the game screen.
  - A **timer** starts running once the game begins.
- **Randomized Map Generation:**
  - A **map** corresponding to the chosen difficulty is randomly generated and displayed with all necessary elements.

### Placement & Validation Features:
- **Element Placement:**
  - Different types of elements can be placed on the map’s cells.
  - Placement rules apply:
    - **On a bridge**: Only straight elements can be placed.
    - **On a mountain**: Elements must be at a **90° angle**.
    - **On an oasis**: No elements can be placed.
    - **On an empty cell**: Any element can be placed.
- **Validation:**
  - The game checks if the **puzzle is solved correctly**:
    - Each **cell that can be touched** is touched only once.
    - The **path is continuous**.
    - **All cells are accessible** from neighboring cells.
    - The **correct elements** are placed according to the rules.
- **End of Game:**
  - The **time taken** to complete the puzzle is displayed.
  - A **leaderboard** is shown, listing completion times for different players at the selected difficulty level.
- **User Experience:**
  - **Neat design** and **well-structured code** for readability and maintainability.

### Bonus Features:
- **Game Save Feature:**
  - The **game's state** can be saved during gameplay.
  - When reopening the page, the **last saved state** is loaded.
- **Persistent Leaderboard:**
  - **Leaderboards** are stored in **LocalStorage**.
  - Scores remain available even after **reloading the page**.
- **Enhanced Element Placement:**
  - Players can **draw paths** by holding down the mouse button and moving across the cells.

## Technologies Used
- **HTML** – Structure of the game.
- **CSS** – Styling and layout.
- **JavaScript** – Game logic, interaction, and state management.

## How to Play
1. Open the game in a **web browser**.
2. **Enter your name** in the provided input field.
3. **Select a difficulty level**.
4. Click the **"Start"** button to begin.
5. Follow the **placement rules** to complete the puzzle.
6. Once the puzzle is solved, **check your time** and compare it with others on the leaderboard.
7. Use the **save feature** to store progress and continue later.

## Deployment
The game is hosted on **GitHub Pages**. You can access it through the provided deployment link.

## Future Improvements
- **Implementing additional difficulty levels**.
- **Enhancing the UI/UX** with animations.
- **Adding sound effects** for better engagement.
- **Introducing new gameplay mechanics** and challenges.

## Contributors
This project is **open-source**. Feel free to contribute by submitting issues and pull requests.

## License
This project is licensed under the **MIT License**. You are free to use, modify, and distribute it with proper attribution.

---
**Enjoy the game and have fun solving the puzzles!**
