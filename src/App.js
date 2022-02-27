import React, { Component } from 'react';
import axios from 'axios';
import User from './User'
import { user } from 'pg/lib/defaults';

class App extends Component {
    constructor(){
        super();
        this.state = {
            users: [],
            selectedUserId: ''
        };
    }

    async componentDidMount(){
        // users is an array of user instance objs.
        const users = (await axios.get('/api/users')).data;
        this.setState({ users : users });
        console.log(users);
        window.addEventListener('hashchange', ()=> {
            this.setState({ selectedUserId: window.location.hash.slice(1)});
        })
        this.setState({ selectedUserId: window.location.hash.slice(1)});
    }
    render(){
        const { users, selectedUserId } = this.state;
        return(
            <div>
                <h1>Acme Users</h1>
                <ul>
                    <li><a href='#'>All</a></li>
                    {
                        users.map( user => {
                            return (
                                <li className={selectedUserId*1 === user.id ? 'selected' : ''} key = { user.id }>
                                    <a href={`#${user.id}`}>
                                        {user.name}
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
                <div>
                    {/* if all is clicked, which has no selectedUserId, don't show user component, if link w/ selectedUserId is clicked, render User component */}
                    {
                        
                        !!selectedUserId && <User selectedUserId = { selectedUserId } />
                    }
                </div>
            </div>
        )
    }
}

export default App;