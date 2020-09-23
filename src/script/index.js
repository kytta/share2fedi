var remembered = window.localStorage.getItem('mastodon_instance');
if (remembered != null) {
    document.getElementById('instance').value = remembered;
}

var paramPairs = window.location.search.substr(1).split('&');
var paramPairsLength = paramPairs.length;

for (var i = 0; i < paramPairsLength; i++) {
    var paramPair = paramPairs[i].split('=');
    if (paramPair[0] === 'text') {
        document.getElementById('text').value = decodeURIComponent(paramPair[1]);
        break;
    }
}
delete i
delete paramPair

document
  .getElementById('form')
  .addEventListener('submit', function (e) {
    e.preventDefault();
    var text = e.target.elements['text'].value;
    var instance = e.target.elements['instance'].value;
    var remember = e.target.elements['remember'].checked;


    if (!(instance.startsWith("https://") || instance.startsWith("http://"))) {
        instance = "https://" + instance;
    }
    if (!instance.endsWith("/")){
        instance = instance + "/";
    }

    if (remember) {
        window.localStorage.setItem('mastodon_instance', instance);
    }

    var shareUrl = instance + "share?text=" + encodeURIComponent(text);
    window.open(shareUrl, '_blank', 'noopener,noreferrer')
})
