// Initial data for chart
let prices = [30000, 30100, 29950, 30200, 30150];
let score = 0;
let support = 29800; // Misal level support
let resistance = 30300; // Misal level resistance

// Chart.js setup
const ctx = document.getElementById('cryptoChart').getContext('2d');
const cryptoChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [{
      label: 'Crypto Price (USD)',
      data: prices,
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      fill: false
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }
});

// Function to simulate new price movement based on trend, support, and resistance
function getNextPrice() {
  const lastPrice = prices[prices.length - 1];
  const trend = Math.random() > 0.5 ? 1 : -1; // Tentukan apakah tren naik atau turun
  const volatility = Math.floor(Math.random() * 100) + 50; // Volatilitas antara 50 dan 150

  let newPrice;
  if (trend === 1) { // Jika tren naik
    newPrice = Math.min(lastPrice + volatility, resistance); // Jangan melebihi resistance
  } else { // Jika tren turun
    newPrice = Math.max(lastPrice - volatility, support); // Jangan turun di bawah support
  }

  return newPrice;
}

// Update chart and check user prediction
function updateChart(prediction) {
  const newPrice = getNextPrice();
  const lastPrice = prices[prices.length - 1];

  prices.push(newPrice);
  cryptoChart.data.labels.push(prices.length.toString());
  cryptoChart.update();

  // Check if the prediction was correct
  let result = '';
  if ((newPrice > lastPrice && prediction === 'up') || (newPrice < lastPrice && prediction === 'down')) {
    result = 'Prediksi Benar!';
    score += 10;
  } else {
    result = 'Prediksi Salah!';
  }

  // Update result and score
  document.getElementById('result').textContent = result;
  document.getElementById('score').textContent = `Skor: ${score}`;
}

// Event listeners for prediction buttons
document.getElementById('predict-up').addEventListener('click', () => updateChart('up'));
document.getElementById('predict-down').addEventListener('click', () => updateChart('down'));
