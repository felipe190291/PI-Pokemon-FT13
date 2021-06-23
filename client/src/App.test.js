import { render, screen } from "@testing-library/react";
import App from "./App";
import Card from "./components/Home/Card";
import Landing from "./components/Landing-Page/Initial.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);

//   expect(linkElement).toBeInTheDocument(body);
// });
test("renders learn react link", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const linkElement = screen.getByText("Welcome");

  expect(linkElement).toBeInTheDocument();
});
describe("<Landing/>", () => {
  let component;
  beforeEach(() => {
    component = render(
      <BrowserRouter>
        <Landing>
          <div>testcontent</div>
        </Landing>
      </BrowserRouter>
    );
  });
  test("render", () => {
    component.getByText("Welcome");
  });
});
describe("<Landing/>", () => {
  let component;
  beforeEach(() => {
    component = render(
      <BrowserRouter>
        <Landing>
          <div>testcontent</div>
        </Landing>
      </BrowserRouter>
    );
  });
  test("render", () => {
    expect(component.getByTestId("button")).toBeEnabled();
    // component.getByTestId("welcome").not.toBeEmptyDOMElement();
  });
});
describe("<Landing/>", () => {
  let component;
  beforeEach(() => {
    component = render(
      <BrowserRouter>
        <Landing>
          <div>testcontent</div>
        </Landing>
      </BrowserRouter>
    );
  });
  test("render", () => {
    expect(component.getByTestId("supported-role")).not.toBeRequired();
  });
});

describe("<Card/>", () => {
  let component;
  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Card />
        </BrowserRouter>
      </Provider>
    );
  });
  test("render", () => {
    expect(component.getByTestId("supported-card")).not.toBeRequired();
  });
  test("render", () => {
    const Button = component.getByTestId("button");
    expect(Button).toHaveClass("button2", { exact: true });
  });
});
