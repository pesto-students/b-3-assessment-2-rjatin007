import React from "react";

const CheckboxContext = React.createContext();
class CheckboxGroup extends React.Component {
  state = {
    checked: false,
  };
  onChange = (event) => {
    this.setState((state) => ({ ...state, checked: !state.checked }));
    const { onChange, value } = this.props;
    onChange(value);
  };
  render() {
    const { children, name } = this.props;

    const renderedChildren = children(Checkbox);
    return (
      <CheckboxContext.Provider
        value={{ checked: this.state.checked, name, onChange: this.onChange }}
      >
        {renderedChildren}
      </CheckboxContext.Provider>
    );
  }
}
const Checkbox = () => {
  return (
    <CheckboxContext.Consumer>
      {({ name, value, checked, onChange }) => {
        return (
          <input
            type="checkbox"
            name={name}
            value={value}
            checked={checked || false}
            onChange={onChange}
          />
        );
      }}
    </CheckboxContext.Consumer>
  );
};
export { CheckboxGroup, Checkbox };
