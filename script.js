const container = document.getElementById('container');
let selectedColor = 'black';
let isDrawing = false;

container.addEventListener('mouseleave', stopDrawing);
document.addEventListener('mouseup', stopDrawing);

// Function to create the grid
function createGrid(size) {
	container.innerHTML = ''; // Clear previous grid

	container.style.cssText = `grid-template-columns: repeat(${size}, 1fr); grid-template-rows: repeat(${size}, 1fr);`;

	for (let i = 0; i < size * size; i++) {
		const gridItem = document.createElement('div');
		gridItem.addEventListener('mousedown', startDrawing);
		gridItem.addEventListener('mouseover', draw);
		container.appendChild(gridItem);
	}
}

// Function to handle the mousedown event and start drawing
function startDrawing(event) {
	event.preventDefault(); // Prevent dragging of the grid
	isDrawing = true;
	draw(event);
}

// Function to handle the mouseover event and draw on the grid
function draw(event) {
	if (isDrawing) {
		event.target.style.backgroundColor = selectedColor;
	}
}

// Function to stop drawing
function stopDrawing() {
	isDrawing = false;
}

// Function to reset the sketch by creating a new grid based on user input
function resetSketch() {
	let newSize = prompt('Enter the size of the new grid (max 100):');
	newSize = Math.min(Math.max(parseInt(newSize), 1), 100); // Limiting the size between 1 and 100
	createGrid(newSize);
}

// Function to clear the sketch by setting all grid items' background color to white
function clearSketch() {
	const gridItems = container.querySelectorAll('div');
	gridItems.forEach(item => {
		item.style.backgroundColor = 'white';
	});
}

// Function to fill the entire grid with the selected color
function fillPaintBucket() {
	container.querySelectorAll('div').forEach(item => {
		item.style.backgroundColor = selectedColor;
	});
}

const colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('input', () => {
	selectedColor = colorPicker.value;
});

const fillButton = document.getElementById('fillButton');
fillButton.addEventListener('click', fillPaintBucket);

createGrid(16); // Initial grid size