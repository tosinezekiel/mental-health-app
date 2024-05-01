import React from 'react'

interface ReportSectionProps {
  title: string;
  content: string[];
}

const ReportSection: React.FC<ReportSectionProps> = ({ title, content }) => (
  <section className="mb-4">
    <h3 className="section-title">{title}</h3>
    <ul className="section-content">
      {content.map((item) => (
        <li key={item} className="list-item bullet-point">
          {item}
        </li>
      ))}
    </ul>
  </section>
);

export default ReportSection;
