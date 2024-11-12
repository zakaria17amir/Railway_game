//----------------------- Rules part -----------------------------------//
const rulesButton = document.querySelector("#rulesButton");
const rulesPopup = document.querySelector("#rulesPopup");
const closeButton = document.querySelector("#closeRules");

// Show the popup when "Rules" button is clicked
rulesButton.onclick = function () {
  rulesPopup.classList.remove("hidden"); // Updated to use DaisyUI's `hidden` class
};

// Hide the popup when the close button is clicked
closeButton.onclick = function () {
  rulesPopup.classList.add("hidden"); // Updated to use DaisyUI's `hidden` class
};

//---------------------------- Select which screen will appear based on the user -----------------------------//

const easyButton = document.querySelector("#easyButton");
const hardButton = document.querySelector("#hardButton");
const startGameButton = document.querySelector("#startGameButton");
const playerNameInput = document.querySelector("#playerName");
const gameScreen = document.querySelector("#gameScreen");
const errorMessage = document.querySelector("#errorMessage");
const difficultyLevel = document.querySelector("#difficultyLevel");
const landingScreen = document.querySelector("#landingScreen");
const playerDisplayName = document.querySelector("#playerDisplayName");
const playerNameDisplay = document.querySelector("#playerNameDisplay");
const gameGrid = document.querySelector("#gameGrid");
const submitButton = document.querySelector("#submitButton");

let timerInterval;
let selectedDifficulty = null; // Variable to store selected difficulty

// Handle difficulty selection for Easy
easyButton.onclick = function () {
  selectedDifficulty = "Easy";
  easyButton.classList.add("active");
  hardButton.classList.remove("active");
};

// Handle difficulty selection for Hard
hardButton.onclick = function () {
  selectedDifficulty = "Hard";
  hardButton.classList.add("active");
  easyButton.classList.remove("active");
};

// Handle Start Game button click
startGameButton.onclick = function () {
  //submitButton.disabled = false; // Enable the submit button

  const playerName = playerNameInput.value.trim();

  // Check if a difficulty is selected and a name is entered
  if (selectedDifficulty && playerName) {
    // Hide the landing screen and show the game screen
    gameScreen.classList.remove("hidden");
    landingScreen.classList.add("hidden");
    playerDisplayName.innerText = playerName;
    difficultyLevel.innerText = selectedDifficulty;
    playerNameDisplay.innerText = playerName;
    // Generate the grid based on the selected difficulty
    generateGrid(selectedDifficulty);
    startTimer();
  } else {
    // Alert the user to select difficulty and enter a name
    errorMessage.textContent =
      "Please enter your name and select a difficulty to start the game.";
  }
};

// Timer function
function startTimer() {
  let elapsedSeconds = 0;
  const elapsedTimeElement = document.querySelector("#elapsedTime");
  timerInterval = setInterval(() => {
    elapsedSeconds++;
    const minutes = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0");
    const seconds = String(elapsedSeconds % 60).padStart(2, "0");
    elapsedTimeElement.textContent = `${minutes}:${seconds}`;
  }, 1000);
}
// Stop timer function
function stopTimer() {
  clearInterval(timerInterval);
}

// Handle Submit button click
// Handle Submit button click
submitButton.onclick = function () {
  //submitButton.disabled = true; // Disable the button to prevent multiple submissions

  finishGame(); // Call finishGame when submit button is clicked

  const isPuzzleValid = validatePuzzle(typeMatrix);

  if (isPuzzleValid) {
    const cond2 = validatePath(typeMatrix);
    if (cond2) {
      console.log("Puzzle solved successfully!");
    }
  } else {
    console.log("Puzzle is not solved.");
  }
};

// Handle Back to Menu button click
backButton.onclick = function () {
  // Show the landing screen and hide the game screen
  landingScreen.classList.remove("hidden");
  gameScreen.classList.add("hidden");
};

