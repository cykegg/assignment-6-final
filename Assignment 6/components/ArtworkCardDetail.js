import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { Card, Button } from "react-bootstrap";
import { favouritesAtom } from "@/store";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export default function ArtworkCardDetail({ objectID }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList, objectID]);

  const favouritesClicked = async () => {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(objectID));
      setShowAdded(false);
    } else {
      setFavouritesList(await addToFavourites(objectID));
      setShowAdded(true);
    }
  };

  const { data, error } = useSWR(
    objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null
  );

  if (error) return <div>Error loading artwork details.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Card>
      {data.primaryImage && (
        <Card.Img variant="top" src={data.primaryImage} alt={data.title} />
      )}
      <Card.Body>
        <Card.Title>{data.title || "N/A"}</Card.Title>
        <Card.Text>
          <strong>Artist:</strong> {data.artistDisplayName || "N/A"}
          <br />
          <strong>Date:</strong> {data.objectDate || "N/A"}
          <br />
          <strong>Medium:</strong> {data.medium || "N/A"}
          <br />
          <strong>Dimensions:</strong> {data.dimensions || "N/A"}
        </Card.Text>
        <Button
          variant={showAdded ? "primary" : "outline-primary"}
          onClick={favouritesClicked}
        >
          {showAdded ? "+ Favourite (added)" : "+ Favourite"}
        </Button>
      </Card.Body>
    </Card>
  );
}
