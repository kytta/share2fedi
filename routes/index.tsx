import type { FreshContext, Handlers } from "$fresh/server.ts";
import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { type ProjectPublishConfig, supportedProjects } from "$lib/project.ts";
import { getUrlDomain } from "$lib/url.ts";
import { seeOther } from "@http/response/see-other";

type Detection = {
  domain: string;
  project: keyof typeof supportedProjects;
} & ProjectPublishConfig;

import { z } from "zod";

const postSchema = z.object({
  text: z.string({
    required_error: "Please enter post text.",
  }),
  instance: z.string({
    required_error: "Please enter instance domain.",
  }),
});

type POST = z.infer<typeof postSchema>;

export const handler: Handlers = {
  async POST(req: Request, ctx: FreshContext): Promise<Response> {
    const formData = await req.formData();
    const form = postSchema.safeParse(formData);

    if (!form.success) {
      const errors = form.error?.format();
      return await ctx.render({ errors });
    }

    const instance = getUrlDomain(form.data.instance);
    const detectResponse = await fetch(
      new URL(`/api/detect/${instance}`, ctx.url),
    );
    const { domain, endpoint, params } = await detectResponse.json();
    const publishUrl = new URL(endpoint, `https://${domain}/`);
    publishUrl.search = new URLSearchParams([
      [params.text, form.data.text],
    ]).toString();

    return seeOther(publishUrl);
  },
};

export default function Home() {
  const count = useSignal(3);
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
        <p class="my-4">
          Try updating this message in the
          <code class="mx-2">./routes/index.tsx</code> file, and refresh.
        </p>
        <Counter count={count} />
      </div>
    </div>
  );
}
