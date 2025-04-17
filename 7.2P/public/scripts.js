// Handle the "Calculate" button click event
document.getElementById('calculateBtn').addEventListener('click', function () {
  const num1 = document.getElementById('num1').value;
  const num2 = document.getElementById('num2').value;
  const operation = document.getElementById('operation').value;

  if (!num1 || !num2) {
      alert("Please enter both numbers.");
      return;
  }

  // If the operation is addition, use the GET request
  if (operation === 'add') {
      const url = `/add?num1=${num1}&num2=${num2}`;

      fetch(url)
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  document.getElementById('resultDisplay').innerText = data.error;
              } else {
                  document.getElementById('resultDisplay').innerText = data.result;
              }
          })
          .catch(error => {
              console.error('Error:', error);
              document.getElementById('resultDisplay').innerText = error;
          });
  } 
  // If the operation is subtraction, use the POST request
  else if (operation === 'subtract') {
      const data = { num1: num1, num2: num2 };

      fetch('/subtract', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  document.getElementById('resultDisplay').innerText = data.error;
              } else {
                  document.getElementById('resultDisplay').innerText = data.result;
              }
          })
          .catch(error => {
              console.error('Error:', error);
              document.getElementById('resultDisplay').innerText = error;
          });
  }
});

// Connect to the server using Socket.IO
const socket = io();

// Listen for the 'Greetings' event from the server
socket.on('Greetings', function (randomNumber) {
  // Log the random number to the console
  console.log('Random number from server:', randomNumber);
});
