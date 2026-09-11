import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> {
  const apiBaseUrl = process.env.API_BASE_URL;
  const apiKey = process.env.API_KEY;

  if (!apiBaseUrl || !apiKey) {
    response.status(500).json({
      error: "API_BASE_URL and API_KEY are not configured",
    });
    return;
  }

  const requestUrl = new URL(request.url ?? "/api");
  const method = request.method ?? "GET";
  const apiPath = requestUrl.pathname.replace(/^\/api\/?/, "");
  const targetUrl = new URL(
    `${apiPath}${requestUrl.search}`,
    `${apiBaseUrl.replace(/\/+$/, "")}/`,
  );

  const headers = new Headers();
  Object.entries(request.headers).forEach(([name, value]) => {
    if (typeof value === "string") {
      headers.set(name, value);
    }
  });
  headers.set("Authorization", `Bearer ${apiKey}`);
  headers.delete("host");
  headers.delete("content-length");

  const body = ["GET", "HEAD"].includes(method)
    ? undefined
    : typeof request.body === "string"
      ? request.body
      : request.body
        ? JSON.stringify(request.body)
        : undefined;

  const upstreamResponse = await fetch(targetUrl, {
    method,
    headers,
    body,
  });

  upstreamResponse.headers.forEach((value, name) => {
    response.setHeader(name, value);
  });
  response.status(upstreamResponse.status);
  response.send(Buffer.from(await upstreamResponse.arrayBuffer()));
}
