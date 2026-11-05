import { benefits } from '../../data/content'

export function Benefits() {
  return (
    <section className="benefits" aria-label="Shopping benefits">
      {benefits.map((benefit) => (
        <div key={benefit.title}>
          <b>{benefit.icon}</b>
          <span>
            <strong>{benefit.title}</strong>
            <small>{benefit.text}</small>
          </span>
        </div>
      ))}
    </section>
  )
}
