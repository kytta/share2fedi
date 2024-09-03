/*!
 * This file is part of Share₂Fedi
 * https://github.com/kytta/share2fedi
 *
 * SPDX-FileCopyrightText: © 2023 Nikita Karamov <me@kytta.dev>
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export interface ProjectPublishConfig {
  endpoint: string;
  params: {
    text: string;
  };
}

const mastodonConfig: ProjectPublishConfig = {
  endpoint: "share",
  params: {
    text: "text",
  },
};

const misskeyConfig: ProjectPublishConfig = {
  endpoint: "share",
  params: {
    text: "text",
  },
};

/**
 * Mapping of the supported fediverse projects.
 *
 * The keys of this mapping can be used as keys for the fediverse.observer API,
 * icon names, etc.
 */
export const supportedProjects: Record<string, ProjectPublishConfig> = {
  calckey: misskeyConfig,
  fedibird: mastodonConfig,
  firefish: misskeyConfig,
  foundkey: misskeyConfig,
  friendica: {
    endpoint: "compose",
    params: {
      text: "body",
    },
  },
  glitchcafe: mastodonConfig,
  gnusocial: {
    endpoint: "notice/new",
    params: {
      text: "status_textarea",
    },
  },
  hometown: mastodonConfig,
  hubzilla: {
    endpoint: "rpost",
    params: {
      text: "body",
    },
  },
  mastodon: mastodonConfig,
  meisskey: misskeyConfig,
  misskey: misskeyConfig,
};
