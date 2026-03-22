import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  Mail,
  MapPin,
  Facebook,
  Send,
  Copy,
  ExternalLink,
  X,
  Phone,
  Instagram,
} from "lucide-react";
import SpotlightCard from "../components/SpotlightCard";
import Footer from "./PageComponents/Footer";
import Navbar from "./PageComponents/Navbar";
const contactMethods = [
  { id: "forms", title: "Contact Form", icon: MessageSquare },
  { id: "gmail", title: "Email Us", icon: Mail },
  { id: "phone", title: "Call Us", icon: Phone },
  { id: "location", title: "Our Clinic", icon: MapPin },
  { id: "facebook", title: "Facebook", icon: Facebook },
  { id: "instagram", title: "Instagram", icon: Instagram },
];
import SendForm from "../API/SendForm";

export default function ContactPage() {
  // null means no card is expanded (shows the 3x2 grid)
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setError(null);
    setSuccess(null);

    // Simple validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please complete all fields before sending.");
      return;
    }

    setLoading(true);
    try {
      console.log('send form')
      const resp = await SendForm(form);

      if (!resp.ok) {
        const body = await resp.json().catch(() => ({}));
        throw new Error(body.message || `Request failed (${resp.status})`);
      }

      setSuccess("Message sent successfully! We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err: any) {
      setError(err?.message || "Unable to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 font-poppins pt-24 flex flex-col relative overflow-hidden">
      <Navbar />
      {/* Decorative background blobs for a beautiful gradient effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-200/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-300/30 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-ceramon text-gray-900 tracking-tight mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg"
          >
            We're here to help you achieve your perfect smile.
          </motion.p>
        </div>

        {/*
          Grid Layout:
          - Unexpanded: 3 columns, 2 rows (for 6 items)
          - Expanded: 4 columns, 5 rows. Expanded item takes 3x5, collapsed take 1x1.
        */}
        <div
          className={`grid gap-4 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 flex-1 transition-all duration-500 ${
            expandedId === null
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[220px]"
              : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[110px]"
          }`}
        >
          {contactMethods.map((method) => {
            const isExpanded = expandedId === method.id;

            return (
              <motion.div
                layout
                key={method.id}
                onClick={() => {
                  if (!isExpanded) setExpandedId(method.id);
                }}
                className={`overflow-hidden rounded-3xl shadow-sm hover:shadow-md transition-shadow bg-white/80 backdrop-blur-md border border-white/60 relative ${
                  !isExpanded ? "cursor-pointer" : ""
                } ${
                  expandedId === null
                    ? "col-span-1 row-span-1"
                    : isExpanded
                      ? "order-first col-span-2 md:col-span-3 lg:col-span-3 row-span-5"
                      : "col-span-1 md:col-span-1 lg:col-span-1 row-span-1"
                }`}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <SpotlightCard
                  className="w-full h-full !p-0 flex flex-col absolute inset-0"
                  spotlightColor="rgba(59, 130, 246, 0.15)"
                >
                  <div className="relative w-full h-full">
                    {/* Close Button for Expanded View */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedId(null);
                          }}
                          className="absolute top-4 right-4 p-2 bg-blue-50 hover:bg-blue-100 rounded-full text-blue-600 transition-colors z-50"
                        >
                          <X size={20} />
                        </motion.button>
                      )}
                    </AnimatePresence>

                    {/* Unexpanded View (Grid or Collapsed Sidebar) */}
                    <AnimatePresence>
                      {!isExpanded && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute inset-0 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors ${
                            expandedId === null
                              ? "flex-col gap-4" // Large grid view
                              : "flex-row lg:flex-col gap-2" // Small collapsed view
                          }`}
                        >
                          <method.icon
                            size={expandedId === null ? 48 : 28}
                            strokeWidth={1.5}
                          />
                          <span
                            className={`font-medium tracking-widest uppercase ${
                              expandedId === null
                                ? "text-lg"
                                : "text-[10px] lg:text-xs whitespace-nowrap"
                            }`}
                          >
                            {method.title}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Expanded View Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: 0.15 }}
                          className="absolute inset-0 flex flex-col p-6 lg:p-10 overflow-y-auto hide-scrollbar"
                        >
                          {method.id === "forms" && (
                            <form
                              onSubmit={handleSubmit}
                              className="flex flex-col h-full w-full text-gray-900 max-w-2xl mx-auto"
                            >
                              <h3 className="text-3xl font-ceramon mb-6 flex items-center gap-3">
                                <MessageSquare className="text-blue-500" /> Send
                                us a message
                              </h3>

                              {error && (
                                <div className="mb-4 rounded-md bg-red-50 border border-red-100 text-red-700 px-4 py-3">
                                  {error}
                                </div>
                              )}

                              {success && (
                                <div className="mb-4 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-3">
                                  {success}
                                </div>
                              )}

                              <div className="flex flex-col gap-4 flex-1">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={form.name}
                                    onChange={(e) => updateField("name", e.target.value)}
                                    className="bg-white/50 border border-blue-100 shadow-sm rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors w-full"
                                  />
                                  <input
                                    type="email"
                                    placeholder="Your Email"
                                    value={form.email}
                                    onChange={(e) => updateField("email", e.target.value)}
                                    className="bg-white/50 border border-blue-100 shadow-sm rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors w-full"
                                  />
                                </div>
                                <textarea
                                  placeholder="How can we help you?"
                                  value={form.message}
                                  onChange={(e) => updateField("message", e.target.value)}
                                  className="bg-white/50 border border-blue-100 shadow-sm rounded-xl p-4 text-gray-900 placeholder-gray-400 flex-1 resize-none focus:outline-none focus:border-blue-400 focus:bg-white transition-colors w-full min-h-[150px]"
                                ></textarea>

                                <div className="mt-2">
                                  <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl font-medium text-white shadow-md transition-all ${
                                      loading
                                        ? "bg-blue-300 cursor-wait"
                                        : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                                    }`}
                                  >
                                    <Send size={18} />
                                    {loading ? "Sending…" : "Send Message"}
                                  </button>
                                </div>
                              </div>
                            </form>
                          )}

                          {method.id === "gmail" && (
                            <div className="flex flex-col h-full w-full text-gray-900 items-center justify-center text-center">
                              <Mail
                                size={80}
                                strokeWidth={1}
                                className="mb-6 text-blue-500"
                              />
                              <h3 className="text-4xl font-ceramon mb-4">
                                Email Us Directly
                              </h3>
                              <p className="text-gray-600 mb-10 max-w-sm">
                                Prefer to use your own email client? We usually
                                respond within 24 hours to all inquiries.
                              </p>
                              <div className="bg-white/60 border border-blue-100 shadow-sm rounded-2xl p-8 flex flex-col items-center gap-6 w-full max-w-md">
                                <span className="text-2xl font-light tracking-wide text-gray-900">
                                  toothalieclean@gmail.com
                                </span>
                                <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium py-3 px-8 rounded-xl hover:from-red-600 hover:to-orange-600 shadow-md hover:shadow-lg transition-all flex items-center gap-2 w-full justify-center">
                                  <Copy size={18} /> Copy Address
                                </button>
                              </div>
                            </div>
                          )}

                          {method.id === "phone" && (
                            <div className="flex flex-col h-full w-full text-gray-900 items-center justify-center text-center">
                              <Phone
                                size={80}
                                strokeWidth={1}
                                className="mb-6 text-blue-500"
                              />
                              <h3 className="text-4xl font-ceramon mb-4">
                                Call Us Directly
                              </h3>
                              <p className="text-gray-600 mb-10 max-w-sm">
                                Our friendly reception team is available Monday
                                through Friday, 9am to 6pm.
                              </p>
                              <div className="bg-white/60 border border-blue-100 shadow-sm rounded-2xl p-8 flex flex-col items-center gap-6 w-full max-w-md">
                                <span className="text-3xl font-light tracking-wide text-gray-900">
                                  +63 0912 345 6789 
                                </span>
                                <button className="bg-gradient-to-r from-emerald-400 to-green-600 text-white font-medium py-3 px-8 rounded-xl hover:from-emerald-500 hover:to-green-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2 w-full justify-center">
                                  <Phone size={18} /> Call Now
                                </button>
                              </div>
                            </div>
                          )}

                          {method.id === "location" && (
                            <div className="flex flex-col h-full w-full text-gray-900 max-w-3xl mx-auto">
                              <h3 className="text-3xl font-ceramon mb-6 flex items-center gap-3">
                                <MapPin className="text-blue-500" /> Visit Our
                                Clinic
                              </h3>
                              <div className="flex-1 bg-white/50 rounded-2xl overflow-hidden relative border border-blue-100 shadow-sm group min-h-[250px]">
                                <img
                                  src="https://picsum.photos/seed/dental-clinic-map/800/600"
                                  alt="Map Location"
                                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 absolute inset-0"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-white via-white/90 to-transparent">
                                  <p className="text-2xl font-light mb-1 text-gray-900">
                                    123 Pogi Street
                                  </p>
                                  <p className="text-gray-600 mb-6">
                                    Dumaguete City, Negros Oriental 6200
                                  </p>
                                  <button className="bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium py-3 px-6 rounded-xl hover:from-teal-600 hover:to-blue-600 shadow-md hover:shadow-lg transition-all flex items-center gap-2 w-max">
                                    <MapPin size={18} /> Get Directions
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {method.id === "facebook" && (
                            <div className="flex flex-col h-full w-full text-gray-900 items-center justify-center text-center">
                              <Facebook
                                size={80}
                                strokeWidth={1}
                                className="mb-6 text-blue-600"
                              />
                              <h3 className="text-4xl font-ceramon mb-4">
                                Connect on Facebook
                              </h3>
                              <p className="text-gray-600 mb-10 max-w-sm">
                                Follow us for daily dental tips, clinic updates,
                                and patient success stories.
                              </p>
                              <div className="bg-white/60 border border-blue-100 shadow-sm rounded-2xl p-8 flex flex-col items-center gap-6 w-full max-w-md">
                                <span className="text-2xl font-light tracking-wide text-gray-900">
                                  @ToothalieClinic
                                </span>
                                <button className="bg-gradient-to-r from-[#1877F2] to-blue-600 text-white font-medium py-3 px-8 rounded-xl hover:from-[#1864D9] hover:to-blue-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2 w-full justify-center">
                                  <ExternalLink size={18} /> Visit Page
                                </button>
                              </div>
                            </div>
                          )}

                          {method.id === "instagram" && (
                            <div className="flex flex-col h-full w-full text-gray-900 items-center justify-center text-center">
                              <Instagram
                                size={80}
                                strokeWidth={1}
                                className="mb-6 text-pink-600"
                              />
                              <h3 className="text-4xl font-ceramon mb-4">
                                Follow our Journey
                              </h3>
                              <p className="text-gray-600 mb-10 max-w-sm">
                                See before & afters, clinic tours, and
                                behind-the-scenes of our daily work.
                              </p>
                              <div className="bg-white/60 border border-blue-100 shadow-sm rounded-2xl p-8 flex flex-col items-center gap-6 w-full max-w-md">
                                <span className="text-2xl font-light tracking-wide text-gray-900">
                                  @ToothalieClinic
                                </span>
                                <button className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-medium py-3 px-8 rounded-xl hover:opacity-90 shadow-md hover:shadow-lg transition-all flex items-center gap-2 w-full justify-center">
                                  <ExternalLink size={18} /> Open Instagram
                                </button>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
