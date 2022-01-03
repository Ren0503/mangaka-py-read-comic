import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

import { MangaList as MangaType } from 'types/manga'
import { Rating } from '.'


import "styles/manga.css"
interface MangaProps {
	manga: MangaType
}

const MangaCard: FunctionComponent<MangaProps> = ({
	manga
}: MangaProps) => {
	return (
		<Card className='manga my-3 p-2 rounded'>
			<Link to={`/manga/${manga._id}`}>
				<Card.Img src={manga.image} variant='top' />
			</Link>
			<Card.Body>
				<Link to={`/manga/${manga._id}`}>
					<Card.Title as='h5' className="title">
						<strong>{manga.name}</strong>
					</Card.Title>
				</Link>
				<Card.Text as='div'>
					<Rating
						value={manga.rating}
					/>
				</Card.Text>
			</Card.Body>

			{manga.chapters.slice(0, 1).map((chapter) => (
				<Link to={`/manga/${manga._id}/chapter/${chapter._id}`} key={chapter._id}>
					<span className="chapter">
						{chapter.name}
					</span>
				</Link>
			))}
		</Card>
	)
}

export default MangaCard
