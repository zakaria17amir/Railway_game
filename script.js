//-----------------------------------Rules Part -------------------------- //
const rulesButton = document.querySelector("#rulesButton");
const rulesPopup = document.querySelector("#rulesPopup");
const closeButton = document.querySelector("#closeRules");

// Show the popup when "Rules" button is clicked
rulesButton.onclick = function () {
  rulesPopup.classList.remove("hidden");
};

// Hide the popup when the close button is clicked
closeButton.onclick = function () {
  rulesPopup.classList.add("hidden");
};

//---------------------------- Generation of Grid based on user input -----------------------------//

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
let selectedDifficulty = null;

//difficulty selection for Easy
easyButton.onclick = function () {
  selectedDifficulty = "Easy";
  easyButton.classList.add("active");
  hardButton.classList.remove("active");
};

//difficulty selection for Hard
hardButton.onclick = function () {
  selectedDifficulty = "Hard";
  hardButton.classList.add("active");
  easyButton.classList.remove("active");
};

// Start Game function
startGameButton.onclick = function () {
  submitButton.disabled = false;

  const playerName = playerNameInput.value.trim();

  if (selectedDifficulty && playerName) {
    gameScreen.classList.remove("hidden");
    landingScreen.classList.add("hidden");
    playerDisplayName.innerText = playerName;
    difficultyLevel.innerText = selectedDifficulty;
    playerNameDisplay.innerText = playerName;
    generateGrid(selectedDifficulty);
    startTimer();
  } else {
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

// Submit button function
submitButton.onclick = function () {
  submitButton.disabled = true;

  finishGame();

  const isPuzzleValid = validatePuzzle(typeMatrix);
  const isPathValid = isPuzzleValid && validatePath(typeMatrix);
  const message = isPathValid
    ? "Congratulations! Puzzle solved successfully!"
    : "Better luck next time.";

  document.querySelector("#submissionMessage").textContent = message;

  function updateLeaderboard() {
    const leaderboard = document.querySelector("#leaderboard");
    //finaltime , selectedifficulty,playername
    const listItem = document.createElement("li");
    listItem.innerText = `${selectedDifficulty} : ${playerNameInput.value} : ${finalTime}`;
    leaderboard.appendChild(listItem);
  }
  if (isPathValid) updateLeaderboard();
};

// Back to Menu button
backButton.onclick = function () {
  landingScreen.classList.remove("hidden");
  gameScreen.classList.add("hidden");
};

//--------------------------------------------Map Layouts-------------------------------
// "S" = Soil, "B" = Bridge, "M" = Mountain, "W" = Oasis/water
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

// Image sources for hardcoded map generation
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

// function to insert image to innitialize map
function createInitializationImage(type) {
  const imageData = allRestrictedImages[type];
  const img = document.createElement("img");
  img.src = imageData.src;
  img.alt = type;
  img.style.transform = imageData.transform;
  img.classList.add("w-full", "h-full");

  return img;
}

function createNoRestrictionImage(type) {
  const imageData = noRestrictionImages[type];
  const img = document.createElement("img");
  img.src = imageData.src;
  img.alt = type;
  img.style.transform = imageData.transform;
  img.classList.add("w-full", "h-full");

  return img;
}

//------------------------------------------------Create Map---------------------------------

let typeMatrix = [];
//function to generate grid
function generateGrid(difficulty) {
  gameGrid.innerHTML = "";

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

  typeMatrix = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(null)
  );

  gameGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  gameGrid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cellType = mapLayout[row][col];
      const cell = document.createElement("div");
      cell.classList.add("border", "cursor-pointer");

      const img = createInitializationImage(cellType);

      cell.appendChild(img);
      gameGrid.appendChild(cell);

      typeMatrix[row][col] = cellType;
      cell.addEventListener("click", () =>
        changeImage(cell, cellType, row, col)
      );
    }
  }
}
//------------------ placement of images----------------------------------------

