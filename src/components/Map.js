import React, { Component } from 'react'
import { SvgLoader, SvgProxy } from 'react-svgmt';

class Map extends Component {
    render () {
        return (
        <div className="map" onClick={this.props.click} onTouchStart={this.props.click}>
            <SvgLoader svgXML={this.props.worldString} >
                <SvgProxy selector='*' fill="" stroke=""/>
                {this.props.visitedCountries.map( (country) => {
                    return (
                        <SvgProxy key={country.country_code} selector={`#${country.country_code}`} fill="red" stroke="white"/>
                    )
                })}
                {this.props.wishlistCountries.map( (country) => {
                    return (
                        <SvgProxy key={country.country_code} selector={`#${country.country_code}`} fill="blue" stroke="white"/>
                    )
                })}
                {this.props.currentCountry.country_code ? 
                    <SvgProxy selector={`#${this.props.currentCountry.country_code}`} fill="lightblue" stroke="navy"/>
                    : ''
                }
                
            </SvgLoader>
      </div>
    )
  }
}


export default Map
