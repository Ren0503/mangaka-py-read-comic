import React, { FunctionComponent } from 'react'

interface RatingProps {
	value: number
	color?: string
}

interface SingleStarDisplayProps {
	value: number
	cmp1: number
	cmp2: number
	color?: string
}

const Rating: FunctionComponent<RatingProps> = ({
	value,
	color
}: RatingProps) => {
	const ratingIconClassNameCalculator = (
		value: number,
		cmp1: number,
		cmp2: number
	): string => {
		if (value >= cmp1) return 'fas fa-star'
		else if (value >= cmp2) return 'fas fa-star-half-alt'
		else return 'far fa-star'
	}

	const SingleStarDisplay: FunctionComponent<SingleStarDisplayProps> = ({
		value,
		cmp1,
		cmp2,
		color
	}: SingleStarDisplayProps) => {
		return (
			<span>
				<i
					style={{ color }}
					className={ratingIconClassNameCalculator(value, cmp1, cmp2)}></i>
			</span>
		)
	}

	return (
		<div className='rating'>
			<SingleStarDisplay value={value} cmp1={1} cmp2={0.5} color={color} />
			<SingleStarDisplay value={value} cmp1={2} cmp2={1.5} color={color} />
			<SingleStarDisplay value={value} cmp1={3} cmp2={2.5} color={color} />
			<SingleStarDisplay value={value} cmp1={4} cmp2={3.5} color={color} />
			<SingleStarDisplay value={value} cmp1={5} cmp2={4.5} color={color} />
		</div>
	)
}

Rating.defaultProps = {
	color: '#f8e825'
}

export default Rating
