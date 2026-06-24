import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState({});
  const [taskData, setTaskData] = useState({});

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(data);

      data.forEach((project) => {
        fetchTasks(project._id);
      });
    } catch (error) {
      toast.error("Failed to load projects");
    }
  };

  const fetchTasks = async (projectId) => {
    try {
      const { data } = await API.get(
        `/tasks/project/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks((prev) => ({
        ...prev,
        [projectId]: data,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const createProject = async () => {
    try {
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
      toast.error("Failed to create project");
    }
  };

  const handleTaskChange = (projectId, field, value) => {
    setTaskData((prev) => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        [field]: value,
      },
    }));
  };

  const createTask = async (projectId) => {
    try {
      await API.post(
        "/tasks",
        {
          title: taskData[projectId]?.title,
          description: taskData[projectId]?.description,
          projectId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Task Created");

      setTaskData((prev) => ({
        ...prev,
        [projectId]: {
          title: "",
          description: "",
        },
      }));

      fetchTasks(projectId);
    } catch (error) {
      toast.error("Failed to create task");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">
        Workflow Dashboard
      </h1>

      {/* Create Project */}
      <div className="bg-white p-5 rounded shadow mb-6">
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

      <h2 className="text-3xl font-bold mb-4">
        My Projects
      </h2>

      {projects.map((project) => (
        <div
          key={project._id}
          className="bg-white p-4 rounded shadow mb-4"
        >
          <h3 className="text-2xl font-bold">
            {project.title}
          </h3>

          <p className="text-gray-600 mb-4">
            {project.description}
          </p>

          {/* Create Task */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Task Title"
              value={taskData[project._id]?.title || ""}
              onChange={(e) =>
                handleTaskChange(
                  project._id,
                  "title",
                  e.target.value
                )
              }
              className="border p-2 w-full mb-2"
            />

            <input
              type="text"
              placeholder="Task Description"
              value={taskData[project._id]?.description || ""}
              onChange={(e) =>
                handleTaskChange(
                  project._id,
                  "description",
                  e.target.value
                )
              }
              className="border p-2 w-full mb-2"
            />

            <button
              onClick={() => createTask(project._id)}
              className="bg-green-500 text-white px-3 py-2 rounded"
            >
              Add Task
            </button>
          </div>

          <h4 className="font-semibold text-lg mb-2">
            Tasks
          </h4>

          {tasks[project._id]?.length > 0 ? (
            tasks[project._id].map((task) => (
              <div
                key={task._id}
                className="border rounded p-2 mb-2"
              >
                <p className="font-medium">
                  {task.title}
                </p>

                <p className="text-sm text-gray-600">
                  {task.description}
                </p>

                <p className="text-blue-600">
                  Status: {task.status}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No tasks yet
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;