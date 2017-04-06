import React, {PropTypes} from "react";

export default class ValueEditor extends React.Component {
  static propTypes = {
    handleOnChange: PropTypes.func,
    operator: PropTypes.string,
    value: PropTypes.string,
  }

  static defaultProps = {
    handleOnChange: () => {},
    operator: "",
    value: null,
  }
  constructor(props) {
    super(props);
  }

  render() {
    const {operator, value, handleOnChange} = this.props;

    if (operator === "null" || operator === "notNull") {
      return null;
    }

    return (
      <input
        onChange={(e) => handleOnChange(e.target.value)}
        type="text"
        value={value}
      />);
  }
}
