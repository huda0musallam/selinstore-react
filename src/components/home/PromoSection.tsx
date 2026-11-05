import { CategoryLink } from '../ui/CategoryLink'

export function PromoSection() {
  return (
    <section className="promo-section">
      <div className="container promo">
        <div>
          <p className="eyebrow">Limited time</p>
          <h2>
            The Sleepy
            <br />
            Time Collection
          </h2>
          <p>
            Up to 20% off sleep sacks, crib sheets, and night lights — everything for calmer
            evenings and cozier nights.
          </p>
          <CategoryLink category="sleep" className="button button--primary">
            Shop the collection
          </CategoryLink>
        </div>
        <img
          src="/images/selin-reference-newborn-sleep.png"
          alt="Baby sleeping peacefully beside a soft blanket"
          loading="lazy"
        />
      </div>
    </section>
  )
}
