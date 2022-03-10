import React, { ReactElement, ReactNode } from 'react';
import { isTemplateSpan } from 'typescript';
import './App.css';

// Conventianal Props...
const Heading = ({ title }: {title: string;}) => {
  return (
    <h1>
      {title}
    </h1>
  )
}

const HeadingWithContent = ({ children }: {children: ReactNode}): ReactElement => {
  return (
    <h1>
      {children}
    </h1>
  )
}

// Default Props...

const defaultContainerProps  = {
  heading: <strong>Default Heading...</strong>
}

type ContainerProps = { children: ReactNode } & typeof defaultContainerProps;

const Container = ({ 
  heading, children
}: ContainerProps): ReactElement => {
  return (
    <>
      <h1>{heading}</h1>
      {children}
    </>
  )
}

Container.defaultProps = defaultContainerProps;

// Functional Props...
const TextWithNumber = ({header, children }:
   { 
     children: (num: number) => ReactNode
     header?: (num: number) => ReactNode
  }) => {
  // const [state, setState] = React.useState<number | null>(null);
  const [count, setCount] = React.useState<number>(1);
  return (
    <>
      <div>
        {header && <h4>{header?.(count)}</h4>}
        <div>{children(count)}</div>
        <button onClick={() => setCount(count + 1)}>
          Add
        </button>
      </div>
    </>
  )
}

// List

function List<ListItem>({
  items, 
  render
}: {
   items: ListItem[],
   render: (item: ListItem) => ReactNode
  })  {
    return (
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {render(item)}
          </li>
        ))}
      </ul>
    )
  }

function App() {
  return (
    <div className="App">
     <Heading title='Hello TS app' ></Heading>
     <HeadingWithContent>
       <span>Hi Children props</span>
     </HeadingWithContent>
     <Container>
       ello m8
     </Container>
     <h2>Use Front End Image gallery/Slider assesment as an example</h2>
     <TextWithNumber header={(num: number) => <p>Header</p>}>
       {(num: number) => <div>Todays Number {num}</div>}
     </TextWithNumber>
     <List items={["jack", "Dee", "jax", "andrew"]} render={(item: string) => <div>{item.toLowerCase()}</div>}></List>
    </div>
  );
}

export default App;
