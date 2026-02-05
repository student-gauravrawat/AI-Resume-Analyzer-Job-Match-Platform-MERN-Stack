import React, { useEffect, useState } from "react";
import {getJobMatchHistory} from "../../apis/jobMatch"
import { useNavigate } from "react-router-dom";

function History() {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
      const fetchResumes = async () => {
        setLoading(true)
           try {
             const data = await getJobMatchHistory();
            //  console.log(data);
             setHistory(data || []);
           } catch (error) {
             console.log("Failed to fetch resumes");
           } finally {
             setLoading(false);
           }
         };
     
         fetchResumes();
         console.log(history)
  },[])

  const handleView = (id)=>{
    navigate(`/analyzeresult/${id}`);
  }

  return (
    <div className="p-10">
      <h2 className="text-2xl font-semibold mb-1">Your job match history</h2>

      <div className="bg-white rounded border mt-3.5 overflow-x-auto">
        <table className="w-full text-sm min-w-150">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Filename</th>
              <th className="p-2 ">Job Role</th>
              <th className="p-2">Score</th>
              <th className="p-2">Uploaded</th>
              <th className="p-2">Job Match</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  Loading history...
                </td>
              </tr>
            ) : history.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  No history available yet
                </td>
              </tr>
            ) : (
              history.map((data) => (
                <tr className="border-t" key={data._id}>
                  <td className="p-2">{data.resume?.fileName}</td>
                  <td className="p-2 text-center">{data.jobRole}</td>
                  <td className="p-2 text-center text-green-700">
                    {data.score + "%" }
                  </td>
                  <td className="p-2 text-center">
                    {new Date(data.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-2 text-center space-x-4">
                    <button
                      onClick={()=> handleView(data._id)}
                      className="text-blue-600 cursor-pointer  hover:text-blue-800 hover:underline"
                    >
                      View
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

export default History;
