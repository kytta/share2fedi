
const translations = {
  fr: {
    for: "pour",
    post_text: "Texte du toot",
    post_text_placeholder: "Qu’avez-vous en tête ?",
    choose_instance: "Choisissez votre instance Mastodon",
    remember_instance: "Se souvenir de mon instance sur ce navigateur",
    what_is_mastodon: "Qu’est-ce que Mastodon ?",
    share2fedi_on_github: "share2fedi sur GitHub",
  },
  es: {
    for: "para",
    post_text: "Texto del toot",
    post_text_placeholder: "¿Qué está pasando?",
    choose_instance: "Elige tu instancia de Mastodon",
    remember_instance: "Recordar mi instancia en este navegador",
    what_is_mastodon: "¿Qué es Mastodon?",
    share2fedi_on_github: "share2fedi en GitHub",
  },
  de: {
    for: "für",
    post_text: "Toot-Text",
    post_text_placeholder: "Was denkst du gerade?",
    choose_instance: "Wähle deine Mastodon-Instanz",
    remember_instance: "Diese Instanz merken",
    what_is_mastodon: "Was ist Mastodon?",
    share2fedi_on_github: "share2fedi auf GitHub",
  },
  ru: {
    for: "для",
    post_text: "Текст тута",
    post_text_placeholder: "Что у вас на уме?",
    choose_instance: "Выберите вашу инстанцию Mastodon",
    remember_instance: "Запомнить эту инстанцию в этом браузере",
    what_is_mastodon: "Что такое Mastodon?",
    share2fedi_on_github: "share2fedi на GitHub",
  },
}

let lang = "en";

for (const urlParameter of window.location.search.slice(1).split("&")) {
  const parameterPair = urlParameter.split("=");
  if (parameterPair[0] === "lang") {
    lang = parameterPair[1];
  }
}

const replacements = translations[lang];

if (replacements) {
  document.documentElement.lang = lang;

  for (const element of document.querySelectorAll("[data-translate-inner]")) {
    const replacement = replacements[element.dataset.translateInner];
    if (replacement) element.innerHTML = replacement;
  }

  for (const element of document.querySelectorAll("[data-translate-placeholder]")) {
    const replacement = replacements[element.dataset.translatePlaceholder];
    if (replacement) element.placeholder = replacement;
  }
}
