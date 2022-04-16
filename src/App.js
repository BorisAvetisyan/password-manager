import './App.scss';
import Home from "./components/Home";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import PasswordManager from "./components/PasswordManager";
import PasswordChecker from "./components/PasswordChecker";
import NewWebsite from "./components/NewWebsite";
import Header from "./components/Header";
import PasswordGenerator from "./components/PasswordGenerator";

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Switch>
                    <Redirect exact from={'/'} to={'/home'}/>

                    <Route path='/home' exact={true} component={Home}/>
                    <Route path='/manager' exact={true} component={PasswordManager}/>
                    <Route path='/checker' exact={true} component={PasswordChecker}/>
                    <Route path="/new-website" exact={true} component={NewWebsite} />
                    <Route path="/password-generator" exact={true} component={PasswordGenerator} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
