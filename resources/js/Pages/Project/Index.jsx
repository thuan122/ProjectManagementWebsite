import { Link, usePage, Head, router } from "@inertiajs/react"

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import Pagination from "@/Components/Pagination";
import {
    PROJECT_STATUS_CLASS_MAP,
    PROJECT_STATUS_TEXT_MAP
} from "@/constants";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";

export default function Index({ projects, queryParams = null }) {
    // Inertia.js already stored the authenticated user inside the system through it's middleware
    // Go to Http/Controller/Middleware/HandleInertiaRequest.php
    const user = usePage().props.auth.user;
    queryParams = queryParams || {}

    const searchFieldChange = (name, value) => {
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        router.get(route("project.index"), queryParams)
    }

    const onKeyPress = (name, e) => {
        if (e.key === 'Enter') {
            searchFieldChange(name, e.target.value)
        }
    }

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === 'asc') {
                queryParams.sort_direction = 'desc'
            } else {
                queryParams.sort_direction = 'asc'
            }
        } else {
            queryParams.sort_field = name
            queryParams.sort_direction = 'asc'
        }

        console.log(queryParams)
        router.get(route("project.index"), queryParams)
    }

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                Projects
            </h2>}
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeading
                                                name="id"
                                                className="px-3 py-3 flex items-center justify-between gap-1"
                                                sortable={true}
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Id
                                            </TableHeading>
                                            <TableHeading
                                                name="name"
                                                className="px-3 py-3 flex items-center justify-between gap-1"
                                                sortable={true}
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Name
                                            </TableHeading>
                                            <TableHeading
                                                name="status"
                                                className="px-3 py-3 flex items-center justify-between gap-1"
                                                sortable={true}
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Status
                                            </TableHeading>
                                            <TableHeading
                                                name="created_at"
                                                className="px-3 py-3 flex items-center justify-between gap-1"
                                                sortable={true}
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Created Date
                                            </TableHeading>
                                            <TableHeading
                                                name="due_date"
                                                className="px-3 py-3 flex items-center justify-between gap-1"
                                                sortable={true}
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Due Date
                                            </TableHeading>
                                            <TableHeading
                                                className="px-3 py-3"
                                                sortable={false}
                                            >
                                                Created By
                                            </TableHeading>
                                            <TableHeading
                                                className="px-3 py-3"
                                                sortable={false}
                                            >
                                                Actions
                                            </TableHeading>
                                            <TableHeading
                                                className="px-3 py-3"
                                                sortable={false}
                                            />

                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    // This is for when reload the page, the search query will keep remain
                                                    defaultValue={queryParams.name}
                                                    placeholder="Enter project's name"
                                                    // Only search when lost focus on the input
                                                    onBlur={e => searchFieldChange('name', e.target.value)}
                                                    // When typing, it only search when hit Enter
                                                    onKeyPress={e => onKeyPress('name', e)}
                                                />
                                            </th>
                                            <th className="px-3 py-3">
                                                <SelectInput
                                                    defaultValue={queryParams.status}
                                                    className="w-full"
                                                    onChange={e => searchFieldChange('status', e.target.value)}
                                                >
                                                    <option value="">Select Status</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="in_progress">In Progress</option>
                                                    <option value="completed">Completed</option>
                                                </SelectInput>
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.data.map((project) => (
                                            <tr key={project.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-3 py-3">{project.id}</td>
                                                <td className="px-3 py-3 text-nowrap hover:underline hover:text-white">
                                                    <Link href={route("project.show", project.id)}>
                                                        {project.name}
                                                    </Link>
                                                </td>
                                                <td className="px-3 py-3">
                                                    <span
                                                        className={"px-2 py-1 rounded text-white "
                                                            + PROJECT_STATUS_CLASS_MAP[project.status]}
                                                    >
                                                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-3 text-nowrap">{project.created_at}</td>
                                                <td className="px-3 py-3 text-nowrap">{project.due_date}</td>
                                                <td className="px-3 py-3">{project.createdBy.name}</td>
                                                <td className="px-3 py-3">
                                                    <Link
                                                        href={route('project.edit', project.id)}
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                    >Edit</Link>
                                                    <Link
                                                        href={route('project.destroy', project.id)}
                                                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                    >Delete</Link>
                                                </td>
                                                <td className="px-3 py-3">
                                                    {/* <img src={project.image} alt={project.name} style={{ width: 60 }} /> */}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}