//--------------------------------------------Map Layouts-------------------------------
// Hardcoded map layout for the 5x5 grid
// "S" = Soil, "B" = Bridge, "M" = Mountain, "W" = Water
const easyMapLayout01 = [
  ["S", "MBL", "S", "S", "W"],
  ["S", "S", "S", "BVR", "W"],
  ["BVR", "S", "MTL", "S", "S"],
  ["S", "S", "S", "W", "S"],
  ["S", "S", "MTR", "S", "S"],
];
const easyMapLayout02 = [
  ["W", "S", "BHR", "S", "S"],
  ["S", "MTL", "S", "S", "MTL"],
  ["BVR", "W", "MTR", "S", "S"],
  ["S", "S", "S", "W", "S"],
  ["S", "S", "S", "S", "S"],
];
const easyMapLayout03 = [
  ["S", "S", "BHR", "S", "S"],
  ["S", "S", "S", "S", "BVR"],
  ["S", "MTL", "BVR", "S", "S"],
  ["S", "W", "S", "S", "S"],
  ["S", "BHR", "S", "S", "MTL"],
];
const easyMapLayout04 = [
  ["S", "S", "S", "BHR", "S"],
  ["S", "S", "S", "S", "S"],
  ["BVR", "S", "MBL", "S", "MBL"],
  ["S", "S", "S", "S", "S"],
  ["S", "S", "W", "MTR", "S"],
];
const easyMapLayout05 = [
  ["S", "S", "BHR", "S", "S"],
  ["S", "MBR", "S", "S", "S"],
  ["BVR", "S", "S", "MTR", "S"],
  ["S", "S", "BVR", "W", "S"],
  ["S", "MTL", "S", "S", "S"],
];
const allEasyMaps = [
  easyMapLayout01,
  easyMapLayout02,
  easyMapLayout03,
  easyMapLayout04,
  easyMapLayout05,
];

const hardMapLayout01 = [
  ["S", "MBL", "W", "W", "S", "BHR", "S"],
  ["BVR", "S", "S", "S", "S", "S", "S"],
  ["S", "S", "BVR", "S", "S", "S", "S"],
  ["S", "S", "S", "MTR", "S", "S", "S"],
  ["MTR", "S", "MBL", "S", "BHR", "S", "W"],
  ["S", "S", "S", "S", "S", "S", "S"],
  ["S", "S", "S", "BHR", "S", "S", "S"],
];
const hardMapLayout02 = [
  ["S", "S", "W", "S", "S", "S", "S"],
  ["BVR", "S", "BHR", "S", "S", "MTL", "S"],
  ["S", "S", "BHR", "S", "S", "S", "BVR"],
  ["MBR", "S", "S", "S", "S", "S", "S"],
  ["S", "W", "S", "MBL", "S", "S", "S"],
  ["S", "MBR", "S", "S", "S", "S", "S"],
  ["S", "S", "W", "S", "S", "S", "S"],
];
const hardMapLayout03 = [
  ["S", "S", "BHR", "S", "S", "S", "S"],
  ["S", "S", "S", "S", "S", "S", "BVR"],
  ["W", "S", "MTR", "S", "S", "S", "S"],
  ["S", "S", "S", "S", "S", "S", "S"],
  ["S", "W", "MTR", "S", "BHR", "S", "S"],
  ["BVR", "S", "S", "S", "S", "MBL", "S"],
  ["S", "S", "W", "MTR", "S", "S", "S"],
];
const hardMapLayout04 = [
  ["S", "S", "S", "S", "S", "S", "S"],
  ["S", "S", "S", "BVR", "S", "MTL", "S"],
  ["S", "S", "MTR", "S", "S", "S", "S"],
  ["S", "BHR", "S", "W", "S", "BHR", "S"],
  ["S", "S", "MTL", "S", "S", "S", "S"],
  ["BVR", "S", "S", "S", "S", "MTR", "S"],
  ["S", "S", "S", "S", "S", "S", "S"],
];
const hardMapLayout05 = [
  ["S", "S", "S", "S", "S", "S", "S"],
  ["S", "S", "S", "S", "S", "MBR", "S"],
  ["S", "BHR", "BHR", "S", "MBL", "S", "S"],
  ["S", "S", "S", "S", "S", "S", "S"],
  ["S", "S", "MBR", "S", "W", "S", "S"],
  ["S", "MTL", "S", "BVR", "S", "S", "S"],
  ["S", "S", "S", "S", "S", "S", "S"],
];

