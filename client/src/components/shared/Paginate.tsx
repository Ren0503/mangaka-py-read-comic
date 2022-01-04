import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

interface PaginateProps {
	pages: number
	page: number
	keyword?: string
}

const Paginate = ({
	page,
	pages,
	keyword = ''
}: PaginateProps) => {
	return (
		<>
			{pages > 1 && (
				<Pagination>
					{[...Array(pages).keys()].map((x) => (
						<Link
							key={x + 1}
							to={
                                keyword
                                    ? `/search/${keyword}/page/${x + 1}`
                                    : `/page/${x + 1}`
							}>
							<Pagination.Item disabled={x + 1 === page}>{x + 1}</Pagination.Item>
						</Link>
					))}
				</Pagination>
			)}
		</>
	)
}

export default Paginate
