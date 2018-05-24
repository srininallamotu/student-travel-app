import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { getCountriesAndThreatLevels,addUserWishListCountry } from './redux/App.redux';

import { GET_COUNTIRES_AND_THREAT_LEVELS_URL } from './constants/API';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedCountry: {},
    }
    this.handleCountryDrpChange = this.handleCountryDrpChange.bind(this);
    this.handleWishlistClick = this.handleWishlistClick.bind(this);
    this.handleChangeTheme = this.handleChangeTheme.bind(this);
  }

  componentDidMount() {
    // Method to get the country and threat level data and store into "Redux Store"
    this.props.getCountriesAndThreatLevels(GET_COUNTIRES_AND_THREAT_LEVELS_URL);
  }

  bindCountriesToDropDown() {
    // Render dropdown options.
    const { countries } = this.props;
    return countries.map(s => {
      return (<option key={"c" + s.id} value={s.id}>{s.name}</option>)
    })
  }

  handleCountryDrpChange(e) {
    const { countries } = this.props;
    var selectedCountries = countries.filter(s => {
      if (s.id == e.target.value)
        return s;
    });
    // Set the selected country to state
    if (selectedCountries.length > 0) {
      this.setState({ selectedCountry: selectedCountries[0] })
    }
    else{
      this.setState({ selectedCountry: {} })
    }
  }

  handleWishlistClick(s) {
    // Action trigger to store the selected country to store.
    this.props.addUserWishListCountry(s);
  }

  countryThreatLevel() {
    const {userWishListCountries}=this.props;
    // Country threat level check and perform necessary actions.
    var selectedCountry = this.state.selectedCountry;
    if (selectedCountry.threatLevel == 1 || selectedCountry.threatLevel == 2) {
      return (<div><button className="btn btn-primary" type="button" onClick={(e) => { this.handleWishlistClick(selectedCountry, e) }}>Add to WishList</button></div>)
    }
    else if(selectedCountry.threatLevel == 3 || selectedCountry.threatLevel == 4) {
      alert(selectedCountry.threatText);
      return (<span className="danger">{selectedCountry.threatText}</span>)
    }
  }

  displaySelectedCountry(){
    // display selected country 
    const { selectedCountry } = this.state;
    if(selectedCountry.name)
       return(<div className="form-group">
       <label className="mr-2">Selected Country: </label>
       <label className="">{this.state.selectedCountry.name}</label>
     </div>)
     else 
       return null;
  }

  displayUserSelectedCountries(){
    const {userWishListCountries}=this.props;
    return userWishListCountries.map(s=>{
      return(<tr><td> {s.name} </td></tr>)
    });
  }

  handleChangeTheme(){
    if(this.state.theme === "dark")
    this.setState({theme: "bright"});
    else
    this.setState({theme:"dark"})
  }

  render() {
    return (
      <div className={"App " + this.state.theme  }>
        <header>
          <button type="button" onClick={(e)=>this.handleChangeTheme(e)} >Change Theme</button>
        </header>
        <section className="mt-2">
          <div className="container">
            <div className="row">
              <div className="card p-4">
                <form>
                  <div className="form-group">
                    <label htmlFor="countryDrpDown" className="">Country</label>
                    <select ref="selectedCountry" className="form-control" id="countryDrpDown" onChange={(e) => this.handleCountryDrpChange(e)}>
                      <option value="0">--Select Country--</option>
                      {this.bindCountriesToDropDown()}
                    </select>
                  </div>
                  {this.displaySelectedCountry()}
                  <div className="form-group">
                    {this.countryThreatLevel()}
                  </div>
                </form>
              </div>
              <div className="card p-4 y-overflow">
              <table className="table table-striped">
              <thead>
                  <tr>
                    <th>User Countries list</th>
                 </tr>
             </thead>
             <tbody>
                {this.displayUserSelectedCountries()}
             </tbody>  
              </table>
              </div> 
            </div>
          </div>
        </section>
        <footer>
        </footer>
      </div>
    );
  }
}



const mapDispatchToProps = dispatch => {
  return {
    getCountriesAndThreatLevels: (url) => dispatch(getCountriesAndThreatLevels(url)),
    addUserWishListCountry:(country) => dispatch(addUserWishListCountry(country))
  }
}

const mapStateToProps = state => {
  const { studentReducer: { countries, userWishListCountries } } = state;
  return {
    countries,
    userWishListCountries
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
