// HOME PAGE 
import { Link } from "react-router-dom";
// import { useState } from 'react'
import { Heart, Home, Phone, Users, Calendar, Shield } from 'lucide-react'
import Chatbot from "./Chatbot";
import Sos from "./Sos";
// import SOSNotification from "./Sos2";

export default function HomePage() {
    // const [isMenuOpen, setIsMenuOpen] = useState(false)

    const services = [
        {
            title: "24/7 Care",
            icon: Heart,
            description: "Round-the-clock medical assistance and support for elderly patients, ensuring their health and safety at all times.",
            image: "/1.jpg"
        },
        {
            title: "Home Visits",
            icon: Home,
            description: "Convenient medical care provided in the comfort of your home, reducing stress and improving recovery rates.",
            image: "/2.jpg"
        },
        {
            title: "Emergency Support",
            icon: Phone,
            description: "Rapid response team available for urgent medical needs, providing peace of mind to patients and their families.",
            image: "/4.jpg"
        },
        {
            title: "Social Activities",
            icon: Users,
            description: "Engaging programs designed to promote social well-being and mental health among our elderly community members.",
            image: "/3.jpg"
        },
        {
            title: "Medication Management",
            icon: Calendar,
            description: "Professional oversight ensuring proper and timely medication intake, reducing risks of missed doses or interactions.",
            image: "/5.jpg"
        },
        {
            title: "Safety Monitoring",
            icon: Shield,
            description: "Continuous oversight using advanced technology to ensure the safety and well-being of our elderly clients.",
            image: "/6.jpg"
        },
    ]

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col max-w-screen-sm sm:max-w-full overflow-hidden">


            <main className="flex-grow">
                {/* Hero Section */}
                <div className="relative h-[70vh]">
                    <img
                        src="/hero.jpg"
                        alt="Elder care background"

                        className="z-0 object-fill w-full bg-blend-darken"
                    />
                </div>

                {/* Services Blocks */}
                <div className="container mx-auto py-20 px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Comprehensive Elder Care Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 hover:shadow-xl transform hover:-translate-y-1">
                                <div className="pt-6 pb-3 px-3">
                                    <div className="flex items-center mb-4">
                                        <service.icon className="w-8 h-8 text-blue-600 mr-3" />
                                        <h3 className="text-xl font-semibold">{service.title}</h3>
                                    </div>
                                    <p className="text-gray-600 mb-4">{service.description}</p>
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        width={120}
                                        height={120}
                                        className="rounded-lg w-full h-32 object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* About Us Section */}
                <div className="bg-white py-20">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-center md:items-start lg:mx-12">
                            <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 ">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Elder Medical Help?</h2>
                                <p className="text-lg leading-relaxed mb-8">
                                    At Elder Medical Help, we understand the unique needs of our elderly community. Our team of experienced
                                    healthcare professionals is dedicated to providing personalized care and support to ensure the best
                                    quality of life for our clients. We combine compassion with expertise to deliver unparalleled service.
                                </p>
                                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300">
                                    Learn More About Us
                                </button>
                            </div>
                            <div className="md:w-1/2">
                                <img
                                    src="/2.jpg"
                                    alt="Elder care team"
                                    width={800}
                                    height={600}
                                    className="rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonial Section */}
                <div className="bg-gray-100 py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What Our Clients Say</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((_, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                                    <p className="text-gray-600 mb-4">The care and attention provided by Elder Medical Help has been exceptional. They&apos;ve truly improved the quality of life for my parent</p>
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                                        <div>
                                            <h4 className="font-semibold">Jane Doe</h4>
                                            <p className="text-sm text-gray-500">Daughter of a client</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 ">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-2xl font-bold">Elder Medical Help</h3>
                            <p className="text-sm mt-2">Compassionate care for your loved ones</p>
                        </div>
                        <nav className="flex space-x-6">
                            <Link href="/" className="hover:text-blue-400 transition duration-300">Home</Link>
                            <Link href="/todo" className="hover:text-blue-400 transition duration-300">To Do</Link>
                            <Link href="/profile" className="hover:text-blue-400 transition duration-300">Profile</Link>
                        </nav>
                    </div>
                    <div className="mt-8 text-center text-sm">
                        <p>&copy; {new Date().getFullYear()} Elder Medical Help. All rights reserved.</p>
                    </div>
                </div>
            </footer>
            <Chatbot />
            <Sos />
            {/* <SOSNotification /> */}
        </div >
    )
}