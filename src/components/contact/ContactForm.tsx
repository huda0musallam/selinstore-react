import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useToast } from '../../context/toastContext'

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const successRef = useRef<HTMLDivElement>(null)
  const showToast = useToast()

  // The form's button disappears on submit, so bring the confirmation into view and focus.
  useEffect(() => {
    if (isSubmitted) successRef.current?.focus()
  }, [isSubmitted])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitted(true)
    showToast('Thanks for your message!')
  }

  if (isSubmitted) {
    return (
      <div ref={successRef} className="contact-success" role="status" tabIndex={-1}>
        <h2>Thank you!</h2>
        <p>This is a demo store, so your message isn't sent anywhere.</p>
        <button
          type="button"
          className="button button--ghost"
          onClick={() => setIsSubmitted(false)}
        >
          Write another message
        </button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" name="name" placeholder="Enter your name" required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" required />
      </div>
      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input type="text" id="subject" name="subject" placeholder="Enter subject" required />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" placeholder="Write your message" required rows={5} />
      </div>
      <button type="submit">Send Message</button>
    </form>
  )
}
