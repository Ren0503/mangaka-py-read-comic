import React from 'react'
import { Alert } from 'react-bootstrap'

interface MessageProps {
	children: React.ReactNode
	variant?: string
}

const Message: React.FunctionComponent<MessageProps> = ({
	children,
	variant
}: MessageProps) => {
	return <Alert variant={variant}>{children}</Alert>
}

Message.defaultProps = {
	variant: 'info'
}

export default Message
