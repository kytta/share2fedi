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
const choose_instance = document.getElementById('choose_instance');
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

function add_instance(text, disabled, selected, value) {
    const opt = document.createElement('option');
    opt.innerText = text;
    if (disabled) {
        opt.setAttribute('disabled', true);
    }
    if (selected) {
        opt.setAttribute('selected', true);
    }
    if (value !== undefined) {
        opt.value = value;
    }
    choose_instance.appendChild(opt);
}

function add_loading_instance() {
    add_instance("... loading ...", true);
}

function remove_loading_instance() {
    const last_index = choose_instance.children.length - 1;
    const last_entry = choose_instance.children[last_index];

    if (last_entry.innerText === "... loading ...") {
        last_entry.remove();
    }
}

function parseUrl(url) {
    const parser = document.createElement('a');
    parser.href = url;
    return parser;
}

function instances_loading_error() {
    choose_instance.innerHTML = "";
    add_instance("-- LOADING FAILED! --", true, false, "");
    console.error('Failed to fetch servers list from joinmastodon.');
}

function instances_loaded() {
    if (this.status !== 200) {
        instances_loading_error();
        return;
    }

    const servers = JSON.parse(this.responseText);

    const chosen_instance = choose_instance.value;
    const domains = servers.map(obj => obj.domain);
    if (domains.indexOf(chosen_instance) === -1) {
        domains.push(chosen_instance);
    }
    domains.sort();

    choose_instance.innerHTML = "";
    add_instance("-- Choose an instance --", false, false, "")
    for (const domain of domains) {
        const selected = (domain === chosen_instance);
        add_instance(domain, false, selected);
    }
}

if (prefillInstance != null) {
    const url = normalizeUrl(prefillInstance);
    instance.value = url;
    add_instance(parseUrl(url).hostname, false, true);
}

choose_instance.addEventListener('focus', function (e) {
    if (choose_instance.children.length < 3) {
        remove_loading_instance();
        add_loading_instance();

        const req = new XMLHttpRequest();
        req.addEventListener('load', instances_loaded);
        req.addEventListener('error', instances_loading_error);
        req.open('GET', 'https://api.joinmastodon.org/servers');
        req.send();
    }
})

choose_instance.addEventListener('change', function (e) {
    instance.value = normalizeUrl(choose_instance.value);
});

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
