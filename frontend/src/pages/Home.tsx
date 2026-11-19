import Header from '../components/Header'
import ButtonTry from '../components/ButtonTry'
import { MeshGradient } from '@paper-design/shaders-react'
import astronaut from '../assets/astronaut.png'

const Home = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[var(--page-bg)] text-[var(--page-text)] transition-colors duration-300">
      <Header />

      <main>
        <section className="mx-auto flex min-h-[760px] w-full max-w-[1440px] justify-center items-center px-6 py-24 sm:px-10 lg:min-h-screen lg:px-14 lg:py-0">
          <div className="grid w-full items-center gap-14 lg:grid-cols-[minmax(0,760px)_minmax(380px,520px)] lg:gap-12 xl:gap-16">
            <div className="mx-auto w-full max-w-[760px] lg:mx-0">
              <div className="hero-copy mt-[60px]">


                <div className="flex flex-col justify-center items-center md:items-start">
                <h1 className="text-[120px] font-tanker font-bold md:text-[150px] font-black leading-[0.86] tracking-[-0.055em]">
                  Safe
                  <br />
                  <span className="text-[#6d5dfc]">Space.</span>
                </h1>
                </div>

                <div className="mt-8 flex max-w-[650px] flex-col items-center gap-5 pt-7 sm:flex-row sm:items-end sm:justify-between">
                  <p className="max-w-[380px] text-center text-lg leading-8 text-[var(--text)] sm:text-left">
                    Your safe space to freely share your emotions, embraced by a supportive community.
                  </p>

                  <div className="shrink-0 mt-6 mb-6 md:mr-20">
                    <ButtonTry />
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-visual relative mx-auto h-[420px] w-full max-w-[500px] sm:h-[520px] lg:h-[620px] lg:max-w-[520px]">
              <div
                className="absolute inset-0 z-[1] overflow-hidden rounded-[50%]"
                aria-label="Animated SafeSpace background"
              >
                <MeshGradient
                  colors={['#c9ff62', '#6d5dfc', '#f4f0e8', '#ff7455']}
                  distortion={0.55}
                  swirl={0.45}
                  speed={0.18}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>

              <div className="absolute inset-0 z-[2] flex items-center justify-center">
                <div className="astronaut-glow absolute h-[72%] w-[72%] rounded-full bg-[#c9ff62]" />
                <img
                  src={astronaut}
                  alt="Astronaut representing the SafeSpace community"
                  className="astronaut relative z-10 block h-[88%] w-[88%] object-contain drop-shadow-[0_30px_30px_rgba(23,23,19,0.15)]"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#171713]/15 bg-[#171713] text-[#f4f0e8]">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-20 lg:grid-cols-[0.4fr_1fr] lg:px-14 lg:py-28">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#c9ff62]">
              Our idea
            </p>

            <div>
              <h2 className="max-w-[900px] text-5xl font-bold leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                A place to be heard,
                <br />
                not examined.
              </h2>

              <p className="mt-10 max-w-[680px] text-lg leading-8 text-[#c8c6bd]">
                SafeSpace is a web application for sharing thoughts and
                emotions in a supportive and empathetic environment, helping
                people feel understood instead of judged. We developed and trained an AI model to provide a safe, non-judgmental space where users can
                express their thoughts and feelings, with specialist guidance and support throughout their emotional journey.
                Our goal is to create a community where people can feel heard, validated, and supported in their emotional experiences.
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-col align-center justify-center items-center max-w-[1440px] lg:justify-between lg:mx-auto">
          <div className="grid gap-12 lg:grid-cols-[0.4fr_1fr] mt-32 lg:gap-12">
            <div className="flex flex-col items-center justify-center gap-6">
              <h2 className="text-center text-5xl font-bold leading-[0.95] tracking-[-0.04em] sm:text-6xl">
                Specialists that support your emotional journey
              </h2>
              <p className="mt-6 max-w-[380px] text-center md:text-base text-[#68685f] lg:hidden">
                Know more about them by clicking on their illustrations. They are here to help you navigate your emotions and provide guidance when needed.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
              {[
                { name: 'Maria Clara Guedes', area: 'Clinical Psychology', seed: 'Maria' },
                { name: 'Lucas Andrade', area: 'Emotional Wellbeing', seed: 'Lucas' },
                { name: 'Ana Beatriz Lima', area: 'Anxiety Support', seed: 'Ana' },
                { name: 'Rafael Costa', area: 'Human Development', seed: 'Rafael' },
              ].map((specialist, index) => (
                <article key={specialist.name} className="group min-w-0 text-center">
                  <div
                    className={`mx-auto mb-5 aspect-square w-full max-w-[180px] overflow-hidden rounded-full border-2 border-[#171713]/10 p-2 transition-transform duration-300 group-hover:-translate-y-1 ${
                      index === 0
                        ? 'bg-[#c9ff62]/55'
                        : index === 1
                          ? 'bg-[#6d5dfc]/20'
                          : index === 2
                            ? 'bg-[#ff7455]/25'
                            : 'bg-[#171713]/10'
                    }`}
                  >
                    <img
                      src={`https://api.dicebear.com/9.x/notionists/svg?seed=${specialist.seed}&backgroundColor=transparent`}
                      alt={`Illustration of ${specialist.name}`}
                      className="h-full w-full rounded-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>

                  <h3 className="mx-auto max-w-[180px] text-lg font-bold leading-tight tracking-[-0.02em]">
                    {specialist.name}
                  </h3>
                  <p className="mt-2 text-sm leading-5 text-[#68685f]">
                    {specialist.area}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] my-44 px-6 pb-20 lg:px-14 lg:pb-28">
          <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-[#6d5dfc] px-8 py-12 sm:px-12 lg:px-16 lg:py-16">
            <div className="absolute right-[-80px] top-[-110px] h-[300px] w-[300px] rounded-full border-[50px] border-[#171713]/10" />

            <div className="relative z-10 flex min-h-[320px] flex-col justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.18em]">
                Community feedback
              </p>

              <div>
                <h2 className="max-w-[800px] text-5xl font-bold leading-[0.95] tracking-[-0.04em] sm:text-6xl">
                  Real experiences belong here.
                </h2>

                <p className="mt-6 max-w-[520px] text-lg leading-8">
                  "I was able to share my feelings without fear of being judged.
                  The community was supportive and understanding, which made me
                  feel heard and validated."
                  Maria Fernanda Magalhães, 2024
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#171713]/15 px-6 py-16 lg:px-14">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1fr_0.55fr]">
          <div>
            <h2 className="text-5xl font-bold leading-none tracking-[-0.04em]">
              Contact
            </h2>

            <p className="mt-6 max-w-[560px] text-lg leading-8 text-[#4f4f46]">
              If you have questions, suggestions or feedback, we would be
              glad to hear from you.
            </p>
          </div>

          <div className="flex flex-col justify-between lg:items-end">
            <a
              href="mailto:hello@safespace.com"
              className="border-b-2 border-[#171713] pb-1 text-xl font-bold transition-colors duration-200 hover:border-[#6d5dfc] hover:text-[#6d5dfc] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6d5dfc]"
            >
              hello@safespace.com
            </a>

            <p className="mt-12 text-sm text-[#6b6b62] lg:text-right">
              Copyright © 2026 SafeSpace.
              <br />
              Made by Maria Fernanda Magalhães.
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        .hero-copy {
          animation: hero-copy-in 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .hero-visual {
          animation: hero-visual-in 900ms 120ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .astronaut-glow {
          box-shadow: 0 24px 70px rgba(201, 255, 98, 0.28);
        }

        .hero-visual canvas,
        .hero-visual > div:first-child,
        .hero-visual > div:first-child > div {
          width: 100% !important;
          height: 100% !important;
        }

        @keyframes hero-copy-in {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes hero-visual-in {
          from { opacity: 0; transform: scale(0.94) translateY(18px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @media (prefers-reduced-motion: no-preference) {
          .astronaut {
            animation: astronaut-drift 5.5s ease-in-out infinite;
          }

          .astronaut-glow {
            animation: glow-pulse 5.5s ease-in-out infinite;
          }

          @keyframes astronaut-drift {
            0%, 100% { transform: translateY(0) rotate(-1deg); }
            50% { transform: translateY(-10px) rotate(1deg); }
          }

          @keyframes glow-pulse {
            0%, 100% { transform: scale(1); opacity: 0.95; }
            50% { transform: scale(1.035); opacity: 1; }
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-copy,
          .hero-visual,
          .astronaut,
          .astronaut-glow {
            animation: none !important;
          }

          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  )
}

export default Home