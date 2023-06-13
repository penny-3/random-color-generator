const url = "https://raw.githubusercontent.com/Margaret2/pantone-colors/master/pantone-colors.json";
const wrapper = document.querySelector('.palette-wrapper');
const reloadBtn = document.querySelector('.reload-btn');
let colorData = [];
const colorCount = 5;

// fetch color function
const fetchData = async () => {
  try {
    const response = await axios.get(url);
    colorData = response.data; // Assign the response data directly to colorData
  } catch (error) {
    console.error('Failed to fetch the API:', error);
  }
};


// create cards
function createColor(data, randNum) {
  let colorCard = "";
  colorCard += `<div class="color-card" id="${data.values[randNum]}">
    <div class="color-index" style="background:${data.values[randNum]}"></div>
    <span class="color-name">${data.names[randNum]}</span>
    <span class="hex-num" data-id="${data.values[randNum]}">${data.values[randNum]}</span>   
  </div>`;
  wrapper.innerHTML += colorCard; // Append the colorCard HTML to the wrapper
}

async function getColors() {
  await fetchData(); // Wait for the data to be fetched
  for (let i = 0; i < colorCount; i++) {
    let randNum = Math.floor(Math.random() * colorData.names.length); // Use Math.floor instead of Math.ceil
    createColor(colorData, randNum);
  }
  console.log(colorData);
}
// fetch colors 
getColors();

// regenerate color
reloadBtn.addEventListener('click', getColors);

// copy hex
wrapper.addEventListener('click', (event) => {
  if (event.target.matches('.color-card')) {
    const colorHex = event.target.querySelector('.hex-num');
    navigator.clipboard.writeText(colorHex.innerText);
    popUp(colorHex.innerText);
  }
});

// show alert
function popUp(hex) {
  const msg = document.createElement('div');
  msg.className = 'pop-up';
  msg.innerHTML = `Color ${hex} copied to your clipboard.`;
  wrapper.appendChild(msg);
  const removeMsg = setTimeout(() => {
    msg.remove();
    clearTimeout(removeMsg);
  }, 2500);
}