const url = new URL(window.location.href);

if(url.searchParams.get('ref') == 'yri') {
  document.querySelector('title').textContent = 'you came from https://miyo.lol didn\'t you?';
  document.querySelector("link[rel='shortcut icon']").href = "boykisser.png";
}