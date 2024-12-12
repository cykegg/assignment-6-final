import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);
  
  if (!favouritesList) return null;

  return (
    <div>
      {favouritesList.length > 0 ? (
        <Row className="gy-4">
          {favouritesList.map((objectID) => (
            <Col lg={3} md={4} sm={6} key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center mt-4">
          <p>Nothing here, try adding some new artwork to the list.</p>
        </div>
      )}
    </div>
  );
}
