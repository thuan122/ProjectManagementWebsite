import { Link } from "@inertiajs/react"

const Pagination = ({ links }) => {
    return (
        <nav className="text-center mt-4">
            {
                links.map((link, key) => (
                    <Link
                        preserveScroll
                        href={link.url || ""}
                        key={key}
                        // dangerouslySetInnerHTML is basically innerHTML
                        // But it labaled as "dangerouslySetInnerHTML" because of the risk of XSS attack
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={
                            "inline-block py-2 px-3 rounded-lg text-gray-200 text-xs "
                            + (link.active === true ? "bg-gray-950" : " ")
                            + (link.url === null ? " text-gray-500 cursor-not-allowed " : " hover:bg-gray-950")
                        }
                        onClick={(event) => {
                            if (link.url === null) {
                                event.preventDefault(); // Prevent navigation for disabled links
                            }
                        }}
                    ></Link>
                ))
            }
        </nav>
    )
}

export default Pagination