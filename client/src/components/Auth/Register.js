import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles'

const styles =  {
  textField: {
    width: '100%',
    marginBottom: 5
  },
  btnBlock: {
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20
  }
}

class Register extends Component {
  constructor(props){
    super(props)

    this.state = {
      email: '',
      login: '',
      password: '',
      passwordTwo: ''
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const userData = {
      email: this.state.email,
      login: this.state.login,
      password: this.state.password,
      passwordTwo: this.state.passwordTwo
    }
    console.log("user submission: ", this.state)
    this.setState({
      email: "",
      login: '',
      password: '',
      passwordTwo: ''
    })
  }

  render() {
    const { classes } = this.props
    return (
      <Paper style={{ padding: 15}}>
				<form onSubmit={this.handleSubmit}>
					<TextField
						type="email"
						label="Email"
						className={classes.textField}
						value={this.state.email}
						onChange={this.handleChange}
						name="email"
					/>
					<TextField
						label="Login"
						type="text"
						name="login"
						value={this.state.login}
						onChange={this.handleChange}
						className={classes.textField}
					/>
					<TextField
						label="Password"
						type="password"
						name="password"
						value={this.state.password}
						onChange={this.handleChange}
						className={classes.textField}
					/>
					<TextField
						label="Repeat password"
						type="password"
						name="passwordTwo"
						value={this.state.passwordTwo}
						onChange={this.handleChange}
						className={classes.textField}
					/>
					<div className={classes.btnBlock}>
						<Button variant="outlined" type="submit">
							Submit
						</Button>
					</div>
				</form>
			</Paper>
    );
  }
}

export default withStyles(styles)(Register)
