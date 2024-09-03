import type { FreshContext, Handlers } from "$fresh/server.ts";
import { getPopularInstanceDomains } from "$lib/instance.ts";
import { json } from "$lib/response.ts";

export const handler: Handlers<string[]> = {
  async GET(_req: Request, _ctx: FreshContext): Promise<Response> {
    const popularInstanceDomains = await getPopularInstanceDomains();

    return json(popularInstanceDomains, 200, {
      "Cache-Control": popularInstanceDomains.length > 0
        ? "public, s-maxage=86400, max-age=604800"
        : "public, s-maxage=60, max-age=3600",
    });
  },
};