const allHardMaps = [
  hardMapLayout01,
  hardMapLayout02,
  hardMapLayout03,
  hardMapLayout04,
  hardMapLayout05,
];

// Image sources for each terrain type
const allRestrictedImages = {
  S: { src: "pics/tiles/empty.png", transform: "rotate(0deg)" },
  W: { src: "pics/tiles/oasis.png", transform: "rotate(0deg)" },

  BVR: { src: "pics/tiles/bridge.png", transform: "rotate(0deg)" },
  BHR: { src: "pics/tiles/bridge.png", transform: "rotate(90deg)" },

  LBVR: { src: "pics/tiles/bridge_rail.png", transform: "rotate(0deg)" },
  LBHR: { src: "pics/tiles/bridge_rail.png", transform: "rotate(90deg)" },

  MBR: { src: "pics/tiles/mountain.png", transform: "rotate(0deg)" },
  MBL: { src: "pics/tiles/mountain.png", transform: "rotate(90deg)" },
  MTL: { src: "pics/tiles/mountain.png", transform: "rotate(180deg)" },
  MTR: { src: "pics/tiles/mountain.png", transform: "rotate(270deg)" },

  LMBR: { src: "pics/tiles/mountain_rail.png", transform: "rotate(0deg)" },
  LMBL: { src: "pics/tiles/mountain_rail.png", transform: "rotate(90deg)" },
  LMTL: { src: "pics/tiles/mountain_rail.png", transform: "rotate(180deg)" },
  LMTR: { src: "pics/tiles/mountain_rail.png", transform: "rotate(270deg)" },

  CBR: { src: "pics/tiles/curve_rail.png", transform: "rotate(0deg)" },
  CBL: { src: "pics/tiles/curve_rail.png", transform: "rotate(90deg)" },
  CTL: { src: "pics/tiles/curve_rail.png", transform: "rotate(180deg)" },
  CTR: { src: "pics/tiles/curve_rail.png", transform: "rotate(270deg)" },

  LSVR: { src: "pics/tiles/straight_rail.png", transform: "rotate(0deg)" },
  LSHR: { src: "pics/tiles/straight_rail.png", transform: "rotate(90deg)" },
};

const noRestrictionImages = {
  S: { src: "pics/tiles/empty.png", transform: "rotate(0deg)" },

  CBR: { src: "pics/tiles/curve_rail.png", transform: "rotate(0deg)" },
  CBL: { src: "pics/tiles/curve_rail.png", transform: "rotate(90deg)" },
  CTL: { src: "pics/tiles/curve_rail.png", transform: "rotate(180deg)" },
  CTR: { src: "pics/tiles/curve_rail.png", transform: "rotate(270deg)" },

  LSVR: { src: "pics/tiles/straight_rail.png", transform: "rotate(0deg)" },
  LSHR: { src: "pics/tiles/straight_rail.png", transform: "rotate(90deg)" },
};

function createTerrainImage(type) {
  // Get the terrain image data from the allRestrictedImages object
  const imageData = allRestrictedImages[type];

  // Create an <img> element and set its properties
  const img = document.createElement("img");
  img.src = imageData.src;
  img.alt = type; // Set alt text for accessibility
  img.style.transform = imageData.transform; // Apply the rotation

  // Add any additional classes or styles if needed
  img.classList.add("w-full", "h-full");

  return img;
}

