// Import React
import React from "react";

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  CodePane,
  Layout,
  Fit,
  Fill,
  Markdown,
  Text
} from "spectacle";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");

const theme = createTheme({
  primary: "white",
  secondary: "#1F2022",
  tertiary: "#03A9FC",
  quartenary: "#CECECE"
}, {
  primary: "Montserrat",
  secondary: "Helvetica"
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck theme={theme}>
        <Slide bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            The future of JavaScript
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            What has the TC-39 been up to.
          </Text>
        </Slide>
        <Slide>
          <Heading size={3}>Modules & Import</Heading>
          <List>
            <ListItem>Dynamic Imports</ListItem>
            <ListItem>Import meta information</ListItem>
          </List>
        </Slide>
        <Slide margin="0" padding="0">
          <Layout>
          <Fill>
          <Markdown textAlign="left">{`
**Modules & Import**
  * Dynamic imports
  * Import meta information

**Functions & Classes**
  * Decorators
  * Class fields
  * Function dot next

**Promises**
  * Promise.try
          `}</Markdown>
          </Fill>
          <Fill>
          <Markdown textAlign="left">{`
**Advanced asynchronous constructs**
  * Async iterables

**Syntactic Sugar**
  * Numeric serpator
  * Null coalescing 
  * Throw expressions
  * Optional chaining
  * Partial function application

**Core (std library)**
  * BigInt
  * Shared memory & atomics
  * Realms

          `}</Markdown>
          </Fill>
          </Layout>
        </Slide>
        <Slide>
          <CodePane
              lang="javascript"
              source={require("../assets/async-iterators/index.txt")}
            />
        </Slide>
        <Slide transition={["fade"]} bgColor="tertiary">
          <Heading size={6} textColor="primary" caps>Typography</Heading>
          <Heading size={1} textColor="secondary">Heading 1</Heading>
          <Heading size={2} textColor="secondary">Heading 2</Heading>
          <Heading size={3} textColor="secondary">Heading 3</Heading>
          <Heading size={4} textColor="secondary">Heading 4</Heading>
          <Heading size={5} textColor="secondary">Heading 5</Heading>
          <Text size={6} textColor="secondary">Standard text</Text>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>Standard List</Heading>
          <List>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
            <ListItem>Item 3</ListItem>
            <ListItem>Item 4</ListItem>
          </List>
        </Slide>
        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <BlockQuote>
            <Quote>Example Quote</Quote>
            <Cite>Author</Cite>
          </BlockQuote>
        </Slide>
      </Deck>
    );
  }
}
