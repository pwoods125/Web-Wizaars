const profileForm = document.querySelector('.profile-form');

console.log(profileForm);
async function profileFormHandler(event) {
  event.preventDefault();

  const firstname = document.querySelector('#first_name').value;
  const lastname = document.querySelector('#last_name').value;
  const aboutme = document.querySelector('#about_me').value;
  const usernamepsn = document.querySelector('#psn_name').value;
  const usernamexbox = document.querySelector('#xbox_name').value;
  const usernamesteam = document.querySelector('#steam_name').value;
  const usernamenintendo = document.querySelector('#nintendo_name').value;

  const response = await fetch(`/api/profiles`, {
    method: 'POST',
    body: JSON.stringify({
      firstname,
      lastname,
      aboutme,
      usernamepsn,
      usernamexbox,
      usernamesteam,
      usernamenintendo,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace(`/landing`);
  } else {
    alert('Failed to post profile');
  }
}

document
  .querySelector('.profile-form')
  .addEventListener('submit', profileFormHandler);
