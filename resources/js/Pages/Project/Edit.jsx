import { Head, Link, useForm } from "@inertiajs/react"

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import InputLabel from "@/Components/InputLabel"
import TextInput from "@/Components/TextInput"
import InputError from "@/Components/InputError"
import TextAreaInput from "@/Components/TextAreaInput"
import SelectInput from "@/Components/SelectInput"

const Edit = ({ project, success }) => {

    /**
     * In Laravel, uploading file using a multipart/form-data request
     * is not natively supported when using PUT, PATCH or DELETE method
     * 
     * So instead, Laravel supporting spoofing method, so that we using POST method
     * to uploading file, but handle the request as a PUT or PATCH method
     * by using _method inside the useForm
     * 
     * Reference: https://inertiajs.com/file-uploads
     */
    const { data, setData, post, errors, reset } = useForm({
        image: "",
        name: project.name || "",
        status: project.status || "",
        description: project.description || "",
        due_date: project.due_date || "",
        _method: "PUT"
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("project.update", project.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit project {project.name}
                </h2>
            }
        >

            <Head title={"Projects " + project.name} />

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
                            {project.image_path &&
                                <div className="mb-4">
                                    <img src={project.image_path} className="w-64" />
                                </div>}
                            <div>
                                <InputLabel htmlFor="image_path" value="Project Image Path" />
                                <TextInput
                                    id="image_path"
                                    type="file"
                                    name="image"
                                    className="mt-1 block w-full"
                                    onChange={e => setData('image', e.target.files[0])}
                                />
                                <InputError message={errors.image} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="name" value="Project Name" />

                                <TextInput
                                    id="name"
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
                                    htmlFor="description"
                                    value="Project Description"
                                />

                                <TextAreaInput
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("description", e.target.value)}
                                />

                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="due_date"
                                    value="Project Deadline"
                                />

                                <TextInput
                                    id="due_date"
                                    type="date"
                                    name="due_date"
                                    value={data.due_date}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("due_date", e.target.value)}
                                />

                                <InputError message={errors.due_date} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="status" value="Project Status" />

                                <SelectInput
                                    name="status"
                                    id="status"
                                    className="mt-1 block w-full"
                                    value={data.status}
                                    onChange={(e) => setData("status", e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </SelectInput>

                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            <div className="mt-4 text-right">
                                <Link
                                    href={route("project.index")}
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