import React, {PropTypes} from "react";

export default class ActionElement extends React.Component {
  static propTypes = {
      className: PropTypes.string,
      handleOnClick: PropTypes.func,
      label: PropTypes.string,
  }

  static defaultProps = {
    className: "",
    handleOnClick: () => {},
    label: null,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {label, className, handleOnClick} = this.props;

    return (
      <button className={className}
        onClick={(e)=>handleOnClick(e)}
      >
        {label}
      </button>
    );
  }
}
