import Link from "next/link";
import { FooterMotionLink } from "./FooterMotionLink";

const EMAIL_ADDRESS = "lizethnoheliagrafica@gmail.com";
const EMAIL = `mailto:${EMAIL_ADDRESS}`;
const LINKEDIN = "https://www.linkedin.com/in/lizethnohelia/";

export default function Footer() {
  return (
    <footer className="border-t border-footer-text/15 bg-footer-surface px-5 py-14 sm:px-8 md:px-12 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <p className="max-w-3xl text-pretty text-body-md text-footer-text-muted">
          You can reach me using the links below
        </p>

        <div className="mt-6 flex w-full max-w-md flex-col items-stretch gap-3 sm:mt-8 sm:items-start sm:gap-4">
          <FooterMotionLink
            href={EMAIL}
            label="Email me"
            className="bg-footer-text text-footer-surface hover:bg-primary hover:text-primary-foreground focus-visible:ring-footer-text focus-visible:ring-offset-footer-surface"
          />
          <FooterMotionLink
            href={LINKEDIN}
            label="Find me on LinkedIn"
            external
            className="bg-footer-text text-footer-surface hover:bg-primary hover:text-primary-foreground focus-visible:ring-footer-text focus-visible:ring-offset-footer-surface"
          />
        </div>

        <div
          className="mt-16 flex flex-col gap-8 border-t border-footer-text/15 pt-12 md:flex-row md:items-center
          md:justify-between"
        >
          <div className="flex flex-wrap items-center gap-6">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-footer-text text-body-sm font-bold text-footer-surface"
              aria-hidden="true"
            >
              la
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-body-sm font-semibold text-footer-text">
                Lizeth Avendaño
              </span>
              <span className="text-body-sm text-footer-text-muted">
                Designed and built by Lizeth Avendaño
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <Link
              href="#"
              className="text-body-sm font-medium text-footer-text transition-colors hover:text-primary"
            >
              Archive
            </Link>
            <p className="text-body-sm text-footer-text-muted">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
