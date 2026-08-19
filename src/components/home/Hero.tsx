import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden warm-placeholder-dark min-h-[92vh] sm:min-h-[85vh] flex items-end">
      <div className="absolute inset-0 bg-gradient-to-t from-brown via-brown/45 to-transparent" />
      <Container className="relative pb-16 sm:pb-20 pt-36 sm:pt-40">
        <div className="max-w-2xl flex flex-col gap-5 sm:gap-6">
          <span className="animate-fade-up text-xs uppercase tracking-[0.3em] text-yellow-warm">
            Afeem · Jodhpur
          </span>
          <h1 className="animate-fade-up animate-fade-up-delay-1 font-display text-white text-[2.5rem] leading-[1.08] sm:text-5xl md:text-6xl sm:leading-[1.1]">
            Where Beauty Becomes an Experience.
          </h1>
          <p className="animate-fade-up animate-fade-up-delay-2 text-white/80 text-base sm:text-lg max-w-lg leading-relaxed">
            Step into Afeem — a destination for beauty, wellness and professional beauty education.
          </p>
          <div className="animate-fade-up animate-fade-up-delay-3 flex flex-wrap gap-4 pt-2">
            <Button href="/contact#book" variant="outline-light">
              Book an Experience
            </Button>
            <Button href="/about" variant="ghost" className="text-white hover:text-yellow-warm">
              Explore Afeem
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
