import React, { useEffect, useState } from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Lightbulb } from "lucide-react";
import { useParams } from "react-router-dom";
import { getSingleJobMatch } from "../../apis/jobMatch";

function AnalyzeResult() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSingleJobMatch(id);
        // console.log(res);
        setData(res);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const chartData = data
    ? [
        { name: "Match", value: data.score },
        { name: "Remaining", value: 100 - data.score },
      ]
    : [];

  return (
    <>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center space-y-4">
            {/* Spinner */}
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>

            {/* Text */}
            <h2 className="text-lg font-semibold text-gray-700">
              Analyzing Resume...
            </h2>

            <p className="text-sm text-gray-500">
              AI is calculating your job match
            </p>
          </div>
        </div>
      ) : data === null ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center border border-gray-100">
            {/* Error Icon */}
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>

            {/* Heading & Text */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              We couldn't retrieve your job match report. This might be due to a
              connection issue or an invalid ID.
            </p>

            {/* Action Button */}
            <button
              onClick={() => window.history.back()}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-indigo-200"
            >
              Go Back & Try Again
            </button>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Job Compatibility Report
              </h1>

              <p className="mt-3 text-gray-600">
                <span className="font-bold">Resume:</span>{" "}
                {data.resume.fileName}
              </p>

              <p className="text-gray-600 mt-1">
                <span className="font-bold">Job Role:</span>{" "}
                {data.jobRole}
              </p>

              <p className="text-gray-600 mt-1">
                <span className="font-bold">Job Description:</span>{" "}
                {data.jobDescription}
              </p>
            </div>

            {/* Score + Skills */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Score Card */}
              <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center">
                <h2 className="font-semibold text-lg mb-4">Match Score</h2>

                <RadialBarChart
                  width={220}
                  height={220}
                  innerRadius="80%"
                  outerRadius="100%"
                  data={chartData}
                  startAngle={180}
                  endAngle={0}
                >
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient
                      id="scoreGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>

                  <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    angleAxisId={0}
                    tick={false}
                  />

                  <RadialBar
                    background={{ fill: "#e0e7ff" }}
                    dataKey="value"
                    cornerRadius={10}
                    fill="url(#scoreGradient)"
                  />
                </RadialBarChart>

                <div className="-mt-24 text-2xl ">
                  <span className=" font-black text-slate-800">
                    {data.score}%
                  </span>
                  <span className="text-gray-400  font-medium"> / 100</span>
                  <p className="text-sm text-gray-500 text-center mt-2 font-medium">
                    Matching Probability
                  </p>
                </div>
              </div>

              {/* Matched Skills */}
              <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="font-semibold text-lg mb-4 text-green-600">
                  Matched Skills
                </h2>

                <ul className="space-y-2">
                  {!data?.matchedSkills || data.matchedSkills.length === 0 ? (
                    <p className="text-gray-500">No matched skills</p>
                  ) : (
                    data.matchedSkills.map((skill, i) => (
                      <li
                        key={i}
                        className="bg-green-50 text-green-700 px-3 py-2 rounded-lg"
                      >
                        ✔ {skill}
                      </li>
                    ))
                  )}
                </ul>
              </div>

              {/* Missing Skills */}
              <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="font-semibold text-lg mb-4 text-red-600">
                  Missing Skills
                </h2>

                <ul className="space-y-2">
                  {!data?.missingSkills || data.missingSkills.length === 0 ? (
                    <p className="text-gray-500">No missing skills</p>
                  ) : (
                    data.missingSkills.map((skill, i) => (
                      <li
                        key={i}
                        className="bg-green-50 text-green-700 px-3 py-2 rounded-lg"
                      >
                        ✔ {skill}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                  <Lightbulb size={24} />
                </div>
                <h2 className="text-xl font-bold text-slate-800">
                  AI Expert Analysis
                </h2>
              </div>

              <div className="prose max-w-none prose-indigo bg-indigo-50 p-6 rounded-xl leading-relaxed">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {data.suggestions.join("\n\n")}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AnalyzeResult;
