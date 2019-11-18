import React from 'react';
import '../style/loader.css';

class Welcome extends React.Component {
    constructor(props){
        super(props);
    }


    render(){

        return (
                <div className='jumbotron'>
                    <h2>Welcome</h2>
                </div>
        )
    }
}
export default Welcome;