import { Head, Link, useForm } from "@inertiajs/react"

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import InputLabel from "@/Components/InputLabel"
import TextInput from "@/Components/TextInput"
import InputError from "@/Components/InputError"
import TextAreaInput from "@/Components/TextAreaInput"
import SelectInput from "@/Components/SelectInput"

const Edit = ({ task, projects, users, success }) => {

    const { data, setData, post, errors, reset } = useForm({
        image: "",
        name: task.name || "",
        status: task.status || "",
        priority: task.priority || "",
        description: task.description || "",
        due_date: task.due_date || "",
        project_id: task.project_id || "",
        assigned_user_id: task.assigned_user_id || "",
        _method: "PUT"
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("task.update", task.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit task {task.name}
                </h2>
            }
        >

            <Head title={"Tasks " + task.name} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                        {success}
                    </div>}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            {task.image_path &&
                                <div className="mb-4">
                                    <img src={task.image_path} className="w-64" />
                                </div>}

                            <div>
                                <InputLabel htmlFor="task_project_id" value="Projects" />

                                <SelectInput
                                    name="project_id"
                                    id="task_project_id"
                                    value={data.project_id}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("project_id", e.target.value)}
                                >
                                    <option value="">Select Project</option>
                                    {projects.data.map((project) => (
                                        <option key={project.id} value={project.id}>{project.name}</option>
                                    ))}
                                </SelectInput>

                                <InputError message={errors.priority} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="task_image_path" value="Task Image" />
                                <TextInput
                                    id="task_image_path"
                                    type="file"
                                    name="image"
                                    className="mt-1 block w-full"
                                    onChange={e => setData('image', e.target.files[0])}
                                />
                                <InputError message={errors.image} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="task_name" value="Task Name" />

                                <TextInput
                                    id="task_name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData("name", e.target.value)}
                                />

                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_description"
                                    value="Task Description"
                                />

                                <TextAreaInput
                                    id="task_description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("description", e.target.value)}
                                />

                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_due_date"
                                    value="Task Deadline"
                                />

                                <TextInput
                                    id="task_due_date"
                                    type="date"
                                    name="due_date"
                                    value={data.due_date}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("due_date", e.target.value)}
                                />

                                <InputError message={errors.due_date} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="task_status" value="Task Status" />

                                <SelectInput
                                    name="status"
                                    id="task_status"
                                    value={data.status}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("status", e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </SelectInput>

                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="task_priority" value="Task Priority" />

                                <SelectInput
                                    name="priority"
                                    id="task_priority"
                                    value={data.priority}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("priority", e.target.value)}
                                >
                                    <option value="">Select Priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </SelectInput>

                                <InputError message={errors.priority} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="task_assigned_user" value="Assigned User" />

                                <SelectInput
                                    name="task_assigned_user"
                                    id="task_assigned_user"
                                    value={data.assigned_user_id}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("assigned_user_id", e.target.value)}
                                >
                                    <option value="">Select User</option>
                                    {users.data.map((user) => (
                                        <option key={user.id} value={user.id}>{user.name} - {user.email}</option>
                                    ))}
                                </SelectInput>

                                <InputError message={errors.priority} className="mt-2" />
                            </div>

                            <div className="mt-4 text-right">
                                <Link
                                    href={route("task.index")}
                                    className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                                >
                                    Cancel
                                </Link>
                                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}

export default Edit