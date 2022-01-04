import React, { useState } from 'react'
import { Button, Form, Stack } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const Search = () => {
    const [keyword, setKeyword] = useState<string>('')
    const { push } = useHistory()

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (keyword.trim()) push(`/search/${keyword}`)
        else push('/')
    }

    return (
        <Stack direction='horizontal' gap={2}>
            <Form onSubmit={submitHandler} className="d-flex">
                <Form.Control
                    type='text'
                    name='search'
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                    placeholder='Search Manga...'
                    className='mr-sm-2 ml-sm-5'
                />
                <Button type='submit' variant='outline-warning' className='p-2'>
                    Search
                </Button>
            </Form>
        </Stack>
    )
}

export default Search
