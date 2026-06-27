import { useEffect, useMemo, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import { VideoThumbnail } from "../components/VideoThumbnail";

const categories = [
  { id: "getting-started", title: "Getting Started", desc: "Learn the basics of your account and credit setup." },
  { id: "wallet", title: "Wallet", desc: "Connect, verify, and troubleshoot supported Stellar wallets." },
  { id: "credit-lines", title: "Credit Lines", desc: "Understand draws, repayments, and account status changes." },
  { id: "transactions", title: "Transactions", desc: "Filter history, inspect hashes, and export records." },
  { id: "notifications", title: "Notifications", desc: "Manage alerts, preferences, and follow-up actions." },
  { id: "shortcuts", title: "Shortcuts", desc: "Learn the keyboard shortcuts available across the app." },
] as const;

const faqs = [
  {
    id: "what-is-creditra",
    sectionId: "getting-started",
    q: "What is Creditra?",
    a: "Creditra is a Stellar-based credit experience that helps you request, manage, and repay flexible credit lines from one dashboard.",
  },
  {
    id: "connect-wallet",
    sectionId: "wallet",
    q: "How do I connect a wallet?",
    a: "Open the wallet modal, choose a detected wallet, and approve the request in your extension. If a wallet is missing, the Help Center wallet section walks through supported options and troubleshooting.",
    videoId: "dQw4w9WgXcQ",
    transcriptUrl: "https://support.creditra.app/transcripts/connect-wallet",
  },
  {
    id: "repayments",
    sectionId: "credit-lines",
    q: "How do repayments work?",
    a: "Repayments reduce your current debt and are recorded in transaction history with their status, amount, and on-chain hash when available.",
    videoId: "9bZkp7q19f0",
  },
  {
    id: "transaction-filters",
    sectionId: "transactions",
    q: "Can I filter my transaction history by date?",
    a: "Yes. Use the preset chips for Today, 7d, 30d, or 90d, or switch to Custom to choose a specific date range.",
  },
  {
    id: "notifications-settings",
    sectionId: "notifications",
    q: "Where can I manage alerts and notifications?",
    a: "Open the notification center to review unread items, then use preferences to choose which categories should interrupt you.",
  },
  {
    id: "keyboard-shortcuts",
    sectionId: "shortcuts",
    q: "Which keyboard shortcuts are supported?",
    a: "Press ? outside text fields to open the shortcut overlay. Esc closes dialogs, and other shortcuts are grouped by surface inside the overlay.",
    transcriptUrl: "https://support.creditra.app/transcripts/keyboard-shortcuts",
  },
] as const;

export default function HelpCenter() {
  const location = useLocation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return faqs;

    return faqs.filter((item) =>
      [item.q, item.a, item.sectionId].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [searchQuery]);

  useEffect(() => {
    if (!location.hash) return;

    const targetId = location.hash.replace("#", "");
    const target = document.getElementById(targetId);
    if (!target) return;

    window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Help Center</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Browse help topics, wallet walkthroughs, and keyboard tips without
          loading third-party media until you ask for it.
        </p>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white shadow rounded-2xl p-4 mb-10">
          <Search className="text-gray-400" />
          <input
            className="w-full outline-none"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {categories.map((cat) => (
            <div
              key={cat.id}
              id={cat.id}
              className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition scroll-mt-24"
            >
              <h3 className="text-xl font-semibold">{cat.title}</h3>
              <p className="text-gray-500">{cat.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4">FAQ</h2>
          {filteredFaqs.map((item, i) => (
            <div key={item.id} className="border-b py-3 last:border-b-0">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex justify-between w-full text-left min-h-[44px] items-center gap-3"
              >
                <span>
                  <span className="block font-medium text-gray-900">{item.q}</span>
                  <span className="block text-sm text-gray-500 mt-1">
                    {
                      categories.find((category) => category.id === item.sectionId)
                        ?.title
                    }
                  </span>
                </span>
                <ChevronDown
                  className={`transition ${openIndex === i ? "rotate-180" : ""}`}
                />
              </button>
              {openIndex === i && (
                <div className="mt-3">
                  <p className="text-gray-600">{item.a}</p>
                  {item.videoId && (
                    <VideoThumbnail
                      title={item.q}
                      videoId={item.videoId}
                      transcriptUrl={item.transcriptUrl}
                    />
                  )}
                  {!item.videoId && item.transcriptUrl && (
                    <a
                      href={item.transcriptUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[44px] items-center mt-3 text-blue-600 font-semibold"
                    >
                      Read transcript
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
          {filteredFaqs.length === 0 && (
            <p className="text-gray-500 py-4">
              No help articles match that search yet. Try “wallet”, “shortcut”,
              or “transactions”.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
