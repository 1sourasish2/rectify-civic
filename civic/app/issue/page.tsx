"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt, FaClock, FaCommentAlt, FaUser, FaArrowLeft, FaCheckCircle } from "react-icons/fa";

const LOCAL_STORAGE_KEY = "civicReports";

interface StatusTimelineItem {
  id: string;
  status: string;
  color: string;
  time: string;
}

interface User {
  name: string;
  avatar?: string;
}

interface Issue {
  id: string;
  image: string;
  user: User;
  description: string;
  location: string;
  tags: string[];
  statusTimeline: StatusTimelineItem[];
  createdAt: number;
  feedbacks: string[];
}

export default function IssuePage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const feedbackInputRef = useRef<HTMLTextAreaElement>(null);
  const [step, setStep] = useState(1); // Step 1: Details, Step 2: Feedback

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const reports: any[] = JSON.parse(stored);
      if (reports.length > 0) {
        const adapted = reports.map((r) => ({
          id: r.id ?? Date.now().toString(),
          image: r.mediaURLs?.[0] ?? "/placeholder-issue.jpg",
          user: { name: r.userName ?? "Anonymous" },
          description: r.description ?? "",
          location: r.location?.pincode ?? "Location not specified",
          tags: [r.department ?? "General"],
          statusTimeline: [
            {
              id: "1",
              status: "Pending",
              color: "#dc2626",
              time: new Date(r.timestamp).toLocaleString(),
            },
          ],
          createdAt: r.timestamp ?? Date.now(),
          feedbacks: r.comments ? [r.comments] : [],
        }));
        setIssues(adapted);
        setSelectedIssueId(adapted[0].id);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(issues));
  }, [issues]);

  const selectedIssue = issues.find((i) => i.id === selectedIssueId);

  const handleFeedbackSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!feedback.trim() || !selectedIssue) return;
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === selectedIssue.id
          ? { ...issue, feedbacks: [...issue.feedbacks, feedback.trim()] }
          : issue
      )
    );
    setFeedback("");
    setTimeout(() => feedbackInputRef.current?.focus(), 100);
  };

  if (!selectedIssue) return <p>No report found.</p>;

  return (
    <section className="container max-w-4xl mx-auto min-h-screen p-4 flex flex-col gap-6 bg-white rounded-2xl shadow-lg">
      <AnimatePresence mode="wait" initial={false}>
        {step === 1 && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-2xl font-semibold">Issue Details</h2>
            <img
              src={selectedIssue.image}
              alt="Issue"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
            <div>
              <p className="font-bold">{selectedIssue.user.name}</p>
              <p className="text-gray-600">{new Date(selectedIssue.createdAt).toLocaleString()}</p>
              <p className="mt-2">{selectedIssue.description}</p>
              <div className="flex items-center gap-2 mt-2 text-green-700">
                <FaMapMarkerAlt /> {selectedIssue.location}
              </div>
              <div className="flex gap-2 mt-2">
                {selectedIssue.tags.map((t) => (
                  <span key={t} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
            <div className="border-l-4 border-green-600 pl-4 mt-4">
              <h3 className="font-semibold flex items-center gap-2">
                <FaClock /> Status Timeline
              </h3>
              <ul className="mt-2 space-y-2">
                {selectedIssue.statusTimeline.map((s) => (
                  <li key={s.id} className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 flex items-center justify-center rounded-full ring-4 ring-green-200 text-white"
                      style={{ backgroundColor: s.color }}
                    ></div>
                    <div>
                      <span className="bg-gray-800 text-white px-3 py-1 rounded">{s.status}</span>
                      <p className="text-gray-500 text-sm">{s.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setStep(2)}
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg shadow mt-4"
            >
              Add/View Feedback
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-4"
          >
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <FaCommentAlt /> Feedback
            </h2>
            <div className="max-h-48 overflow-y-auto bg-green-50 p-4 rounded-lg border border-green-200">
              {selectedIssue.feedbacks.length === 0 ? (
                <p className="italic text-gray-500">No feedback yet.</p>
              ) : (
                selectedIssue.feedbacks.map((fb, idx) => (
                  <blockquote key={idx} className="bg-green-100 p-3 rounded mb-2 shadow-sm">
                    {fb}
                  </blockquote>
                ))
              )}
            </div>
            <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-3">
              <textarea
                ref={feedbackInputRef}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="border p-3 rounded resize-none text-black"
                placeholder="Add your feedback..."
                rows={4}
              />
              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  type="button"
                  className="flex items-center gap-2 text-gray-600 hover:text-black"
                >
                  <FaArrowLeft /> Back
                </button>
                <button
                  type="submit"
                  disabled={!feedback.trim()}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded disabled:bg-gray-400"
                >
                  Submit
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
