/*!
 * This file is part of Share₂Fedi
 * https://github.com/kytta/share2fedi
 *
 * SPDX-FileCopyrightText: © 2023 Nikita Karamov <me@kytta.dev>
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export const json = (
  body: unknown,
  status: number = 200,
  headers: Record<string, string> = {},
) => {
  return new Response(JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    status,
  });
};

export const error = (message: string, status: number = 400) => {
  return json(
    {
      error: message,
    },
    status,
  );
};
