import React, { useEffect, useState } from "react";
import { uploadResume, getAllResume, deleteResume } from "../../apis/resume";
import useResumeActions from "../../hook/useResumeActions";

function MyResume() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { handleView, handleDownload } = useResumeActions();

  const handleUploadResume = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("resume", file);
    // console.log(formData.get("resume"))

    try {
      const response = await uploadResume(formData);

      if (response) {
        const updatedResumes = await getAllResume();
        setResumes(updatedResumes || []);
      }
    } catch (error) {
      console.error("Upload Error", error);
    } finally {
      e.target.value = null;
      setUploading(false);
    }
  };

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

  const handleResumedelete = async (id) => {
    if (!confirm("Are you sure you want to delete this resume? If you delete it, your Job match history will also be deleted")) return;

    const response = await deleteResume(id);
    if(response.success) {
      setResumes((prev) => prev.filter((resume) => resume._id !== id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-1">
        Welcome to AI Resume Analyzer, Gaurav Rawat!
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        Manage and analyze your resumes.
      </p>

      <label className="bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer mb-4 inline-block">
        + Upload Resume
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleUploadResume}
          className="hidden"
        />
      </label>
      {uploading && (
        <div className="flex items-center gap-4 bg-indigo-50 border border-indigo-100 p-4 rounded-xl mb-6 animate-pulse">
          {/* Animated Spinner */}
          <div className="w-6 h-6 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>

          <div>
            <p className="text-indigo-900 font-bold">
              Uploading your resume...
            </p>
            <p className="text-indigo-600 text-xs">
              Almost there! Securely saving your resume...
            </p>
          </div>
        </div>
      )}

      <h2 className="text-gray-800 text-xl font-semibold ">Your All Resumes</h2>

      {/* Table */}
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
                      onClick={() => handleDownload(resume.fileUrl.url)}
                      className="text-green-600 cursor-pointer hover:text-green-800 hover:underline"
                    >
                      Download
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

export default MyResume;
