// src/components/Contact.tsx
import { profile } from "../data/profile";
import { ContactRow } from "./ContactRow";
import { GitHubIcon, MailIcon } from "./icons";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto flex max-w-4xl flex-col gap-8 py-24"
    >
      <div>
        <span className="text-xs uppercase tracking-[0.16em] text-dim">
          Contact
        </span>
        <h2
          id="contact-heading"
          className="m-0 mt-2 text-[clamp(2.5rem,8vw,5rem)] font-extrabold leading-[0.95] tracking-tight text-strong"
        >
          Let's talk
        </h2>
      </div>

      <ul className="m-0 flex flex-col gap-4 p-0 text-sm text-label md:flex-row md:items-center md:gap-10">
        <li>
          <ContactRow icon={<MailIcon className="text-dim" aria-hidden="true" />} href={`mailto:${profile.email}`}>
            {profile.email}
          </ContactRow>
        </li>
        <li>
          <ContactRow icon={<GitHubIcon className="text-dim" aria-hidden="true" />} href={profile.github}>
            github.com/Juhunnm
          </ContactRow>
        </li>
      </ul>
    </section>
  );
}
