// для тестирования компонентов, связанных с хранилищем redux, нам нужно экспортировать сам этот компонент, без связки с хранилищем (просто добавить export самого класса)

import { BurgerBuilder } from "./index";
import BuildControls from "../../components/Burger/BuildControls";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import React from "react";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
  let wrapper;

  beforeEach(() => {
    // так как в ComponentDidMount ожидается функция, мы обязаны ее передать, иначе тест не будет работать
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
  });

  it("should render <BuildControls /> element if ingredients are passed", () => {
    wrapper.setProps({ ingredients: { salad: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
