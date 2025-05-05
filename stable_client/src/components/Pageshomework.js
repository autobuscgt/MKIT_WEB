import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '..';
import { Pagination } from 'react-bootstrap';
import './Pagination.css'
const PagesHomework = observer(() => {
  const { homework } = useContext(Context);

const pageTotal = Math.ceil(homework.total/homework.limit)
const pages_ = []
for(let i = 0;i< pageTotal;i++)
    {
        pages_.push(i + 1)
    }
  return (
    <div className='pagination_menu'>
        <Pagination className='pagination_menu'>
            {pages_.map(page => (
                <Pagination.Item className='pagination_menu'
                active={homework.page === page}
                onClick={()=> homework.setPage(page)}>
                {page}</Pagination.Item>
            ))}
        </Pagination>
    </div>

  );
});

export default PagesHomework;