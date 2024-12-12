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

import { Row, Col, Image } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
        alt="Metropolitan Museum of Art"
        fluid
        rounded
      />
      <Row className="mt-4">
        <Col lg={6}>
          <p>
            The Metropolitan Museum of Art, colloquially "the Met," is the largest art museum in 
            the Americas. Its permanent collection contains over two million works, divided 
            among 17 curatorial departments. The main building at 1000 Fifth Avenue, along the 
            Museum Mile on the eastern edge of Central Park in Manhattan, is by area one of the 
            world's largest art museums.
          </p>
        </Col>
        <Col lg={6}>
          <p>
            The museum was founded in 1870 to bring art and art education to the American people. 
            Its permanent collection consists of works of art from classical antiquity and ancient 
            Egypt, paintings, and sculptures from nearly all the European masters, and an extensive 
            collection of American and modern art. The Met maintains extensive holdings of African, 
            Asian, Oceanian, Byzantine, and Islamic art. The museum is home to encyclopedic collections 
            of musical instruments, costumes, and accessories, as well as antique weapons and armor from 
            around the world. Several notable interiors, ranging from 1st-century Rome through modern 
            American design, are installed in its galleries.

The Fifth Avenue building opened on March 30, 1880. In 2021, despite the COVID-19 pandemic in New York City, the museum attracted 1,958,000 visitors, ranking fourth on the list of most-visited art museums in the world.
          </p>
          <br />
          <p>
            Visit the Wikipedia page for more information:{" "}
            <a
              href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
              target="_blank"
              rel="noreferrer"
            >
              https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art
            </a>
          </p>
        </Col>
      </Row>
    </>
  );
}
