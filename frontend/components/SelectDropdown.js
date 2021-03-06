import onClickOutside from 'react-onclickoutside';

import { orFalse } from '~/services/orFalse';

@onClickOutside
class SelectDropdown extends React.Component {
  static propTypes = {
    updateValue: PropTypes.func,
    value: orFalse(PropTypes.string).isRequired,

    possibleValues: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired,

    renderLi: PropTypes.func,
    renderSelectedLi: PropTypes.func,

    ifClearIsPossible: PropTypes.bool,
    className: PropTypes.string,
    dropdownClassName: PropTypes.string,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    renderButtonInLi: PropTypes.bool
  }

  static defaultProps = {
    // needed for when <li>s are links
    updateValue: () => {},
    renderLi: (value, humanValue) => humanValue,
    renderSelectedLi: (value, humanValue) => humanValue,
    className: '',
    dropdownClassName: 'standard-dropdown',
    placeholder: 'Please select',
    ifClearIsPossible: false,
    readOnly: false,
    renderButtonInLi: true
  }

  state = { ifDropdownIsOpen: false }

  onSelect = (value) => {
    this.closeDropdown();
    this.props.updateValue(value);
  }

  toggleDropdown  = () => {
    if (!this.props.readOnly) {
      this.setState({ ifDropdownIsOpen: !this.state.ifDropdownIsOpen });
    }
  }
  closeDropdown = () => this.setState({ ifDropdownIsOpen: false })
  handleClickOutside = this.closeDropdown

  // ['a', 'b'] => { a: 'a', b: 'b' }
  arrayToMap = (array) => {
    const hash = {};
    array.forEach((value) => {
      hash[value] = value;
    });
    return hash;
  }

  render = () => {
    const apiToHumanMapOfPossibleValues =
      Array.isArray(this.props.possibleValues) ?
        this.arrayToMap(this.props.possibleValues) :
        this.props.possibleValues;

    return <section
      className={`
        select-dropdown
        ${this.props.className}
        ${(this.state.ifDropdownIsOpen ? 'open' : '')}
      `}
    >
      <button type="button" className="toggler" onClick={this.toggleDropdown}>
        {
          this.props.value ?
            this.props.renderSelectedLi(this.props.value, apiToHumanMapOfPossibleValues[this.props.value]) :
            this.props.placeholder
        }
        {
          !this.props.readOnly &&
          <i className="fa fa-caret-down"/>
        }
      </button>
      {
        this.state.ifDropdownIsOpen &&
        <ul className={this.props.dropdownClassName}>
          {Object.keys(apiToHumanMapOfPossibleValues).map((value) =>
            <li key={value}>
              {
                this.props.renderButtonInLi ?
                  <button
                    type="button"
                    onClick={() => this.onSelect(value)}
                  >
                    {this.props.renderLi(value, apiToHumanMapOfPossibleValues[value])}
                  </button> :
                  this.props.renderLi(value, apiToHumanMapOfPossibleValues[value])
              }
            </li>
          )}
          {
            this.props.ifClearIsPossible &&
            <li onClick={() => this.onSelect(false)}>-</li>
          }
        </ul>
      }
    </section>;
  }
}

export { SelectDropdown };
export default SelectDropdown;
