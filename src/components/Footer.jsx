import { Activity, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 mt-auto border-t-4 border-teal-700">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <div className="flex items-center space-x-2 text-white mb-3">
                        <Activity className="h-6 w-6 text-teal-400" />
                        <span className="text-lg font-bold">DocAppoint</span>
                    </div>
                    <p className="text-sm text-gray-400">Your trusted medical appointment booking assistant companion.</p>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:text-teal-400">Home</a></li>
                        <li><a href="/appointments" className="hover:text-teal-400">All Appointments</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-3">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-teal-400"><Facebook /></a>
                        <a href="#" className="hover:text-teal-400">
                            {/* New X Logo */}
                            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a>
                        <a href="#" className="hover:text-teal-400"><Linkedin /></a>
                    </div>
                </div>
            </div>
            <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-800 pt-4">
                &copy; {new Date().getFullYear()} DocAppoint. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;