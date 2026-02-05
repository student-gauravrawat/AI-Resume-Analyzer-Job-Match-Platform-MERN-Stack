import React, { useEffect, useState } from "react";
import { getAllResume, deleteResume } from "../../apis/resume";
import { matchResumeWithJob } from "../../apis/jobMatch";
import useResumeActions from "../../hook/useResumeActions";
import { useNavigate } from "react-router-dom";

function JobMatch() {
  const [selectedResume, setSelectedResume] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobMatching, setJobMatching] = useState(false);
  const [matchMessage, setMatchMessage] = useState(null);
  const { handleView } = useResumeActions();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const data = await getAllResume();
        // console.log(data);
        setResumes(data || []);

      } catch (error) {
        console.log("Failed to fetch resumes");
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const handleJobMatch = async (e) => {
    e.preventDefault();
    const form = e.target; // To access Form element
    const jobDescription = e.target.elements.jd.value;

    const data = {
      resumeId: selectedResume._id,
      jobDescription: jobDescription,
    };

    if (!selectedResume) {
      alert("Please select a resume first!");
      return;
    }
    setJobMatching(true);
    
    try {
      const response = await matchResumeWithJob(data);
      console.log("Match Result:", response);

      if (response) {
        setMatchMessage("Match completed successfully!");
        
        // Navigate to result page
        navigate(`/analyzeresult/${response._id}`); 
        
      }

    } catch (error) {
      console.log("Matching failed", error);
      
    } finally {
      setJobMatching(false);

    }
  };

  const handleResumedelete = async (id) => {
    if (!confirm("Are you sure you want to delete this resume? If you delete it, your Job match history will also be deleted")) return;

    const res = await deleteResume(id);
    if(res.success) {
      setResumes((prev) => prev.filter((resume) => resume._id !== id));
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-semibold mb-1">
        Job Description Matching
      </h2>
      <p className="text-sm text-gray-500 mb-5">
        Compare your resume with job role
      </p>


      {/* Job Match Form */}
      <form onSubmit={handleJobMatch}>
        <div className="block mt-3 mb-6">
          <label className="text-md text-gray-700 font-semibold ">
            Select resume
          </label>
          <div>
            <input
              type="text"
              value={selectedResume ? selectedResume.fileName : ""}
              placeholder="Select Resume"
              readOnly
              className="w-auto h-8 px-auto bg-white text-black font-normal p-2 rounded-lg block mt-3 ml-4 border-0 outline-none focus:ring-0 truncate"
            />
          </div>
        </div>
        <div className="mt-2 ">
          <label className="text-md text-gray-700 font-semibold mt-3">
            Job Description
          </label>
          <textarea
            name="jd"
            required
            rows="3"
            placeholder="Enter Job Description Here..."
            className="block mt-2 bg-white ml-4 p-3 w-[50%] focus:outline-none focus:ring-1 rounded-lg  focus:ring-blue-500 "
          />
        </div>
        <button
          disabled={jobMatching}
          className={`bg-blue-700 text-white font-semibold p-2 rounded-lg mt-5 ml-4 flex items-center gap-2 ${jobMatching ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-600 cursor-pointer"}`}
        >
          {jobMatching && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}

          {jobMatching ? "Matching Resume" : "Match Resume"}
        </button>
      </form>

      {matchMessage && (
        <div className="mt-4 ml-4 text-green-700 font-semibold">
          {matchMessage}
        </div>
      )}

      {/* Resume List Here */}
      <h2 className=" mt-4 text-gray-900 text-xl font-semibold ">
        Select Your Resume Here
      </h2>

      <div className="bg-white rounded border mt-3.5 overflow-x-auto">
        <table className="w-full text-sm min-w-150">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Filename</th>
              <th className="p-2">Uploaded</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  Loading resumes...
                </td>
              </tr>
            ) : resumes.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  No resumes uploaded yet
                </td>
              </tr>
            ) : (
              resumes.map((resume) => (
                <tr className="border-t" key={resume._id}>
                  <td className="p-2">{resume.fileName}</td>
                  <td className="p-2 text-center">
                    {new Date(resume.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2 text-center text-green-700">
                    {resume.status}
                  </td>
                  <td className="p-2 text-center space-x-4">
                    <button
                      onClick={() => handleView(resume.fileUrl.url)}
                      className="text-blue-600 cursor-pointer  hover:text-blue-800 hover:underline"
                    >
                      View
                    </button>

                    <button
                      onClick={() => setSelectedResume(resume)}
                      className="text-green-600 cursor-pointer hover:text-green-800 hover:underline"
                    >
                      Job Match
                    </button>

                    <button
                      onClick={() => handleResumedelete(resume._id)}
                      className="text-red-600 cursor-pointer hover:text-red-800 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default JobMatch;
