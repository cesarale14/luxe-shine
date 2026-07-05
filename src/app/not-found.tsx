import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <Section bg="white">
      <div className="mx-auto max-w-lg py-16 text-center md:py-24">
        <Eyebrow className="flex justify-center">404</Eyebrow>
        <h1 className="display-1 mt-4">Page not found.</h1>
        <p className="lede mt-5">
          The page you're looking for isn't here. Let's get you back on track.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/">Back home</Button>
          <Button href="/request-a-quote" variant="secondary">
            Request a Quote
          </Button>
        </div>
      </div>
    </Section>
  );
}
