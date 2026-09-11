export default async function handler(request: Request): Promise<Response> {
  const apiBaseUrl = process.env.API_BASE_URL;
  const apiKey = process.env.API_KEY;

  if (!apiBaseUrl || !apiKey) {
    return Response.json(
      { error: "API_BASE_URL and API_KEY are not configured" },
      { status: 500 },
    );
  }

  const requestUrl = new URL(request.url);
  const apiPath = requestUrl.pathname.replace(/^\/api\/?/, "");
  const targetUrl = new URL(
    `${apiPath}${requestUrl.search}`,
    `${apiBaseUrl.replace(/\/+$/, "")}/`,
  );

  const headers = new Headers(request.headers);
  headers.set("Authorization", `Bearer ${apiKey}`);
  headers.delete("host");
  headers.delete("content-length");

  const body = ["GET", "HEAD"].includes(request.method)
    ? undefined
    : await request.arrayBuffer();

  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body,
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}
