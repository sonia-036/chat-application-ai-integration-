import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/user.context'
import axios from "../config/axios"
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const { user, setUser } = useContext(UserContext)
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ projectName, setProjectName ] = useState(null)
    const [ project, setProject ] = useState([])

    const [loadingProjects, setLoadingProjects] = useState(false);
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate()


    useEffect(() => {
            const token = localStorage.getItem('token')
            if (token && !user) {
                const storedUser = localStorage.getItem('user')
                if (storedUser) {
                    setUser(JSON.parse(storedUser))
                }
            }
        }, [])

    async function createProject(e) {
        e.preventDefault();
        setLoadingCreate(true);
        setError(null);
        try {
            const res = await axios.post('/projects/create', {
                name: projectName,
            });
            setIsModalOpen(false);
            setProjectName('');
            // Refresh project list after creation
            const projectsRes = await axios.get('/projects/all');
            setProject(projectsRes.data.projects);
        } catch (error) {
            setError('Failed to create project. Please try again.');
            console.error(error);
        } finally {
            setLoadingCreate(false);
        }
    }

    useEffect(() => {
        const fetchProjects = async () => {
            setLoadingProjects(true);
            setError(null);
            try {
                const res = await axios.get('/projects/all');
                setProject(res.data.projects);
            } catch (err) {
                setError('Failed to load projects. Please try again.');
                console.error(err);
            } finally {
                setLoadingProjects(false);
            }
        };
        fetchProjects();
    }, []);

    return (
        <main className='p-4'>
            {error && (
                <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">
                    {error}
                </div>
            )}
            <div className="projects flex flex-wrap gap-3">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="project p-4 border border-slate-300 rounded-md"
                    aria-label="Create new project"
                >
                    New Project
                    <i className="ri-link ml-2"></i>
                </button>

                {loadingProjects ? (
                    <div>Loading projects...</div>
                ) : project.length === 0 ? (
                    <div>No projects found.</div>
                ) : (
                    project.map((project) => (
                        <div
                            key={project._id}
                            onClick={() => {
                                navigate(`/project`, {
                                    state: { project },
                                });
                            }}
                            tabIndex={0}
                            role="button"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    navigate(`/project`, { state: { project } });
                                }
                            }}
                            className="project flex flex-col gap-2 cursor-pointer p-4 border border-slate-300 rounded-md min-w-52 hover:bg-slate-200 focus:outline focus:outline-2 focus:outline-blue-500"
                            aria-label={`Open project ${project.name}`}
                        >
                            <h2 className="font-semibold">{project.name}</h2>

                            <div className="flex gap-2">
                                <p>
                                    {' '}
                                    <small>
                                        {' '}
                                        <i className="ri-user-line"></i> Collaborators
                                    </small>{' '}
                                    :
                                </p>
                                {project.users.length}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                            setIsModalOpen(false);
                        }
                    }}
                >
                    <div className="bg-white p-6 rounded-md shadow-md w-1/3">
                        <h2 id="modal-title" className="text-xl mb-4">
                            Create New Project
                        </h2>
                        <form onSubmit={createProject}>
                            <div className="mb-4">
                                <label
                                    htmlFor="projectName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Project Name
                                </label>
                                <input
                                    id="projectName"
                                    onChange={(e) => setProjectName(e.target.value)}
                                    value={projectName}
                                    type="text"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    required
                                    autoFocus
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                    disabled={loadingCreate}
                                >
                                    {loadingCreate ? 'Creating...' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Home