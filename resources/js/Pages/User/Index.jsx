import { Link, usePage, Head, router } from "@inertiajs/react"

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";

export default function Index({ users, queryParams = null, success }) {
    queryParams = queryParams || {}

    const searchFieldChange = (name, value) => {
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        router.get(route("user.index"), queryParams)
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

        router.get(route("user.index"), queryParams)
    }

    const deleteUser = (user) => {
        if (!window.confirm("Are you sure?")) {
            return;
        }
        router.delete(route('user.destroy', user.id), { preserveScroll: true })
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Users
                    </h2>
                    <Link
                        href={route('user.create')}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                        Add new User
                    </Link>
                </div>
            }
        >
            <Head title="Users" />


            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {success && <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                        {success}
                    </div>}
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
                                                name="email"
                                                className="px-3 py-3 flex items-center justify-between gap-1"
                                                sortable={true}
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Email
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
                                                className="px-3 py-3"
                                                sortable={false}
                                            >
                                                Actions
                                            </TableHeading>

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
                                                    placeholder="Enter user's name"
                                                    // Only search when lost focus on the input
                                                    onBlur={e => searchFieldChange('name', e.target.value)}
                                                    // When typing, it only search when hit Enter
                                                    onKeyPress={e => onKeyPress('name', e)}
                                                />
                                            </th>
                                            <th className="px-3 py-3">
                                            <TextInput
                                                    className="w-full"
                                                    // This is for when reload the page, the search query will keep remain
                                                    defaultValue={queryParams.email}
                                                    placeholder="Enter user's email"
                                                    // Only search when lost focus on the input
                                                    onBlur={e => searchFieldChange('email', e.target.value)}
                                                    // When typing, it only search when hit Enter
                                                    onKeyPress={e => onKeyPress('email', e)}
                                                />
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.data.map((user) => (
                                            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-3 py-3">{user.id}</td>
                                                <td className="px-3 py-3 text-nowrap">
                                                    
                                                        {user.name}
                                                    
                                                </td>
                                                <td className="px-3 py-3">
                                                    {user.email}
                                                </td>
                                                <td className="px-3 py-3 text-nowrap">{user.created_at}</td>
                                                <td className="px-3 py-3 text-nowrap">
                                                    <Link
                                                        href={route('user.edit', user.id)}
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                    >Edit</Link>
                                                    <button
                                                        onClick={() => deleteUser(user)}
                                                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                    >Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={users.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}