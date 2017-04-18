import React from "react";
import PropTypes from "prop-types";
import Rule from "./Rule";

export default class RuleGroup extends React.Component {
  static propTypes = {
    combinator: PropTypes.string,
    id: PropTypes.string,
    parentId: PropTypes.string,
    rules: PropTypes.array,
    schema: PropTypes.object,
  };

  static defaultProps = {
      id: null,
      parentId: null,
      rules: [],
      combinator: "and",
      schema: {},
  };

  hasParentGroup() {
    return this.props.parentId;
  }

  onCombinatorChange = (value) => {
    const {onPropChange} = this.props.schema;

    onPropChange("combinator", value, this.props.id);
  };

  addRule = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const {createRule, onRuleAdd} = this.props.schema;

    const newRule = createRule();
    onRuleAdd(newRule, this.props.id);
  };

  addGroup = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const {createRuleGroup, onGroupAdd} = this.props.schema;
    const newGroup = createRuleGroup();
    onGroupAdd(newGroup, this.props.id);
  };

  removeGroup = (event) => {
    event.preventDefault();
    event.stopPropagation();

    this.props.schema.onGroupRemove(this.props.id, this.props.parentId);
  };

  render() {
    const {combinator, rules, schema: {combinators, controls, onRuleRemove, isRuleGroup, classNames}} = this.props;

    return (
      <div className="ruleGroupWrapper">
        <div className={`ruleGroup ${classNames.ruleGroup}`}>
          {React.createElement(controls.combinatorSelector, {
            options: combinators,
            value: combinator,
            className: `ruleGroup-combinators ${classNames.combinators}`,
            handleOnChange: this.onCombinatorChange,
          })}
          {React.createElement(controls.addRuleAction, {
            label: "+Rule",
            className: `ruleGroup-addRule ${classNames.addRule}`,
            handleOnClick: this.addRule,
          })}
          {React.createElement(controls.addGroupAction, {
            label: "+Group",
            className: `ruleGroup-addGroup ${classNames.addGroup}`,
            handleOnClick: this.addGroup,
          })}
          {this.hasParentGroup()
            ? React.createElement(controls.removeGroupAction, {
                label: "x",
                className: `ruleGroup-remove ${classNames.removeGroup}`,
                handleOnClick: this.removeGroup,
              })
            : null}
          {rules.map((r) => {
            return isRuleGroup(r)
              ? <RuleGroup
                combinator={r.combinator}
                id={r.id}
                key={r.id}
                parentId={this.props.id}
                rules={r.rules}
                schema={this.props.schema}
                />
              : <Rule
                field={r.field}
                id={r.id}
                key={r.id}
                onRuleRemove={onRuleRemove}
                operator={r.operator}
                parentId={this.props.id}
                schema={this.props.schema}
                value={r.value}
                />;
          })}
        </div>
      </div>
    );
  }
}
