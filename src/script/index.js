function normalizeUrl(url) {
    if (url.indexOf("http://") == -1 && url.indexOf("https://") == -1) {
        url = "https://" + url;
    }
    if (url.charAt(url.length - 1) !== '/'){
        url = url + "/";
    }
    return url;
}

const instance = document.getElementById('instance');
const instances_list = document.getElementById('instances_list');

var prefillInstance = window.localStorage.getItem('mastodon_instance');

var paramPairs = window.location.search.substr(1).split('&');
var paramPairsLength = paramPairs.length;
for (var i = 0; i < paramPairsLength; i++) {
    var paramPair = paramPairs[i].split('=');
    if (paramPair[0] === 'text') {
        document.getElementById('text').value = decodeURIComponent(paramPair[1]);
    } else if (paramPair[0] === 'instance') {
        prefillInstance = decodeURIComponent(paramPair[1]);
    }
}
delete i
delete paramPair

function instances_loading_error() {
    console.error('Failed to fetch servers list from joinmastodon.');
}

function instances_loaded() {
    if (this.status !== 200) {
        instances_loading_error();
        return;
    }

    const servers = JSON.parse(this.responseText);

    const chosen_instance = instance.value;
    const domains = servers.map(obj => obj.domain);
    if (domains.indexOf(chosen_instance) === -1) {
        domains.push(chosen_instance);
    }
    domains.sort();

    for (const domain of domains) {
        const opt = document.createElement('option');
        opt.value = normalizeUrl(domain);
        instances_list.appendChild(opt);
    }
}

if (prefillInstance != null) {
    instance.value = normalizeUrl(prefillInstance);
}

instance.addEventListener('focus', function (e) {
    if (instances_list.children.length === 0) {
        const req = new XMLHttpRequest();
        req.addEventListener('load', instances_loaded);
        req.addEventListener('error', instances_loading_error);
        req.open('GET', 'https://api.joinmastodon.org/servers');
        req.send();
    }
})

document
  .getElementById('form')
  .addEventListener('submit', function (e) {
    e.preventDefault();
    var text = e.target.elements['text'].value;
    var instance = normalizeUrl(e.target.elements['instance'].value);
    var remember = e.target.elements['remember'].checked;

    if (remember) {
        window.localStorage.setItem('mastodon_instance', instance);
    }

    var shareUrl = instance + "share?text=" + encodeURIComponent(text);
    window.open(shareUrl, '_blank', 'noopener,noreferrer')
  })