function createNoRestrictionImage(type) {
  // Get the terrain image data from the allRestrictedImages object
  const imageData = noRestrictionImages[type];

  // Create an <img> element and set its properties
  const img = document.createElement("img");
  img.src = imageData.src;
  img.alt = type; // Set alt text for accessibility
  img.style.transform = imageData.transform; // Apply the rotation

  // Add any additional classes or styles if needed
  img.classList.add("w-full", "h-full");

  return img;
}

//------------------------------------------------Create Map---------------------------------
let typeMatrix = []; // Declare typeMatrix at a higher scope to be accessible in both functions
function generateGrid(difficulty) {
  gameGrid.innerHTML = ""; // Clear any existing grid content

  // Determine grid size and layout based on difficulty
  let mapLayout = null;
  let gridSize = 0;
  if (difficulty === "Easy") {
    gridSize = 5;
    const randomIndex = Math.floor(Math.random() * allEasyMaps.length);
    mapLayout = allEasyMaps[randomIndex];
  } else {
    gridSize = 7;
    const randomIndex = Math.floor(Math.random() * allHardMaps.length);
    mapLayout = allHardMaps[randomIndex];
  }
  //Innitialize typeMatrix
  typeMatrix = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(null)
  );

  // Set grid CSS styles to create a dynamic grid layout without gaps
  gameGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  gameGrid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  // Generate grid cells based on the map layout
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cellType = mapLayout[row][col];
      const cell = document.createElement("div");
      cell.classList.add("border", "cursor-pointer");

      // Set the background image based on terrain type
      const img = createTerrainImage(cellType);
      // const img = document.createElement("img");
      // img.src = allRestrictedImages[cellType];
      // img.alt = cellType; // Optional: Set alt text for accessibility
      // img.classList.add("w-full", "h-full"); // Make the image fill the cell

      cell.appendChild(img); // Add the image to the cell
      gameGrid.appendChild(cell); // Add the cell to the grid

      // Store the initial type in typeMatrix
      typeMatrix[row][col] = cellType;
      cell.addEventListener("click", () =>
        changeImage(cell, cellType, row, col)
      );
    }
  }
}
//------------------ placement of images----------------------------------------

