import Pagination from 'react-bootstrap/Pagination';
import { useNavigate } from 'react-router-dom';
import "./pagination.css"

export default function SitePagination({ pageCount , activePage , bodyPart }) {
  
  const navigate = useNavigate()
  
  return (
    <Pagination size="md" className="d-flex justify-content-center exercises-pagination">
      {activePage > 2 &&
        <Pagination.Item onClick={()=>navigate(`/bodypart/${bodyPart}/1`)}>
            First
        </Pagination.Item>
      }
      {activePage > 1 &&
        <Pagination.Item onClick={()=>navigate(`/bodypart/${bodyPart}/${activePage-1}`)}>
            Prev
        </Pagination.Item>
      }
      <Pagination.Item className="active">
              {activePage}        
      </Pagination.Item>
      {activePage < pageCount &&
        <Pagination.Item onClick={()=>navigate(`/bodypart/${bodyPart}/${parseInt(activePage)+1}`)}>
            Next
        </Pagination.Item>
      }
      {activePage < pageCount - 1 &&
        <Pagination.Item onClick={()=>navigate(`/bodypart/${bodyPart}/${pageCount}`)}>
            Last
        </Pagination.Item>
      }
    </Pagination>
  );
}