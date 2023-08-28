export const languages = {
	en: "English",
	de: "Deutsch",
	ru: "Русский",
};

export const strings: Record<keyof typeof languages, Record<string, string>> = {
	en: {
		title: "Share₂Fedi — an instance-agnostic share page for the Fediverse",
		metaDescription:
			"Share₂Fedi is a share page for Mastodon, Misskey, Friendica, and others. Type in your post text and the instance URL and click ‘Publish!’",
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
		licence1:
			"Share₂Fedi is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.",
		licence2:
			"Share₂Fedi is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.",
		privacyNotice: "Privacy Notice",
		privacy1:
			"s2f.kytta.dev is hosted on Vercel. Vercel processes IP addresses, system configuration information, and other information about traffic to and from s2f.kytta.dev. Vercel does not store this information nor does it get shared with third parties. See {} for more information.",
		privacy2:
			"When you click the ‘Publish’ button, you’ll get redirected to a Fediverse instance you’ve specified. It may process and/or store your data. Please refer to the privacy policy of the respective instance.",
		vercelPP: "Vercel’s privacy policy",
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
			"Share₂Fedi ist eine Share-Seite für Mastodon, Misskey, Friendica und andere. Geben Sie Ihren Beitragstext und die Instanz-URL ein und klicken Sie auf „Veröffentlichen“!",
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
		licence1:
			"Share₂Fedi ist freie Software: Sie können es unter den Bedingungen der GNU Affero General Public License, wie von der Free Software Foundation veröffentlicht, weitergeben und/oder modifizieren, entweder gemäß Version 3 der Lizenz oder (nach Ihrer Option) jeder späteren Version.",
		licence2:
			"Die Veröffentlichung von Share₂Fedi erfolgt in der Hoffnung, dass es Ihnen von Nutzen sein wird, aber OHNE IRGENDEINE GARANTIE, sogar ohne die implizite Garantie der MARKTREIFE oder der VERWENDBARKEIT FÜR EINEN BESTIMMTEN ZWECK. Details finden Sie in der GNU Affero General Public License.",
		privacyNotice: "Datenschutzhinweis",
		privacy1:
			"s2f.kytta.dev wird auf Vercel gehostet. Vercel verarbeitet IP-Adressen, Systemkonfigurationsinformationen und andere Informationen über den Verkehr von und zu s2f.kytta.dev. Vercel speichert diese Informationen nicht und gibt sie auch nicht an Dritte weiter. Siehe {} für weitere Informationen.",
		privacy2:
			"Wenn Sie auf die „Veröffentlichen“ klicken, werden Sie zu einer Fediverse-Instanz weitergeleitet, die Sie angegeben haben. Diese kann Ihre Daten verarbeiten und/oder speichern. Bitte beachten Sie die Datenschutzrichtlinien der jeweiligen Instanz.",
		vercelPP: "Vercels Datenschutzpolitik",
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
			"Share₂Fedi — это share-страница для Mastodon, Misskey, Friendica и других сервисов. Введите текст поста и URL-адрес инстанса и нажмите «Опубликовать!».",
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
		licence1:
			"Share₂Fedi является свободным программным обеспечением: вы можете распространять её и (или) изменять, соблюдая условия GNU Affero General Public License, опубликованной Free Software Foundation; либо редакции 3 Лицензии, либо (на ваше усмотрение) любой редакции, выпущенной позже.",
		licence2:
			"Share₂Fedi распространяется в расчёте на то, что она окажется полезной, но БЕЗ КАКИХ-ЛИБО ГАРАНТИЙ, включая подразумеваемую гарантию КАЧЕСТВА либо ПРИГОДНОСТИ ДЛЯ ОПРЕДЕЛЁННЫХ ЦЕЛЕЙ. Ознакомьтесь с GNU Affero General Public License для получения более подробной информации.",
		privacyNotice: "Политика конфиденциальности",
		privacy1:
			"Сайт s2f.kytta.dev размещён на серверах Vercel. Vercel обрабатывает IP-адреса, информацию о конфигурации системы и другую информацию о трафике, идущем к s2f.kytta.dev и от него. Vercel не хранит эту информацию и не передает её третьим лицам. Более подробную информацию см. в {}.",
		privacy2:
			"Когда вы нажимаете кнопку «Опубликовать», вы попадаете на указанный вами инстанс Федивёрса. Он может обрабатывать и/или хранить ваши данные. Пожалуйста, ознакомьтесь с политикой конфиденциальности соответствующего инстанса.",
		vercelPP: "Политике конфиденциальности Vercel",
		postText: "Текст поста{}",
		postTextPlaceholder: "О чём думаете?",
		instance: "Инстанс Федивёрса{}",
		previouslyUsed: "Ранее использовались: {}",
		rememberInstance: "{} Запомнить инстанс на этом устройстве",
		publish: "Опубликовать",
	},
} as const;

export const defaultLanguage: keyof typeof strings = "en";
