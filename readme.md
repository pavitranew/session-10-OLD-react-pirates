# Session Ten

## Homework

## Reading



Download MS Code - https://code.visualstudio.com

```
import avatar from './img/drunkenPirate_avatar.svg'
```

```
return (
    <div className="pirate">
      <img src={avatar} />
      <p>{this.props.tagline}</p>
    </div>
  )
```

```
img {
  width: 30%;
}
```

`font-family: 'Trade Winds', cursive;`

```
.pirate {
  font-family: 'Pirata One', cursive;
}
```


From Pirate.js

JSON.stringify(<data-that-you-want-to-stringify>,<replacer-function-null>,<indentation>)

import preload from './sample-pirates'

render(){
  const {details} = this.props;
  return (
    <div className="pirate">
    <pre><code>{ JSON.stringify(preload, null, 4)}</code></pre>
    <ul>
      <li>{details.name}</li>
      <li>{details.weapon}</li>
      <li>{details.vessel}</li>
    </ul>
    </div>
    )
  }


Need an ng-repeat to make panels

array.map(<function that applies to each item in the array>) to components

Double numbers:

```
> var numbers = [1,5,8]
> numbers
> numbers.map(function(number){return number * 2})
> var double = function(number){return number * 2}
> double(5)
> numbers.map(double)
```

Use a max-height for Pirate with overflow scroll

/////////////

### JSX

1. logo: {logo}: JSX
2. App.css: injected via Webpack:`<style>`
3. class → className: JSX
4. xhtml style closing tags: JSX
5. style="color: purple" → style={{color: 'purple'}}: JSX

Nesting:

`<p>test</p>`

Note - to use Emmet run - `ctrl-e`

Comments:

`{ /* comment */ }` see http://wesbos.com/react-jsx-comments/

### props

```
<Pirate tagline="Ahoy there Matey!" />
```

Pirate.js

```
<p>{this.props.tagline}</p>
```

Inspect using React tool.

#### React dev tools

`$0`

`$r`

Select <Pirate />

`$r.props`


## Adding Pirates

New component: PirateForm.js:

`import samplePirates from './sample-pirates';`

```
import React, { Component } from 'react';
import AddPirateForm from './AddPirateForm';

class PirateForm extends React.Component {
  render(){
    return (
      <div>
      <h3>Pirate Forms</h3>
      <AddPirateForm />
      </div>
      )
  }
}

export default PirateForm;
```

App.js

```
import PirateForm from './PirateForm';
```

State / Data binding

AddPirateForm.js

```
import React, { Component } from 'react';

class AddPirateForm extends React.Component {
  render(){
    return (
      <form>
      <input type="text" placeholder="Pirate name" />
      <input type="text" placeholder="Pirate vessel" />
      <input type="text" placeholder="Pirate weapon" />
      <button type="submit">Add Pirate</button>
      </form>
      )
  }
}

export default AddPirateForm;
```

Method - createPirate

`<form onSubmit={(e) => this.createPirate(e)}>`:

```
    return (
      <form onSubmit={(e) => this.createPirate(e)}>
      <input type="text" placeholder="Pirate name" />
      <input type="text" placeholder="Pirate vessel" />
      <input type="text" placeholder="Pirate weapon" />
      <button type="submit">Add Pirate</button>
      </form>
      )
```

In AddPirateForm (above render):

```
createPirate(event) {
  event.preventDefault();
  console.log('make a pirate')
}
```

Test

Add refs to the form to store references to the input:

```
<form onSubmit={(e) => this.createPirate(e)}>
<input ref={(input) => this.name = input } type="text" placeholder="Pirate name" />
<input ref={(input) => this.vessel = input } type="text" placeholder="Pirate vessel" />
<input ref={(input) => this.weapon = input } type="text" placeholder="Pirate weapon" />
<button type="submit">Add Pirate</button>
</form>
```

Go to React dev tools, find AddPirateForm component, $r in the console to see the inputs.

Create the pirate const variable

AddPirateForm:

```
  createPirate(event) {
    event.preventDefault();
    console.log('make a pirate');
    const pirate = {
      name: this.name.value,
      vessel: this.vessel.value,
      weapon: this.weapon.value,
    }
    console.log(pirate)
  }
```

Test.

Get the pirate object into state. 

