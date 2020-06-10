import React from "react"
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom"
class CompileRouter extends React.Component {
    state = {
        C: null
    }
    renderComponent(route, redirect) {
        if (redirect) {
            return <Redirect key={route.redirect} from={route.path} to={route.redirect}/>
        }
        return <Route key={route.path} path={route.path} render={(props) => (
            <route.component routes={route.children} {...props} />
        )} />
    }
    async componentDidMount() {
        let routes = this.props.routes;
        if (!Array.isArray(routes)) {
            throw new Error("请传入一个可以迭代的数组类型")
        }
        let C = routes.map(async (route) => {
            if (route.redirect) {
                return this.renderComponent(route, true)
            }
            try {
                let asyncCom = await route.component().then(value => value.default)
                route.component = asyncCom
                return this.renderComponent(route)

            } catch (e) {
                console.log(route)
                return this.renderComponent(route)

            }
        })
        C = await Promise.all(C)
            .then(res => res)
        this.setState({
            C
        })
    }
    render() {
        console.log(this.Routes)
        return (
            <Router>
                <Switch>
                    {this.state.C}
                </Switch>
            </Router>
        )

    }
}
export default CompileRouter