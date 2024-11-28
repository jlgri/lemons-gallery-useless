const url = new URL(window.location.href);

switch(url.searchParams.get('ref')) {
  case 'yri':
    document.querySelector('title').textContent = 'you came from https://miyo.lol didn\'t you?';
    document.querySelector("link[rel='shortcut icon']").href = "boykisser.png";
  break;
  case 'mistium':
    document.querySelector('title').textContent = 'you came from https://extensions.mistium.com didn\'t you?'
    break
}