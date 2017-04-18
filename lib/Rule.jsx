import React, {PropTypes} from "react";

function checkControls(controls) {
  const fields = ["operatorSelector", "fieldSelector", "valueEditor", "removeRuleAction"];
  Object.keys(controls).filter((k) => fields.indexOf(k) >= 0).forEach((k) => {
    if (!controls[k]) {
      throw new TypeError(
        `
          '${k}' is q required control element, received ${typeof controls[k]}.
           If you have defined custom components, ensure they are exists and/or are exported.
        `,
      );
    }
  });
}

export default class Rule extends React.Component {
  static propTypes = {
    controls: PropTypes.object,
    field: PropTypes.string,
    id: PropTypes.string,
    operator: PropTypes.any,
    parentId: PropTypes.string,
    schema: PropTypes.object,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    controls: null,
    id: null,
    parentId: null,
    field: null,
    operator: null,
    value: null,
    schema: null,
  };

  constructor(props) {
    super(props);
    props.controls && checkControls(props.controls);
  }

  componentWillReceiveProps({controls}) {
    controls && checkControls(controls);
  }

  onFieldChanged = (value) => {
    this.onElementChanged("field", value);
  };

  onOperatorChanged = (value) => {
    this.onElementChanged("operator", value);
  };

  onValueChanged = (value) => {
    this.onElementChanged("value", value);
  };

  onElementChanged = (property, value) => {
    const {id, schema: {onPropChange}} = this.props;
    onPropChange(property, value, id);
  };

  removeRule = (event) => {
    event.preventDefault();
    event.stopPropagation();

    this.props.schema.onRuleRemove(this.props.id, this.props.parentId);
  };
  render() {
    const {field, operator, value, schema: {fields, controls, getOperators, classNames}} = this.props;
    return (
      <div className={`rule ${classNames.rule}`}>
        {React.createElement(controls.fieldSelector, {
          options: fields,
          value: field,
          className: `rule-fields ${classNames.fields}`,
          handleOnChange: this.onFieldChanged,
        })}
        {React.createElement(controls.operatorSelector, {
          options: getOperators(field),
          value: operator,
          className: `rule-operators ${classNames.operators}`,
          handleOnChange: this.onOperatorChanged,
        })}
        {React.createElement(controls.valueEditor, {
          field: field,
          operator: operator,
          value: value,
          className: `rule-value ${classNames.value}`,
          handleOnChange: this.onValueChanged,
        })}
        {React.createElement(controls.removeRuleAction, {
          label: "x",
          className: `rule-remove ${classNames.removeRule}`,
          handleOnClick: this.removeRule,
        })}
      </div>
    );
  }
}
