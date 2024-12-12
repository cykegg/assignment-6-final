import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { ListGroup, Card, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import styles from '@/styles/History.module.css';
import { removeFromHistory } from "@/lib/userData";

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const router = useRouter();

  if (!searchHistory) return null;

  let parsedHistory = [];

  searchHistory.forEach(h => {
    let params = new URLSearchParams(h);
    let entries = params.entries();

    parsedHistory.push(Object.fromEntries(entries));
  });


  const historyClicked = (e, index) => {
    e.stopPropagation();
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = async (e, index) => {
    e.stopPropagation();

    setSearchHistory(await removeFromHistory(searchHistory[index]));
  };

  return (
    <div>
      {parsedHistory.length === 0 ? (
        <Card>
          <Card.Body>Nothing here, try searching for something.</Card.Body>
        </Card>
      ) : (

        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item 
              key={index} 

              className={styles.historyListItem}
              onClick={(e) => historyClicked(e, index)}
            >
              {Object.keys(historyItem).map((key) => (
                <span key={key}>

                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </span>
              ))}
              <Button 
                className="float-end" 
                variant="danger" 
                
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