function changeImage(cell, cellType, row, col) {
  const img = cell.querySelector("img");
  let newType = cellType;

  switch (cellType) {
    case "S":
      const noRestrictionKeys = Object.keys(noRestrictionImages);
      let soilIndex = noRestrictionKeys.indexOf(img.alt);
      soilIndex = (soilIndex + 1) % noRestrictionKeys.length;
      const newSoilImage = createNoRestrictionImage(
        noRestrictionKeys[soilIndex]
      );

      cell.replaceChild(newSoilImage, img);
      newType = noRestrictionKeys[soilIndex];
      break;

    case "W":
      return;

    case "BHR":
      const bridgeHImages = ["BHR", "LBHR"];
      let bridgeHIndex = bridgeHImages.indexOf(img.alt);
      bridgeHIndex = (bridgeHIndex + 1) % bridgeHImages.length;
      const newBridgeHImage = createInitializationImage(
        bridgeHImages[bridgeHIndex]
      );

      cell.replaceChild(newBridgeHImage, img);
      newType = bridgeHImages[bridgeHIndex];

      break;

    case "BVR":
      const bridgeVImages = ["BVR", "LBVR"];
      let bridgeVIndex = bridgeVImages.indexOf(img.alt);
      bridgeVIndex = (bridgeVIndex + 1) % bridgeVImages.length;
      const newBridgeVImage = createInitializationImage(
        bridgeVImages[bridgeVIndex]
      );

      cell.replaceChild(newBridgeVImage, img);
      newType = bridgeVImages[bridgeVIndex];

      break;

    case "MBR":
      const mountainBRImages = ["MBR", "LMBR"];
      let mountainBRIndex = mountainBRImages.indexOf(img.alt);
      mountainBRIndex = (mountainBRIndex + 1) % mountainBRImages.length;
      const newMountainBRImage = createInitializationImage(
        mountainBRImages[mountainBRIndex]
      );

      cell.replaceChild(newMountainBRImage, img);
      newType = mountainBRImages[mountainBRIndex];

      break;

    case "MBL":
      const mountainBLImages = ["MBL", "LMBL"];
      let mountainBLIndex = mountainBLImages.indexOf(img.alt);
      mountainBLIndex = (mountainBLIndex + 1) % mountainBLImages.length;
      const newMountainBLImage = createInitializationImage(
        mountainBLImages[mountainBLIndex]
      );

      cell.replaceChild(newMountainBLImage, img);
      newType = mountainBLImages[mountainBLIndex];

      break;

    case "MTL":
      const mountainTLImages = ["MTL", "LMTL"];
      let mountainTLIndex = mountainTLImages.indexOf(img.alt);
      mountainTLIndex = (mountainTLIndex + 1) % mountainTLImages.length;
      const newMountainTLImage = createInitializationImage(
        mountainTLImages[mountainTLIndex]
      );
      newType = mountainTLImages[mountainTLIndex];

      cell.replaceChild(newMountainTLImage, img);
      break;

    case "MTR":
      const mountainTRImages = ["MTR", "LMTR"];
      let mountainTRIndex = mountainTRImages.indexOf(img.alt);
      mountainTRIndex = (mountainTRIndex + 1) % mountainTRImages.length;
      const newMountainTRImage = createInitializationImage(
        mountainTRImages[mountainTRIndex]
      );

      cell.replaceChild(newMountainTRImage, img);
      newType = mountainTRImages[mountainTRIndex];

      break;

    default:
      console.warn(`Unknown cell type: ${cellType}`);
  }
  typeMatrix[row][col] = newType;
}

//----------------minimum requirements done-----------------------------------
// Finish game function to stop the timer, display message, and reset elapsed time
let finalTime = null;
function finishGame() {
  const elapsedTimeElement = document.querySelector("#elapsedTime");
  const gameFinishedMessage = document.querySelector("#gameFinishedMessage");

  finalTime = elapsedTimeElement.textContent;

  stopTimer();

  gameFinishedMessage.textContent = `Game finished at: ${finalTime}`;

  elapsedTimeElement.textContent = "00:00";
}

// ----------------checking part------------------------------

//-----------------------------no null cell--------------------------
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

      if (!validPathTypes.includes(cellType)) {
        console.log(
          `Puzzle is incomplete. Cell at (${row}, ${col}) is missing a valid path type.\n
          cell type is ${cellType}`
        );
        return false;
      }
    }
  }

  return true;
}

