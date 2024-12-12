/****************************************************************************
* I declare that this assignment is my own work in accordance with the Seneca Academic
* Policy. No part of this assignment has been copied manually or electronically from
* any other source (including web sites) or distributed to other students.
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Assignment: 2247 / 6
* Student Name: Ahnaf Abrar Khan
* Student Email: aakhan82@myseneca.ca
* Course/Section: WEB422/ZAA
*
*****************************************************************************/

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Error from "next/error";
import { Row, Col, Card, Pagination, Spinner } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import validObjectIDList from '@/public/data/validObjectIDList.json';

const PER_PAGE = 12;

export default function Artwork() {
  const [artworkList, setArtworkList] = useState(null);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const finalQuery = router.asPath.split("?")[1];

  const { data, error } = useSWR(
    finalQuery ? `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}` : null
  );

  const previousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const nextPage = () => {
    if (page < artworkList.length) setPage(page + 1);
  };

  useEffect(() => {
    if (data?.objectIDs) {
      let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));

      const results = [];
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }

      setArtworkList(results);
      setPage(1);
    } else {
      setArtworkList([]);
    }
  }, [data]);

  if (error) {
    return <Error statusCode={404} />;
  }

  if (artworkList === null) {
    return (
      <Row>
        <Col className="text-center">
          <Spinner animation="border" role="status" />
          <span>Loading...</span>
        </Col>
      </Row>
    );
  }

  if (artworkList.length === 0) {
    return (
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h4>No Results Found</h4>
              <p>Try searching for something else.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Row className="gy-4">
        {artworkList[page - 1].map((currentObjectID) => (
          <Col lg={3} key={currentObjectID}>
            <ArtworkCard objectID={currentObjectID} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <Pagination>
            <Pagination.Prev onClick={previousPage} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={nextPage} />
          </Pagination>
        </Col>
      </Row>
    </>
  );
}
