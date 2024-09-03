import { type PageProps } from "$fresh/server.ts";

export default function App({ Component, state }: PageProps) {
  return (
    <html lang={state.prerenderLanguage as string}>
      <head>
        <meta charset="utf-8" />
		    <title>Share₂Fedi</title>
        <meta
          name="description"
          content="Share₂Fedi is a share page for Mastodon, Misskey, Friendica, and others. Type in your post text and the instance URL and click ‘Publish!’"
          data-translate="metaDescription"
          data-translate-attribute="content"
        />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