function validatePuzzle(typeMatrix) {
  const isNoNullCellValid = validateNoNullCell(typeMatrix);

  if (!isNoNullCellValid) {
    console.log(
      "Puzzle validation failed: A non-water cell is missing a path type."
    );
    return false;
  }
  console.log("First condition passed. Proceeding with further checks...");

  return true;
}
//------------------------------------Check adjacent cells-----------------------
function getEndpoints(cellType) {
  switch (cellType) {
    case "W":
      return [];
    case "LBVR":
      return ["t", "b"];
    case "LBHR":
      return ["l", "r"];
    case "LSVR":
      return ["t", "b"];
    case "LSHR":
      return ["l", "r"];
    case "CBR":
      return ["r", "b"];
    case "CBL":
      return ["l", "b"];
    case "CTL":
      return ["l", "t"];
    case "CTR":
      return ["r", "t"];
    case "LMBR":
      return ["r", "b"];
    case "LMBL":
      return ["l", "b"];
    case "LMTL":
      return ["l", "t"];
    case "LMTR":
      return ["r", "t"];

    default:
      return [];
  }
}

function checkConnection(cell2, direction) {
  const cell2Endpoints = getEndpoints(cell2.type);

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

  return false;
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
    return null;
  }

  const startCell = findStartCell();
  if (!startCell) return false;

  let { row, col } = startCell;
  let visitedCells = 0;
  let previousEnd = null;

  const directions = {
    t: { rowOffset: -1, colOffset: 0, opposite: "b" },
    b: { rowOffset: 1, colOffset: 0, opposite: "t" },
    l: { rowOffset: 0, colOffset: -1, opposite: "r" },
    r: { rowOffset: 0, colOffset: 1, opposite: "l" },
  };

  const totalPathCells = gridSize * gridSize - countWaterCells(typeMatrix);
  const startCellType = typeMatrix[row][col];

  const startEndpoints = getEndpoints(startCellType);
  let initialDirection = startEndpoints[0];

  // Use initial direction to find the first adjacent cell
  const firstDirection = directions[initialDirection];
  const firstRow = row + firstDirection.rowOffset;
  const firstCol = col + firstDirection.colOffset;

  if (
    firstRow < 0 ||
    firstRow >= gridSize ||
    firstCol < 0 ||
    firstCol >= gridSize
  ) {
    return false;
  }

  const firstCellType = typeMatrix[firstRow][firstCol];
  if (
    firstCellType === "W" ||
    !checkConnection({ type: firstCellType }, initialDirection)
  ) {
    return false;
  }
  row = firstRow;
  col = firstCol;
  previousEnd = firstDirection.opposite;
  visitedCells++;
  while (visitedCells < totalPathCells) {
    const cellType = typeMatrix[row][col];
    const cellEndpoints = getEndpoints(cellType);

    if (visitedCells > 0 && row === startCell.row && col === startCell.col) {
      console.log("visited cells: " + visitedCells);
      return false;
    }

    if (previousEnd != null && !cellEndpoints.includes(previousEnd)) {
      console.log(
        "previous end : " + previousEnd + "cell endpoints : " + cellEndpoints
      );
      return false;
    }

    visitedCells++;
    let connected = false;
    const nextEnd = cellEndpoints.find((end) => end !== previousEnd);

    if (nextEnd) {
      const direction = directions[nextEnd];
      const nextRow = row + direction.rowOffset;
      const nextCol = col + direction.colOffset;

      if (
        nextRow >= 0 &&
        nextRow < gridSize &&
        nextCol >= 0 &&
        nextCol < gridSize
      ) {
        const nextCellType = typeMatrix[nextRow][nextCol];
        const nextCell = { type: nextCellType };

        if (nextCellType !== "W" && checkConnection(nextCell, nextEnd)) {
          row = nextRow;
          col = nextCol;
          previousEnd = direction.opposite;
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
      return false;
    }
  }
  const lastCellType = typeMatrix[row][col];
  const lastCellEndpoints = getEndpoints(lastCellType);

  return (
    lastCellEndpoints.includes(previousEnd) &&
    row === startCell.row &&
    col === startCell.col
  );
}

function countWaterCells(typeMatrix) {
  return typeMatrix.flat().filter((type) => type === "W").length;
}
