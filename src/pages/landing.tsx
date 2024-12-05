import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TeamCard from '@/components/team-card';
import { BookOpen, Sparkles, Shield } from 'lucide-react';
import Anisha from "../assets/Anisha.jpg";
import Harshitha from "../assets/Harshitha.jpg";
import Sammerah from "../assets/Sameerah.jpg";
import Harshini from "../assets/Harshini.jpg";
import Yashwanth from "../assets/Yashwanth.jpg";

const teamMembers = [
  {
    name: "Yashwanth A",
    regNumber: "99220041035",
    linkedinUrl: "https://www.linkedin.com/in/yashwantharavind/",
    role: "Full Stack Developer",
    imageUrl: Yashwanth // replace with actual URL
  },
  {
    name: "Anisha",
    regNumber: "99220041104",
    linkedinUrl: "https://www.linkedin.com/in/anisha-m-a25b53291/",
    role: "Dataset Collection",
    imageUrl: Anisha // replace with actual URL
  },
  {
    name: "Harshini AVL",
    regNumber: "99220041035",
    linkedinUrl: "https://www.linkedin.com/in/aduru-venkata-lakshmi-harshini-369b68319/",
    role: "Report",
    imageUrl: Harshini // replace with actual URL
  },
  {
    name: "Harshitha A",
    regNumber: "99220041035",
    linkedinUrl: "https://www.linkedin.com/in/harshitha-araveti-302855268",
    role: "Dataset Collection",
    imageUrl: Harshitha // replace with actual URL
  },
  {
    name: "Sammerah D",
    regNumber: "99220041040",
    linkedinUrl: "https://www.linkedin.com/in/sammerah-dudekula-9b0756268/",
    role: "UI/UX Designer",
    imageUrl: Sammerah // replace with actual URL
  }
];

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleLearnMore = () => {
    const featuresSection = document.getElementById('features');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">Moral Munch</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AI-powered stories that inspire and educate young minds
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              onClick={handleGetStarted}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Get Started
            </Button>
            <Button 
              onClick={handleLearnMore}
              className="bg-gray-100 text-gray-900 hover:bg-gray-200"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Moral Munch?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Generated Stories</h3>
              <p className="text-gray-600">Unique, personalized stories created just for your child</p>
            </div>
            <div className="text-center p-6">
              <Sparkles className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
              <p className="text-gray-600">Engaging audio narration with text highlighting</p>
            </div>
            <div className="text-center p-6">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Safe Content</h3>
              <p className="text-gray-600">Age-appropriate stories with positive messages</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {teamMembers.map((member, index) => (
        <div key={index} className="flex justify-center">
          <TeamCard member={member} />
        </div>
      ))}
    </div>
  </div>
</div>

    </div>
  );
};

export default Landing;