function changeImage(cell, cellType, row, col) {
  // Get the current image in the cell
  const img = cell.querySelector("img");
  let newType = cellType; // Track the new cell type

  switch (cellType) {
    case "S": // Soil: Cycle through all images in noRestrictionImages
      const noRestrictionKeys = Object.keys(noRestrictionImages);
      let soilIndex = noRestrictionKeys.indexOf(img.alt);
      soilIndex = (soilIndex + 1) % noRestrictionKeys.length;
      const newSoilImage = createNoRestrictionImage(
        noRestrictionKeys[soilIndex]
      );

      cell.replaceChild(newSoilImage, img); // Replace the current image with the new one
      newType = noRestrictionKeys[soilIndex]; // Update the new type based on the new image
      break;

    case "W": // Water: Do nothing as it cannot be changed
      return;

    case "BHR": // Horizontal Bridge: Cycle between BHR and LBHR
      const bridgeHImages = ["BHR", "LBHR"];
      let bridgeHIndex = bridgeHImages.indexOf(img.alt);
      bridgeHIndex = (bridgeHIndex + 1) % bridgeHImages.length;
      const newBridgeHImage = createTerrainImage(bridgeHImages[bridgeHIndex]);

      cell.replaceChild(newBridgeHImage, img); // Replace the current image with the new one
      newType = bridgeHImages[bridgeHIndex]; // Update the new type

      break;

    case "BVR": // Vertical Bridge: Cycle between BVR and LBVR
      const bridgeVImages = ["BVR", "LBVR"];
      let bridgeVIndex = bridgeVImages.indexOf(img.alt);
      bridgeVIndex = (bridgeVIndex + 1) % bridgeVImages.length;
      const newBridgeVImage = createTerrainImage(bridgeVImages[bridgeVIndex]);

      cell.replaceChild(newBridgeVImage, img); // Replace the current image with the new one
      newType = bridgeVImages[bridgeVIndex]; // Update the new type

      break;

    case "MBR": // Mountain base right: Cycle between MBR and LMBR
      const mountainBRImages = ["MBR", "LMBR"];
      let mountainBRIndex = mountainBRImages.indexOf(img.alt);
      mountainBRIndex = (mountainBRIndex + 1) % mountainBRImages.length;
      const newMountainBRImage = createTerrainImage(
        mountainBRImages[mountainBRIndex]
      );

      cell.replaceChild(newMountainBRImage, img); // Replace the current image with the new one
      newType = mountainBRImages[mountainBRIndex]; // Update the new type

      break;

    case "MBL": // Mountain base left: Cycle between MBL and LMBL
      const mountainBLImages = ["MBL", "LMBL"];
      let mountainBLIndex = mountainBLImages.indexOf(img.alt);
      mountainBLIndex = (mountainBLIndex + 1) % mountainBLImages.length;
      const newMountainBLImage = createTerrainImage(
        mountainBLImages[mountainBLIndex]
      );

      cell.replaceChild(newMountainBLImage, img); // Replace the current image with the new one
      newType = mountainBLImages[mountainBLIndex]; // Update the new type

      break;

    case "MTL": // Mountain top left: Cycle between MTL and LMTL
      const mountainTLImages = ["MTL", "LMTL"];
      let mountainTLIndex = mountainTLImages.indexOf(img.alt);
      mountainTLIndex = (mountainTLIndex + 1) % mountainTLImages.length;
      const newMountainTLImage = createTerrainImage(
        mountainTLImages[mountainTLIndex]
      );
      newType = mountainTLImages[mountainTLIndex]; // Update the new type

      cell.replaceChild(newMountainTLImage, img); // Replace the current image with the new one
      break;

    case "MTR": // Mountain top right: Cycle between MTR and LMTR
      const mountainTRImages = ["MTR", "LMTR"];
      let mountainTRIndex = mountainTRImages.indexOf(img.alt);
      mountainTRIndex = (mountainTRIndex + 1) % mountainTRImages.length;
      const newMountainTRImage = createTerrainImage(
        mountainTRImages[mountainTRIndex]
      );

      cell.replaceChild(newMountainTRImage, img); // Replace the current image with the new one
      newType = mountainTRImages[mountainTRIndex]; // Update the new type

      break;

    default:
      console.warn(`Unknown cell type: ${cellType}`);
  }
  // Update the typeMatrix with the new type after the image change
  //console.log(newType);
  typeMatrix[row][col] = newType;
}

//----------------minimum requirements done-----------------------------------
// Finish game function to stop the timer, display message, and reset elapsed time
function finishGame() {
  const elapsedTimeElement = document.querySelector("#elapsedTime");
  const gameFinishedMessage = document.querySelector("#gameFinishedMessage");

  // Get the final elapsed time from the elapsedTimeElement text
  const finalTime = elapsedTimeElement.textContent;

  // Stop the timer
  stopTimer();

  // Display the game finished message
  gameFinishedMessage.textContent = `Game finished at: ${finalTime}`;

  // Reset the elapsed time display to 00:00
  elapsedTimeElement.textContent = "00:00";
}

// ----------------checking part------------------------------

//-----------------------------no null cell--------------------------
// Define valid types that each non-water cell should contain
const validPathTypes = [
  "LBVR",
  "LBHR",
  "LSVR",
  "LSHR",
  "CBR",
  "CBL",
  "CTL",
  "CTR",
  "LMBR",
  "LMBL",
  "LMTL",
  "LMTR",
  "W",
];

