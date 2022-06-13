import './App.css'
import { Route, Redirect } from 'react-router-dom'
import Home from './components/Home'
import Detail from './components/Detail'

function App() {
	return (
		<div>
			<Route exact path="/">
				<Redirect to="/home"></Redirect>
			</Route>
			<Route path="/home">
				<Home />
			</Route>
			<Route path="/detail">
				<Detail />
			</Route>
		</div>
	)
}

export default App
