interface SectionHeadingProps {
  id?: string
  title: string
  lead: string
  className?: string
}

export function SectionHeading({ id, title, lead, className = '' }: SectionHeadingProps) {
  return (
    <div className={`section-heading ${className}`.trim()}>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      <p className="section-heading__lead">{lead}</p>
    </div>
  )
}
