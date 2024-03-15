import { render, queryByAttribute, fireEvent } from "@testing-library/react";
import Board from "./Board";

// mocks Math.random value
beforeEach(function() {
    jest
    .spyOn(Math, "random")
    .mockReturnValue(0.9);
});
  
afterEach(function() {
    Math.random.mockRestore();
});

it("renders without crashing", function() {
    render(<Board />);
  });
  
it("matches snapshot: all true", function() {
    const { asFragment } = render(<Board />);
    expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot: all false: ie. 'You Won!'", function() {
    const { asFragment } = render(<Board chanceLightStartsOn={0.99} />);
    expect(asFragment()).toMatchSnapshot();
});

it("flips value of child (Cell) componet and its surrounding cells", function() {
    const getById = queryByAttribute.bind(null, 'id');
    const { container } = render(<Board />);
    const litCol1 = getById(container, '0-0');
    const litCol2 = getById(container, '0-1');
    const litCol3 = getById(container, '1-0');
    

    expect(litCol1).toHaveClass('Cell-lit'); 
    expect(litCol2).toHaveClass('Cell-lit'); 
    expect(litCol3).toHaveClass('Cell-lit'); 

    fireEvent.click(litCol1);

    expect(litCol1).not.toHaveClass('Cell-lit'); 
    expect(litCol2).not.toHaveClass('Cell-lit'); 
    expect(litCol3).not.toHaveClass('Cell-lit'); 
});