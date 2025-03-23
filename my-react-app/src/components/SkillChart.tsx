import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number;
}

const skillIcons: { [key: string]: string } = {
  "C#": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  // Add more skill icons here
};

const SkillChart: React.FC<{ skills: Skill[] }> = ({ skills }) => {
  return (
    <div className="skill-chart">
      {skills.map((skill) => (
        <div key={skill.name} className="skill-item">
          <img
            src={skillIcons[skill.name]}
            alt={skill.name}
            className="skill-icon"
            aria-label={skill.name}
          />
          <span className="skill-name">{skill.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SkillChart;