import { Link } from 'react-router'
import { heroSlides } from '../../data/content'
import { useCarousel } from '../../hooks/useCarousel'

export function Hero() {
  const { activeIndex, isPaused, showSlide, togglePaused } = useCarousel(heroSlides.length)

  return (
    <section className="intro" aria-labelledby="intro-heading" aria-roledescription="carousel">
      <div className="intro__slides" aria-hidden="true">
        {heroSlides.map((slide, index) => (
          <img
            key={slide.src}
            className={`intro__image${index === activeIndex ? ' is-active' : ''}`}
            src={slide.src}
            alt={slide.alt}
          />
        ))}
      </div>
      <div className="intro__overlay" aria-hidden="true" />
      <div className="container intro__inner">
        <div className="intro__text">
          <p className="eyebrow">
            Welcome to Selin <span aria-hidden="true">♥</span>
          </p>
          <h1 id="intro-heading" className="intro__title">
            <span className="accent-pink">Everything</span>
            <br />
            <span className="accent-peach">Your</span>{' '}
            <span className="accent-sage">Little One</span>{' '}
            <span className="accent-lavender">Needs</span>
          </h1>
          <p className="intro__lead">
            Cute clothes, playful toys, and all the essentials for your baby's happy journey.
          </p>
          <Link className="button button--primary" to="/#catalog">
            Shop Now&nbsp; →
          </Link>
        </div>
      </div>
      <div className="hero-controls" aria-label="Hero carousel controls">
        <div className="hero-pagination" aria-label="Choose a slide">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              onClick={() => showSlide(index)}
            />
          ))}
          <button
            type="button"
            className="hero-pause"
            aria-label={isPaused ? 'Resume automatic slides' : 'Pause automatic slides'}
            aria-pressed={isPaused}
            onClick={togglePaused}
          >
            {isPaused ? '▶' : 'Ⅱ'}
          </button>
        </div>
      </div>
      <span className="hero-decor hero-decor--heart" aria-hidden="true">
        ♥
      </span>
      <span className="hero-decor hero-decor--star" aria-hidden="true">
        ★
      </span>
      <span className="hero-decor hero-decor--sparkle" aria-hidden="true">
        ✧
      </span>
      <span className="hero-decor hero-decor--rainbow" aria-hidden="true">
        🌈
      </span>
    </section>
  )
}
