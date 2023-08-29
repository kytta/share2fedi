export const languages = {
	en: "English",
	de: "Deutsch",
	es: "Español",
	fr: "Français",
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
	es: {
		title:
			"Share₂Fedi — una página de compartir independiente de la instancia para el Fediverso",
		metaDescription:
			"Share₂Fedi es una página de compartir para Mastodon, Misskey, Friendica y otros. ¡Escriba su texto de publicación y la URL de la instancia y haga clic en «Publicar»!",
		language: "Idioma:",
		description:
			"Share₂Fedi es una página de compartir independiente de la instancia para {}. Con ella, puede publicar en varias plataformas federadas desde una sola página.",
		fediverse: "el Fediverso",
		supportedProjects: "Proyectos compatibles:",
		incl: "incl.",
		credits:
			"Share₂Fedi es desarrollado y mantenido por {}. El código fuente es {}. Alojado con {}. {}.",
		nikita: "Nikita Karamov",
		onGitHub: "en GitHub",
		statusPage: "Página de estado",
		licence: "Licencia",
		licence1:
			"Share₂Fedi es software libre: puede redistribuirlo y/o modificarlo bajo los términos de la Licencia Pública General Affero de GNU, publicada por la Free Software Foundation, ya sea la versión 3 de la Licencia, o (a su elección) cualquier versión posterior.",
		licence2:
			"Share₂Fedi se distribuye con la esperanza de que sea útil, pero SIN NINGUNA GARANTÍA; sin siquiera la garantía implícita de COMERCIABILIDAD o IDONEIDAD PARA UN PROPÓSITO PARTICULAR. Consulte la Licencia Pública General Affero de GNU para obtener más detalles.",
		privacyNotice: "Aviso de privacidad",
		privacy1:
			"s2f.kytta.dev está alojado en Vercel. Vercel procesa las direcciones IP, la información de configuración del sistema y otra información sobre el tráfico hacia y desde s2f.kytta.dev. Vercel no almacena esta información ni la comparte con terceros. Consulte {} para obtener más información.",
		privacy2:
			"Cuando hace clic en el botón «Publicar», se le redirige a una instancia de Fediverso que ha especificado. Puede procesar y/o almacenar sus datos. Consulte la política de privacidad de la instancia correspondiente.",
		vercelPP: "Política de privacidad de Vercel",
		postText: "Texto de la publicación{}",
		postTextPlaceholder: "¿Qué hay de nuevo?",
		instance: "Instancia del Fediverso{}",
		previouslyUsed: "Usado anteriormente: {}",
		rememberInstance: "{} Recordar instancia en este dispositivo",
		publish: "Publicar",
	},
	fr: {
		title: "Share₂Fedi — une page de partage indépendante pour le Fediverse",
		metaDescription:
			"Share₂Fedi est une page de partage pour Mastodon, Misskey, Friendica et autres. Tapez votre texte de publication et l’URL de l’instance, puis cliquez sur « Publier ! »",
		language: "Langue :",
		description:
			"Share₂Fedi est une page de partage indépendante pour {}. Avec elle, vous pouvez publier sur diverses plateformes fédérées depuis une seule page.",
		fediverse: "le Fediverse",
		supportedProjects: "Projets pris en charge :",
		incl: "dont",
		credits:
			"Share₂Fedi est développé et maintenu par {}. Le code source est {}. Hébergé avec {}. {}.",
		nikita: "Nikita Karamov",
		onGitHub: "sur GitHub",
		statusPage: "Page de statut",
		licence: "Licence",
		licence1:
			"Share₂Fedi est un logiciel libre : vous pouvez le redistribuer et/ou le modifier selon les termes de la licence publique générale Affero de la Free Software Foundation, telle que publiée par la Free Software Foundation, soit la version 3 de la licence, soit (à votre choix) toute version ultérieure.",
		licence2:
			"Share₂Fedi est distribué dans l’espoir qu’il sera utile, mais SANS AUCUNE GARANTIE ; sans même la garantie implicite de QUALITÉ MARCHANDE ou D’ADÉQUATION À UN USAGE PARTICULIER. Consultez la licence publique générale Affero de GNU pour plus de détails.",
		privacyNotice: "Avis de confidentialité",
		privacy1:
			"s2f.kytta.dev est hébergé sur Vercel. Vercel traite les adresses IP, les informations de configuration système et d’autres informations sur le trafic vers et depuis s2f.kytta.dev. Vercel ne stocke pas ces informations et ne les partage pas avec des tiers. Voir {} pour plus d’informations.",
		privacy2:
			"Lorsque vous cliquez sur le bouton « Publier », vous êtes redirigé vers une instance du Fediverse que vous avez spécifiée. Elle peut traiter et/ou stocker vos données. Veuillez vous référer à la politique de confidentialité de l’instance respective.",
		vercelPP: "Politique de confidentialité de Vercel",
		postText: "Texte de la publication{}",
		postTextPlaceholder: "Quoi de neuf ?",
		instance: "Instance du Fediverse{}",
		previouslyUsed: "Utilisé précédemment : {}",
		rememberInstance: "{} Se souvenir de l’instance sur cet appareil",
		publish: "Publier",
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
