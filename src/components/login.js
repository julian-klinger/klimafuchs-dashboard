import React, { Component } from 'react';
import { Jumbotron, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export class Login extends Component {
	constructor() {
		super()
		this.state = {
			name: "",
			password: "",
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		fetch('https://enviroommate.org/app-dev/api/login', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(
				{
					username: this.state.name,
					password: this.state.password,
				}
			)
		}).then((response) => {
				if (response.status !== 200)
					throw new Error("Login failed")					
				else
					return response.json()
		}).then((json) => {
			localStorage.setItem('token', json.token);
			this.props.callBackRender(json.token)
		}).catch((e) => {
			alert(e.message)
			// TODO markiere PW Feld
		});
	}

	render() {
		return (
			<Jumbotron className="mt-5">
				<Form onSubmit={this.handleSubmit}>
					<h2>Login Admin-Dashboard</h2>

					<FormGroup row>
						<Col xs={{ size: 10, offset: 1 }} md={{ size: 4, offset: 4 }}>
							<Label>Email</Label>
							<Input type="e-mail" name="e-mail" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} placeholder="E-Mail-Adresse" />
						</Col>
					</FormGroup>

					<FormGroup row>
						<Col xs={{ size: 10, offset: 1 }} md={{ size: 4, offset: 4 }}>
							<Label>Password</Label>
							<Input type="password" name="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} placeholder="Passwort" />
						</Col>
					</FormGroup>

					<FormGroup>
						<Button type="submit" color="primary">Submit</Button>
					</FormGroup>

				</Form>
			</Jumbotron>
		)
	}

}