function validateNoNullCell(typeMatrix) {
  for (let row = 0; row < typeMatrix.length; row++) {
    for (let col = 0; col < typeMatrix[row].length; col++) {
      const cellType = typeMatrix[row][col];

      // Check if the cell is non-water and does not contain a valid path type
      if (!validPathTypes.includes(cellType)) {
        console.log(
          `Puzzle is incomplete. Cell at (${row}, ${col}) is missing a valid path type.\n
          cell type is ${cellType}`
        );
        return false;
      }
    }
  }

  // All non-water cells contain a valid path type
  return true;
}

function validatePuzzle(typeMatrix) {
  // Check the first condition: all non-water cells must have a valid path type
  const isNoNullCellValid = validateNoNullCell(typeMatrix);

  if (!isNoNullCellValid) {
    console.log(
      "Puzzle validation failed: A non-water cell is missing a path type."
    );
    return false; // Stop further validation
  }

  // Continue with further validation checks here if needed
  console.log("First condition passed. Proceeding with further checks...");

  // Additional validation checks can be added here

  return true;
}
//------------------------------------Check adjacent cells-----------------------
function getEndpoints(cellType) {
  switch (cellType) {
    case "W":
      return []; // Water cells have no endpoints
    case "LBVR":
      return ["t", "b"]; // Vertical bridge connects top to bottom
    case "LBHR":
      return ["l", "r"]; // Horizontal bridge connects left to right
    case "LSVR":
      return ["t", "b"]; // Vertical straight line
    case "LSHR":
      return ["l", "r"]; // Horizontal straight line
    case "CBR":
      return ["r", "b"]; // Curve connects right to bottom
    case "CBL":
      return ["l", "b"]; // Curve connects left to bottom
    case "CTL":
      return ["l", "t"]; // Curve connects left to top
    case "CTR":
      return ["r", "t"]; // Curve connects right to top
    case "LMBR":
      return ["r", "b"]; // Curve connects right to bottom
    case "LMBL":
      return ["l", "b"]; // Curve connects left to bottom
    case "LMTL":
      return ["l", "t"]; // Curve connects left to top
    case "LMTR":
      return ["r", "t"]; // Curve connects right to top

    // Add any other cell types as needed
    default:
      return [];
  }
}

function checkConnection(cell2, direction) {
  const cell2Endpoints = getEndpoints(cell2.type);
  console.log(cell2Endpoints);
  console.log(direction);
  // Determine the required endpoint direction to connect cell1 and cell2
  if (direction === "r" && cell2Endpoints.includes("l")) {
    return true;
  }
  if (direction === "l" && cell2Endpoints.includes("r")) {
    return true;
  }
  if (direction === "t" && cell2Endpoints.includes("b")) {
    return true;
  }
  if (direction === "b" && cell2Endpoints.includes("t")) {
    return true;
  }

  return false; // If none of these cases are satisfied, there's no valid connection
}

