export type Intended = {
  pathname: string;
  condition: boolean;
};

export type RedirectOptions = {
  otherRedirections?: {
    pathname: string;
    condition: boolean;
    redirectAfter?: boolean,
  }[];
  loginPage: string;
  authenticatedHomepage: string;
  requiredState: boolean;
};
