async function newFormHandler(event) {
  event.preventDefault();

  const gameName = document.querySelector('#game_name').value;
  const console = document.querySelector('#console').value;
  const genre = document.querySelector('#genre').value;
  const gameComments = document.querySelector('#game_comments').value;
  const completed = !!document.querySelector('#completed');
  const favorite = !!document.querySelector('#favorite');

  const response = await fetch(`/api/games`, {
    method: 'POST',
    body: JSON.stringify({
      game_name: gameName,
      console,
      genre,
      game_comments: gameComments,
      completed,
      favorite,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/games');
  } else {
    alert('Failed to add game to library');
  }
}

document
  .querySelector('.new-game-form')
  .addEventListener('submit', newFormHandler);
