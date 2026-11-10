export declare const CHECKOUT_URLS: {
  readonly mainProduct: string;
  readonly cloudDma: string;
  readonly dota2: string;
  readonly skinChanger: string;
  readonly hwidSpoofer: string;
  readonly ugc: string;
};

export declare const CHECKOUT_PATH_REDIRECTS: ReadonlyMap<string, string>;

export declare function resolveCheckoutPathRedirect(
  pathname: string,
  search?: string,
): string | null;

export declare function checkoutRedirectLines(): string[];
