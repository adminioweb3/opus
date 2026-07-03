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
  const [questions, setQuestions] = useState<any[]>([]);
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
        `http://localhost:8088/api/PromptIntelligence/topics/${topicId}/questions`,
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

  const createQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText) return;
    try {
      const res = await fetch(
        "http://localhost:8088/api/PromptIntelligence/questions",
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
    <div className="space-y-6 text-foreground">
      <Link
        href="/dashboard/prompt-intelligence"
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Back to Topics
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">
            Topic Prompts
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage and analyze specific prompts within this topic.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors shadow-sm"
        >
          <Plus size={16} />
          Add Prompt
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 flex justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : questions.length === 0 ? (
          <div className="p-16 text-center">
            <h3 className="text-lg font-semibold mb-2">No Prompts Found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
              Add a prompt that your users might ask an AI (e.g. "What is the
              best CRM in 2026?").
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Add Prompt
            </button>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 font-medium text-muted-foreground">
                  Prompt
                </th>
                <th className="px-4 py-3 font-medium text-muted-foreground text-center">
                  Last Run
                </th>
                <th className="px-4 py-3 font-medium text-muted-foreground text-center">
                  Visibility
                </th>
                <th className="px-4 py-3 font-medium text-muted-foreground text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {questions.map((q) => {
                const isCompleted = q.latestAnalysis?.status === "Completed";
                const visibility = q.visibility?.overallVisibilityScore ?? "-";

                return (
                  <tr
                    key={q.question.id}
                    className="hover:bg-muted/50 transition-colors group"
                  >
                    <td className="px-4 py-3">
                      <p
                        className="font-medium text-foreground group-hover:text-primary transition-colors cursor-pointer"
                        onClick={() =>
                          router.push(
                            `/dashboard/prompt-intelligence/${topicId}/analyze/${q.question.id}`,
                          )
                        }
                      >
                        "{q.question.promptText}"
                      </p>
                    </td>
                    <td className="px-4 py-3 text-center">
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
                          <span className="text-sm text-muted-foreground">
                            {new Date(
                              q.latestAnalysis.runAt,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Never
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
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
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/dashboard/prompt-intelligence/${topicId}/analyze/${q.question.id}`}
                        className="inline-flex items-center gap-1.5 bg-muted hover:bg-primary hover:text-primary-foreground text-foreground px-3 py-1.5 rounded-md text-xs font-medium transition-all shadow-sm border border-border"
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
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-xl w-full max-w-md overflow-hidden shadow-lg"
          >
            <div className="p-5 border-b border-border flex justify-between items-center">
              <h2 className="text-lg font-semibold text-foreground">
                Add New Prompt
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                &times;
              </button>
            </div>
            <form onSubmit={createQuestion} className="p-5">
              <div className="mb-5">
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Prompt Text
                </label>
                <textarea
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder="e.g. Which software is best for B2B sales?"
                  rows={3}
                  className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none shadow-sm"
                  required
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-md font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md font-medium transition-colors text-sm shadow-sm"
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
