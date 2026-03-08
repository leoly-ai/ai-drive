import { createClient, EMPTY_TOKENS, OAuthStrategy, type Tokens } from "@wix/sdk";
import { headlessSite } from "@wix/headless-site";
import { resolveContext } from "@wix/sdk-runtime/context";

const SESSION_COOKIE_NAME = "wixSession";

type CookieValue = {
  clientId: string;
  tokens: Tokens;
};

type SetupOptions = {
  clientId: string;
};

export async function setupWixClient({ clientId }: SetupOptions) {
  if (typeof window === "undefined" || resolveContext() != null) {
    return;
  }

  const auth = OAuthStrategy({
    clientId,
    tokenStorage: {
      getTokens: () => getCookieValue(SESSION_COOKIE_NAME)?.tokens ?? EMPTY_TOKENS,
      setTokens: (tokens) => {
        document.cookie = buildSessionCookieString(clientId, tokens);
      },
    },
  });

  const existingTokens = getCookieValue(SESSION_COOKIE_NAME)?.tokens;
  if (!existingTokens?.accessToken?.value) {
    const visitorTokens = await auth.generateVisitorTokens();
    document.cookie = buildSessionCookieString(clientId, visitorTokens);
  }

  createClient({
    auth,
    host: headlessSite.host({}),
  }).enableContext("global");
}

function buildSessionCookieString(clientId: string, tokens: Tokens) {
  const cookieValue = encodeURIComponent(JSON.stringify({ clientId, tokens }));
  return `${SESSION_COOKIE_NAME}=${cookieValue}; path=/; secure; samesite=lax; max-age=10800`;
}

function getCookieValue(name: string): CookieValue | null {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  if (cookie == null) {
    return null;
  }

  try {
    const rawValue = decodeURIComponent(cookie.split("=")[1] ?? "");
    const parsedValue = JSON.parse(rawValue) as Partial<CookieValue>;

    if (
      typeof parsedValue?.clientId === "string" &&
      typeof parsedValue?.tokens === "object" &&
      parsedValue.tokens != null
    ) {
      return parsedValue as CookieValue;
    }
  } catch {
    return null;
  }

  return null;
}
