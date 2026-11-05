import { ContactForm } from '../components/contact/ContactForm'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function ContactPage() {
  useDocumentTitle('Contact Us | Selin Baby Store')

  return (
    <main id="main-content">
      <section className="contact-section">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you!</p>
        <ContactForm />
      </section>
    </main>
  )
}