The key difference between props and state is that state is internal and controlled by the component itself while props are external and controlled by whatever renders the component. - [ref](http://buildwithreact.com/tutorial/state)

App.js:

```
class App extends Component {

  constructor() {
    super();
    this.state = {
      pirates: {}
    }
  }
```

React tools, find App, view state.

App.js:

```
  addPirate(pirate){
    //update state
    const pirates = {...this.state.pirates}
    //add new pirate
    const timestamp = Date.now();
    pirates[`pirate-${timestamp}`] = pirate;
    //set state
    this.setState({ pirates: pirates })
  }
```

Bind the add form to our app.

App.js:

```
  constructor() {
    super();
    this.addPirate = this.addPirate.bind(this);
    this.state = {
      pirates: {}
    }
  }
```

Note - bind() - creates a new function that, when called, has its `this` keyword set to the provided value.

```
var foo = {
    x: 3
}
var bar = function(){
    console.log(this.x);
}
bar(); // undefined
var boundFunc = bar.bind(foo);
boundFunc(); // 3
```

Test with: 

$r.addPirate({name: 'joe'})

Make the addPirate function available to components with props.

Pass the prop down to PirateForm:

`<PirateForm addPirate={this.addPirate} />`:  

```
  render() {
    return (
      <div className="App">
      <Header />
      <Pirate tagline="Ahoy there matey!" />
      <PirateForm addPirate={this.addPirate} />
      </div>
      );
  }
```

Examine PirateForm props

Only one level more! Pass the prop to AddPirateForm.

PirateForm:

`<AddPirateForm addPirate={this.props.addPirate} />`:

```
  render() {
    return (
      <div className="pirate-form">
        <h3>Pirate Forms</h3>
        <AddPirateForm addPirate={this.props.addPirate} />
      </div>
      )
  }
```

Examine AddPirateForm props

AddPirateForm:

`this.props.addPirate(pirate);`

```
  createPirate(event) {
    event.preventDefault();
    console.log('make a pirate');
    const pirate = {
      name: this.name.value,
      vessel: this.vessel.value,
      weapon: this.weapon.value,
    }
    this.props.addPirate(pirate);
  }
```

#### Use the form to add a pirate.

Empty the form with a ref.

`<form ref={ (input)=>this.pirateForm = input } onSubmit={(e) => this.createPirate(e)}>`:

```
    return (
      <form ref={(input)=>this.pirateForm = input } onSubmit={(e) => this.createPirate(e)}>
      <input ref={(input) => this.name = input } type="text" placeholder="Pirate name" />
      <input ref={(input) => this.vessel = input } type="text" placeholder="Pirate vessel" />
      <input ref={(input) => this.weapon = input } type="text" placeholder="Pirate weapon" />
      <button type="submit">Add Pirate</button>
      </form>
      )
```

and `this.pirateForm.reset();`:

```
createPirate(event) {
    event.preventDefault();
    console.log('make a pirate');
    const pirate = {
      name: this.name.value,
      vessel: this.vessel.value,
      weapon: this.weapon.value,
    }
    this.props.addPirate(pirate);
    this.pirateForm.reset();
  }
```

//////// show a single pirate

App.js:

```
<ul>
  <Pirate />
</ul>
```

Pirate.js:

```
import React, { Component } from 'react';

class Pirate extends React.Component {

  render(){
    return (
      <ul>
        <li>Pirate</li>
      </ul>
      )
  }
}

export default Pirate;
```

Unlike Angular there are no built in loops, repeats etc. You must use regular JS.

Here - cannot use .map which is for Arrays.

Use `Object.keys()`

Find App component in React tool. In console: `$r.state.pirates`

Load samples and run again to see data. Can't loop over that!

`Object.keys($r.state.pirates)`

App.js:

`{Object.keys(this.state.pirates)}`

```
return (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Pirate List</h2>
    </div>
    <div class="pirateList">
    {Object.keys(this.state.pirates)}
    </div>
    <PirateForm addPirate={this.addPirate} loadSamples={this.loadSamples} />
  </div>
);
```



```
<ul>
{
  Object
  .keys(this.state.pirates)
  .map( key => <Pirate key={key} details={this.state.pirates[key]} /> )
}
</ul>
```

Pirate.js:

```
  render(){
    const {details} = this.props;
    return (
      <ul>
        <li>{details.name}</li>
        <li>{details.weapon}</li>
        <li>{details.vessel}</li>
      </ul>
      )
  }
```


### Load sample data into state

PirateForm:

`<button onClick={this.loadSamples}>Load Sample Pirates</button>`:

```
    return (
      <div>
      <h3>Pirate Forms</h3>
      <AddPirateForm addPirate={this.props.addPirate} />
      <button onClick={this.props.loadSamples}>Load Sample Pirates</button>
      </div>
      )
```

App.js

`import samplePirates from './sample-pirates'`

```
  loadSamples(){
    this.setState({
      pirates: samplePirates
    })
  }
```

```
  constructor() {
    super();
    this.addPirate = this.addPirate.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.state = {
      pirates: {}
    }
  }
```


`<PirateForm addPirate={this.addPirate} loadSamples={this.loadSamples} />`:

```
    return (
      <div className="App">
      <Header />
      <div class="pirateList">
      {
        Object
        .keys(this.state.pirates)
        .map( key => <Pirate key={key} details={this.state.pirates[key]} /> )
      }
      </div>
      <PirateForm addPirate={this.addPirate} />
      </div>
      )
```

Loading the pirates

App.js:

```
<ul>
  <Pirate />
</ul>
```

Pirate.js:

```
import React, { Component } from 'react';

class Pirate extends React.Component {

  render(){
    return (
      <li>
        <p>Pirate</p>
      </li>
      )
  }
}

export default Pirate;
```

Unlike Angular there are no built in loops, repeats etc. You must use regular JS.

Here - cannot use .map which is for Arrays.

Use `Object.keys()`

Find App component in React tool. In console: `$r.state.pirates`

Load samples and run again to see data. Can't loop over that!

`Object.keys($r.state.pirates)`

App.js:

`{Object.keys(this.state.pirates)}`

```
return (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Pirate List</h2>
    </div>
    <ul>
    {Object.keys(this.state.pirates)}
    </ul>
    <PirateForm addPirate={this.addPirate} loadSamples={this.loadSamples} />
  </div>
);
```

```
<ul>
{
  Object
  .keys(this.state.pirates)
  .map( key => <Pirate key={key} details={this.state.pirates[key]} /> )
}
</ul>
```

Pirate.js:

```
  render(){
    const {details} = this.props;
    return (
      <li>
        <h4>{details.name}</h4>
        <p>{details.weapon}</p>
        <p>{details.vessel}</p>
      </li>
      )
  }
```

Load sample pirates.



### Validation Homework

Note the dependencies in package.json.

`npm install`

`npm run boom!`

Note the classes Angular adds to the input fields as they are manipulated by the user in `static/partials/pirate-list.template.html`

Give the form a name:

`<form ng-submit="addPirate(pirate)" name="addform">`

Disable the submit button:

`<button ng-disabled="addform.$invalid" type="submit">Add Pirate</button>`

Note: you can visually identify the button as being disabled using:

```css
button[disabled] {
  background: #bbb;
  cursor: not-allowed;
  border: none;
}
```

https://www.w3schools.com/csSref/playit.asp?filename=playcss_cursor&preval=not-allowed

Give the input a name. Add a paragraph with ng-show conditions.

```html
<div class="form-group">
  <label>
    <input ng-model="$ctrl.pirate.name" required ng-minlength="6" placeholder="Name" name="pname" />
    <svg viewBox="0 0 20 20" class="icon">
      <path d="M0 0 L10 10 L0 20"></path>
    </svg>
  </label>
  <p class="error" ng-show="addform.pname.$invalid && addform.pname.$touched"> A name must have at least 6 characters.</p>
</div>
```

Note the svg. 

```css
.error {
  color: red;
} 

label {
  display: flex;
  height: 2rem;
}

input {
  width: 100%;
  height: 1.6rem;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid hsl(0%, 0%, 85%);
  order: 1;
}
```

https://www.sitepoint.com/closer-look-svg-path-data/

Ref: this video from [frontend.center](https://www.youtube.com/watch?v=af4ZQJ14yu8).

```
input:focus {
  outline: none;
  border-color: hsl(0%, 0%, 25%)
}

.icon {
  width: 1rem;
  opacity: 0;
  transition: all 0.5s;
  transform: translateX(-100%)
  // stroke-dasharray: 0, 20;
  // stroke-dashoffset: -14.642;
}

.icon path {
  stroke: black;
  fill: none;
  stroke-width: 1px;
}

input:focus + .icon {
  opacity: 1;
  transform: translateX(0)
  // stroke-dasharray: 28.284, 20;
  // stroke-dashoffset: 0;
}

.ng-valid.ng-not-empty {
  border-color: hsl(166, 72%, 40%)
}

.ng-invalid.ng-dirty {
  border-color: hsl(0, 100%, 40%)
}

```

Using the dash effect:

```
.icon {
  width: 1rem;
  // opacity: 0;
  transition: all 0.5s;
  // transform: translateX(-100%)
  stroke-dasharray: 0, 20;
  stroke-dashoffset: -14.642;
}

.icon path {
  stroke: black;
  fill: none;
  stroke-width: 1px;
}

input:focus + .icon {
  // opacity: 1;
  // transform: translateX(0)
  stroke-dasharray: 28.284, 20;
  stroke-dashoffset: 0;
}
```


See https://www.w3schools.com/angular/angular_validation.asp for a complete set of examples for Angular validation.






### Notes









































