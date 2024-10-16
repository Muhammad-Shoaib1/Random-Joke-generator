let jokes = [];
let currentJokeIndex = 0;

function fetchRandomJoke() {
  return fetch('https://official-joke-api.appspot.com/jokes/random')
    .then(response => response.json())
    .then(data => {
      jokes.push(data);
      return data;
    })
    .catch(error => {
      console.error('Error fetching joke:', error);
    });
}

function displayJoke(index) {
  const joke = jokes[index];
  const jokeText = `${joke.setup} ${joke.punchline}`;
  const jokeElement = document.getElementById('joke');
  jokeElement.classList.remove('show');
  setTimeout(() => {
    jokeElement.innerText = jokeText;
    jokeElement.classList.add('show');
  }, 500);
}

function loadJoke() {
  if (currentJokeIndex < jokes.length) {
    displayJoke(currentJokeIndex);
  } else {
    fetchRandomJoke().then(joke => displayJoke(currentJokeIndex));
  }
}

document.getElementById('next-joke').addEventListener('click', () => {
  currentJokeIndex++;
  if (currentJokeIndex < jokes.length) {
    displayJoke(currentJokeIndex);
  } else {
    fetchRandomJoke().then(joke => displayJoke(currentJokeIndex));
  }
});

document.getElementById('prev-joke').addEventListener('click', () => {
  if (currentJokeIndex > 0) {
    currentJokeIndex--;
    displayJoke(currentJokeIndex);
  } else {
    alert('No previous jokes available');
  }
});

// Load the first joke when the page loads
fetchRandomJoke().then(joke => displayJoke(currentJokeIndex));