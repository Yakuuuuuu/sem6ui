const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'About shoeNP',
      links: [
        { label: 'News', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Investors', href: '#' },
        { label: 'Sustainability', href: '#' }
      ]
    },
    {
      title: 'Customer Service',
      links: [
        { label: 'Order Status', href: '#' },
        { label: 'Shipping & Returns', href: '#' },
        { label: 'Size Guide', href: '#' },
        { label: 'Contact Us', href: '#' }
      ]
    },
    {
      title: 'shoeNP Membership',
      links: [
        { label: 'Sign Up', href: '#' },
        { label: 'Member Benefits', href: '#' },
        { label: 'shoeNP App', href: '#' },
        { label: 'SNKRS App', href: '#' }
      ]
    }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Use', href: '#' },
    { label: 'CA Supply Chains Act', href: '#' }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    
    if (email) {
      // Simulate newsletter signup
      console.log('Newsletter signup:', email);
      
      // Provide feedback to user
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.className = 'sr-only';
      announcement.textContent = 'Successfully subscribed to newsletter';
      document.body.appendChild(announcement);
      setTimeout(() => document.body.removeChild(announcement), 2000);
    }
  };

  return (
    <footer className="bg-black text-white py-12" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul>
                {section.links.map((link) => (
                  <li key={link.label} className="mb-2">
                    <a href={link.href} className="text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <p className="text-gray-300 mb-4">Get the latest updates on new releases and exclusive offers.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex" role="form" aria-label="Newsletter signup">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address for newsletter
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
                aria-describedby="newsletter-description"
              />
              <div id="newsletter-description" className="sr-only">
                Subscribe to receive shoeNP updates and exclusive offers
              </div>
              <button 
                type="submit"
                className="bg-white text-black px-4 py-2 rounded-r-md font-semibold hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <span className="text-gray-400">© {currentYear} shoeNP, Inc. All Rights Reserved</span>
            </div>
            <nav aria-label="Legal links" className="flex space-x-6">
              {legalLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href} 
                  className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
