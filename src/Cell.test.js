import { render } from "@testing-library/react";
import Cell from "./Cell";

it("renders without crashing", function() {
    render(<Cell />);
  });
  
it("matches snapshot", function() {
    const { asFragment } = render(<Cell />);
    expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot", function() {
    const { asFragment } = render(
    <Cell 
        flipCellsAroundMe={()=>{}}
        isLit={true}/>
    );
    expect(asFragment()).toMatchSnapshot();
});

