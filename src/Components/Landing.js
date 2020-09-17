import React from 'react';
import 'isomorphic-fetch';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './Style.css';

export default class Landing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stats: '',
            option: 'London'

        }
        this.handleClick = this.handleClick.bind(this);
    }

    // handles selection of city by user and displays weather stats for 
    // desired city
    handleClick(e) {
        e.preventDefault();
        console.log(e.target.value)
        this.setState({
            option: e.target.value
        })
        this.componentDidMount() // fetches different data set after state is changed
    }

    // fetches data as soon as page loads and assigns it to state
    componentDidMount() {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.option},uk&APPID=c026786ad3f00b5d3c6b1a5f87b1f2df`)
            .then(res => res.json())
            .then(response => {
                this.setState({
                    stats: response.main // update state to fetched data
                })
            }, (error) => alert(error)) // alert user of any errors in fetching data
    }


    render() {
        // save state in variables for ease of use
        const city = this.state.stats;
        const cityChoice = this.state.option;
        return (
            <Container id='main-container'>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1 id='main-heading'><i class="fas fa-cloud"></i> 24-Hour WEATHER-MAN</h1>
                        <small>Keeping you weather-smart on the UK's largest cities</small>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <label id='options-list'>
                            <span id='span'>Choose City:</span> <br />
                            <select onClick={this.handleClick}>
                                <option value='London'>London</option>
                                <option value='Manchester'>Manchester</option>
                                <option value={'Liverpool'}>Liverpool</option>
                                <option value='Bristol'>Bristol</option>
                                <option value='Birmingham'>Birmingham</option>
                                <option value='Edinburgh'>Edinburgh</option>
                                <option value='Glasgow'>Glasgow</option>
                                
                            </select>
                        </label></Col>
                </Row>
                <Row id='stats-display'>
                    <Col md={{ span: 6, offset: 3 }}>{cityChoice &&
                        <div>
                            <h1 id='chosen-city'>{cityChoice.toUpperCase()}:</h1>
                            <ul id='stats-list'>
                                <li>Feels like: <span className='stats-item'>{Math.round(city.feels_like - 273.15)} °C</span></li>
                                <li>Temp: <span className='stats-item'>{Math.round(city.temp - 273.15)} °C</span></li>
                                <li>Humidity: <span className='stats-item'>{city.humidity}%</span></li>
                                <li>Pressure: <span className='stats-item'>{Math.round(city.pressure - 273.15)} hPa</span></li>
                                <li>Max_Temp: <span className='stats-item'>{Math.round(city.temp_max - 273.15)} °C</span></li>
                                <li>Min_Temp: <span className='stats-item'>{Math.round(city.temp_max - 273.15)} °C</span></li>
                            </ul>
                        </div>}
                    </Col>
                </Row>
            </Container>
        );
    }
}