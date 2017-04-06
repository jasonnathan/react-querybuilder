import React, {PropTypes} from "react";

export default class ValueSelector extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    handleOnChange: PropTypes.func,
    options: PropTypes.array.isRequired,
    value: PropTypes.string,
  }

  static defaultProps = {
    className: "",
    handleOnChange: () => {},
    value: null,
  }

  render() {
    const {value, options, className, handleOnChange} = this.props;

    return (
      <select
        className={className}
        onChange={(e) => handleOnChange(e.target.value)}
        value={value}
      >
        {options.map((option) => {
          return (
            <option key={option.name} value={option.name}>{option.label}</option>
          );
        })}
      </select>
    );
  }
}
