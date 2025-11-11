import React, { useState } from 'react';
import { FaYoutube, FaFacebookF, FaInstagram, FaTelegram } from 'react-icons/fa';
import { FiMail, FiMapPin, FiGlobe } from 'react-icons/fi';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSuccess(true);
        setFormData({ name: '', email: '', message: '' });

        setTimeout(() => {
            setShowSuccess(false);
        }, 5000);

        console.log('Form submitted:', formData);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden font-mono bg-black">
            {/* Grid Background */}
            <div
                className="absolute inset-0 z-0 opacity-30"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                }}
            />

            {/* Scan Line Effect */}
            <div className="absolute inset-0 z-20 pointer-events-none"
                 style={{
                     background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 255, 255, 0.03) 50%)',
                     backgroundSize: '100% 4px',
                     animation: 'scan 8s linear infinite'
                 }}
            />

            {/* Fullscreen Map */}
            <div className="absolute inset-0 z-10">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.7431676891883!2d88.41275651534781!3d22.476283742162487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02722b05a38e87%3A0x276c0d30e6be12ea!2sNetaji%20Subhash%20Engineering%20College!5e0!3m2!1sen!2sin!4v1676026510888!5m2!1sen!2sin"
                    className="w-full h-full filter grayscale contrast-125 brightness-80"
                    allowFullScreen
                    loading="lazy"
                    title="NSEC Location"
                />
            </div>

            {/* Floating Form Card */}
            <div className="absolute top-1/2 right-4 lg:right-8 transform -translate-y-1/2 w-[380px] lg:w-[420px] max-h-[85vh] bg-gray-900/95 backdrop-blur-sm border-2 border-cyan-500/50 rounded-xl shadow-2xl shadow-cyan-500/30 overflow-y-auto z-30 neon-border-glow no-scrollbar">
                <div className="p-4 lg:p-6">
                    {/* Header */}
                    <div className="mb-4 pb-3 border-b border-cyan-500/30">
                        <h1 className="text-2xl font-bold text-cyan-400 mb-1.5 neon-text-glow">
                            &gt; Get In Touch
                        </h1>
                        <p className="text-cyan-300/80 text-sm leading-relaxed">
                            We'd love to hear from you. Send us a message.
                        </p>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-2.5 mb-4">
                        {/* Location */}
                        <div className="flex items-start space-x-3 p-2.5 rounded-lg border border-transparent hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 neon-card-glow">
                            <FiMapPin className="text-cyan-400 mt-0.5 flex-shrink-0 text-base" />
                            <div className="min-w-0 flex-1">
                                <h3 className="text-cyan-300/70 text-xs uppercase tracking-wider font-semibold mb-1.5">Location</h3>
                                <p className="text-cyan-400 text-sm leading-snug">
                                    Netaji Subhash Engineering College<br />
                                    Garia, Panchpota, Kolkata<br />
                                    West Bengal, 700152
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start space-x-3 p-2.5 rounded-lg border border-transparent hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 neon-card-glow">
                            <FiMail className="text-cyan-400 mt-0.5 flex-shrink-0 text-base" />
                            <div className="min-w-0 flex-1">
                                <h3 className="text-cyan-300/70 text-xs uppercase tracking-wider font-semibold mb-1.5">Email</h3>
                                <p className="text-cyan-400 text-sm">
                                    <a
                                        href="mailto:info@phoenixnsec.in"
                                        className="border-b border-dotted border-cyan-500/50 hover:text-white hover:border-cyan-400 hover:text-shadow-glow transition-all duration-300 break-all"
                                    >
                                        info@phoenixnsec.in
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-start space-x-3 p-2.5 rounded-lg border border-transparent hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 neon-card-glow">
                            <FiGlobe className="text-cyan-400 mt-0.5 flex-shrink-0 text-base" />
                            <div className="min-w-0 flex-1">
                                <h3 className="text-cyan-300/70 text-xs uppercase tracking-wider font-semibold mb-1.5">Connect With Us</h3>
                                <div className="flex space-x-1.5">
                                    {[
                                        { href: "https://t.me/phoenix_nsec2020", icon: FaTelegram, title: "Telegram" },
                                        { href: "https://www.youtube.com/channel/UCBy1iIhw34E7YlHQ8tc4rDA", icon: FaYoutube, title: "YouTube" },
                                        { href: "https://www.facebook.com/nsec.phoenix/", icon: FaFacebookF, title: "Facebook" },
                                        { href: "https://www.instagram.com/phoenix_nsec/", icon: FaInstagram, title: "Instagram" }
                                    ].map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title={social.title}
                                            className="w-8 h-8 flex items-center justify-center bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-400 hover:bg-cyan-500 hover:text-black hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 relative overflow-hidden group"
                                        >
                                            <social.icon className="text-sm relative z-10" />
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="relative my-4">
                        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 px-2 text-cyan-400 text-xs">///</div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        {/* Success Message */}
                        {showSuccess && (
                            <div className="mb-4 p-3 bg-cyan-500/10 border border-cyan-500/50 rounded-lg text-cyan-400 text-sm text-center neon-border-glow">
                                ✓ Thank you! Your message has been sent successfully.
                            </div>
                        )}

                        <div className="space-y-4">
                            {/* Name Field */}
                            <div>
                                <label className="block text-cyan-300/70 text-xs uppercase tracking-wider font-semibold mb-1.5">
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 text-sm bg-cyan-900/20 border border-cyan-500/30 rounded-lg text-cyan-400 placeholder-cyan-500/50 focus:outline-none focus:border-cyan-500 focus:bg-cyan-900/30 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300"
                                    placeholder="Enter your name"
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-cyan-300/70 text-xs uppercase tracking-wider font-semibold mb-1.5">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 text-sm bg-cyan-900/20 border border-cyan-500/30 rounded-lg text-cyan-400 placeholder-cyan-500/50 focus:outline-none focus:border-cyan-500 focus:bg-cyan-900/30 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Message Field */}
                            <div>
                                <label className="block text-cyan-300/70 text-xs uppercase tracking-wider font-semibold mb-1.5">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full px-3 py-2 text-sm bg-cyan-900/20 border border-cyan-500/30 rounded-lg text-cyan-400 placeholder-cyan-500/50 focus:outline-none focus:border-cyan-500 focus:bg-cyan-900/30 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300 resize-none"
                                    placeholder="Enter your message"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                className="w-full py-2.5 text-sm bg-transparent border-2 border-cyan-500/50 rounded-lg text-cyan-400 font-semibold uppercase tracking-wider hover:bg-cyan-500/10 hover:border-cyan-500 hover:text-white hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 neon-border-glow group relative overflow-hidden"
                            >
                                <span className="relative z-10">Send Message</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Animations */}
            <style jsx>{`
                @keyframes scan {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                @keyframes neon-glow {
                    0%, 100% {
                        text-shadow: 0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3);
                    }
                    50% {
                        text-shadow: 0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.5);
                    }
                }
                @keyframes border-glow {
                    0%, 100% {
                        box-shadow: 0 0 10px rgba(0, 255, 255, 0.3), inset 0 0 10px rgba(0, 255, 255, 0.1);
                    }
                    50% {
                        box-shadow: 0 0 20px rgba(0, 255, 255, 0.6), inset 0 0 20px rgba(0, 255, 255, 0.2);
                    }
                }
                .neon-text-glow {
                    animation: neon-glow 3s ease-in-out infinite;
                }
                .neon-border-glow {
                    animation: border-glow 2s ease-in-out infinite;
                }
                .hover\\:text-shadow-glow:hover {
                    text-shadow: 0 0 8px rgba(0, 255, 255, 0.8);
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default Contact;