function validatePath(typeMatrix) {
  const gridSize = typeMatrix.length;

  // Function to get a valid non-water starting cell
  function findStartCell() {
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (typeMatrix[row][col] !== "W") {
          return { row, col };
        }
      }
    }
    return null; // No valid starting cell found
  }

  const startCell = findStartCell();
  //console.log(startCell);
  if (!startCell) return false; // No starting point for traversal

  let { row, col } = startCell;
  let visitedCells = 0;
  let previousEnd = null; // Tracks the endpoint connected to the previous cell

  const directions = {
    t: { rowOffset: -1, colOffset: 0, opposite: "b" },
    b: { rowOffset: 1, colOffset: 0, opposite: "t" },
    l: { rowOffset: 0, colOffset: -1, opposite: "r" },
    r: { rowOffset: 0, colOffset: 1, opposite: "l" },
  };

  const totalPathCells = gridSize * gridSize - countWaterCells(typeMatrix); // Total cells to visit

  // Get the starting cell's endpoints and choose the first endpoint to begin traversal
  const startCellType = typeMatrix[row][col];
  console.log(startCellType);
  const startEndpoints = getEndpoints(startCellType);
  console.log(startEndpoints);
  let initialDirection = startEndpoints[0]; // Choose the first endpoint of the start cell
  console.log(initialDirection);

  // Use initial direction to find the first adjacent cell
  const firstDirection = directions[initialDirection];
  console.log(firstDirection);
  const firstRow = row + firstDirection.rowOffset;
  console.log(firstRow);
  const firstCol = col + firstDirection.colOffset;
  console.log(firstCol);

  if (
    firstRow < 0 ||
    firstRow >= gridSize ||
    firstCol < 0 ||
    firstCol >= gridSize
  ) {
    return false; // Out of bounds for the first move
  }

  const firstCellType = typeMatrix[firstRow][firstCol];
  console.log(firstCellType);
  if (
    firstCellType === "W" ||
    !checkConnection({ type: firstCellType }, initialDirection)
  ) {
    return false; // First connection invalid
  }
  console.log("Passed first one");
  // Move to the first adjacent cell
  row = firstRow;
  col = firstCol;
  previousEnd = firstDirection.opposite; // Set the opposite of initial direction as previousEnd
  visitedCells++;
  console.log(row, col, previousEnd);
  console.log("outer loop ok");
  // Traverse cells based on endpoints until loop is completed
  console.log("total path cells : " + totalPathCells);
  while (visitedCells < totalPathCells) {
    const cellType = typeMatrix[row][col];
    const cellEndpoints = getEndpoints(cellType);

    // Check if we are revisiting the start cell before completing the loop
    if (visitedCells > 0 && row === startCell.row && col === startCell.col) {
      console.log("visited cells: " + visitedCells);
      return false; // Returned to the starting cell too soon
    }

    // Ensure the previous endpoint is valid
    if (previousEnd != null && !cellEndpoints.includes(previousEnd)) {
      console.log(
        "previous end : " + previousEnd + "cell endpoints : " + cellEndpoints
      );
      return false; // The previous cell's end does not match the current cell's start
    }

    visitedCells++;
    let connected = false;

    // Identify the remaining endpoint that we need to use to connect to the next cell
    const nextEnd = cellEndpoints.find((end) => end !== previousEnd);

    if (nextEnd) {
      const direction = directions[nextEnd];
      const nextRow = row + direction.rowOffset;
      const nextCol = col + direction.colOffset;

      // Ensure the next cell is within bounds
      if (
        nextRow >= 0 &&
        nextRow < gridSize &&
        nextCol >= 0 &&
        nextCol < gridSize
      ) {
        const nextCellType = typeMatrix[nextRow][nextCol];
        const nextCell = { type: nextCellType };

        // Check if the next cell is not water and connects correctly
        if (nextCellType !== "W" && checkConnection(nextCell, nextEnd)) {
          // Move to the next cell
          row = nextRow;
          col = nextCol;
          previousEnd = direction.opposite; // Set the opposite direction for the next connection
          connected = true;
        } else {
          console.log(
            "not matching cells : " + nextCellType,
            nextCell,
            nextEnd
          );
          return false;
        }
      } else {
        console.log("out of bounds" + nextRow, nextCol);
        return false;
      }
    } else {
      console.log("next end not found", nextEnd, cellEndpoints, previousEnd);
      return false;
    }

    if (!connected) {
      console.log("No valid connection found for ");
      return false; // If no valid connection is found, stop the traversal
    }
  }

  // After completing the traversal, check if the last cell connects to the remaining endpoint of the starting cell
  const lastCellType = typeMatrix[row][col];
  const lastCellEndpoints = getEndpoints(lastCellType);

  return (
    lastCellEndpoints.includes(previousEnd) &&
    row === startCell.row &&
    col === startCell.col
  );
}

// Helper to count "W" cells in the matrix
function countWaterCells(typeMatrix) {
  return typeMatrix.flat().filter((type) => type === "W").length;
}
