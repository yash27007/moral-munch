import React from 'react';
import { Linkedin } from 'lucide-react';

interface TeamMember {
  name: string;
  regNumber: string;
  linkedinUrl: string;
  role: string;
  imageUrl: string;
}

const TeamCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 w-64 text-center">
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={member.imageUrl}
          alt={member.name}
          className="w-full h-full object-cover transition-opacity hover:opacity-75"
        />
        {/* <a
          href={member.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2 right-2 opacity-0 transition-opacity hover:opacity-100"
        >
          <Linkedin className="w-8 h-8 text-blue-600" />
        </a> */}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{member.role}</p>
        <p className="text-sm text-gray-500 mt-1">Reg: {member.regNumber}</p>
        <a
          href={member.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 bg-white px-4 py-2 rounded-full shadow"
        >
          <Linkedin className="w-5 h-5 mr-2" />
          Connect on LinkedIn
        </a>
      </div>
    </div>
  );
};

export default TeamCard;
