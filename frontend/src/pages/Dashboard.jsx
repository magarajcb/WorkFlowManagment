import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load projects");
    }
  };

  const createProject = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/projects",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Project Created");

      setTitle("");
      setDescription("");

      fetchProjects();
    } catch (error) {
      console.log(error);
      toast.error("Failed to create project");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">
        Workflow Dashboard
      </h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Create Project
        </h2>

        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <button
          onClick={createProject}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Project
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">
          My Projects
        </h2>

        {projects.length === 0 ? (
          <p>No Projects Found</p>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className="bg-white p-4 rounded shadow mb-4"
            >
              <h3 className="text-xl font-bold">
                {project.title}
              </h3>

              <p className="text-gray-600">
                {project.description}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;