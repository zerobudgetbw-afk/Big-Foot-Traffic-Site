import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Printer, Download, CheckCircle2 } from 'lucide-react';
import { useAudio } from '../services/AudioService';

interface RateCardProps {
  onBack: () => void;
}

export const RateCard: React.FC<RateCardProps> = ({ onBack }) => {
  const { playSound } = useAudio();
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-sans text-black selection:bg-brand-yellow/30">
      {/* Controls */}
      <div className="max-w-5xl mx-auto mb-8 flex justify-between items-center no-print">
        <button 
          onClick={() => {
            playSound('CLICK');
            onBack();
          }}
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
        >
          <ArrowLeft size={18} /> Back to Site
        </button>
        <button 
          onClick={() => {
            playSound('CLICK');
            window.print();
          }}
          className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg"
        >
          <Download size={18} /> Download Rate Card PDF
        </button>
      </div>

      {/* Page 1 */}
      <div className="max-w-5xl mx-auto bg-white shadow-2xl mb-12 relative overflow-hidden print:shadow-none print:m-0 print:w-full">
        <div className="p-8 md:p-16">
          {/* Header */}
          <div className="border-[4px] border-brand-yellow p-8 text-center mb-12 bg-black text-white">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-2">BIG FOOT TRAFFIC</h1>
            <p className="text-sm font-bold tracking-[0.4em] uppercase opacity-80 mb-6">Official Rate Card — 2026</p>
            <div className="h-px w-24 bg-brand-yellow mx-auto mb-6" />
            <p className="text-lg font-medium opacity-90">Botswana's First Verified Conversational Marketing Network</p>
            <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-[10px] font-bold uppercase tracking-widest opacity-60">
              <span>Gaborone, Botswana</span>
              <span>hello@bigfoottraffic.co.bw</span>
              <span>bigfoottraffic.co.bw</span>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { label: "Cost per verified conversation", val: "P7.50" },
              { label: "Monthly guaranteed rides", val: "2,000+" },
              { label: "Monthly guaranteed reach", val: "60,000+" },
              { label: "Audio verified", val: "100%" }
            ].map((stat, i) => (
              <div key={i} className="bg-gray-50 p-6 text-center border-b-4 border-brand-yellow">
                <div className="text-3xl font-black mb-1">{stat.val}</div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-gray-500 leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="mb-16">
            <h2 className="text-xl font-black uppercase tracking-tight text-brand-yellow mb-6 border-b-2 border-brand-yellow pb-2 inline-block">
              Why Traditional Media is costing you more than you think
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black text-white text-[10px] font-bold uppercase tracking-widest">
                    <th className="p-4 border border-gray-800">Medium</th>
                    <th className="p-4 border border-gray-800">Typical Botswana Cost</th>
                    <th className="p-4 border border-gray-800">Verified Conversations</th>
                    <th className="p-4 border border-gray-800">Proof of Delivery</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Local Radio — 90 prime spots/month</td>
                    <td className="p-4 border border-gray-200 text-brand-orange font-bold">P45,000–P55,000/month</td>
                    <td className="p-4 border border-gray-200">Zero</td>
                    <td className="p-4 border border-gray-200 text-brand-orange">None — estimated only</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Billboard — 3 arterial sites, Gaborone</td>
                    <td className="p-4 border border-gray-200 text-brand-orange font-bold">P12,000–P18,000/month</td>
                    <td className="p-4 border border-gray-200">Zero</td>
                    <td className="p-4 border border-gray-200 text-brand-orange">None — 3 sec dwell time</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Bus Shelter Advertising — 10 sites</td>
                    <td className="p-4 border border-gray-200 text-brand-orange font-bold">P70,000+ month one</td>
                    <td className="p-4 border border-gray-200">Zero</td>
                    <td className="p-4 border border-gray-200 text-brand-orange">None — passive only</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">In-Store Promoters — 5 staff, 22 days</td>
                    <td className="p-4 border border-gray-200 text-brand-orange font-bold">P35,000–P40,000/month</td>
                    <td className="p-4 border border-gray-200">~6,600 (unverified)</td>
                    <td className="p-4 border border-gray-200 text-brand-orange">None — no audio QA</td>
                  </tr>
                  <tr className="bg-brand-yellow/10">
                    <td className="p-4 border border-brand-yellow font-black">BIG FOOT TRAFFIC — Monthly Plan</td>
                    <td className="p-4 border border-brand-yellow font-black">P15,000/month</td>
                    <td className="p-4 border border-brand-yellow font-black">2,000+ VERIFIED</td>
                    <td className="p-4 border border-brand-yellow font-black">Daily audio QA reports</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[9px] italic text-gray-400">* Industry average benchmarks based on publicly available Botswana rate card data. No individual media house is named.</p>
          </div>

          {/* Service 01 */}
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-brand-yellow mb-2">Service 01 — In-Ride Ambassador</h2>
            <p className="text-xs text-gray-500 mb-8 leading-relaxed max-w-3xl">
              A trained, certified driver delivers your brand message in a natural two-way conversation during the ride. Every conversation is audio recorded, human scored (1–10) and reported to your dashboard daily. The passenger is captive, comfortable, and cannot skip, scroll, or walk away.
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black text-white text-[10px] font-bold uppercase tracking-widest">
                    <th className="p-4 border border-gray-800">Plan</th>
                    <th className="p-4 border border-gray-800">Duration</th>
                    <th className="p-4 border border-gray-800">Guaranteed Rides</th>
                    <th className="p-4 border border-gray-800">Investment</th>
                    <th className="p-4 border border-gray-800">Cost/Conversation</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Day Pass</td>
                    <td className="p-4 border border-gray-200">1 Day</td>
                    <td className="p-4 border border-gray-200">50+ rides</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P3,500</td>
                    <td className="p-4 border border-gray-200">P70.00</td>
                  </tr>
                  <tr className="bg-brand-yellow/5">
                    <td className="p-4 border border-gray-200 font-bold">Monthly</td>
                    <td className="p-4 border border-gray-200">30 Days</td>
                    <td className="p-4 border border-gray-200">2,000+ rides</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P15,000</td>
                    <td className="p-4 border border-gray-200">P7.50</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Quarterly</td>
                    <td className="p-4 border border-gray-200">3 Months</td>
                    <td className="p-4 border border-gray-200">6,000+ rides</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P40,000</td>
                    <td className="p-4 border border-gray-200 font-bold">P6.67</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Annual</td>
                    <td className="p-4 border border-gray-200">12 Months</td>
                    <td className="p-4 border border-gray-200">24,000+ rides</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P135,000</td>
                    <td className="p-4 border border-gray-200 font-bold">P5.63</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-black text-white p-6 text-[10px] font-bold uppercase tracking-widest">
              <div className="flex items-center gap-3"><CheckCircle2 size={14} className="text-brand-yellow" /> Driver training included</div>
              <div className="flex items-center gap-3"><CheckCircle2 size={14} className="text-brand-yellow" /> Daily audio QA scoring</div>
              <div className="flex items-center gap-3"><CheckCircle2 size={14} className="text-brand-yellow" /> Unique referral codes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Page 2 */}
      <div className="max-w-5xl mx-auto bg-white shadow-2xl mb-12 relative overflow-hidden print:shadow-none print:m-0 print:w-full print:break-before-page">
        <div className="p-8 md:p-16">
          <div className="flex justify-between items-center mb-12 pb-4 border-b border-gray-100">
            <div className="flex gap-6 text-[9px] font-bold uppercase tracking-widest text-gray-400">
              <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-brand-yellow" /> Live brand dashboard</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-brand-yellow" /> Weekly performance report</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-brand-yellow" /> BOCRA & Data Protection compliant</span>
            </div>
          </div>

          {/* Service 02 */}
          <div className="mb-16">
            <h2 className="text-xl font-black uppercase tracking-tight text-brand-yellow mb-2">Service 02 — In-Car Radio & Online Radio Network</h2>
            <p className="text-xs text-gray-500 mb-8 leading-relaxed max-w-3xl">
              We produce a custom radio loop that plays inside every taxi and InDrive vehicle — music, ads, live reads, and promos woven in naturally. The passenger cannot change the station. We also place campaigns on Botswana's online radio stations — the same production serves both channels. Perfect for brands that want radio reach with verifiable, targeted delivery.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black text-white text-[10px] font-bold uppercase tracking-widest">
                    <th className="p-4 border border-gray-800">Item</th>
                    <th className="p-4 border border-gray-800">Description</th>
                    <th className="p-4 border border-gray-800">Cost</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Vehicle Setup</td>
                    <td className="p-4 border border-gray-200">Hardware/USB install per car — once-off</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P450 per car</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Content Production</td>
                    <td className="p-4 border border-gray-200">1-hour custom loop with 3 ad spots — once-off</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P3,500</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Monthly Network (20 cars)</td>
                    <td className="p-4 border border-gray-200">Loop management, content refresh, fleet tracking</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P9,000/month</td>
                  </tr>
                  <tr className="bg-brand-yellow/5">
                    <td className="p-4 border border-gray-200 font-bold">Starter Bundle (20 cars)</td>
                    <td className="p-4 border border-gray-200">Setup + production + first month all-in</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P21,500</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Online Radio Placement</td>
                    <td className="p-4 border border-gray-200">Ad/live read placed on Botswana online radio stations</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P2,500–P5,000/month</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Live Read (In-Car)</td>
                    <td className="p-4 border border-gray-200">Scripted live read woven into the loop per campaign</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P1,500 per script</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Promo/Competition</td>
                    <td className="p-4 border border-gray-200">Competition or promo segment added to loop</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P2,000 setup + P500/week</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Content Refresh</td>
                    <td className="p-4 border border-gray-200">Monthly loop update with new messaging</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P2,000/month</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest">NOTE: The same audio content produced for in-car radio can be repurposed for online radio placement at no additional production cost.</p>
          </div>

          {/* Service 03 */}
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-brand-yellow mb-2">Service 03 — Flyer Design + Driver Distribution</h2>
            <p className="text-xs text-gray-500 mb-8 leading-relaxed max-w-3xl">
              We design, print, and distribute flyers directly into passenger hands through our driver network. Not dumped in a pile — hand delivered inside a moving vehicle during a warm conversation. QR codes on every batch are tracked so you know how many were scanned.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black text-white text-[10px] font-bold uppercase tracking-widest">
                    <th className="p-4 border border-gray-800">Item</th>
                    <th className="p-4 border border-gray-800">Specification</th>
                    <th className="p-4 border border-gray-800">Cost</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Flyer Design</td>
                    <td className="p-4 border border-gray-200">Print-ready A5 artwork, 2 revisions included</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P2,500</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Print 1,000</td>
                    <td className="p-4 border border-gray-200">Full colour A5, 135gsm gloss</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P900</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Print 5,000</td>
                    <td className="p-4 border border-gray-200">Full colour A5, 135gsm gloss</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P3,500</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Print 10,000</td>
                    <td className="p-4 border border-gray-200">Full colour A5, 135gsm gloss</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P6,000</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Driver Distribution</td>
                    <td className="p-4 border border-gray-200">Hand delivery in-ride by our driver network</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P2,000</td>
                  </tr>
                  <tr className="bg-brand-yellow/5">
                    <td className="p-4 border border-gray-200 font-bold">Full Bundle (5,000)</td>
                    <td className="p-4 border border-gray-200">Design + Print 5,000 + Distribution</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P8,000</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">QR Code Tracking</td>
                    <td className="p-4 border border-gray-200">Unique QR per batch, scan analytics dashboard</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P500 setup</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Page 3 */}
      <div className="max-w-5xl mx-auto bg-white shadow-2xl mb-12 relative overflow-hidden print:shadow-none print:m-0 print:w-full print:break-before-page">
        <div className="p-8 md:p-16">
          {/* Service 04 */}
          <div className="mb-16">
            <h2 className="text-xl font-black uppercase tracking-tight text-brand-yellow mb-2">Service 04 — Social Media Package</h2>
            <p className="text-xs text-gray-500 mb-8 leading-relaxed max-w-3xl">
              TikTok, Facebook, Instagram, and X — managed, produced, and run by us. Content is shot in and around rides for authentic brand storytelling. Designed to convert, not just post. Monthly analytics report included.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black text-white text-[10px] font-bold uppercase tracking-widest">
                    <th className="p-4 border border-gray-800">Plan</th>
                    <th className="p-4 border border-gray-800">Includes</th>
                    <th className="p-4 border border-gray-800">Investment</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Social Starter</td>
                    <td className="p-4 border border-gray-200">4 posts/month, 2 platforms, basic analytics</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P5,000/month</td>
                  </tr>
                  <tr className="bg-brand-yellow/5">
                    <td className="p-4 border border-gray-200 font-bold">Social Pro</td>
                    <td className="p-4 border border-gray-200">4 TikTok videos, 8 posts, all platforms, TikTok ads, analytics report</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P15,000/month</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Social Quarterly</td>
                    <td className="p-4 border border-gray-200">Social Pro × 3 months — content calendar + strategy</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P40,000</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">TikTok Video (single)</td>
                    <td className="p-4 border border-gray-200">One scripted, filmed, edited TikTok — branded content</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P2,500 each</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Paid Ad Management</td>
                    <td className="p-4 border border-gray-200">Ad setup, targeting, optimisation (excludes ad spend)</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P3,000/month</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Service 05 */}
          <div className="mb-16">
            <h2 className="text-xl font-black uppercase tracking-tight text-brand-yellow mb-2">Service 05 — In-Vehicle Video Ads</h2>
            <p className="text-xs text-gray-500 mb-8 leading-relaxed max-w-3xl">
              Tablets or screens mounted inside the vehicle play your brand video during every ride. No skip. No scroll. Full screen captive viewing for the entire journey duration. Can be combined with the ambassador service for maximum impact.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black text-white text-[10px] font-bold uppercase tracking-widest">
                    <th className="p-4 border border-gray-800">Item</th>
                    <th className="p-4 border border-gray-800">Description</th>
                    <th className="p-4 border border-gray-800">Cost</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Hardware Setup (per car)</td>
                    <td className="p-4 border border-gray-200">Tablet + mount installation — once-off per vehicle</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P2,000/car</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Video Production</td>
                    <td className="p-4 border border-gray-200">15–30 second branded video — scripted, filmed, edited</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P5,000</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Monthly Network (15 cars)</td>
                    <td className="p-4 border border-gray-200">Content management, screen fees, reporting</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P12,000/month</td>
                  </tr>
                  <tr className="bg-brand-yellow/5">
                    <td className="p-4 border border-gray-200 font-bold">Starter Package (15 cars)</td>
                    <td className="p-4 border border-gray-200">Setup (15 cars) + video production + first month</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P47,000</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">QR Code on Screen</td>
                    <td className="p-4 border border-gray-200">Scannable QR for instant passenger action</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P500 setup</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Service 06 */}
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-brand-yellow mb-2">Service 06 — Full Agency Bundle</h2>
            <p className="text-xs text-gray-500 mb-8 leading-relaxed max-w-3xl">
              Everything combined. In-ride ambassador campaigns, in-car radio, social media, flyer distribution, video ads, and full monthly reporting. One agency. One invoice. Total market coverage. Category exclusivity available — your brand owns the space in your industry.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black text-white text-[10px] font-bold uppercase tracking-widest">
                    <th className="p-4 border border-gray-800">Bundle</th>
                    <th className="p-4 border border-gray-800">What is Included</th>
                    <th className="p-4 border border-gray-800">Investment</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Starter Bundle</td>
                    <td className="p-4 border border-gray-200">In-Ride Ambassador (monthly) + Flyer Bundle + Social Starter</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P25,000/month</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Growth Bundle</td>
                    <td className="p-4 border border-gray-200">In-Ride Ambassador + In-Car Radio + Social Pro + Flyers</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P35,000/month</td>
                  </tr>
                  <tr className="bg-brand-yellow/5">
                    <td className="p-4 border border-gray-200 font-bold">Pro Bundle</td>
                    <td className="p-4 border border-gray-200">All services + Video Ads + Dedicated account manager</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">P55,000/month</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Enterprise / Annual</td>
                    <td className="p-4 border border-gray-200">Custom multi-city deployment, category exclusivity, white-label reports</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">Custom — contact us</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Page 4 */}
      <div className="max-w-5xl mx-auto bg-white shadow-2xl relative overflow-hidden print:shadow-none print:m-0 print:w-full print:break-before-page">
        <div className="p-8 md:p-16">
          {/* Performance Bonus */}
          <div className="mb-16">
            <h2 className="text-xl font-black uppercase tracking-tight text-brand-yellow mb-2">Performance Bonus Model — Optional Add-on</h2>
            <p className="text-xs text-gray-500 mb-8 leading-relaxed max-w-3xl">
              Layer a results-based bonus on top of any subscription. You only pay extra when a driver generates a verified lead, referral code redemption, app download, or confirmed sale. This gives brands confidence and gives drivers additional income motivation.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black text-white text-[10px] font-bold uppercase tracking-widest">
                    <th className="p-4 border border-gray-800">Conversion Event</th>
                    <th className="p-4 border border-gray-800">What Counts</th>
                    <th className="p-4 border border-gray-800">Bonus Rate</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Qualified Lead</td>
                    <td className="p-4 border border-gray-200">Passenger contact number collected & verified by brand</td>
                    <td className="p-4 border border-gray-200 font-bold">By negotiation</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Referral Code Redeemed</td>
                    <td className="p-4 border border-gray-200">Unique driver code used at checkout or in-store</td>
                    <td className="p-4 border border-gray-200 font-bold">By negotiation</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">App Download Confirmed</td>
                    <td className="p-4 border border-gray-200">Download attributed to driver referral link</td>
                    <td className="p-4 border border-gray-200 font-bold">By negotiation</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Confirmed Sale</td>
                    <td className="p-4 border border-gray-200">Purchase directly attributed to in-ride conversation</td>
                    <td className="p-4 border border-gray-200 font-bold">By negotiation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Who should be on this rate card */}
          <div className="mb-16">
            <h2 className="text-xl font-black uppercase tracking-tight text-brand-yellow mb-6 border-b-2 border-brand-yellow pb-2 inline-block">
              Who should be on this rate card
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black text-white text-[10px] font-bold uppercase tracking-widest">
                    <th className="p-4 border border-gray-800">Sector</th>
                    <th className="p-4 border border-gray-800">Why BFT works for them</th>
                    <th className="p-4 border border-gray-800">Recommended Entry Plan</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Insurance</td>
                    <td className="p-4 border border-gray-200">Funeral cover, medical aid & life products need conversation — not billboards. One 15-min ride = a qualified warm lead.</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">Monthly Ambassador P15,000</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">FMCG / Food & Bev</td>
                    <td className="p-4 border border-gray-200">Product education, sampling, and brand recall. Drivers hand product to passenger during conversation.</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">Ambassador + Flyers P17,000</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Banking & Finance</td>
                    <td className="p-4 border border-gray-200">Mobile banking, account opening, loan awareness. Reaches unbanked commuters daily.</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">Monthly + Radio P24,000</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Telecommunications</td>
                    <td className="p-4 border border-gray-200">SIM activations, data bundles, new product launches. Citywide reach every day.</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">Monthly Ambassador P15,000</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Beauty & Personal Care</td>
                    <td className="p-4 border border-gray-200">Wet demos, sampling, product education. In-vehicle sampling proved highly effective.</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">Ambassador + Video P27,000</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-bold">Government / NGO</td>
                    <td className="p-4 border border-gray-200">Health campaigns, civic awareness, public service messaging. Trusted human delivery beats a poster.</td>
                    <td className="p-4 border border-gray-200 font-bold text-brand-orange">Monthly Ambassador P15,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Terms */}
          <div className="mb-16">
            <h2 className="text-xl font-black uppercase tracking-tight text-brand-yellow mb-6">Terms, Conditions & Notes</h2>
            <ul className="text-[10px] text-gray-500 space-y-2 list-disc pl-4">
              <li>All prices exclude 12% VAT unless stated otherwise.</li>
              <li>A 30-day pilot campaign is available for first-time clients — commitment can be upgraded after the pilot.</li>
              <li>All campaigns require a completed brand brief at least 5 working days before launch.</li>
              <li>Driver training is included in all ambassador plans. Script approval by client required before training.</li>
              <li>Audio recordings are stored for 60 days. Client may request specific recordings within this period.</li>
              <li>All data handling complies with Botswana's Data Protection Act 2018 and BOCRA regulations.</li>
              <li>Passenger notification of recording is automatic and non-optional — full transparency is built into the product.</li>
              <li>Payment terms: 50% deposit on signing, 50% on campaign completion. Quarterly and annual plans negotiable.</li>
              <li>Category exclusivity is available on Quarterly and Annual plans — only one brand per industry per campaign period.</li>
              <li>Big Foot Traffic reserves the right to remove any driver from a campaign who scores consistently below 6/10.</li>
              <li>Prices are valid for 2026. Rate card is reviewed annually.</li>
            </ul>
          </div>

          {/* Footer */}
          <div className="bg-black text-white p-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-lg font-black tracking-tighter">BIG FOOT TRAFFIC (PTY) LTD</div>
            <div className="flex flex-wrap justify-center gap-6 text-[9px] font-bold uppercase tracking-widest opacity-60">
              <span>hello@bigfoottraffic.co.bw</span>
              <span>bigfoottraffic.co.bw</span>
              <span>Gaborone, Botswana · 2026</span>
            </div>
          </div>
          <div className="mt-4 text-center text-[8px] text-gray-400 italic">
            "There is no box. There never was." · © 2026 Big Foot Traffic (Pty) Ltd. All rights reserved. Prices exclude VAT. Subject to change.
          </div>
        </div>
      </div>
    </div>
  );
};
