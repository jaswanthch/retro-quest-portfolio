
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Use EmailJS to send email
      const response = await fetch('https://formsubmit.co/ajax/jaswanthch.me@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          _subject: `Portfolio Contact from ${formState.name}`
        })
      });
      
      if (response.ok) {
        playSound('success');
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. I'll get back to you soon!",
          duration: 5000,
        });
        
        setFormState({
          name: '',
          email: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
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
                href="https://github.com/jaswanthch" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-arcade-blue transition-colors"
              >
                <Github size={18} className="mr-2" />
                github.com/jaswanthch
              </a>
              <a 
                href="https://www.linkedin.com/in/jaswanthch/" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-arcade-purple transition-colors"
              >
                <Linkedin size={18} className="mr-2" />
                linkedin.com/in/jaswanthch
              </a>
              <a 
                href="https://x.com/ChJaswanth807" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-arcade-orange transition-colors"
              >
                <Twitter size={18} className="mr-2" />
                x.com/ChJaswanth807
              </a>
            </div>
          </div>
          
          <div className="bg-arcade-dark p-4 rounded-md border border-arcade-purple">
            <h3 className="text-arcade-green font-pixel text-sm mb-3">LOCATION</h3>
            <p className="text-gray-300 mb-2">Currently based in:</p>
            <p className="text-white">Thunder Bay, Ontario</p>
            <p className="text-gray-400 mt-4">Available for remote work worldwide</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
