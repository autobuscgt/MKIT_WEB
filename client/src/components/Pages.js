import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { Pagination } from 'react-bootstrap';
import './Pagination.css'
const Pages = observer(()=> {
    const {event} = useContext(Context)
    const pageTotal = Math.ceil(event.total / event.limit)

    const pages_ = []
    for(let i = 0;i< pageTotal;i++)
        {
            pages_.push(i + 1)
        }
    
    return (
        <Pagination className='pagination_menu'>
            {pages_.map(page => (
                <Pagination.Item className='pagination_menu'
                active={event.pages === page}
                onClick={()=> event.setPage(page)}>
                {page}</Pagination.Item>
            ))}
        </Pagination>
    );
})

export default Pages;