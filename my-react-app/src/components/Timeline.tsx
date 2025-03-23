import { motion } from "framer-motion";

interface TimelineItemProps {
  year: string;
  title: string;
  company: string;
  companyLogo: string;
  startDate: string;
  endDate: string;
  description: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ year, title, company, companyLogo, startDate, endDate, description }) => {
  const calculateYears = (start: string, end: string) => {
    const startYear = new Date(start).getFullYear();
    const endYear = new Date(end).getFullYear();
    return endYear - startYear;
  };

  const yearsWorked = calculateYears(startDate, endDate);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="neumorphic p-6 mb-6 flex items-center"
    >
      <img src={companyLogo} alt={`${company} logo`} className="w-16 h-16 mr-6" />
      <div>
        <h3 className="text-2xl text-cyan-400">{year}</h3>
        <h4 className="text-xl font-semibold">{title}</h4>
        <p className="text-gray-400">{company}</p>
        <p className="text-gray-400">{yearsWorked} years</p>
        <p className="text-gray-400 mt-2">{description}</p>
      </div>
    </motion.div>
  );
};

export const Timeline: React.FC<{ items: TimelineItemProps[] }> = ({ items }) => (
  <div>
    {items.map((item) => (
      <TimelineItem key={`${item.year}-${item.company}`} {...item} />
    ))}
  </div>
);