
import React from 'react';
import ArcadeButton from './ArcadeButton';
import { Download } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <div className="bg-arcade-darker p-6 rounded-lg pixel-corners border-2 border-arcade-purple">
      <h2 className="text-xl text-white mb-4 font-pixel">PLAYER PROFILE</h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <p className="text-gray-300 mb-4">
            Hi, I'm Jaswanth, a Full-Stack JavaScript & WordPress Developer with a passion for creating 
            interactive, user-friendly applications and websites.
          </p>
          <p className="text-gray-300 mb-4">
            I specialize in modern web technologies including React, TypeScript, Next.js, and WordPress development.
            My focus is on crafting clean, maintainable code and solving complex problems.
          </p>
          <p className="text-gray-300 mb-6">
            When not coding, I can be found exploring new technologies, contributing to open-source projects,
            and continuing to expand my development toolkit.
          </p>
          
          <a href="/resume.pdf" download>
            <ArcadeButton color="green" className="inline-block">
              <Download size={16} className="mr-2" /> Download Resume
            </ArcadeButton>
          </a>
        </div>
        
        <div className="flex-1">
          <div className="bg-arcade-dark p-4 rounded-md border border-arcade-purple mb-4">
            <h3 className="text-arcade-green font-pixel text-sm mb-2">TECH POWERS</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-xs">JavaScript/TypeScript</p>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-arcade-green w-[95%]"></div>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-xs">React/Next.js</p>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-arcade-blue w-[90%]"></div>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-xs">WordPress/PHP</p>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-arcade-purple w-[85%]"></div>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-xs">MySQL/MongoDB</p>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-arcade-orange w-[80%]"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-arcade-dark p-4 rounded-md border border-arcade-purple">
            <h3 className="text-arcade-orange font-pixel text-sm mb-2">ACHIEVEMENTS</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li className="flex items-center">
                <span className="inline-block w-2 h-2 bg-arcade-orange rounded-full mr-2"></span>
                Developed multiple full-stack web applications
              </li>
              <li className="flex items-center">
                <span className="inline-block w-2 h-2 bg-arcade-orange rounded-full mr-2"></span>
                Created custom WordPress plugins and themes
              </li>
              <li className="flex items-center">
                <span className="inline-block w-2 h-2 bg-arcade-orange rounded-full mr-2"></span>
                Mastered both JavaScript and PHP ecosystems
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
