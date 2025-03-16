
import React, { useState } from 'react';
import ArcadeButton from './ArcadeButton';
import { Send, Github, Linkedin, Twitter } from 'lucide-react';
import { useArcadeSound } from './AudioController';
import { toast } from '@/components/ui/use-toast';

const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { playSound } = useArcadeSound();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    playSound('success');
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormState({
        name: '',
        email: '',
        message: ''
      });
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
        duration: 5000,
      });
    }, 1500);
  };

  return (
    <div className="bg-arcade-darker p-6 rounded-lg pixel-corners border-2 border-arcade-purple">
      <h2 className="text-xl text-white mb-4 font-pixel">CONTACT TERMINAL</h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm text-gray-300 mb-1 font-pixel">
                PLAYER NAME
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="w-full bg-arcade-dark border border-arcade-purple p-3 rounded text-white focus:outline-none focus:ring-2 focus:ring-arcade-purple"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm text-gray-300 mb-1 font-pixel">
                COMM LINK (EMAIL)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="w-full bg-arcade-dark border border-arcade-purple p-3 rounded text-white focus:outline-none focus:ring-2 focus:ring-arcade-purple"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm text-gray-300 mb-1 font-pixel">
                MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-arcade-dark border border-arcade-purple p-3 rounded text-white focus:outline-none focus:ring-2 focus:ring-arcade-purple"
              ></textarea>
            </div>
            
            <ArcadeButton
              type="submit"
              color="green"
              className="w-full"
              disabled={isSubmitting}
            >
              <Send size={16} className="mr-2" />
              {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
            </ArcadeButton>
          </form>
        </div>
        
        <div className="flex-1">
          <div className="bg-arcade-dark p-4 rounded-md border border-arcade-purple mb-6">
            <h3 className="text-arcade-blue font-pixel text-sm mb-3">CONNECT</h3>
            <div className="space-y-3">
              <a 
                href="#" 
                className="flex items-center text-gray-300 hover:text-arcade-blue transition-colors"
              >
                <Github size={18} className="mr-2" />
                github.com/yourusername
              </a>
              <a 
                href="#" 
                className="flex items-center text-gray-300 hover:text-arcade-purple transition-colors"
              >
                <Linkedin size={18} className="mr-2" />
                linkedin.com/in/yourusername
              </a>
              <a 
                href="#" 
                className="flex items-center text-gray-300 hover:text-arcade-orange transition-colors"
              >
                <Twitter size={18} className="mr-2" />
                twitter.com/yourusername
              </a>
            </div>
          </div>
          
          <div className="bg-arcade-dark p-4 rounded-md border border-arcade-purple">
            <h3 className="text-arcade-green font-pixel text-sm mb-3">LOCATION</h3>
            <p className="text-gray-300 mb-2">Currently based in:</p>
            <p className="text-white">San Francisco, CA</p>
            <p className="text-gray-400 mt-4">Available for remote work worldwide</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
