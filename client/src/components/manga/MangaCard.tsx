import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

import { MangaList as MangaType } from 'types/manga'

interface MangaProps {
	manga: MangaType
}

const MangaCard: FunctionComponent<MangaProps> = ({
	manga
}: MangaProps) => {
	return (
		<Card className='my-3 p-2 rounded'>
			<Link to={`/manga/${manga._id}`}>
				<Card.Img src={manga.image} variant='top' />
			</Link>
			<Card.Body>
				<Link to={`/manga/${manga._id}`}>
					<Card.Title as='div'>
						<strong>{manga.name}</strong>
					</Card.Title>
				</Link>
				<Card.Text as='h6'>{manga.views}</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default MangaCard
