import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid'

const TableHeading = ({
    name = "",
    className = "",
    sortable = true,
    sort_field = null,
    sort_direction = null,
    sortChanged = () => { },
    children = ""
}) => {
    return (
        <th onClick={(e) => sortChanged(name)}>
            <div className={className}>
                {children}
                {sortable === true ?
                    <div>
                        <ChevronUpIcon
                            className={
                                "w-4 " +
                                (sort_field === name && sort_direction === 'asc'
                                    ? "text-white cursor-pointer" : "")
                            }
                        />
                        <ChevronDownIcon
                            className={
                                "w-4 -mt-2 " +
                                (sort_field === name && sort_direction === 'desc'
                                    ? "text-white cursor-pointer" : "")
                            }
                        />
                    </div> : <></>
                }
            </div>
        </th>
    )
}

export default TableHeading