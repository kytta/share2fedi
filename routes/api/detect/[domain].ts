import type { FreshContext, Handlers } from "$fresh/server.ts";
import { getSoftwareName } from "$lib/nodeinfo.ts";
import { type ProjectPublishConfig, supportedProjects } from "$lib/project.ts";
import { error, json } from "$lib/response.ts";

type Detection = {
  domain: string;
  project: keyof typeof supportedProjects;
} & ProjectPublishConfig;

export const handler: Handlers<Detection> = {
  async GET(_req: Request, ctx: FreshContext): Promise<Response> {
    const domain = ctx.params.domain;

    const softwareName = await getSoftwareName(domain);
    if (softwareName === undefined) {
      return error("Could not detect Fediverse project.");
    }
    if (!(softwareName in supportedProjects)) {
      return error(`Fediverse project "${softwareName}" is not supported yet.`);
    }

    const publishConfig =
      supportedProjects[softwareName] as ProjectPublishConfig;
    return json(
      {
        domain,
        project: softwareName,
        ...publishConfig,
      },
      200,
      {
        "Cache-Control": "public, s-maxage=86400, max-age=604800",
      },
    );
  },
};
