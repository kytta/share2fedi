export const languages = {
	en: "English",
	de: "Deutsch",
	ru: "Русский",
};

export const strings: Record<keyof typeof languages, Record<string, string>> = {
	en: {
		title: "Share₂Fedi — an instance-agnostic share page for the Fediverse",
		metaDescription:
			"Share₂Fedi is a share page for Mastodon, Pleroma, Misskey, and others. Type in your post text and the instance URL and click ‘Publish!’",
		language: "Language:",
		description:
			"Share₂Fedi is an instance-agnostic share page for {}. With it, you can post to various federated platforms from a single page.",
		fediverse: "the Fediverse",
		supportedProjects: "Supported projects:",
		incl: "incl.",
		credits:
			"Share₂Fedi is developed and maintained by {}. Source code is {}. Hosted with {}. {}.",
		nikita: "Nikita Karamov",
		onGitHub: "on GitHub",
		statusPage: "Status page",
		licence: "Licence",
		privacyNotice: "Privacy Notice",
		postText: "Post text{}",
		postTextPlaceholder: "What’s on your mind?",
		instance: "Fediverse instance{}",
		previouslyUsed: "Previously used: {}",
		rememberInstance: "{} Remember instance on this device",
		publish: "Publish",
	},
	de: {
		title: "Share₂Fedi — eine instanzunabhängige Share-Seite für das Fediverse",
		metaDescription:
			"Share₂Fedi ist eine Share-Seite für Mastodon, Pleroma, Misskey und andere. Geben Sie Ihren Beitragstext und die Instanz-URL ein und klicken Sie auf „Veröffentlichen“!",
		language: "Sprache:",
		description:
			"Share₂Fedi ist eine instanzunabhängige Share-Seite für {}. Mit ihr können Sie von einer einzigen Seite aus auf verschiedenen föderierten Plattformen posten.",
		fediverse: "das Fediverse",
		supportedProjects: "Unterstützte Projekte:",
		incl: "inkl.",
		credits:
			"Share₂Fedi wird von {} entwickelt und gepflegt. Der Quellcode ist {}. Gehostet mit {}. {}.",
		nikita: "Nikita Karamov",
		onGitHub: "auf GitHub",
		statusPage: "Statusseite",
		licence: "Lizenz",
		privacyNotice: "Datenschutzhinweis",
		postText: "Beitragstext{}",
		postTextPlaceholder: "Was gibt’s Neues?",
		instance: "Fediverse-Instanz{}",
		previouslyUsed: "Bisher verwendet: {}",
		rememberInstance: "{} Instanz auf diesem Gerät merken",
		publish: "Veröffentlichen",
	},
	ru: {
		title: "Share₂Fedi — инстанс-независимая share-страница для Федивёрса",
		metaDescription:
			"Share₂Fedi — это share-страница для Mastodon, Pleroma, Misskey и других сервисов. Введите текст поста и URL-адрес инстанса и нажмите «Опубликовать!».",
		language: "Язык:",
		description:
			"Share₂Fedi — это инстанс-независимая share-страница для {}. С её помощью вы можете делиться информацией на различных федеративных платформах с одной страницы.",
		fediverse: "Федивёрса",
		supportedProjects: "Поддерживаемые проекты:",
		incl: "вкл.",
		credits:
			"Share₂Fedi разрабатывается и поддерживается {}. Исходный код {}. Хостится на {}. {}.",
		nikita: "Никитой Карамовым",
		onGitHub: "на GitHub",
		statusPage: "Статус",
		licence: "Лицензия",
		privacyNotice: "Политика конфиденциальности",
		postText: "Текст поста{}",
		postTextPlaceholder: "О чём думаете?",
		instance: "Инстанс Федивёрса{}",
		previouslyUsed: "Ранее использовались: {}",
		rememberInstance: "{} Запомнить инстанс на этом устройстве",
		publish: "Опубликовать",
	},
} as const;

export const defaultLanguage: keyof typeof strings = "en";
