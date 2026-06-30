"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  ArrowLeft,
  Play,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";

export default function TopicDetails() {
  const { id: topicId } = useParams();
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState("");

  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    fetchQuestions();
  }, [topicId, token]);

  const fetchQuestions = async () => {
    if (!token) return;
    try {
      const res = await fetch(
        `http://localhost:5100/api/PromptIntelligence/topics/${topicId}/questions`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.ok) {
        const data = await res.json();
        setQuestions(data);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const createQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestionText) return;
    try {
      const res = await fetch(
        "http://localhost:5100/api/PromptIntelligence/questions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            promptTopicId: topicId,
            promptText: newQuestionText,
          }),
        },
      );
      if (res.ok) {
        setIsModalOpen(false);
        setNewQuestionText("");
        fetchQuestions();
      }
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto text-white">
      <Link
        href="/dashboard/prompt-intelligence"
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors w-fit"
      >
        <ArrowLeft size={16} />
        Back to Topics
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Topic Prompts</h1>
          <p className="text-gray-400">
            Manage and analyze specific prompts within this topic.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-colors"
        >
          <Plus size={18} />
          Add Prompt
        </button>
      </div>

      <div className="bg-[#111318] border border-gray-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : questions.length === 0 ? (
          <div className="p-16 text-center">
            <h3 className="text-xl font-semibold mb-2">No Prompts Found</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Add a prompt that your users might ask an AI (e.g. "What is the
              best CRM in 2026?").
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Add Prompt
            </button>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-800 bg-[#0a0a0c]">
                <th className="px-6 py-4 font-medium text-gray-400">Prompt</th>
                <th className="px-6 py-4 font-medium text-gray-400 text-center">
                  Last Run
                </th>
                <th className="px-6 py-4 font-medium text-gray-400 text-center">
                  Visibility
                </th>
                <th className="px-6 py-4 font-medium text-gray-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {questions.map((q) => {
                const isCompleted = q.latestAnalysis?.status === "Completed";
                const visibility = q.visibility?.overallVisibilityScore ?? "-";

                return (
                  <tr
                    key={q.question.id}
                    className="hover:bg-[#1a1c23] transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <p
                        className="font-medium text-white group-hover:text-blue-400 transition-colors cursor-pointer"
                        onClick={() =>
                          router.push(
                            `/dashboard/prompt-intelligence/${topicId}/analyze/${q.question.id}`,
                          )
                        }
                      >
                        "{q.question.promptText}"
                      </p>
                    </td>
                    <td className="px-6 py-5 text-center">
                      {q.latestAnalysis ? (
                        <div className="flex items-center justify-center gap-2">
                          {isCompleted ? (
                            <CheckCircle
                              size={14}
                              className="text-emerald-500"
                            />
                          ) : (
                            <Clock size={14} className="text-amber-500" />
                          )}
                          <span className="text-sm text-gray-300">
                            {new Date(
                              q.latestAnalysis.runAt,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Never</span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-center">
                      {isCompleted ? (
                        <span
                          className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-sm font-medium ${
                            visibility > 70
                              ? "bg-emerald-500/10 text-emerald-400"
                              : visibility > 30
                                ? "bg-amber-500/10 text-amber-400"
                                : "bg-rose-500/10 text-rose-400"
                          }`}
                        >
                          {visibility}%
                        </span>
                      ) : (
                        <span className="text-gray-600">-</span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Link
                        href={`/dashboard/prompt-intelligence/${topicId}/analyze/${q.question.id}`}
                        className="inline-flex items-center gap-2 bg-white/5 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                      >
                        <Play size={14} />
                        Analyze
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111318] border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
          >
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Add New Prompt</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                &times;
              </button>
            </div>
            <form onSubmit={createQuestion} className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Prompt Text
                </label>
                <textarea
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder="e.g. Which software is best for B2B sales?"
                  rows={3}
                  className="w-full bg-[#0a0a0c] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  required
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
                >
                  Add Prompt
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
