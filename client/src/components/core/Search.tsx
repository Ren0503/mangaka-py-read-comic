import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
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
        <Form onSubmit={submitHandler} className='flex'>
            <Form.Control
                type='text'
                name='search'
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                placeholder='Search Manga...'
                className='mr-sm-2 ml-sm-5'
            />
            <Button type='submit' variant='outline-success' className='p-2'>
                Search
            </Button>
        </Form>
    )
}

export default Search
