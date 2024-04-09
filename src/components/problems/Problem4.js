import seasons from "../util/seasons";
import Accordion from 'react-bootstrap/Accordion';

// Remember to import stuff, and if you forget, make sure your
// editor didn't 'help' by adding something you didn't want.

// Use Bootstrap accordion to make an *accordion* of the seasons array.
// @see https://react-bootstrap.github.io/docs/components/accordion/
// Use seasons.map() to create the accordion items, there's no need to
// manually add each since we already have the array.
const Problem4 = () => {
  return <Accordion>
    {seasons.map((season, index) => (
      <Accordion.Item key={index} eventKey={index}>
        <Accordion.Header>{season.label}</Accordion.Header>
        <Accordion.Body>
          {season.children}
        </Accordion.Body>
      </Accordion.Item>
      ))}
  </Accordion>
}

export default Problem4;
