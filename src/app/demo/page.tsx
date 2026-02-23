'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
    MessageCircle,
    Sparkles,
    Award,
    Clock,
    Shield,
    Star,
    ChevronRight,
    ChevronDown,
    Check,
    Phone,
    Mail,
    MapPin,
    Instagram,
    Facebook,
    Youtube,
    Users,
    DollarSign,
    Calendar,
    Droplet,
    Palette,
    Zap,
    Home,
    Sun,
    Waves,
    CheckCircle2
} from 'lucide-react';
import ChatWidget from '@/components/ChatWidget';

export default function DemoPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [videoLoaded, setVideoLoaded] = useState(false);

    const openChat = () => {
        const chatButton = document.querySelector('[aria-label="Open chat"]') as HTMLButtonElement;
        if (chatButton) chatButton.click();
    };

    // Lazy load video after page loads
    useEffect(() => {
        const timer = setTimeout(() => {
            setVideoLoaded(true);
        }, 500); // Load video 500ms after page render
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <main className="min-h-screen bg-slate-900">
                {/* Top Bar */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-2 px-4">
                    <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-sm">
                        <div className="flex items-center gap-6">
                            <a href="tel:555-765-7665" className="flex items-center gap-2 hover:text-blue-100 transition-colors">
                                <Phone size={14} />
                                <span>(555) 765-7665</span>
                            </a>
                            <a href="mailto:info@paradisepool.com" className="hidden md:flex items-center gap-2 hover:text-blue-100 transition-colors">
                                <Mail size={14} />
                                <span>info@paradisepool.com</span>
                            </a>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="hidden sm:inline">Follow us:</span>
                            <div className="flex gap-3">
                                <a href="#" className="hover:text-blue-100 transition-colors"><Instagram size={16} /></a>
                                <a href="#" className="hover:text-blue-100 transition-colors"><Facebook size={16} /></a>
                                <a href="#" className="hover:text-blue-100 transition-colors"><Youtube size={16} /></a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
                                    <Waves className="text-white" size={24} />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                        Paradise Pool
                                    </h1>
                                    <p className="text-xs text-slate-500">Building Legacy Pools Since 2010</p>
                                </div>
                            </div>
                            <div className="hidden lg:flex items-center gap-8">
                                <a href="#services" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Services</a>
                                <a href="#process" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Our Process</a>
                                <a href="#portfolio" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Portfolio</a>
                                <a href="#testimonials" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Reviews</a>
                                <button
                                    onClick={openChat}
                                    className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center gap-2"
                                >
                                    <MessageCircle size={18} />
                                    Free Consultation
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section with YouTube Video Background */}
                <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                    {/* Background - Static Image on Mobile, Video on Desktop */}
                    <div className="absolute inset-0">
                        {/* Static Image - Always show on mobile, fallback on desktop */}
                        <Image
                            src="/images/hero-pool.jpg"
                            alt="Luxury backyard pool"
                            fill
                            className="object-cover md:hidden" // Show only on mobile
                            priority
                        />

                        {/* Video Background - Desktop Only (768px+) */}
                        {videoLoaded && (
                            <div className="hidden md:block absolute inset-0 w-full h-full overflow-hidden">
                                <iframe
                                    className="absolute top-1/2 left-1/2 pointer-events-none hero-video-bg"
                                    style={{
                                        // Make video larger than container to fill and hide controls
                                        width: '177.77777778vh', // 16:9 aspect ratio
                                        height: '56.25vw', // 16:9 aspect ratio
                                        minWidth: '100%',
                                        minHeight: '100%',
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                    src="https://www.youtube.com/embed/ju1EF97Cjgg?autoplay=1&mute=1&loop=1&playlist=ju1EF97Cjgg&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
                                    title="Pool Background Video"
                                    frameBorder="0"
                                    allow="autoplay; encrypted-media"
                                />
                            </div>
                        )}

                        {/* Fallback image for desktop while video loads */}
                        {!videoLoaded && (
                            <Image
                                src="/images/hero-pool.jpg"
                                alt="Luxury backyard pool"
                                fill
                                className="hidden md:block object-cover"
                                priority
                            />
                        )}

                        {/* Lighter overlay for brighter look */}
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/40 to-slate-900/60"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                            Your Dream Pool,<br />
                            <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">Designed to Perfection</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-md">
                            Award-winning custom pools built to last generations. Serving Phoenix & Scottsdale since 2010.
                        </p>

                        {/* Urgency Banner */}
                        <div className="mb-8 inline-block bg-cyan-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
                            ⚡ Limited Spring 2025 Build Slots - Free $2,500 3D Design with Quote
                        </div>

                        {/* CTA Button */}
                        <div className="mb-12">
                            <button
                                onClick={openChat}
                                className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-5 rounded-full text-xl font-bold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all flex items-center gap-3 hover:scale-105 mx-auto"
                            >
                                <MessageCircle size={28} />
                                <span>Start Your Pool Journey</span>
                                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-white">
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                <CheckCircle2 className="text-cyan-300" size={20} />
                                <span className="font-semibold drop-shadow">15+ Years of Excellence</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                <CheckCircle2 className="text-cyan-300" size={20} />
                                <span className="font-semibold drop-shadow">500+ Pools Built</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                <CheckCircle2 className="text-cyan-300" size={20} />
                                <span className="font-semibold drop-shadow">Licensed & Insured</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                <CheckCircle2 className="text-cyan-300" size={20} />
                                <span className="font-semibold drop-shadow">Lifetime Warranty</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Value Propositions with Images */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    icon: Palette,
                                    title: "3D Virtual Reality Pool Walkthrough",
                                    description: "See your pool before we dig. Walk through your design in VR."
                                },
                                {
                                    icon: Shield,
                                    title: "Lifetime Structural Warranty",
                                    description: "We stand behind every build. Forever."
                                },
                                {
                                    icon: DollarSign,
                                    title: "No-Surprise Pricing",
                                    description: "Detailed line-item quotes. Zero hidden fees."
                                },
                                {
                                    icon: Award,
                                    title: "Financing from $XXX/month",
                                    description: "Approved in 24 hours. Flexible payment plans."
                                }
                            ].map((item, index) => (
                                <div key={index} className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl transition-all group">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <item.icon className="text-white" size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                    <p className="text-base text-slate-600 leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Lifestyle Image Section */}
                <section className="py-20 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/family-pool-lifestyle.jpg"
                                    alt="Family enjoying their custom pool"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                                    What Makes Us Different?
                                </h2>
                                <div className="space-y-6">
                                    {[
                                        {
                                            title: "Zero-Deposit Design Consultation",
                                            description: "Get your custom 3D design with zero upfront cost. Change your mind before we dig? Full refund on design fee."
                                        },
                                        {
                                            title: "We Handle HOA Approvals",
                                            description: "Navigating HOA requirements? We've got you covered. We manage all approvals and permits—you don't lift a finger."
                                        },
                                        {
                                            title: "From First Call to Swimming: 20-24 Weeks",
                                            description: "Clear timeline expectations. Weekly progress updates. No surprises, just steady progress toward your dream pool."
                                        }
                                    ].map((item, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                                                    <Check className="text-white" size={20} />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                                <p className="text-slate-600 leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <button
                                        onClick={openChat}
                                        className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-cyan-500/25 transition-all inline-flex items-center gap-3"
                                    >
                                        <MessageCircle size={20} />
                                        Get Your Free Quote
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-500">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { number: "500+", label: "Pools Built" },
                                { number: "98%", label: "Customer Satisfaction" },
                                { number: "Zero", label: "Warranty Claims in 2024" },
                                { number: "14-Day", label: "Design Turnaround" }
                            ].map((stat, index) => (
                                <div key={index} className="text-center text-white">
                                    <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                                    <div className="text-white/90 text-sm md:text-base">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Design Consultation Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                                    See Your Pool Before We Build It
                                </h2>
                                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                                    Our award-winning design team creates stunning 3D renderings and virtual reality walkthroughs of your custom pool. You'll see every detail—from tile selection to lighting placement—before we break ground.
                                </p>
                                <div className="space-y-4 mb-8">
                                    {[
                                        "Professional 3D pool design & rendering",
                                        "Virtual reality walkthrough of your backyard",
                                        "Material & finish selection guidance",
                                        "Detailed cost breakdown & timeline",
                                        "Unlimited design revisions until perfect"
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0">
                                                <Check className="text-white" size={14} />
                                            </div>
                                            <span className="text-slate-700">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={openChat}
                                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-cyan-500/25 transition-all inline-flex items-center gap-3"
                                >
                                    <MessageCircle size={20} />
                                    Schedule Free Design Consultation
                                </button>
                            </div>
                            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl order-first md:order-last">
                                <Image
                                    src="/images/design-consultation.jpg"
                                    alt="Pool design consultation meeting"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <section id="process" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                                From Vision to Reality
                            </h2>
                            <p className="text-xl text-slate-600">
                                Our proven 5-step process makes building your dream pool stress-free
                            </p>
                        </div>

                        <div className="grid md:grid-cols-5 gap-6">
                            {[
                                {
                                    step: "1",
                                    title: "Discovery",
                                    subtitle: "Share Your Vision",
                                    description: "Tell us about your dream pool. Style, features, budget—we listen to every detail."
                                },
                                {
                                    step: "2",
                                    title: "Design",
                                    subtitle: "See It Before It's Built",
                                    description: "Receive professional 3D renderings and detailed plans customized to your space."
                                },
                                {
                                    step: "3",
                                    title: "Approval",
                                    subtitle: "Finalize Every Detail",
                                    description: "Review materials, finishes, and timeline. We don't start until you're 100% confident."
                                },
                                {
                                    step: "4",
                                    title: "Construction",
                                    subtitle: "Expert Installation",
                                    description: "Our licensed team handles permits, excavation, and construction with daily updates."
                                },
                                {
                                    step: "5",
                                    title: "Enjoyment",
                                    subtitle: "Dive In!",
                                    description: "Final walkthrough, equipment training, and ongoing support—your oasis is ready."
                                }
                            ].map((item, index) => (
                                <div key={index} className="relative bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                                    <div className="absolute -top-4 left-6 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                        {item.step}
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{item.subtitle}</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Portfolio Section with Real Images */}
                <section id="portfolio" className="py-20 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                                Pools & Inspiration
                            </h2>
                            <p className="text-xl text-slate-600">
                                Browse recent projects and get inspired for your own backyard transformation
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            {[
                                {
                                    name: "Modern Infinity Pool",
                                    location: "Paradise Valley",
                                    features: "Infinity edge, LED lighting, spa integration",
                                    timeline: "18 weeks",
                                    price: "$95K",
                                    image: "/images/infinity-pool-sunset.jpg"
                                },
                                {
                                    name: "Contemporary White Villa Pool",
                                    location: "Scottsdale",
                                    features: "Modern design, crystal water, luxury deck",
                                    timeline: "20 weeks",
                                    price: "$85K",
                                    image: "/images/modern-white-pool.jpg"
                                },
                                {
                                    name: "Tropical Lagoon Paradise",
                                    location: "Phoenix",
                                    features: "Natural lagoon style, tropical landscaping",
                                    timeline: "22 weeks",
                                    price: "$110K",
                                    image: "/images/tropical-lagoon-pool.jpg"
                                },
                                {
                                    name: "Luxury Evening Oasis",
                                    location: "Gilbert",
                                    features: "Wooden deck, ambient lighting",
                                    timeline: "24 weeks",
                                    price: "$125K",
                                    image: "/images/hero-pool.jpg"
                                },
                                {
                                    name: "Contemporary Geometric",
                                    location: "Chandler",
                                    features: "Clean lines, premium materials",
                                    timeline: "16 weeks",
                                    price: "$75K",
                                    image: "/images/pool-detail.jpg"
                                },
                                {
                                    name: "Infinity Edge Masterpiece",
                                    location: "Mesa",
                                    features: "Stunning views, glass railings",
                                    timeline: "20 weeks",
                                    price: "$105K",
                                    image: "/images/infinity-pool-sunset.jpg"
                                }
                            ].map((project, index) => (
                                <div key={index} className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all">
                                    <Image
                                        src={project.image}
                                        alt={project.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                                        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-xl font-bold">{project.name}</h3>
                                                <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-bold">{project.price}</span>
                                            </div>
                                            <p className="text-sm text-white/90 flex items-center gap-1 mb-2">
                                                <MapPin size={14} />
                                                {project.location}
                                            </p>
                                            <p className="text-xs text-white/80 mb-1">Features: {project.features}</p>
                                            <p className="text-xs text-cyan-300 flex items-center gap-1">
                                                <Clock size={12} />
                                                Timeline: {project.timeline}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center">
                            <button
                                onClick={openChat}
                                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-cyan-500/25 transition-all inline-flex items-center gap-3"
                            >
                                <MessageCircle size={20} />
                                Explore Full Portfolio
                            </button>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section id="testimonials" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                                Kind Words from Happy Clients
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            {[
                                {
                                    name: "Sarah M.",
                                    location: "Paradise Valley",
                                    project: "Modern Infinity Pool | $95K",
                                    text: "Paradise Pool turned our backyard into a resort. The attention to detail was incredible, and the project finished on time and on budget. Five years later, it still looks brand new.",
                                    rating: 5
                                },
                                {
                                    name: "Michael & Jennifer T.",
                                    location: "North Scottsdale",
                                    project: "Contemporary White Villa | $85K",
                                    text: "We interviewed four pool builders, and Paradise Pool was the only one who really listened to what we wanted. The 3D design process made all the difference—we knew exactly what we were getting.",
                                    rating: 5
                                },
                                {
                                    name: "David R.",
                                    location: "Gilbert",
                                    project: "Family Entertainment Pool | $78K",
                                    text: "Best investment we've made in our home. The kids live in this pool, and we entertain every weekend. Paradise Pool's team was professional from start to finish.",
                                    rating: 5
                                },
                                {
                                    name: "Amanda K.",
                                    location: "Chandler",
                                    project: "Geometric Pool with Spa | $92K",
                                    text: "What impressed us most was the communication. Daily updates, photos of progress, and they always answered our questions. No surprises, just exceptional work.",
                                    rating: 5
                                }
                            ].map((testimonial, index) => (
                                <div key={index} className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-all">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-slate-700 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-slate-900 font-semibold">{testimonial.name}</p>
                                            <p className="text-slate-500 text-sm flex items-center gap-1">
                                                <MapPin size={12} />
                                                {testimonial.location}
                                            </p>
                                            <p className="text-cyan-600 text-xs font-semibold mt-1">{testimonial.project}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center">
                            <button
                                onClick={openChat}
                                className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-cyan-500 hover:text-cyan-600 transition-all inline-flex items-center gap-3"
                            >
                                Read More Reviews
                            </button>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-xl text-slate-600">
                                Everything you need to know about building your dream pool
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[
                                {
                                    question: "How much does a custom pool cost?",
                                    answer: "Pool costs vary based on size, features, and complexity. Our custom pools typically range from $50,000 to $150,000+. We offer free consultations where we'll provide a detailed quote based on your specific vision, lot conditions, and desired features. Financing options are available to make your dream pool more accessible."
                                },
                                {
                                    question: "How long does it take to build a pool?",
                                    answer: "The typical timeline is 12-24 weeks from permit approval to completion. This includes design (2-3 weeks), permits (2-4 weeks), excavation (1 week), construction (6-12 weeks), and finishing touches (2-3 weeks). We provide weekly progress updates and maintain clear communication throughout the entire process."
                                },
                                {
                                    question: "Do you handle permits and inspections?",
                                    answer: "Absolutely! We handle all permits, HOA approvals, and city inspections. Our team has established relationships with local authorities and knows exactly what's required in Phoenix and Scottsdale. This is included in our service—you won't need to deal with any paperwork or bureaucracy."
                                },
                                {
                                    question: "What's included in your warranty?",
                                    answer: "We offer a comprehensive lifetime structural warranty on our pools, plus manufacturer warranties on all equipment (pumps, heaters, automation systems). Our workmanship guarantee covers any construction-related issues. We also provide a 1-year full service warranty where we handle any adjustments or minor repairs at no cost."
                                },
                                {
                                    question: "Can I customize the pool design?",
                                    answer: "Yes! Every pool we build is 100% custom. You can choose from infinity edges, beach entries, swim-up bars, grottos, waterfalls, integrated spas, tanning ledges, and more. We create 3D renderings so you can visualize your exact design before construction begins. Our design team works with you to ensure every detail matches your vision."
                                },
                                {
                                    question: "What maintenance is required?",
                                    answer: "Regular maintenance includes weekly chemical balancing, filter cleaning, and skimming. We can install automated systems that handle most of this for you. We also offer maintenance packages starting at $150/month where our team handles everything—you just enjoy the pool. Saltwater systems and advanced automation can significantly reduce hands-on maintenance."
                                },
                                {
                                    question: "Do you offer financing options?",
                                    answer: "Yes! We partner with leading pool financing companies to offer flexible payment plans with competitive rates. Many homeowners choose to finance through home equity loans, HELOC, or our preferred lenders. During your consultation, we can discuss financing options and help you find the best solution for your budget."
                                },
                                {
                                    question: "What happens if I have issues after completion?",
                                    answer: "We're here for life! Our team provides ongoing support even after your warranty period. We have a dedicated service department for repairs, upgrades, and seasonal maintenance. Most minor issues are covered under warranty. For anything else, we offer priority scheduling for our existing clients and transparent pricing with no hidden fees."
                                }
                            ].map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-100 transition-colors"
                                    >
                                        <span className="text-lg font-bold text-slate-900 pr-8">
                                            {faq.question}
                                        </span>
                                        <ChevronDown
                                            size={24}
                                            className={`flex-shrink-0 text-cyan-600 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-96' : 'max-h-0'
                                            }`}
                                    >
                                        <div className="px-8 pb-6 text-slate-600 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <p className="text-slate-600 mb-6">
                                Still have questions? Our team is here to help!
                            </p>
                            <button
                                onClick={openChat}
                                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-cyan-500/25 transition-all inline-flex items-center gap-3"
                            >
                                <MessageCircle size={20} />
                                Ask Us Anything
                            </button>
                        </div>
                    </div>
                </section>

                {/* Final CTA Section with Image */}
                <section className="relative py-32 overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src="/images/modern-white-pool.jpg"
                            alt="Beautiful luxury pool"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-cyan-900/95"></div>
                    </div>
                    <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Build the Perfect Pool for Your Family?
                        </h2>
                        <p className="text-xl text-white/90 mb-10 leading-relaxed">
                            Let's discuss your vision. Our team is ready to answer your questions and help you explore beautiful possibilities for your backyard.
                        </p>
                        <button
                            onClick={openChat}
                            className="group bg-white text-blue-600 px-10 py-5 rounded-full text-xl font-bold hover:shadow-2xl transition-all inline-flex items-center gap-3 hover:scale-105"
                        >
                            <MessageCircle size={24} />
                            <span>Start Your Free Consultation</span>
                            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <p className="text-white/80 text-sm mt-6">
                            Or call us directly at <a href="tel:555-765-7665" className="font-semibold underline">(555) 765-7665</a>
                        </p>
                    </div>
                </section>

                {/* Minimal Footer */}
                <footer className="bg-slate-900 text-slate-400 py-12">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        {/* Brand */}
                        <div className="mb-6">
                            <h3 className="text-white font-bold text-2xl mb-2">Paradise Pool</h3>
                            <p className="text-slate-400 text-sm">Building Legacy Pools Since 2010</p>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3 mb-8">
                            <p className="flex items-center justify-center gap-2 text-slate-300">
                                <MapPin size={16} className="text-cyan-400" />
                                Serving Phoenix, AZ & Surrounding Areas
                            </p>
                            <p className="flex items-center justify-center gap-2">
                                <Phone size={16} className="text-cyan-400" />
                                <a href="tel:555-765-7665" className="hover:text-cyan-400 transition-colors">(555) 765-7665</a>
                            </p>
                            <p className="flex items-center justify-center gap-2">
                                <Mail size={16} className="text-cyan-400" />
                                <a href="mailto:info@paradisepool.com" className="hover:text-cyan-400 transition-colors">info@paradisepool.com</a>
                            </p>
                        </div>

                        {/* Credentials */}
                        <div className="flex flex-wrap justify-center gap-4 text-xs mb-8 pb-8 border-b border-slate-800">
                            <span className="flex items-center gap-1">
                                <CheckCircle2 size={14} className="text-cyan-400" />
                                Licensed & Insured (ROC #123456)
                            </span>
                            <span className="text-slate-600">|</span>
                            <span className="flex items-center gap-1">
                                <CheckCircle2 size={14} className="text-cyan-400" />
                                BBB A+ Rated
                            </span>
                        </div>

                        {/* Social Media */}
                        <div className="flex justify-center gap-6 mb-6">
                            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors" aria-label="Instagram">
                                <Instagram size={24} />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors" aria-label="Facebook">
                                <Facebook size={24} />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors" aria-label="YouTube">
                                <Youtube size={24} />
                            </a>
                        </div>

                        {/* Copyright */}
                        <div className="text-xs text-slate-500 space-y-1">
                            <p>© 2024 Paradise Pool. All rights reserved.</p>
                            <p>
                                Powered by{' '}
                                <a
                                    href="https://scaleyourpool.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                                >
                                    ScaleYourPool.com
                                </a>
                            </p>
                        </div>
                    </div>
                </footer>
            </main>

            {/* Chat Widget */}
            <ChatWidget />
        </>
    );
}

