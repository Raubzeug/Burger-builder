// npm install --save enzyme react-test-renderer enzyme-adapter-react-16
// адаптер для той версии реакта, которую используем. Jest не надо устанавливать, она идет в комплекте, когда используется create-react-app

// для того, чтобы использовать энзайм, его нужно вначале сконфигурировать. Для этого импортируем configure и Adapter.
// shallow - метод, который делает неглубокий рендеринг компонента. Т.е. если внутри этого компонента есть другие, они будут отрендерены как плэйсхолдеры, а не как компоненты. Т.е. поддерево компонентов НЕ рендерится.
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import React from "react";
import NaviItems from "./index";
import NaviItem from "./NaviItem";

// после этого энзайм поодключен
configure({ adapter: new Adapter() });

// один describe - один test suit, один it - один test
describe("<NaviItems />", () => {
  // wrapper - устоявшееся название
  let wrapper;

  //функция, которая будет выполнена перед каждым тестом
  beforeEach(() => {
    wrapper = shallow(<NaviItems />);
  });

  it("should render 2 <NaviItem /> elements when not authenticated", () => {
    expect(wrapper.find(NaviItem)).toHaveLength(2); //тут не jsx элемент, а обычная функция
  });

  it("should render 3 <NaviItem /> elements when authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NaviItem)).toHaveLength(3);
  });

  it("should render <NaviItem /> element with text 'Logout' and with link '/logout' when authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(<NaviItem link="/logout">Logout</NaviItem>)
    ).toEqual(true);
  });
});

//npm test
