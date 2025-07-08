import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <span className="text-gray-400 text-center md:text-left mb-4 md:mb-0">© 2025 shoeNP. Thank you for supporting local! 🙏</span>
        <nav aria-label="Legal links" className="flex space-x-6">
          <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</Link>
          <Link to="/terms-of-use" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Use</Link>
          <Link to="/ca-supply-chains-act" className="text-gray-400 hover:text-white transition-colors duration-200">CA Supply Chains Act</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
