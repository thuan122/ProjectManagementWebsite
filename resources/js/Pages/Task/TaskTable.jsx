import { Link, router } from "@inertiajs/react"

import {
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP
} from "@/constants";
import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading"
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";

const TaskTable = ({
    tasks,
    queryParams = null,
    hideProjectColumn = false
}) => {
    queryParams = queryParams || {}

    const searchFieldChange = (name, value) => {
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        // Shouldn't this be a dynamic rather than a fixed route?
        router.get(route("task.index"), queryParams)
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

        router.get(route("task.index"), queryParams)
    }

    return (
        <>
            <div className="overflow-auto">
                {
                    tasks.data.length > 0 ?
                        <>
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
                                        {hideProjectColumn === false ? (
                                            <th>
                                                <div
                                                    className="px-3 py-3 flex items-center justify-between gap-1"
                                                >
                                                    Project name
                                                </div>
                                            </th>
                                        ) : <></>}
                                        <TableHeading
                                            name="name"
                                            className="px-3 py-3 flex items-center justify-between gap-1"
                                            sortable={true}
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Task Name
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
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3">
                                            <TextInput
                                                className="w-full"
                                                // This is for when reload the page, the search query will keep remain
                                                defaultValue={queryParams.name}
                                                placeholder="Enter task's name"
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
                                    {tasks.data.map((task) => (
                                        <tr key={task.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-3 py-3">{task.id}</td>
                                            {hideProjectColumn === false ? (
                                                <td className="px-3 py-3">{task.project.name}</td>
                                            ) : <></>}
                                            <td className="px-3 py-3">{task.name}</td>
                                            <td className="px-3 py-3">
                                                <span
                                                    className={"px-2 py-1 rounded text-white "
                                                        + TASK_STATUS_CLASS_MAP[task.status]}
                                                >
                                                    {TASK_STATUS_TEXT_MAP[task.status]}
                                                </span>
                                            </td>
                                            <td className="px-3 py-3 text-nowrap">{task.created_at}</td>
                                            <td className="px-3 py-3 text-nowrap">{task.due_date}</td>
                                            <td className="px-3 py-3">{task.createdBy.name}</td>
                                            <td className="px-3 py-3">
                                                <Link
                                                    href={route('task.edit', task.id)}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                >Edit</Link>
                                                <Link
                                                    href={route('task.destroy', task.id)}
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                >Delete</Link>
                                            </td>
                                            <td className="px-3 py-3">
                                                {/* <img src={task.image} alt={task.name} style={{ width: 60 }} /> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={tasks.meta.links} />
                        </> :
                        <div className="text-lg">No tasks available</div>
                }
            </div>
        </>
    )
}

export default TaskTable