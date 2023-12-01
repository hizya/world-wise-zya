import Button from './Button';
import { useNavigate } from 'react-router';

function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      type={'back'}
      onClick={e => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      &larr; back
    </Button>
  );
}

export default BackButton;
